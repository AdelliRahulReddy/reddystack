import Link from 'next/link';

import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import ServiceCard from '@/components/blocks/ServiceCard';
import { intentLandingPages } from '@/data/IntentLandingPagesData';
import { primaryServices, primaryServiceSlugs, serviceDetailData } from '@/data/ServiceDetailData';

/** Every service page and common request page, in one place, so none is reachable only by guessing. */
export default function ServicesIndexView() {
  const extended = serviceDetailData.filter((s) => !primaryServiceSlugs.includes(s.slug));

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'All service pages' }]}
        title="Every service, explained."
        intro="Each page says what the work is, what is included, and how it runs. For prices, see the pricing page."
        actions={
          <>
            <ButtonLink href="/pricing">See prices</ButtonLink>
            <TextLink href="/contact?source=/service">Not sure what you need? Ask us</TextLink>
          </>
        }
      />

      <section aria-labelledby="core-title" className="section pt-0">
        <div className="site-wrap">
          <SectionHead id="core-title" title="Getting more customers" intro="Pages, ads, ad images and getting found on Google." />
          <div className="grid gap-4 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-3">
            {primaryServices.map((s) => (
              <ServiceCard key={s.slug} href={s.path} kicker={s.subtitle} title={s.title} body={s.introPrimary} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="ext-title" className="section bg-surface">
        <div className="site-wrap">
          <SectionHead id="ext-title" title="When you need software" intro="Apps, first versions of a product, and automations." />
          <div className="grid gap-4 min-[961px]:grid-cols-3">
            {extended.map((s) => (
              <ServiceCard key={s.slug} href={s.path} kicker={s.subtitle} title={s.title} body={s.introPrimary} className="bg-ground hover:bg-surface-2" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="needs-title" className="section">
        <div className="site-wrap">
          <SectionHead id="needs-title" title="Common requests" intro="Answers to the questions people ask most often before they enquire." />
          <ul className="grid gap-2 min-[861px]:grid-cols-2">
            {intentLandingPages.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="block rounded-[var(--radius-card)] bg-surface px-5 py-4 font-semibold text-text transition-colors hover:bg-surface-2 hover:text-action">
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryStep href="/contact?source=/service" />
    </>
  );
}
