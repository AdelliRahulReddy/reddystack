import Link from 'next/link';

import type { Service } from '@/types/database';
import ServiceCardFacts from '@/components/blocks/ServiceCardFacts';

/**
 * Static services + prices listing. Each active service shows its price,
 * includes, excludes, delivery time and billing badge, all read from the DB.
 */
export default function ServicesPricingView({ services }: { services: Service[] }) {
  return (
    <section className="site-wrap pb-[clamp(56px,8vw,120px)]">
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="flex flex-col rounded-[28px] border border-line bg-graphite p-6 sm:p-8">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">{service.name}</h2>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
            <div className="mt-5">
              <ServiceCardFacts service={service} />
            </div>
            <Link
              href={`/calculator?pick=${service.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[15px] font-semibold text-ivory transition-colors hover:border-lime hover:text-lime"
            >
              Build this in the calculator <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
