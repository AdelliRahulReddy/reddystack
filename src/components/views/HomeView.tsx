import type { AppSettings, Bundle, Faq, Service } from '@/types/database';
import type { WorkGroups } from '@/lib/works';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import FaqBlock from '@/components/blocks/Faq';
import SectionHead from '@/components/blocks/SectionHead';
import HomeHero from '@/components/home/HomeHero';
import ProcessSteps from '@/components/home/ProcessSteps';
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

/**
 * Homepage: the outcome and the journey first, then the plan (with the promise,
 * shown once), single services, work, steps, and the enquiry form. Each section
 * has its own action; questions fold into the close until real answers exist.
 */
export default function HomeView({ bundle, services, works, faqs, settings }: Props) {
  const whatsapp = (message: string) => buildWhatsAppLink(settings.whatsapp_number, message);

  return (
    <>
      <HomeHero />

      {bundle && <OfferSection bundle={bundle} />}

      <section aria-labelledby="prices-title" className="section bg-surface">
        <div className="site-wrap grid gap-[clamp(24px,4vw,64px)] min-[961px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <div>
            <h2 id="prices-title" className="text-h2">Need just one thing?</h2>
            <p className="mt-4 max-w-[38ch] text-muted">Every service has a public price, one-time or monthly.</p>
            <div className="mt-8"><ButtonLink href="/pricing">See all prices</ButtonLink></div>
          </div>
          <PriceList services={services} />
        </div>
      </section>

      <section aria-labelledby="work-title" className="section">
        <div className="site-wrap">
          <SectionHead id="work-title" title="Work we have built" intro="Client work and our own projects, kept apart." />
          <WorkShowcase works={works} />
          <div className="mt-10"><TextLink href="/works">See all work</TextLink></div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section bg-surface">
        <div className="site-wrap">
          <SectionHead id="steps-title" title="What happens after you enquire" intro="Written updates, no daily calls." />
          <ProcessSteps advancePercent={settings.advance_percent} />
          <div className="mt-10"><TextLink href="/process">How a project runs</TextLink></div>
        </div>
      </section>

      {faqs.length > 0 && (
        <FaqBlock
          items={faqs.slice(0, 6).map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
          id="home-faq"
        />
      )}

      <section aria-labelledby="home-enquiry" className="section">
        <div className="site-wrap grid gap-10 min-[961px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 id="home-enquiry" className="text-h2">Tell us what you want more of.</h2>
            <p className="mt-4 max-w-[40ch] text-muted">Share your business. Rahul replies with what fits and what it costs.</p>
            <p className="mt-6 text-muted">
              {faqs.length === 0 ? 'Have a question first? ' : 'Prefer to talk? '}
              <TextLink href={whatsapp('Hi, I have a question about ReddyStack.')} external>Ask on WhatsApp</TextLink>
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
