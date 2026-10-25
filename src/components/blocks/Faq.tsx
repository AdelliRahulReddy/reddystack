import { cn } from '@/lib/utils';

export type FaqItem = { id?: string | number; question: string; answer: string };

/**
 * Question list built on native <details>, so answers stay in the HTML for search
 * and FAQ schema, and open without JavaScript.
 */
export function FaqList({ items, openFirst = true, className }: { items: FaqItem[]; openFirst?: boolean; className?: string }) {
  return (
    <div className={cn('grid gap-2', className)}>
      {items.map((f, i) => (
        <details key={f.id ?? f.question} open={openFirst && i === 0} className="group/qa rounded-[var(--radius-card)] bg-surface px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-semibold text-text [&::-webkit-details-marker]:hidden">
            {f.question}
            <span aria-hidden="true" className="grid size-8 flex-none place-items-center rounded-full bg-surface-2 text-[18px] leading-none text-muted transition-transform duration-200 group-open/qa:rotate-45">+</span>
          </summary>
          <p className="max-w-[62ch] pb-6 text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Shown until the owner adds real answers in Admin → Content. Never filled with invented answers. */
function FaqEmpty({ whatsappHref }: { whatsappHref?: string }) {
  return (
    <div role="status" className="rounded-[var(--radius-card)] bg-surface p-6 sm:p-8">
      <p className="text-h3 font-semibold text-text">Questions coming soon — ask us on WhatsApp.</p>
      <p className="mt-2 text-muted">Rahul answers every question himself, in plain words.</p>
      {whatsappHref && (
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex font-semibold text-action underline underline-offset-4">
          Ask on WhatsApp
        </a>
      )}
    </div>
  );
}

/** FAQ section: heading left, questions right (or an honest empty state). */
export default function Faq({
  items,
  title = 'Questions people ask first.',
  id = 'faq-title',
  intro,
  whatsappHref,
  className,
}: { items: FaqItem[]; title?: string; id?: string; intro?: string; whatsappHref?: string; className?: string }) {
  return (
    <section aria-labelledby={id} className={cn('section', className)}>
      <div className="site-wrap grid gap-[clamp(24px,4vw,64px)] min-[900px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div>
          <h2 id={id} className="text-h2">{title}</h2>
          {intro && <p className="mt-4 max-w-[40ch] text-muted">{intro}</p>}
        </div>
        {items.length > 0 ? <FaqList items={items} /> : <FaqEmpty whatsappHref={whatsappHref} />}
      </div>
    </section>
  );
}
