import type { SupabaseClient } from '@supabase/supabase-js';

/** Email of the currently signed-in Supabase user, or null when signed out or unconfigured. */
export async function getAdminEmail(client: SupabaseClient | null): Promise<string | null> {
  if (!client) return null;
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user?.email) return null;
  return user.email;
}

/** Owner check: the signed-in email must exist in admin_users with role 'owner'. */
export async function isAdminUser(client: SupabaseClient | null, email: string): Promise<boolean> {
  if (!client) return false;
  const { data, error } = await client
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .eq('role', 'owner')
    .maybeSingle();
  if (error) {
    console.error('admin_check_failed', { reason: error.message });
    return false;
  }
  return Boolean(data);
}

export async function listAdminUsers(client: SupabaseClient | null): Promise<string[] | null> {
  if (!client) return null;
  const { data, error } = await client.from('admin_users').select('email');
  if (error) {
    console.error('admin_users_list_failed', { reason: error.message });
    return null;
  }
  return (data ?? []).map((row: { email: string }) => row.email);
}
