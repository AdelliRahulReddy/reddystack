import { NextResponse } from 'next/server';
import * as yup from 'yup';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listActiveServices, listServiceOptions } from '@/lib/services';
import { createQuote, type QuoteLine } from '@/lib/quotes';
import { computeQuoteTotals, type PricedItem } from '@/lib/quote';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export const runtime = 'nodejs';

const calculatorSchema = yup
  .object({
    service_ids: yup.array().of(yup.string().uuid()).max(50).default([]),
    option_ids: yup.array().of(yup.string().uuid()).max(50).default([]),
    ad_spend_estimate: yup.number().integer().min(0).max(100000000).default(0),
    name: yup.string().trim().max(100).required(),
    business_name: yup.string().trim().max(200).required(),
    phone: yup.string().trim().max(30).required(),
    email: yup.string().trim().email().max(254).required(),
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
  const [services, options] = await Promise.all([
    listActiveServices(client),
    listServiceOptions(client),
  ]);

  if (!services || !options) {
    return NextResponse.json(
      { error: 'Unable to build the quote right now. Please try again or use WhatsApp.' },
      { status: 502 },
    );
  }

  const serviceIds = new Set(payload.service_ids);
  const optionIds = new Set(payload.option_ids);

  const selectedServices = services.filter((service) => serviceIds.has(service.id));
  const selectedOptions = options.filter(
    (option) => optionIds.has(option.id) && serviceIds.has(option.service_id),
  );

  if (selectedServices.length === 0) {
    return NextResponse.json({ error: 'Pick at least one service to build a quote.' }, { status: 400 });
  }

  // Prices are resolved server-side from the DB, never trusted from the client.
  const pricedItems: PricedItem[] = [
    ...selectedServices.map((service) => ({
      name: service.name,
      type: 'service' as const,
      price: service.base_price,
      billing_type: service.billing_type,
    })),
    ...selectedOptions.map((option) => ({
      name: option.option_name,
      type: 'option' as const,
      price: option.extra_price,
      billing_type: 'one_time' as const,
    })),
  ];

  const lines: QuoteLine[] = [
    ...selectedServices.map((service) => ({
      kind: 'service' as const,
      service_id: service.id,
      name: service.name,
      price: service.base_price,
    })),
    ...selectedOptions.map((option) => ({
      kind: 'option' as const,
      option_id: option.id,
      name: option.option_name,
      price: option.extra_price,
    })),
  ];

  const totals = computeQuoteTotals(pricedItems);
  const serviceInterest = selectedServices.map((service) => service.name).join(', ');

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
