import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './env';

/**
 * Server-side client for one request. Always create a fresh instance per render
 * (never share across requests). Returns null when the env variables are
 * missing so the caller can render an honest "not configured" state.
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies. Session refresh is handled
          // by the admin middleware on routes that need it.
        }
      },
    },
  });
}
