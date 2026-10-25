import type { AppSettings, Bundle, Faq, Service } from '@/types/database';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import FaqBlock from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import OfferSection from '@/components/offer/OfferSection';
import ServicesPricingView from './ServicesPricingView';

type Props = {
  bundle: Bundle | null;
  services: Service[];
  faqs: Faq[];
  settings: AppSettings;
};

/** Pricing: the lead offer first, then every service with its public price. */
export default function PricingView({ bundle, services, faqs, settings }: Props) {
  return (
    <>
      <PageHero
        title="Prices, in plain rupees."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Pricing' }]}
        intro={
          <>
            Every price is public. One-time and monthly are always labelled, and ad spend is always separate —{' '}
            <strong>paid directly to Meta, not to us</strong>.
          </>
        }
        actions={
          <>
            <ButtonLink href="/calculator">Work out my price</ButtonLink>
            <TextLink href="#offer">See the main offer</TextLink>
          </>
        }
      />

      {bundle && <OfferSection bundle={bundle} />}

      <section aria-labelledby="pricing-services" className="section bg-surface">
        <div className="site-wrap">
          <SectionHead
            id="pricing-services"
            title="Every service, priced"
            intro="Each one shows what is included, what is not, and how long it takes. Tick any of them in the calculator to add them up."
          />
        </div>
        <ServicesPricingView services={services} />
      </section>

      <FaqBlock
        items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
        title="Questions about prices"
        id="pricing-faq"
        whatsappHref={buildWhatsAppLink(settings.whatsapp_number, 'Hi, I have a question about your prices.')}
      />
      <EnquiryStep href="/contact?source=/pricing" />
    </>
  );
}
