import { cn } from '@/lib/utils';

export type TimelineStep = { label: string; text: string };

/** Ordered steps for a service: a number, a short title and one plain paragraph each. */
export default function ProcessTimeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  return (
    <ol className={cn('grid gap-4', className)}>
      {steps.map((st, i) => (
        <li key={st.label} className="grid grid-cols-[48px_1fr] gap-4 rounded-[var(--radius-card)] shadow-card bg-ground p-5 sm:p-6">
          <span className="font-display text-[28px] font-semibold leading-none text-action-text">{i + 1}</span>
          <div>
            <h3 className="text-h3 font-semibold">{st.label.replace(/^\d+\.\s*/, '')}</h3>
            <p className="mt-2 max-w-[60ch] text-muted">{st.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
