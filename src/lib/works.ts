import type { SupabaseClient } from '@supabase/supabase-js';

import type { Work, WorkType } from '@/types/database';

export type WorkGroups = {
  client: Work[];
  portfolio: Work[];
};

export async function listVisibleWorks(client: SupabaseClient | null): Promise<Work[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('works')
    .select('*')
    .eq('is_shown', true)
    .order('sort_order', { ascending: true })
    .returns<Work[]>();
  if (error) {
    console.error('works_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export async function listAllWorks(client: SupabaseClient | null): Promise<Work[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('works')
    .select('*')
    .order('sort_order', { ascending: true })
    .returns<Work[]>();
  if (error) {
    console.error('works_list_all_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

/** Splits works into the two labels that must never be mixed on the site. */
export function groupWorksByType(works: Work[]): WorkGroups {
  return works.reduce<WorkGroups>(
    (groups, work) => {
      const type: WorkType = work.work_type === 'client' ? 'client' : 'portfolio';
      groups[type].push(work);
      return groups;
    },
    { client: [], portfolio: [] },
  );
}

export type WorkInput = Partial<Work>;

export async function saveWork(client: SupabaseClient | null, work: WorkInput): Promise<boolean> {
  if (!client || !work.title?.trim() || !work.work_type) return false;
  const payload = {
    title: work.title,
    work_type: work.work_type,
    client_name: work.client_name ?? '',
    description: work.description ?? '',
    image_url: work.image_url ?? '',
    link: work.link ?? '',
    is_shown: work.is_shown ?? true,
    sort_order: work.sort_order ?? 0,
  };
  const { error } = work.id
    ? await client.from('works').update(payload).eq('id', work.id)
    : await client.from('works').insert(payload);
  if (error) {
    console.error('work_save_failed', { reason: error.message });
    return false;
  }
  return true;
}

export async function setWorkShown(client: SupabaseClient | null, id: string, isShown: boolean): Promise<boolean> {
  if (!client) return false;
  const { error } = await client.from('works').update({ is_shown: isShown }).eq('id', id);
  if (error) {
    console.error('work_toggle_failed', { reason: error.message });
    return false;
  }
  return true;
}
