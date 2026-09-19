import { createBrowserClient } from '@supabase/ssr';
import { getPublicEnv } from '../config/env';

export function createSupabaseBrowserClient() {
  const env = getPublicEnv();
  return createBrowserClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
