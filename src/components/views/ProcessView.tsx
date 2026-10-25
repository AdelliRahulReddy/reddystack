const STEPS = [
  {
    title: 'Pick the work.',
    text: 'Choose the services you need in the calculator, or tell us your problem. We agree the exact scope and price before anything starts.',
  },
  {
    title: 'Pay the advance.',
    text: 'A small percentage up front books the work. The rest is paid on delivery.',
  },
  {
    title: 'We build.',
    text: 'We do the work and send written updates as we go. No daily calls needed — you review at the agreed checkpoints.',
  },
  {
    title: 'You get the report.',
    text: 'You receive what was agreed, plus a plain summary of what was done and what to check next.',
  },
];

/** How a project runs, with the advance percentage read from settings. */
export default function ProcessView({ advancePercent }: { advancePercent: number }) {
  return (
    <section className="site-wrap pb-[clamp(56px,8vw,120px)]">
      <ol className="grid gap-5 md:grid-cols-2">
        {STEPS.map((step, index) => (
          <li key={step.title} className="rounded-[28px] border border-line bg-graphite p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-lime">Step {index + 1}</span>
            <h2 className="mt-3 font-display text-[22px] font-semibold tracking-[-0.02em]">
              {index === 1 ? `${advancePercent}% ${step.title.toLowerCase()}` : step.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-[28px] border border-lime/30 bg-lime/5 p-6 sm:p-8">
        <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">How we communicate</h2>
        <p className="mt-3 max-w-[56ch] text-muted-foreground">
          Everything is written down, so you can catch up in a few minutes whenever you have time. We agree the
          checkpoints up front and keep the update trail in one place. We are available on WhatsApp and email
          between checkpoints when you need a quick answer.
        </p>
      </div>
    </section>
  );
}
