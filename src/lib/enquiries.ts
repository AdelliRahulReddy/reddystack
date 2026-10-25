import type { SupabaseClient } from '@supabase/supabase-js';

import type { Enquiry, EnquiryStatus, NewEnquiry } from '@/types/database';

/**
 * Inserts an enquiry and returns its UUID. The id is generated in the app
 * (not via RETURNING) because the public role has INSERT but no SELECT on
 * enquiries, so `.select('id')` is denied.
 */
export async function insertEnquiry(
  client: SupabaseClient | null,
  payload: NewEnquiry & { quote_id?: string | null },
): Promise<string | null> {
  if (!client) return null;
  const id = crypto.randomUUID();
  const { error } = await client.from('enquiries').insert({
    id,
    name: payload.name,
    business_name: payload.business_name,
    phone: payload.phone,
    email: payload.email,
    service_interest: payload.service_interest,
    message: payload.message,
    source: payload.source,
    quote_id: payload.quote_id ?? null,
    status: 'new',
  });
  if (error) {
    console.error('enquiry_insert_failed', { reason: error.message });
    return null;
  }
  return id;
}

export type EnquiryFilter = { status?: EnquiryStatus };

export async function listEnquiries(client: SupabaseClient | null, filter: EnquiryFilter = {}): Promise<Enquiry[] | null> {
  if (!client) return null;
  let query = client.from('enquiries').select('*').order('created_at', { ascending: false });
  if (filter.status) query = query.eq('status', filter.status);
  const { data, error } = await query.returns<Enquiry[]>();
  if (error) {
    console.error('enquiries_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export type EnquiryUpdate = {
  status?: EnquiryStatus;
  notes?: string;
  follow_up_date?: string | null;
};

export async function updateEnquiry(client: SupabaseClient | null, id: string, patch: EnquiryUpdate): Promise<boolean> {
  if (!client) return false;
  const { error } = await client.from('enquiries').update(patch).eq('id', id);
  if (error) {
    console.error('enquiry_update_failed', { reason: error.message });
    return false;
  }
  return true;
}
