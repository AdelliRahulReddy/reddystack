import type { SupabaseClient } from '@supabase/supabase-js';

import type { AppSettings, Setting, SettingKey } from '@/types/database';

// Seed values, kept in one named place so the public site has a known fallback
// while the database remains the source of truth. Do not treat these as the
// live values once settings are edited in admin.
export const DEFAULT_SETTINGS: AppSettings = {
  whatsapp_number: '917207022577',
  email: 'thereddystack@gmail.com',
  advance_percent: 50,
  guarantee_text:
    'Not live with first enquiries in the agreed window? We work free until it is.',
};

export async function getSettings(client: SupabaseClient | null): Promise<AppSettings | null> {
  if (!client) return null;
  const { data, error } = await client.from('settings').select('*').returns<Setting[]>();
  if (error || !data) {
    console.error('settings_fetch_failed', { reason: error?.message });
    return null;
  }

  const map = new Map(data.map((row) => [row.key, row.value]));
  return {
    whatsapp_number: map.get('whatsapp_number') ?? DEFAULT_SETTINGS.whatsapp_number,
    email: map.get('email') ?? DEFAULT_SETTINGS.email,
    advance_percent: Number(map.get('advance_percent') ?? DEFAULT_SETTINGS.advance_percent),
    guarantee_text: map.get('guarantee_text') ?? DEFAULT_SETTINGS.guarantee_text,
  };
}

/** Upserts one settings row (key/value). Admin only. */
export async function saveSetting(
  client: SupabaseClient | null,
  key: SettingKey,
  value: string,
): Promise<boolean> {
  if (!client) return false;
  const { data: existing } = await client.from('settings').select('id').eq('key', key).maybeSingle();
  const { error } = existing
    ? await client.from('settings').update({ value }).eq('id', existing.id)
    : await client.from('settings').insert({ key, value });
  if (error) {
    console.error('setting_save_failed', { key, reason: error.message });
    return false;
  }
  return true;
}
