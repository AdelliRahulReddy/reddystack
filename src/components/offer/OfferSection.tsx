import { offerIncludes, planLabel } from '@/content/plainOffer';
import { formatInr } from '@/lib/money';
import type { Bundle } from '@/types/database';
import { ButtonLink } from '@/components/blocks/ButtonLink';
import LineIcon, { type LineIconName } from '@/components/blocks/LineIcon';
import ExampleEnquiryPage from '@/components/explain/ExampleEnquiryPage';
import ExampleMessage from '@/components/explain/ExampleMessage';
import ExampleReport from '@/components/explain/ExampleReport';
import ExampleViewer from '@/components/explain/ExampleViewer';

const icons: LineIconName[] = ['page', 'ads', 'image', 'bell', 'refresh', 'chart'];

/**
 * The lead offer as one block: what is included, the price facts and the
 * promise in a single card, with three tap-to-open examples beside it.
 * Price and promise come from the bundles row; the plan shows its display label.
 */
export default function OfferSection({ bundle, id = 'offer', showPromise = true }: { bundle: Bundle; id?: string; showPromise?: boolean }) {
  const price = formatInr(bundle.fixed_price);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section scroll-mt-[calc(var(--header-h)+8px)]">
      <div className="site-wrap grid gap-[clamp(24px,4vw,48px)] min-[1025px]:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
        <div className="rounded-[var(--radius-panel)] shadow-card bg-surface p-6 sm:p-8">
          <p className="text-small font-semibold text-action-text">{planLabel}</p>
          <h2 id={`${id}-title`} className="mt-1 text-h2">What you get for {price}</h2>
          <p className="mt-2 text-muted">One-time. Ad spend is extra, paid directly to Meta.</p>

          <ul className="mt-6 grid gap-x-6 gap-y-4 min-[560px]:grid-cols-2">
            {offerIncludes.map((item, i) => {
              return (
                <li key={item.title} className="flex gap-3">
                  <span className="grid size-10 flex-none place-items-center rounded-xl bg-surface-2 text-action-text"><LineIcon name={icons[i]} /></span>
                  <span>
                    <span className="block font-semibold leading-6 text-text">{item.title}</span>
                    <span className="block text-[15px] text-muted">{item.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          {showPromise && bundle.guarantee_text && (
            <p className="mt-6 rounded-2xl bg-surface-2 p-4 text-text">
              <span className="font-semibold">Our promise: </span>{bundle.guarantee_text}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <ButtonLink href={`/calculator?pick=${bundle.slug}`}>Get this plan</ButtonLink>
            <p className="text-small text-muted">Saving a quote does not start paid work.</p>
          </div>
        </div>

        <div className="grid content-start gap-3 min-[640px]:max-[1024px]:grid-cols-3">
          <ExampleViewer title="Your enquiry page"><ExampleEnquiryPage /></ExampleViewer>
          <ExampleViewer title="An enquiry arriving"><ExampleMessage /></ExampleViewer>
          <ExampleViewer title="Your weekly report"><ExampleReport /></ExampleViewer>
        </div>
      </div>
    </section>
  );
}
