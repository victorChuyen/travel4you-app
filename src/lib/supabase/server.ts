import { createClient } from '@supabase/supabase-js';
import { getServerEnv } from '../config/env';

export function createSupabaseServerClient(values: Record<string, string | undefined>) {
  const env = getServerEnv(values);
  const secretKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secretKey) {
    throw new Error('Missing SUPABASE_SECRET_KEY for a server-side Supabase client.');
  }

  return createClient(env.PUBLIC_SUPABASE_URL, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
