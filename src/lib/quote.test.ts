import { test } from 'node:test';
import assert from 'node:assert/strict';

import { computeQuoteTotals, type PricedItem } from './quote.ts';

test('splits one-time and monthly totals', () => {
  const items: PricedItem[] = [
    { name: 'Landing page (Next.js)', type: 'service', price: 9999, billing_type: 'one_time' },
    { name: 'Meta ads management', type: 'service', price: 9999, billing_type: 'monthly' },
    { name: 'Add dashboard', type: 'option', price: 19999, billing_type: 'one_time' },
  ];
  assert.deepEqual(computeQuoteTotals(items), { total_one_time: 29998, total_monthly: 9999 });
});

test('returns zero totals for an empty selection', () => {
  assert.deepEqual(computeQuoteTotals([]), { total_one_time: 0, total_monthly: 0 });
});
