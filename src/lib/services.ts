import type { SupabaseClient } from '@supabase/supabase-js';

import type { Service, ServiceOption } from '@/types/database';

// Public + admin reads/writes for the services catalogue. Every function
// returns null when Supabase is not configured or the call fails, so callers
// can fall back to a known-good static value instead of showing a fake one.

export async function listActiveServices(client: SupabaseClient | null): Promise<Service[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .returns<Service[]>();
  if (error) {
    console.error('services_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export async function listAllServices(client: SupabaseClient | null): Promise<Service[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
    .returns<Service[]>();
  if (error) {
    console.error('services_list_all_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export async function listServiceOptions(client: SupabaseClient | null): Promise<ServiceOption[] | null> {
  if (!client) return null;
  const { data, error } = await client.from('service_options').select('*').returns<ServiceOption[]>();
  if (error) {
    console.error('service_options_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export type ServiceInput = Partial<Service>;

/** Insert or update one service. Used only from the admin panel. */
export async function saveService(client: SupabaseClient | null, service: ServiceInput): Promise<boolean> {
  if (!client || !service.name?.trim()) return false;
  const payload = {
    name: service.name,
    slug: service.slug ?? slugify(service.name),
    description: service.description ?? '',
    includes: service.includes ?? '',
    excludes: service.excludes ?? '',
    delivery_time: service.delivery_time ?? '',
    billing_type: service.billing_type ?? 'one_time',
    base_price: service.base_price ?? 0,
    is_active: service.is_active ?? true,
    sort_order: service.sort_order ?? 0,
  };
  const { error } = service.id
    ? await client.from('services').update(payload).eq('id', service.id)
    : await client.from('services').insert(payload);
  if (error) {
    console.error('service_save_failed', { reason: error.message });
    return false;
  }
  return true;
}

export async function setServiceActive(
  client: SupabaseClient | null,
  id: string,
  isActive: boolean,
): Promise<boolean> {
  if (!client) return false;
  const { error } = await client.from('services').update({ is_active: isActive }).eq('id', id);
  if (error) {
    console.error('service_toggle_failed', { reason: error.message });
    return false;
  }
  return true;
}

export type ServiceOptionInput = Partial<ServiceOption> & { service_id: string; option_name: string };

export async function saveServiceOption(
  client: SupabaseClient | null,
  option: ServiceOptionInput,
): Promise<boolean> {
  if (!client) return false;
  const payload = {
    service_id: option.service_id,
    option_name: option.option_name,
    extra_price: option.extra_price ?? 0,
    description: option.description ?? '',
  };
  const { error } = option.id
    ? await client.from('service_options').update(payload).eq('id', option.id)
    : await client.from('service_options').insert(payload);
  if (error) {
    console.error('service_option_save_failed', { reason: error.message });
    return false;
  }
  return true;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
