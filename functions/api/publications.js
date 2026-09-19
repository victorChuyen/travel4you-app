import { json, readJson, requireUser } from './_lib/supabase.js';

export async function onRequestPost({ request, env }) {
  try {
    const { client } = await requireUser(request, env);
    const body = await readJson(request);
    const projectId = String(body.project_id || '');
    const visibility = body.visibility === 'public' ? 'public' : 'unlisted';
    if (!projectId) return json({ error: 'project_id is required.' }, 400);

    const { data: project, error: projectError } = await client
      .from('projects')
      .select('id,workspace_id,status')
      .eq('id', projectId)
      .single();
    if (projectError) throw projectError;

    const { data: version, error: versionError } = await client
      .from('project_versions')
      .select('id,version_number')
      .eq('project_id', projectId)
      .order('version_number', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (versionError) throw versionError;
    if (!version) return json({ error: 'Create a project version before publishing.' }, 409);

    const slug = `${projectId.slice(0, 8)}-${crypto.randomUUID().slice(0, 8)}`;
    const now = new Date().toISOString();
    const { data: publication, error: publicationError } = await client
      .from('publications')
      .upsert({
        project_id: project.id,
        workspace_id: project.workspace_id,
        slug,
        visibility,
        published_version_id: version.id,
        published_at: now,
        updated_at: now,
      }, { onConflict: 'project_id' })
      .select('id,project_id,slug,visibility,published_version_id,published_at')
      .single();
    if (publicationError) throw publicationError;

    const { error: updateError } = await client
      .from('projects')
      .update({ status: 'published', visibility })
      .eq('id', project.id);
    if (updateError) throw updateError;

    return json({ publication }, 201);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/publications failed', error);
    return json({ error: 'Unable to publish project.' }, 500);
  }
}

export async function onRequestDelete({ request, env }) {
  try {
    const { client } = await requireUser(request, env);
    const body = await readJson(request);
    const projectId = String(body.project_id || '');
    if (!projectId) return json({ error: 'project_id is required.' }, 400);

    const { error: publicationError } = await client
      .from('publications')
      .update({ visibility: 'private', published_version_id: null, published_at: null })
      .eq('project_id', projectId);
    if (publicationError) throw publicationError;
    const { error: projectError } = await client
      .from('projects')
      .update({ status: 'ready', visibility: 'private' })
      .eq('id', projectId);
    if (projectError) throw projectError;
    return json({ ok: true });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('DELETE /api/publications failed', error);
    return json({ error: 'Unable to unpublish project.' }, 500);
  }
}
