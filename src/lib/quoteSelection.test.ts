import { test } from 'node:test';
import assert from 'node:assert/strict';

import type { Bundle, Service, ServiceOption } from '../types/database.ts';
import { resolveQuoteSelection } from './quoteSelection.ts';
import { computeQuoteTotals } from './quote.ts';

const sprint: Bundle = { id: 'b1', name: 'Enquiry Sprint', slug: 'enquiry-sprint', description: '', fixed_price: 14999, guarantee_text: '', is_active: true };
const retired: Bundle = { ...sprint, id: 'b2', name: 'Old bundle', slug: 'old', is_active: false };
const service = (id: string, price: number, billing_type: Service['billing_type']): Service => ({
  id, name: id, slug: id, description: '', includes: '', excludes: '', delivery_time: '', billing_type, base_price: price, is_active: true, sort_order: 0,
});
const landing = service('landing', 9999, 'one_time');
const metaAds = service('meta', 9999, 'monthly');
const dashboard: ServiceOption = { id: 'o1', service_id: 'landing', option_name: 'Add dashboard', description: '', extra_price: 19999 };
const catalogue = { bundles: [sprint, retired], services: [landing, metaAds], options: [dashboard] };

test('the Sprint is priced from the bundle row and counted as one-time', () => {
  const { items, lines } = resolveQuoteSelection({ bundleIds: ['b1'], serviceIds: ['meta'], optionIds: [] }, catalogue);
  assert.deepEqual(computeQuoteTotals(items), { total_one_time: 14999, total_monthly: 9999 });
  assert.deepEqual(lines[0], { kind: 'bundle', bundle_id: 'b1', name: 'Enquiry Sprint', price: 14999 });
});

test('drops unknown ids, inactive bundles and add-ons without their service', () => {
  const { items } = resolveQuoteSelection({ bundleIds: ['b2', 'nope'], serviceIds: ['meta', 'nope'], optionIds: ['o1'] }, catalogue);
  assert.deepEqual(items.map((i) => i.name), ['meta']);
});

test('keeps an add-on when its service is ticked', () => {
  const { items } = resolveQuoteSelection({ bundleIds: [], serviceIds: ['landing'], optionIds: ['o1'] }, catalogue);
  assert.deepEqual(computeQuoteTotals(items), { total_one_time: 29998, total_monthly: 0 });
});
