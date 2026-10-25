import type { Bundle } from '@/types/database';
import { formatInr } from '@/lib/money';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

/** The lead offer as a tickable calculator item, read from the bundles row. */
export default function CalculatorSprintCard({ bundle, on, onToggle }: { bundle: Bundle; on: boolean; onToggle: () => void }) {
  return (
    <article
      id={`pick-${bundle.slug}`}
      className={cn('scroll-mt-[calc(var(--header-h)+16px)] rounded-[28px] border bg-raised p-6 transition-colors sm:p-8', on ? 'border-lime' : 'border-lime/30')}
    >
      <button type="button" aria-pressed={on} onClick={onToggle} className="flex w-full items-start gap-4 text-left">
        <span
          aria-hidden="true"
          className={cn(
            'grid size-6 flex-none place-items-center rounded-full border text-[13px] leading-none transition-colors',
            on ? 'border-lime bg-lime text-lime-ink' : 'border-line-strong text-transparent',
          )}
        >
          ✓
        </span>
        <span>
          <span className="flex flex-wrap items-center gap-3">
            <span className="font-display text-[20px] font-semibold tracking-[-0.02em]">{bundle.name}</span>
            <Badge>Lead offer</Badge>
          </span>
          <span className="mt-1 block text-muted-foreground">{bundle.description}</span>
        </span>
      </button>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="font-display text-[24px] font-semibold">{formatInr(bundle.fixed_price)}</span>
        <Badge>One-time</Badge>
      </div>
      <p className="mt-3 text-[14.5px] text-muted-foreground">Ad spend is extra and paid directly to Meta, not to us.</p>
      {bundle.guarantee_text && (
        <p className="mt-4 border-t border-line pt-4 text-[14.5px] text-ivory">
          <strong className="text-lime">Guarantee:</strong> {bundle.guarantee_text}
        </p>
      )}
    </article>
  );
}
