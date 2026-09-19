import { json } from '../_lib/supabase.js';
import { createClient } from '@supabase/supabase-js';

export async function onRequestGet({ params, env }) {
  const url = env.SUPABASE_URL || env.PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_PUBLISHABLE_KEY || env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return json({ error: 'Supabase public configuration is missing.' }, 500);

  const client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  const { data, error } = await client.rpc('get_publication_by_slug', { target_slug: params.slug });
  if (error) {
    console.error('GET /api/publications/:slug failed', error);
    return json({ error: 'Unable to load publication.' }, 500);
  }
  if (!data) return json({ error: 'Publication not found.' }, 404);
  return json({ publication: data });
}
