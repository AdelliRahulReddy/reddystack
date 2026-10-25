import type { SupabaseClient } from '@supabase/supabase-js';

import type { SiteContent } from '@/types/database';

// site_content holds one row per section (section is UNIQUE): title + body.
export const SITE_CONTENT_SECTIONS = ['hero', 'positioning'] as const;
export type SiteContentSection = (typeof SITE_CONTENT_SECTIONS)[number];

export async function getSiteContent(
  client: SupabaseClient | null,
  section: SiteContentSection,
): Promise<SiteContent | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('site_content')
    .select('*')
    .eq('section', section)
    .eq('is_shown', true)
    .maybeSingle();
  if (error) {
    console.error('site_content_fetch_failed', { section, reason: error.message });
    return null;
  }
  return data;
}

/** Admin: every section row, including hidden ones. */
export async function listAllSiteContent(client: SupabaseClient | null): Promise<SiteContent[] | null> {
  if (!client) return null;
  const { data, error } = await client.from('site_content').select('*').order('section', { ascending: true }).returns<SiteContent[]>();
  if (error) {
    console.error('site_content_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export type HeroContent = {
  title: string;
  body: string;
};

/** The two fields the home hero renders, from the 'hero' section row. */
export function buildHeroContent(row: SiteContent | null): HeroContent {
  return {
    title: row?.title ?? '',
    body: row?.body ?? '',
  };
}

export type SiteContentInput = {
  title: string;
  body: string;
  is_shown?: boolean;
};

/** Upserts one section row by its UNIQUE section. Admin only. */
export async function saveSiteContent(
  client: SupabaseClient | null,
  section: SiteContentSection,
  input: SiteContentInput,
): Promise<boolean> {
  if (!client) return false;
  const { data: existing } = await client.from('site_content').select('id').eq('section', section).maybeSingle();

  const payload = { title: input.title, body: input.body, is_shown: input.is_shown ?? true };
  const { error } = existing
    ? await client.from('site_content').update(payload).eq('id', existing.id)
    : await client.from('site_content').insert({ section, ...payload });

  if (error) {
    console.error('site_content_save_failed', { section, reason: error.message });
    return false;
  }
  return true;
}
