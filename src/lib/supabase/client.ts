import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './env';

let client: SupabaseClient | undefined;

/**
 * Browser-side client (single shared instance). Returns null when the owner has
 * not pasted the env variables yet, so callers can show an honest message
 * instead of crashing.
 */
export function getBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createBrowserClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
      isSingleton: true,
    });
  }
  return client;
}
