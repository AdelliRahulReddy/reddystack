import type { SupabaseClient } from '@supabase/supabase-js';

import type { EnquiryStatus } from '@/types/database';

const EMPTY_STATUS_COUNTS: Record<EnquiryStatus, number> = {
  new: 0,
  contacted: 0,
  quoted: 0,
  won: 0,
  lost: 0,
};

export async function countEnquiriesByStatus(
  client: SupabaseClient | null,
): Promise<Record<EnquiryStatus, number> | null> {
  if (!client) return null;
  const { data, error } = await client.from('enquiries').select('status');
  if (error) {
    console.error('enquiry_status_count_failed', { reason: error.message });
    return null;
  }
  const counts = { ...EMPTY_STATUS_COUNTS };
  for (const row of data ?? []) {
    if (row.status in counts) counts[row.status as EnquiryStatus] += 1;
  }
  return counts;
}

export async function countEnquiriesSince(client: SupabaseClient | null, sinceIso: string): Promise<number | null> {
  if (!client) return null;
  const { count, error } = await client
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sinceIso);
  if (error) {
    console.error('enquiry_count_since_failed', { reason: error.message });
    return null;
  }
  return count ?? 0;
}

export type PickedService = { name: string; count: number };

/** Most-picked services from the calculator's quote_items (service lines). */
export async function listMostPickedServices(
  client: SupabaseClient | null,
  limit = 6,
): Promise<PickedService[] | null> {
  if (!client) return null;
  const { data, error } = await client.from('quote_items').select('service_id, services(name)');
  if (error) {
    console.error('most_picked_failed', { reason: error.message });
    return null;
  }
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const name = (row as { services?: { name?: string } | null }).services?.name;
    if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
