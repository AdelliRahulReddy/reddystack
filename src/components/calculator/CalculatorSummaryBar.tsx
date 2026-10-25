import { formatInr } from '@/lib/money';
import type { QuoteTotals } from '@/lib/quote';

/**
 * Phone-only running total, fixed to the bottom of the screen so the price
 * stays visible while services are ticked. Hidden from 961px, where the quote
 * panel is sticky beside the list.
 */
export default function CalculatorSummaryBar({ totals, count }: { totals: QuoteTotals; count: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[95] border-t border-line-strong bg-ink/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur min-[961px]:hidden">
      <div className="site-wrap flex items-center justify-between gap-4 py-3">
        <dl className="grid grid-cols-2 gap-x-5 text-[13px] text-muted-foreground" aria-live="polite">
          <div>
            <dt>One-time</dt>
            <dd className="font-display text-[19px] font-semibold text-ivory">{formatInr(totals.total_one_time)}</dd>
          </div>
          <div>
            <dt>Monthly</dt>
            <dd className="font-display text-[19px] font-semibold text-ivory">{formatInr(totals.total_monthly)}</dd>
          </div>
        </dl>
        <a href="#calc-quote" className="inline-flex min-h-11 items-center rounded-full bg-lime px-5 text-[15px] font-semibold text-lime-ink">
          {count > 0 ? `See quote (${count})` : 'See quote'}
        </a>
      </div>
    </div>
  );
}
