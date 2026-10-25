import type { SupabaseClient } from '@supabase/supabase-js';

import type { Bundle } from '@/types/database';

export async function listBundles(client: SupabaseClient | null): Promise<Bundle[] | null> {
  if (!client) return null;
  const { data, error } = await client.from('bundles').select('*').order('id', { ascending: true }).returns<Bundle[]>();
  if (error) {
    console.error('bundles_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export type BundleUpdate = Pick<Bundle, 'name' | 'description' | 'fixed_price' | 'guarantee_text' | 'is_active'>;

/** Admin only (owner RLS): edits an existing bundle such as the Enquiry Sprint. */
export async function updateBundle(client: SupabaseClient | null, id: string, patch: BundleUpdate): Promise<boolean> {
  if (!client) return false;
  // RLS turns a blocked update into "0 rows, no error", so confirm the row came back.
  const { data, error } = await client
    .from('bundles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id');
  if (error || !data || data.length !== 1) {
    console.error('bundle_save_failed', { reason: error?.message ?? 'no row updated' });
    return false;
  }
  return true;
}
