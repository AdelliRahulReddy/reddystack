import Image from 'next/image';

import portrait from '@/assets/img/hero/ab-hero-1.jpg';
import { homeFaqItems } from '@/data/HomeFaqData';
import type { Market } from '@/data/MarketConfig';
import type { MarketPageData } from '@/data/MarketPageData';
import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import Faq from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import EnquiryJourney from '@/components/explain/EnquiryJourney';
import ProcessSteps from '@/components/home/ProcessSteps';

/**
 * Country page: its own market headline and market notes, presented in the
 * same system as every other page (same menu, sections, actions and close).
 * Static, so it loads without waiting on the database.
 */
export default function MarketView({ market, page }: { market: Market; page: MarketPageData }) {
  const contactHref = `/contact?source=${market.href}`;
  const title = `${page.hero.title_before}${page.hero.title_accent}${page.hero.title_after}`;

  return (
    <>
      <PageHero
        size="lg"
        title={title}
        crumbs={[{ name: 'Home', href: '/' }, { name: market.name }]}
        intro={page.hero.sm_info}
        actions={
          <>
            <ButtonLink href={contactHref}>Get customer enquiries</ButtonLink>
            <TextLink href="#how">See how it works</TextLink>
          </>
        }
        meta={page.hero.trust_points.join('. ') + '.'}
      />

      <section aria-labelledby="market-focus" className="section bg-surface">
        <div className="site-wrap">
          <SectionHead id="market-focus" title={page.focus.title} intro={page.focus.intro} />
          <ul className="grid gap-4 min-[860px]:grid-cols-3">
            {page.focus.items.map((item) => (
              <li key={item.title} className="rounded-[var(--radius-card)] bg-ground p-6">
                <h3 className="text-h3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10"><ButtonLink href={contactHref}>Get customer enquiries</ButtonLink></div>
        </div>
      </section>

      <section id="how" aria-labelledby="market-how" className="section scroll-mt-[calc(var(--header-h)+8px)]">
        <div className="site-wrap">
          <SectionHead id="market-how" title="How you get more enquiries" intro="One clear route from your ad to your phone, whichever way your customers like to get in touch." />
          <EnquiryJourney />
        </div>
      </section>

      <section aria-labelledby="market-steps" className="section pt-0">
        <div className="site-wrap">
          <SectionHead id="market-steps" title="What happens after you enquire" intro="Written updates, no daily calls needed. The work and the price are agreed before anything starts." />
          <ProcessSteps />
          <div className="mt-10"><TextLink href="/pricing">See prices for Indian businesses (in rupees)</TextLink></div>
        </div>
      </section>

      <section aria-labelledby="market-founder" className="section bg-surface">
        <div className="site-wrap grid items-center gap-10 min-[860px]:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)]">
          <Image src={portrait} alt="Rahul Reddy Adelli, founder of ReddyStack" sizes="(max-width: 860px) 90vw, 380px" className="aspect-[5/6] w-full max-w-[380px] rounded-[var(--radius-panel)] object-cover object-[center_25%]" />
          <div>
            <h2 id="market-founder" className="text-h2">You talk to the person who does the work.</h2>
            <p className="mt-4 max-w-[52ch] text-muted">
              Rahul Reddy runs ReddyStack from Hyderabad, India. No account managers: the person who quotes the work is
              the person who builds it. Your accounts, data and pages stay in your name.
            </p>
            <div className="mt-8"><TextLink href="/about">More about Rahul</TextLink></div>
          </div>
        </div>
      </section>

      <Faq items={homeFaqItems} id="market-faq" />
      <EnquiryStep href={contactHref} id="market-cta" />
    </>
  );
}
