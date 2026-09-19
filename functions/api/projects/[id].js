import { json, readJson, requireUser } from '../_lib/supabase.js';

export async function onRequestGet({ request, env, params }) {
  try {
    const { client } = await requireUser(request, env);
    const { data, error } = await client
      .from('projects')
      .select('*,project_versions(*)')
      .eq('id', params.id)
      .maybeSingle();
    if (error) throw error;
    if (!data) return json({ error: 'Project not found.' }, 404);
    return json({ project: data });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('GET /api/projects/:id failed', error);
    return json({ error: 'Unable to load project.' }, 500);
  }
}

export async function onRequestPatch({ request, env, params }) {
  try {
    const { client } = await requireUser(request, env);
    const body = await readJson(request);
    const updates = {};
    for (const field of ['title', 'destination', 'audience', 'locale', 'status', 'visibility']) {
      if (Object.prototype.hasOwnProperty.call(body, field)) updates[field] = body[field];
    }
    if (Object.keys(updates).length === 0) return json({ error: 'No supported fields supplied.' }, 400);
    const { data, error } = await client.from('projects').update(updates).eq('id', params.id)
      .select('id,workspace_id,created_by_user_id,project_type,title,destination,audience,locale,status,visibility,created_at,updated_at')
      .single();
    if (error) throw error;
    return json({ project: data });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('PATCH /api/projects/:id failed', error);
    return json({ error: 'Unable to update project.' }, 500);
  }
}

export async function onRequestDelete({ request, env, params }) {
  try {
    const { client } = await requireUser(request, env);
    const { error } = await client.from('projects').update({ status: 'archived' }).eq('id', params.id);
    if (error) throw error;
    return json({ ok: true });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('DELETE /api/projects/:id failed', error);
    return json({ error: 'Unable to archive project.' }, 500);
  }
}
