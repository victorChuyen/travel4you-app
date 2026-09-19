import { json, readJson, requireUser } from '../_lib/supabase.js';

function parseGeneratedContent(content) {
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('AI returned invalid JSON.');
  }

  const requiredArrays = ['days', 'experiences', 'practical_notes'];
  for (const field of requiredArrays) {
    if (!Array.isArray(parsed[field])) throw new Error(`AI output field "${field}" must be an array.`);
  }
  for (const field of ['project', 'summary', 'cta']) {
    if (!parsed[field] || typeof parsed[field] !== 'object' || Array.isArray(parsed[field])) {
      throw new Error(`AI output field "${field}" must be an object.`);
    }
  }
  return parsed;
}

async function callRouter(input, env) {
  const baseUrl = (env.AI_ROUTER_BASE_URL || 'http://127.0.0.1:8787').replace(/\/$/, '');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number(env.AI_ROUTER_TIMEOUT_MS || 30000));
  try {
    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(env.AI_ROUTER_API_KEY ? { authorization: `Bearer ${env.AI_ROUTER_API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: env.AI_ROUTER_DEFAULT_MODEL || 'default',
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Return only valid JSON for a premium editable travel project.' },
          { role: 'user', content: JSON.stringify({ input, output_schema: { project: {}, summary: {}, days: [], experiences: [], practical_notes: [], cta: {} } }) },
        ],
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`9router returned HTTP ${response.status}.`);
    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) throw new Error('9router returned no content.');
    return { payload, content: content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim() };
  } finally {
    clearTimeout(timeout);
  }
}

export async function onRequestPost({ request, env }) {
  let jobId;
  try {
    const { client, user } = await requireUser(request, env);
    const body = await readJson(request);
    const projectId = String(body.project_id || '');
    if (!projectId) return json({ error: 'project_id is required.' }, 400);

    const { data: project, error: projectError } = await client
      .from('projects')
      .select('id,workspace_id,title,destination,audience,locale,status')
      .eq('id', projectId)
      .single();
    if (projectError) throw projectError;

    const { data: job, error: jobError } = await client
      .from('ai_jobs')
      .insert({
        workspace_id: project.workspace_id,
        project_id: project.id,
        user_id: user.id,
        job_type: 'generate_project',
        status: 'running',
        input_metadata_json: body,
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single();
    if (jobError) throw jobError;
    jobId = job.id;

    await client.from('projects').update({ status: 'generating' }).eq('id', project.id);
    const result = await callRouter({ ...body, project }, env);
    const structured = parseGeneratedContent(result.content);

    const { data: latest } = await client
      .from('project_versions')
      .select('version_number')
      .eq('project_id', project.id)
      .order('version_number', { ascending: false })
      .limit(1)
      .maybeSingle();
    const versionNumber = (latest?.version_number || 0) + 1;

    const { data: version, error: versionError } = await client
      .from('project_versions')
      .insert({
        project_id: project.id,
        version_number: versionNumber,
        structured_content_json: structured,
        source: 'ai',
        created_by_user_id: user.id,
      })
      .select('id,project_id,version_number,structured_content_json,source,created_at')
      .single();
    if (versionError) throw versionError;

    await client.from('ai_jobs').update({
      status: 'completed',
      output_metadata_json: { model: result.payload?.model || env.AI_ROUTER_DEFAULT_MODEL || 'default' },
      usage_json: result.payload?.usage || {},
      completed_at: new Date().toISOString(),
    }).eq('id', jobId);
    await client.from('projects').update({ status: 'ready' }).eq('id', project.id);

    return json({ version, usage: result.payload?.usage || {} }, 201);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/ai/generate failed', error);
    if (jobId) {
      try {
        const { client } = await requireUser(request, env);
        await client.from('ai_jobs').update({ status: 'failed', error_code: error.message, completed_at: new Date().toISOString() }).eq('id', jobId);
      } catch (updateError) {
        console.error('Failed to update AI job failure state', updateError);
      }
    }
    return json({ error: error.message || 'AI generation failed.' }, 502);
  }
}
