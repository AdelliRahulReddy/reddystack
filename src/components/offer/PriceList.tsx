import Link from 'next/link';

import { formatInr } from '@/lib/money';
import type { Service } from '@/types/database';

/** Every service as one row: what it is, its price, and whether it is one-time or monthly. Read from the services table. */
export default function PriceList({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-2">
      {services.map((service) => (
        <li key={service.id}>
          <Link
            href={`/calculator?pick=${service.slug}`}
            className="grid gap-x-6 gap-y-1 rounded-[var(--radius-card)] bg-surface px-5 py-4 transition-colors hover:bg-surface-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6"
          >
            <span>
              <span className="block font-semibold text-text">{service.name}</span>
              <span className="block text-[15px] text-muted">{service.description}</span>
            </span>
            <span className="flex items-baseline gap-2 sm:justify-end">
              <span className="font-display text-[22px] font-semibold tabular-nums text-text">{formatInr(service.base_price)}</span>
              <span className="text-small text-muted">{service.billing_type === 'monthly' ? 'per month' : 'one-time'}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
