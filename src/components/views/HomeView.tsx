import type { AppSettings, Bundle, Faq, Service } from '@/types/database';
import type { WorkGroups } from '@/lib/works';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import FaqBlock from '@/components/blocks/Faq';
import SectionHead from '@/components/blocks/SectionHead';
import EnquiryJourney from '@/components/explain/EnquiryJourney';
import HomeHero from '@/components/home/HomeHero';
import ProcessSteps from '@/components/home/ProcessSteps';
import GuaranteeStatement from '@/components/offer/GuaranteeStatement';
import OfferSection from '@/components/offer/OfferSection';
import PriceList from '@/components/offer/PriceList';
import WorkShowcase from '@/components/work/WorkShowcase';
import HomeEnquiryForm from './HomeEnquiryForm';

type Props = {
  bundle: Bundle | null;
  services: Service[];
  works: WorkGroups;
  faqs: Faq[];
  settings: AppSettings;
};

/** Homepage, in the order DESIGN.md sets: offer first, then services, work, promise, questions, enquiry. */
export default function HomeView({ bundle, services, works, faqs, settings }: Props) {
  const quoteHref = bundle ? `/calculator?pick=${bundle.slug}` : '/calculator';
  const whatsapp = (message: string) => buildWhatsAppLink(settings.whatsapp_number, message);

  return (
    <>
      <HomeHero bundle={bundle} guarantee={bundle?.guarantee_text || settings.guarantee_text} />

      <section aria-labelledby="journey-title" className="section bg-surface">
        <div className="site-wrap">
          <SectionHead id="journey-title" title="How you get more enquiries" intro="Your customers already use WhatsApp, calls, Instagram and forms. We put one clear route between your ad and your phone." />
          <EnquiryJourney />
          <div className="mt-10"><ButtonLink href={quoteHref}>Get customer enquiries</ButtonLink></div>
        </div>
      </section>

      {bundle && <OfferSection bundle={bundle} />}

      <GuaranteeStatement text={settings.guarantee_text} href={quoteHref} />

      <section aria-labelledby="prices-title" className="section">
        <div className="site-wrap grid gap-[clamp(24px,4vw,64px)] min-[961px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <div>
            <h2 id="prices-title" className="text-h2">Need just one thing?</h2>
            <p className="mt-4 max-w-[40ch] text-muted">Every service has a public price. One-time and monthly are always labelled, and ad spend is always paid directly to Meta.</p>
            <div className="mt-8"><ButtonLink href="/pricing">See all prices</ButtonLink></div>
          </div>
          <PriceList services={services} />
        </div>
      </section>

      <section aria-labelledby="work-title" className="section">
        <div className="site-wrap">
          <SectionHead id="work-title" title="Work we have built" intro="Client work and our own projects are kept apart. A demo is never shown as a client result." />
          <WorkShowcase works={works} />
          <div className="mt-10"><TextLink href="/works">See all work</TextLink></div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section">
        <div className="site-wrap">
          <SectionHead id="steps-title" title="What happens after you enquire" intro="Written updates, no daily calls needed. You always know what is done and what comes next." />
          <ProcessSteps advancePercent={settings.advance_percent} />
          <div className="mt-10"><TextLink href="/process">How a project runs</TextLink></div>
        </div>
      </section>

      <FaqBlock
        items={faqs.slice(0, 6).map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
        id="home-faq"
        whatsappHref={whatsapp('Hi, I have a question about ReddyStack.')}
      />

      <section aria-labelledby="home-enquiry" className="section">
        <div className="site-wrap grid gap-10 min-[961px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 id="home-enquiry" className="text-h2">Tell us what you want more of.</h2>
            <p className="mt-4 max-w-[42ch] text-muted">
              WhatsApp chats, calls, Instagram messages or form fills. Share your business and Rahul will reply with what fits and what it costs.
            </p>
            <p className="mt-6 text-muted">
              Prefer to talk? <TextLink href={whatsapp('Hi, I want more enquiries for my business.')} external>Chat on WhatsApp</TextLink>
            </p>
          </div>
          <div className="rounded-[var(--radius-panel)] shadow-card bg-surface p-6 sm:p-8">
            <HomeEnquiryForm whatsappNumber={settings.whatsapp_number} />
          </div>
        </div>
      </section>
    </>
  );
}
