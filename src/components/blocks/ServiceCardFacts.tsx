import { Check, X } from 'lucide-react';

import type { Service } from '@/types/database';
import { formatInr } from '@/lib/money';

/**
 * Read-only facts for one service: price, billing label, includes/excludes
 * (each a single TEXT line) and delivery time. Used by the services cards and
 * the calculator so both read the same DB row the same way.
 */
export default function ServiceCardFacts({ service }: { service: Service }) {
  return (
    <>
      <p className="flex items-baseline gap-2">
        <span className="font-display text-[26px] font-semibold tabular-nums text-text">{formatInr(service.base_price)}</span>
        <span className="text-small text-muted">{service.billing_type === 'monthly' ? 'per month' : 'one-time'}</span>
      </p>

      {(service.includes || service.excludes) && (
        <ul className="mt-4 grid gap-2 text-[15px]">
          {service.includes && (
            <li className="flex gap-2.5"><Check aria-hidden="true" className="mt-0.5 size-4 flex-none text-action-text" /><span><span className="sr-only">Includes: </span>{service.includes}</span></li>
          )}
          {service.excludes && (
            <li className="flex gap-2.5 text-muted"><X aria-hidden="true" className="mt-0.5 size-4 flex-none" /><span><span className="sr-only">Not included: </span>{service.excludes}</span></li>
          )}
        </ul>
      )}

      {service.delivery_time && (
        <p className="mt-4 text-small text-muted">Ready in: {service.delivery_time}</p>
      )}
    </>
  );
}
