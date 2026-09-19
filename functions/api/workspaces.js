import { json, readJson, requireUser } from './_lib/supabase.js';

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export async function onRequestPost({ request, env }) {
  try {
    const { client, user } = await requireUser(request, env);
    const body = await readJson(request);
    const name = String(body.name || '').trim();
    if (!name || name.length > 120) return json({ error: 'Workspace name is required.' }, 400);

    const slug = `${slugify(name) || 'workspace'}-${crypto.randomUUID().slice(0, 8)}`;
    const { data: workspace, error: workspaceError } = await client
      .from('workspaces')
      .insert({ name, slug, type: body.type || 'personal', owner_user_id: user.id })
      .select('id,name,slug,type,status')
      .single();
    if (workspaceError) throw workspaceError;

    const { error: memberError } = await client
      .from('workspace_members')
      .insert({ workspace_id: workspace.id, user_id: user.id, role: 'owner', status: 'active', joined_at: new Date().toISOString() });
    if (memberError) throw memberError;

    return json({ workspace }, 201);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/workspaces failed', error);
    return json({ error: 'Unable to create workspace.' }, 500);
  }
}
