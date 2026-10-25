import type { SupabaseClient } from '@supabase/supabase-js';

import type { NewEnquiry } from '@/types/database';
import type { QuoteTotals } from './quote';
import { insertEnquiry } from './enquiries';

export type QuoteLine =
  | { kind: 'bundle'; bundle_id: string; name: string; price: number }
  | { kind: 'service'; service_id: string; name: string; price: number }
  | { kind: 'option'; option_id: string; name: string; price: number };

export type CreateQuoteInput = {
  lines: QuoteLine[];
  totals: QuoteTotals;
  ad_spend_estimate: number;
  enquiry: NewEnquiry;
};

export type CreateQuoteResult = {
  quote_id: string;
};

/**
 * Calculator submit path: one quotes row, one quote_items row per selected
 * service/option, and one enquiries row (status "new", source "calculator")
 * linked to the quote. The quote is inserted first so the enquiry's quote_id
 * is set via INSERT — the public (anon) role has INSERT-only on these tables
 * (no SELECT, no UPDATE), so ids are generated in the app rather than read
 * back via RETURNING. Returns the quote UUID used as the reference.
 */
export async function createQuote(
  client: SupabaseClient | null,
  input: CreateQuoteInput,
): Promise<CreateQuoteResult | null> {
  if (!client) return null;

  const quoteId = crypto.randomUUID();

  const { error: quoteError } = await client.from('quotes').insert({
    id: quoteId,
    total_one_time: input.totals.total_one_time,
    total_monthly: input.totals.total_monthly,
    ad_spend_estimate: input.ad_spend_estimate,
    items_summary: input.lines.map((line) => line.name).join(', '),
    whatsapp_sent: false,
  });
  if (quoteError) {
    console.error('quote_insert_failed', { reason: quoteError.message });
    return null;
  }

  // quote_items has no bundle column yet, so a bundle line (the Enquiry Sprint)
  // is stored with its price only; its name is kept in quotes.items_summary.
  const itemRows = input.lines.map((line) =>
    line.kind === 'service'
      ? { quote_id: quoteId, service_id: line.service_id, price: line.price }
      : line.kind === 'option'
        ? { quote_id: quoteId, option_id: line.option_id, price: line.price }
        : { quote_id: quoteId, price: line.price },
  );
  if (itemRows.length > 0) {
    const { error: itemsError } = await client.from('quote_items').insert(itemRows);
    if (itemsError) {
      console.error('quote_items_insert_failed', { reason: itemsError.message });
      return null;
    }
  }

  const enquiryId = await insertEnquiry(client, { ...input.enquiry, quote_id: quoteId });
  if (enquiryId === null) {
    console.error('quote_enquiry_insert_failed', { reason: 'enquiry insert returned null' });
    return null;
  }

  return { quote_id: quoteId };
}

