import type { SupabaseClient } from '@supabase/supabase-js';

import type { Faq } from '@/types/database';

export async function listFaqs(client: SupabaseClient | null): Promise<Faq[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('faqs')
    .select('*')
    .eq('is_shown', true)
    .order('sort_order', { ascending: true })
    .returns<Faq[]>();
  if (error) {
    console.error('faqs_list_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

/** Admin: all FAQs, including hidden ones. */
export async function listAllFaqs(client: SupabaseClient | null): Promise<Faq[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true })
    .returns<Faq[]>();
  if (error) {
    console.error('faqs_list_all_failed', { reason: error.message });
    return null;
  }
  return data ?? [];
}

export type FaqInput = Partial<Faq> & { question: string; answer: string };

export async function saveFaq(client: SupabaseClient | null, faq: FaqInput): Promise<boolean> {
  if (!client) return false;
  const payload = {
    question: faq.question,
    answer: faq.answer,
    is_shown: faq.is_shown ?? true,
    sort_order: faq.sort_order ?? 0,
  };
  const { error } = faq.id
    ? await client.from('faqs').update(payload).eq('id', faq.id)
    : await client.from('faqs').insert(payload);
  if (error) {
    console.error('faq_save_failed', { reason: error.message });
    return false;
  }
  return true;
}

export async function deleteFaq(client: SupabaseClient | null, id: string): Promise<boolean> {
  if (!client) return false;
  const { error } = await client.from('faqs').delete().eq('id', id);
  if (error) {
    console.error('faq_delete_failed', { reason: error.message });
    return false;
  }
  return true;
}
