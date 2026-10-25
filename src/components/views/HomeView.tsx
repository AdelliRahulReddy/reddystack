import Link from 'next/link';

import type { AppSettings, Bundle, Faq, Service, Work } from '@/types/database';
import { formatInr } from '@/lib/money';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { WorkGroups } from '@/lib/works';
import type { HeroContent } from '@/lib/siteContent';
import Eyebrow from '@/components/blocks/Eyebrow';
import FaqBlock from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import WorkImage from '@/components/blocks/WorkImage';
import SectionHead from '@/components/blocks/SectionHead';
import ServiceCardFacts from '@/components/blocks/ServiceCardFacts';
import SprintBox from '@/components/blocks/SprintBox';
import { Badge } from '@/components/ui/badge';
import { Button, ButtonArrow } from '@/components/ui/button';
import HomeEnquiryForm from './HomeEnquiryForm';

type Props = {
  hero: HeroContent;
  positioning: HeroContent;
  bundle: Bundle | null;
  services: Service[];
  works: WorkGroups;
  faqs: Faq[];
  settings: AppSettings;
};

const whatsappLink = (settings: AppSettings, message = '') => buildWhatsAppLink(settings.whatsapp_number, message);

export default function HomeView({ hero, positioning, bundle, services, works, faqs, settings }: Props) {
  return (
    <>
      {/* ---------- hero ---------- */}
      <PageHero
        eyebrow={positioning.title}
        title={hero.title}
        className="max-[640px]:pt-[104px] max-[640px]:pb-10"
        intro={
          <>
            {positioning.body}
            {bundle && (
              <span className="mt-4 block text-ivory">
                <strong>{bundle.name}: {formatInr(bundle.fixed_price)} one-time.</strong>{' '}
                <span className="text-muted-foreground">Ad spend is extra, paid directly to Meta.</span>
              </span>
            )}
          </>
        }
        actions={
          <>
            <Button asChild size="lg">
              <Link href={bundle ? `/calculator?pick=${bundle.slug}` : '/calculator'}>Get my quote <ButtonArrow /></Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={whatsappLink(settings, 'Hi, I want more enquiries for my business.')} target="_blank" rel="noreferrer">WhatsApp us</a>
            </Button>
          </>
        }
      />

      {/* ---------- sprint box ---------- */}
      {bundle && <SprintBox bundle={bundle} settings={settings} />}

      {/* ---------- services preview ---------- */}
      <section aria-labelledby="home-services" className="pb-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <SectionHead id="home-services" label="Services" title="Everything, with a public price." intro="One-time vs monthly is always labelled, and ad spend stays separate — paid directly to Meta, not to us." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="flex flex-col rounded-[28px] border border-line bg-graphite p-6 sm:p-7">
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em]">{service.name}</h3>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
                <div className="mt-5">
                  <ServiceCardFacts service={service} />
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild><Link href="/services">All services &amp; prices <ButtonArrow /></Link></Button>
            <Button asChild variant="ghost"><Link href="/calculator">Build a quote</Link></Button>
          </div>
        </div>
      </section>

      {/* ---------- works preview ---------- */}
      <section aria-labelledby="home-work" className="pb-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <SectionHead id="home-work" label="Work" title="Built, and labelled honestly." intro="Client work and portfolio are kept separate. A demo is never presented as a client result." />
          {(['client', 'portfolio'] as const).map((type) => {
            const list = works[type];
            if (list.length === 0) return null;
            return (
              <div key={type} className="mt-8 first:mt-0">
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-display text-[18px] font-semibold tracking-[-0.02em]">
                    {type === 'client' ? 'Client work' : 'Portfolio'}
                  </h3>
                  <Badge variant={type === 'client' ? 'default' : 'secondary'}>
                    {type === 'client' ? 'Real businesses' : 'Our own projects'}
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((work) => <WorkCard key={work.id} work={work} />)}
                </div>
              </div>
            );
          })}
          <div className="mt-8">
            <Button asChild variant="ghost"><Link href="/works">All work <ButtonArrow /></Link></Button>
          </div>
        </div>
      </section>

      {/* ---------- guarantee ---------- */}
      <section aria-labelledby="home-guarantee" className="pb-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <div className="rounded-[40px] border border-violet-soft/30 bg-violet/15 p-[clamp(24px,4vw,56px)]">
            <Eyebrow>The guarantee</Eyebrow>
            <h2 id="home-guarantee" className="mt-4 max-w-[24ch] text-[clamp(28px,3.6vw,48px)]">{settings.guarantee_text}</h2>
            <p className="mt-5 text-[15px] text-muted-foreground">
              Advertising spend and third-party costs stay separate, and your accounts stay in your name.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- faq preview ---------- */}
      <FaqBlock
        items={faqs.slice(0, 6).map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
        label="Questions"
        title="Before you get in touch."
        id="home-faq"
        whatsappHref={whatsappLink(settings, 'Hi, I have a question about ReddyStack.')}
      />

      {/* ---------- enquiry ---------- */}
      <section aria-labelledby="home-enquiry" className="pb-[clamp(48px,7vw,96px)]">
        <div className="site-wrap grid gap-8 min-[961px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Eyebrow>Start here</Eyebrow>
            <h2 id="home-enquiry" className="mt-4 text-[clamp(32px,4vw,56px)]">Tell us what you want more of.</h2>
            <p className="mt-4 max-w-[40ch] text-muted-foreground">
              WhatsApp chats, calls, Instagram DMs, or form fills — whichever door your customers use. Share your
              business and we&apos;ll tell you what fits.
            </p>
            <p className="mt-6 font-mono text-[14px] text-muted-foreground">
              WhatsApp: <a href={whatsappLink(settings, 'Hi, I want more enquiries for my business.')} target="_blank" rel="noreferrer" className="text-ivory hover:text-lime">+{settings.whatsapp_number}</a>
            </p>
          </div>
          <div className="rounded-[28px] border border-line bg-raised p-6 sm:p-8">
            <HomeEnquiryForm whatsappNumber={settings.whatsapp_number} />
          </div>
        </div>
      </section>
    </>
  );
}

function WorkCard({ work }: { work: Work }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-line bg-graphite p-6 sm:p-8">
      <WorkImage work={work} />
      <h3 className="font-display text-[18px] font-semibold tracking-[-0.02em]">{work.title}</h3>
      {work.client_name && <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-faint">{work.client_name}</p>}
      {work.description && <p className="mt-3 text-[14.5px] text-muted-foreground">{work.description}</p>}
      {work.link && (
        <a href={work.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-medium text-lime underline underline-offset-4 hover:text-ivory">
          See it <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}
