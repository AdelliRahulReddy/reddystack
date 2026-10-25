import { NextResponse } from 'next/server';
import * as yup from 'yup';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listBundles } from '@/lib/bundles';
import { listActiveServices, listServiceOptions } from '@/lib/services';
import { createQuote } from '@/lib/quotes';
import { computeQuoteTotals } from '@/lib/quote';
import { resolveQuoteSelection } from '@/lib/quoteSelection';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export const runtime = 'nodejs';

const calculatorSchema = yup
  .object({
    bundle_ids: yup.array().of(yup.string().uuid()).max(10).default([]),
    service_ids: yup.array().of(yup.string().uuid()).max(50).default([]),
    option_ids: yup.array().of(yup.string().uuid()).max(50).default([]),
    ad_spend_estimate: yup.number().integer().min(0).max(100000000).default(0),
    name: yup.string().trim().max(100).required(),
    business_name: yup.string().trim().max(200).required(),
    phone: yup.string().trim().max(30).required(),
    email: yup.string().trim().email().max(254).default(''),
    message: yup.string().trim().max(4000).default(''),
    website: yup.string().max(0).default(''),
  })
  .required();

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'The calculator is not connected yet. Please email us or use WhatsApp.' },
      { status: 503 },
    );
  }

  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Please use the calculator on this website.' }, { status: 403 });
  }
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return NextResponse.json({ error: 'Please send a JSON request.' }, { status: 415 });
  }

  let payload: yup.InferType<typeof calculatorSchema>;
  try {
    const body = await request.json();
    payload = await calculatorSchema.validate(body, { abortEarly: false, stripUnknown: true });
  } catch {
    return NextResponse.json({ error: 'Please complete all required fields correctly.' }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ success: true, quote_id: null });
  }

  const client = await createSupabaseServerClient();
  const [bundles, services, options] = await Promise.all([
    listBundles(client),
    listActiveServices(client),
    listServiceOptions(client),
  ]);

  if (!bundles || !services || !options) {
    return NextResponse.json(
      { error: 'Unable to build the quote right now. Please try again or use WhatsApp.' },
      { status: 502 },
    );
  }

  // Prices are resolved server-side from the DB, never trusted from the client.
  const { items: pricedItems, lines } = resolveQuoteSelection(
    {
      bundleIds: (payload.bundle_ids ?? []).filter((id): id is string => Boolean(id)),
      serviceIds: (payload.service_ids ?? []).filter((id): id is string => Boolean(id)),
      optionIds: (payload.option_ids ?? []).filter((id): id is string => Boolean(id)),
    },
    { bundles, services, options },
  );

  if (lines.every((line) => line.kind === 'option')) {
    return NextResponse.json({ error: 'Pick the Enquiry Sprint or at least one service to build a quote.' }, { status: 400 });
  }

  const totals = computeQuoteTotals(pricedItems);
  const serviceInterest = lines.filter((line) => line.kind !== 'option').map((line) => line.name).join(', ');

  const result = await createQuote(client, {
    lines,
    totals,
    ad_spend_estimate: payload.ad_spend_estimate,
    enquiry: {
      name: payload.name,
      business_name: payload.business_name,
      phone: payload.phone,
      email: payload.email,
      service_interest: serviceInterest,
      message: payload.message,
      source: 'calculator',
    },
  });

  if (!result) {
    return NextResponse.json(
      { error: 'Unable to save the quote right now. Please try again or use WhatsApp.' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    quote_id: result.quote_id,
    totals,
    items_summary: pricedItems.map((item) => item.name).join(', '),
  });
}
