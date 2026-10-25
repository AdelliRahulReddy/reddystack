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

export type BundleInput = Partial<Bundle> & { name: string; fixed_price: number };

export async function saveBundle(client: SupabaseClient | null, bundle: BundleInput): Promise<boolean> {
  if (!client) return false;
  const payload = {
    name: bundle.name,
    fixed_price: bundle.fixed_price,
    guarantee_text: bundle.guarantee_text ?? '',
  };
  const { error } = bundle.id
    ? await client.from('bundles').update(payload).eq('id', bundle.id)
    : await client.from('bundles').insert(payload);
  if (error) {
    console.error('bundle_save_failed', { reason: error.message });
    return false;
  }
  return true;
}
