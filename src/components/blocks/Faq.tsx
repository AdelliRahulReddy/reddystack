import { cn } from '@/lib/utils';
import Eyebrow from './Eyebrow';
import SplitText from './SplitText';

export type FaqItem = { id?: string | number; question: string; answer: string };

/**
 * Question list built on native <details>, so answers stay in the HTML for search
 * and FAQ schema, and open without JavaScript.
 */
export function FaqList({ items, openFirst = true, className }: { items: FaqItem[]; openFirst?: boolean; className?: string }) {
  return (
    <div className={className}>
      {items.map((f, i) => (
        <details
          key={f.id ?? f.question}
          open={openFirst && i === 0}
          className="group/qa border-t border-line last:border-b [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:[transition:height_.5s_var(--ease-studio),content-visibility_.5s_allow-discrete] open:[&::details-content]:h-auto [interpolate-size:allow-keywords]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(19px,1.7vw,23px)] font-semibold tracking-[-0.02em] transition-colors duration-300 hover:text-lime [&::-webkit-details-marker]:hidden">
            {f.question}
            <span
              aria-hidden="true"
              className="relative size-9 flex-none rounded-full border border-line transition-all duration-400 ease-studio before:absolute before:left-1/2 before:top-1/2 before:h-[1.5px] before:w-3 before:-translate-1/2 before:bg-ivory after:absolute after:left-1/2 after:top-1/2 after:h-[1.5px] after:w-3 after:-translate-1/2 after:rotate-90 after:bg-ivory after:transition-transform after:duration-400 group-open/qa:border-lime group-open/qa:bg-lime group-open/qa:before:bg-lime-ink group-open/qa:after:rotate-0 group-open/qa:after:bg-lime-ink"
            />
          </summary>
          <p className="max-w-[62ch] pb-[26px] text-muted-foreground">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Shown until the owner adds real answers in Admin → Content. Never filled with invented answers. */
function FaqEmpty({ whatsappHref }: { whatsappHref?: string }) {
  return (
    <div role="status" className="rounded-[28px] border border-line bg-graphite p-6 sm:p-8">
      <p className="font-display text-[clamp(20px,1.8vw,24px)] font-semibold tracking-[-0.02em]">
        Questions coming soon — ask us on WhatsApp.
      </p>
      <p className="mt-2 text-muted-foreground">Rahul answers every question himself, in plain words.</p>
      {whatsappHref && (
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex font-medium text-lime underline underline-offset-4 hover:text-ivory">
          Ask on WhatsApp
        </a>
      )}
    </div>
  );
}

/** Two-column FAQ section: heading left, questions right (or an honest empty state). */
export default function Faq({
  items,
  title = 'Before you get in touch.',
  label = 'Questions',
  id = 'faq-title',
  intro,
  whatsappHref,
  className,
}: { items: FaqItem[]; title?: string; label?: string; id?: string; intro?: string; whatsappHref?: string; className?: string }) {
  return (
    <section aria-labelledby={id} className={cn('py-[clamp(56px,8vw,120px)]', className)}>
      <div className="site-wrap grid gap-[clamp(24px,5vw,88px)] min-[861px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div>
          <Eyebrow>{label}</Eyebrow>
          <h2 id={id} aria-label={title} data-split className="mt-[18px] text-[clamp(36px,4.6vw,64px)]">
            <SplitText text={title} />
          </h2>
          {intro && <p data-reveal className="mt-6 max-w-[40ch] text-muted-foreground">{intro}</p>}
        </div>
        {items.length > 0 ? <FaqList items={items} /> : <FaqEmpty whatsappHref={whatsappHref} />}
      </div>
    </section>
  );
}
