import { Check } from 'lucide-react';

import { offerIncludes } from '@/content/plainOffer';
import { formatInr } from '@/lib/money';
import type { Bundle } from '@/types/database';
import { ButtonLink } from '@/components/blocks/ButtonLink';
import ExampleEnquiryPage from '@/components/explain/ExampleEnquiryPage';
import ExampleMessage from '@/components/explain/ExampleMessage';
import ExampleReport from '@/components/explain/ExampleReport';

/**
 * The lead offer in plain words: what you get, the price panel (name, price,
 * ad-spend note, guarantee, one action) and three labelled examples.
 * Name, price and guarantee come from the bundles row. Shared by home and pricing.
 */
export default function OfferSection({ bundle, id = 'offer' }: { bundle: Bundle; id?: string }) {
  const price = formatInr(bundle.fixed_price);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section scroll-mt-[calc(var(--header-h)+8px)]">
      <div className="site-wrap">
        <div className="grid gap-[clamp(32px,5vw,72px)] min-[961px]:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]">
          <div>
            <h2 id={`${id}-title`} className="max-w-[16ch] text-h2">What you get for {price}</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 min-[640px]:grid-cols-2">
              {offerIncludes.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-5 flex-none text-action" />
                  <span>
                    <span className="block font-semibold text-text">{item.title}</span>
                    <span className="mt-1 block text-muted">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label={`${bundle.name} price`} className="h-fit rounded-[var(--radius-panel)] bg-surface p-6 sm:p-8 min-[961px]:sticky min-[961px]:top-[calc(var(--header-h)+24px)]">
            <p className="text-small text-muted">{bundle.name}</p>
            <p className="mt-2 font-display text-[clamp(44px,5vw,64px)] font-semibold leading-none tracking-[-0.04em] text-text">{price}</p>
            <p className="mt-2 text-text">One-time payment.</p>
            <p className="mt-1 text-muted">Ad spend is extra and paid directly to Meta, not to us.</p>
            {bundle.guarantee_text && (
              <p className="mt-6 rounded-2xl bg-surface-2 p-4 text-text">
                <span className="font-semibold text-action">Our promise: </span>{bundle.guarantee_text}
              </p>
            )}
            <ButtonLink href={`/calculator?pick=${bundle.slug}`} className="mt-6 w-full">Get customer enquiries</ButtonLink>
            <p className="mt-3 text-center text-small text-muted">Saving a quote does not start paid work.</p>
          </aside>
        </div>

        <div className="mt-[clamp(48px,6vw,88px)] grid gap-8 min-[900px]:grid-cols-3">
          <ExampleEnquiryPage />
          <ExampleMessage />
          <ExampleReport />
        </div>
      </div>
    </section>
  );
}
