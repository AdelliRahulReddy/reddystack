import ExampleLabel from './ExampleLabel';

// Illustrative figures only, to show the shape of the report. Never a client result.
const rows = [
  ['Ad spend this week (paid to Meta)', '₹3,500'],
  ['WhatsApp chats', '9'],
  ['Phone calls', '4'],
  ['Form fills', '3'],
] as const;

/** The shape of the plain weekly report. Labelled as an example with sample numbers. */
export default function ExampleReport() {
  return (
    <figure>
      <div className="rounded-[var(--radius-card)] bg-surface-2 p-5 sm:p-6">
        <p className="font-semibold text-text">Weekly report</p>
        <dl className="mt-4 grid gap-2 text-[15px]">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{label}</dt>
              <dd className="font-semibold tabular-nums text-text">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[15px] text-muted">
          <span className="font-semibold text-text">What we changed:</span> paused the weaker ad image and moved its budget to the one getting messages.
        </p>
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-small text-muted">
        <ExampleLabel /> Sample numbers, not a client result.
      </figcaption>
    </figure>
  );
}
