import { json, readJson, requireUser } from './_lib/supabase.js';

export async function onRequestGet({ request, env }) {
  try {
    const { client } = await requireUser(request, env);
    const url = new URL(request.url);
    const workspaceId = url.searchParams.get('workspace_id');
    if (!workspaceId) return json({ error: 'workspace_id is required.' }, 400);

    const { data, error } = await client
      .from('projects')
      .select('id,workspace_id,created_by_user_id,project_type,title,destination,audience,locale,status,visibility,created_at,updated_at')
      .eq('workspace_id', workspaceId)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return json({ projects: data });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('GET /api/projects failed', error);
    return json({ error: 'Unable to load projects.' }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const { client, user } = await requireUser(request, env);
    const body = await readJson(request);
    const workspaceId = String(body.workspace_id || '');
    const title = String(body.title || '').trim();
    if (!workspaceId || !title) return json({ error: 'workspace_id and title are required.' }, 400);

    const { data, error } = await client
      .from('projects')
      .insert({
        workspace_id: workspaceId,
        created_by_user_id: user.id,
        title,
        destination: body.destination || null,
        audience: body.audience || null,
        locale: body.locale || 'en',
      })
      .select('id,workspace_id,created_by_user_id,project_type,title,destination,audience,locale,status,visibility,created_at,updated_at')
      .single();
    if (error) throw error;
    return json({ project: data }, 201);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/projects failed', error);
    return json({ error: 'Unable to create project.' }, 500);
  }
}
