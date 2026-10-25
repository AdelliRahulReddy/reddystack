import type { Bundle, Service, ServiceOption } from '@/types/database';
import type { PricedItem } from './quote';
import type { QuoteLine } from './quotes';

export type QuoteSelection = { bundleIds: string[]; serviceIds: string[]; optionIds: string[] };
export type QuoteCatalogue = { bundles: Bundle[]; services: Service[]; options: ServiceOption[] };

/**
 * Turns ticked ids into priced items and quote lines, using prices from the
 * catalogue only (never from the visitor). Used by the calculator page for the
 * live totals and by /api/calculator for the saved quote, so both agree.
 * Unknown ids, inactive bundles and add-ons whose service is not ticked are dropped.
 */
export function resolveQuoteSelection(selection: QuoteSelection, catalogue: QuoteCatalogue) {
  const bundles = catalogue.bundles.filter((b) => b.is_active && selection.bundleIds.includes(b.id));
  const services = catalogue.services.filter((s) => selection.serviceIds.includes(s.id));
  const options = catalogue.options.filter(
    (o) => selection.optionIds.includes(o.id) && selection.serviceIds.includes(o.service_id) && services.some((s) => s.id === o.service_id),
  );

  const items: PricedItem[] = [
    ...bundles.map((b) => ({ name: b.name, type: 'bundle' as const, price: b.fixed_price, billing_type: 'one_time' as const })),
    ...services.map((s) => ({ name: s.name, type: 'service' as const, price: s.base_price, billing_type: s.billing_type })),
    ...options.map((o) => ({ name: o.option_name, type: 'option' as const, price: o.extra_price, billing_type: 'one_time' as const })),
  ];

  const lines: QuoteLine[] = [
    ...bundles.map((b) => ({ kind: 'bundle' as const, bundle_id: b.id, name: b.name, price: b.fixed_price })),
    ...services.map((s) => ({ kind: 'service' as const, service_id: s.id, name: s.name, price: s.base_price })),
    ...options.map((o) => ({ kind: 'option' as const, option_id: o.id, name: o.option_name, price: o.extra_price })),
  ];

  return { items, lines };
}
