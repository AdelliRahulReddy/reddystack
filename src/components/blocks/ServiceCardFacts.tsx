import type { Service } from '@/types/database';
import { formatInr } from '@/lib/money';
import { Badge } from '@/components/ui/badge';

/**
 * Read-only facts for one service: price, billing badge, description,
 * includes/excludes (each a single TEXT line) and delivery time. Used by the
 * services page and the calculator so the two stay identical and both read
 * the same DB row.
 */
export default function ServiceCardFacts({ service }: { service: Service }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-[24px] font-semibold">{formatInr(service.base_price)}</span>
        <Badge variant={service.billing_type === 'monthly' ? 'secondary' : 'default'}>
          {service.billing_type === 'monthly' ? 'Per month' : 'One-time'}
        </Badge>
      </div>

      {(service.includes || service.excludes) && (
        <ul className="mt-5 grid gap-2 border-t border-line pt-5 text-[14.5px] text-muted-foreground">
          {service.includes && (
            <li className="flex gap-2"><span className="text-lime">✓</span><span>{service.includes}</span></li>
          )}
          {service.excludes && (
            <li className="flex gap-2"><span className="text-coral">✕</span><span>{service.excludes}</span></li>
          )}
        </ul>
      )}

      {service.delivery_time && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-faint">Delivery: {service.delivery_time}</span>
        </div>
      )}
    </>
  );
}
