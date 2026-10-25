import Link from 'next/link';

import type { AppSettings, Bundle, Faq, Service } from '@/types/database';
import FaqBlock from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import SprintBox from '@/components/blocks/SprintBox';
import { Button, ButtonArrow } from '@/components/ui/button';
import ServicesPricingView from './ServicesPricingView';

type Props = {
  bundle: Bundle | null;
  services: Service[];
  faqs: Faq[];
  settings: AppSettings;
};

/** India pricing: the lead offer (Sprint), then every service with its public price. */
export default function PricingView({ bundle, services, faqs, settings }: Props) {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plain prices, no surprises."
        accent="no surprises."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Pricing' }]}
        intro={
          <>
            One-time vs monthly is always labelled, and ad spend stays separate —{' '}
            <strong>paid directly to Meta, not to us</strong>.
          </>
        }
        actions={
          <>
            <Button asChild size="lg"><Link href="/calculator">Build your quote <ButtonArrow /></Link></Button>
          </>
        }
      />

      {bundle && <SprintBox bundle={bundle} settings={settings} />}

      <section aria-labelledby="pricing-services" className="pb-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <SectionHead
            id="pricing-services"
            label="Services"
            title="Everything you can add, priced."
            intro="Each service shows what is included and excluded, and how long it takes."
          />
        </div>
      </section>
      <ServicesPricingView services={services} />

      {faqs.length > 0 && (
        <FaqBlock
          items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
          label="Pricing questions"
          title="Before you start."
          id="pricing-faq"
        />
      )}
    </>
  );
}
