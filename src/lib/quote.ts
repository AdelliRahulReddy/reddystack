import type { BillingType } from '@/types/database';

export type PricedItem = {
  name: string;
  type: 'service' | 'option' | 'bundle';
  price: number;
  billing_type: BillingType;
};

export type QuoteTotals = {
  total_one_time: number;
  total_monthly: number;
};

/** Sums selected items into the two figures the calculator shows separately. */
export function computeQuoteTotals(items: PricedItem[]): QuoteTotals {
  return items.reduce<QuoteTotals>(
    (totals, item) => {
      if (item.billing_type === 'monthly') totals.total_monthly += item.price;
      else totals.total_one_time += item.price;
      return totals;
    },
    { total_one_time: 0, total_monthly: 0 },
  );
}
