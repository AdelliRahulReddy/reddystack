import Link from 'next/link';

import type { Service } from '@/types/database';
import ServiceCardFacts from '@/components/blocks/ServiceCardFacts';

/**
 * Every active service as a card: price, billing label, what is included and
 * not, and delivery time, all read from the DB. Each card's one action adds it
 * in the calculator.
 */
export default function ServicesPricingView({ services }: { services: Service[] }) {
  return (
    <div className="site-wrap">
      <div className="grid gap-4 min-[760px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="flex flex-col rounded-[var(--radius-card)] shadow-card bg-ground p-6 sm:p-7">
            <h3 className="text-h3 font-semibold">{service.name}</h3>
            <p className="mt-2 text-muted">{service.description}</p>
            <div className="mt-5 flex-1">
              <ServiceCardFacts service={service} />
            </div>
            <Link
              href={`/calculator?pick=${service.slug}`}
              className="mt-6 inline-flex text-[15px] font-semibold text-action-text underline underline-offset-4"
            >
              Add this to my price
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
