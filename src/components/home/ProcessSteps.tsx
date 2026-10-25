import { processSteps } from '@/content/plainOffer';

/** The four steps of a project, with the advance percentage from settings when the page has it. */
export default function ProcessSteps({ advancePercent }: { advancePercent?: number }) {
  return (
    <ol className="grid gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
      {processSteps.map((step, i) => (
        <li key={step.title} className="rounded-[var(--radius-card)] shadow-card bg-surface p-6">
          <span className="font-display text-[28px] font-semibold text-action-text">{i + 1}</span>
          <h3 className="mt-3 text-h3 font-semibold">{i === 1 && advancePercent ? `Pay ${advancePercent}% to start` : step.title}</h3>
          <p className="mt-2 text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
