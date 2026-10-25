import type { SupabaseClient } from '@supabase/supabase-js';

import { listBundles } from './bundles';
import { listActiveServices } from './services';

export const NOT_SURE_CHOICE = { slug: 'not-sure', title: 'Not sure yet' } as const;

export type EnquiryChoice = { slug: string; title: string };

/**
 * What an enquirer can say they need: the lead offer first, then each active
 * service, then "Not sure yet". Read from the same rows as the price list so
 * the contact form never offers something the site does not sell. Returns
 * null when the database is unavailable.
 */
export async function listEnquiryChoices(client: SupabaseClient | null): Promise<EnquiryChoice[] | null> {
  const [bundles, services] = await Promise.all([listBundles(client), listActiveServices(client)]);
  if (!bundles || !services) return null;
  return [
    ...bundles.filter((b) => b.is_active).map((b) => ({ slug: b.slug, title: b.name })),
    ...services.map((s) => ({ slug: s.slug, title: s.name })),
    NOT_SURE_CHOICE,
  ];
}
