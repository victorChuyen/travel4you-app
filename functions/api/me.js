import { json, requireUser } from './_lib/supabase.js';

export async function onRequestGet({ request, env }) {
  try {
    const { client, user } = await requireUser(request, env);
    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('id,email,display_name,avatar_url,status')
      .eq('id', user.id)
      .maybeSingle();
    if (profileError) throw profileError;

    const { data: memberships, error: membershipError } = await client
      .from('workspace_members')
      .select('workspace_id,role,status,workspaces(id,name,slug,type,status)')
      .eq('user_id', user.id)
      .eq('status', 'active');
    if (membershipError) throw membershipError;

    return json({ user: { id: user.id, email: user.email }, profile, memberships });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('GET /api/me failed', error);
    return json({ error: 'Unable to load account.' }, 500);
  }
}
