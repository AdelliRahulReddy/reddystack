import Image from 'next/image';

import ContactForm from '@/components/contact/ContactForm';
import PageHero from '@/components/blocks/PageHero';
import { TextLink } from '@/components/blocks/ButtonLink';
import type { EnquiryChoice } from '@/lib/enquiryChoices';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { AppSettings } from '@/types/database';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';

const include = [
  'Your business and city',
  'Your website, Instagram or Google profile link',
  'What you want more of: WhatsApp chats, calls, messages or form fills',
  'What you have already tried',
  'Any budget or deadline',
];

const next = [
  { t: 'Rahul reads it', d: 'The person who replies is the person who does the work.' },
  { t: 'A reply on WhatsApp or a call', d: 'To understand your business and how your customers like to get in touch.' },
  { t: 'A clear plan and price', d: 'The main offer, one service from the price list, or an honest "not yet".' },
];

type Props = { choices: EnquiryChoice[]; settings: AppSettings; initialService: string; sourcePage: string };

/** Contact: the enquiry form, with WhatsApp, phone and email as direct alternatives. */
export default function ContactView({ choices, settings, initialService, sourcePage }: Props) {
  const whatsapp = buildWhatsAppLink(settings.whatsapp_number, 'Hi, I want more enquiries for my business.');
  const phone = `+${settings.whatsapp_number}`;

  return (
    <>
      <PageHero
        title="Tell us what you want more of."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
        intro={<>Fill the short form, or message Rahul on WhatsApp. An enquiry does not start paid work.</>}
      />
      <section className="section pt-0">
        <div className="site-wrap grid gap-[clamp(28px,4vw,56px)] min-[1025px]:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
          <div className="rounded-[var(--radius-panel)] shadow-card bg-surface p-[clamp(22px,3.4vw,44px)]">
            <ContactForm choices={choices} initialService={initialService} sourcePage={sourcePage} whatsappNumber={settings.whatsapp_number} />
          </div>

          <aside className="grid content-start gap-4" aria-label="Other ways to reach Rahul">
            <div className="rounded-[var(--radius-card)] shadow-card bg-surface p-6">
              <div className="flex items-center gap-4">
                <Image src={portrait} alt="Rahul Reddy Adelli" sizes="64px" className="size-16 rounded-full object-cover object-[center_25%]" />
                <div>
                  <p className="font-semibold text-text">Rahul Reddy</p>
                  <p className="text-small text-muted">Hyderabad, working across India</p>
                </div>
              </div>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-surface-2 px-5 font-semibold text-text hover:bg-charcoal">
                Chat on WhatsApp
              </a>
              <p className="mt-4 grid gap-1 text-[15px]">
                <TextLink href={`tel:${phone}`}>Call {phone}</TextLink>
                <TextLink href={`mailto:${settings.email}`} className="break-all">{settings.email}</TextLink>
              </p>
            </div>

            <div className="rounded-[var(--radius-card)] shadow-card bg-surface p-6">
              <h2 className="text-h3 font-semibold">Worth including</h2>
              <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-[15px] text-muted marker:text-action-text">
                {include.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <p className="mt-3 text-small text-muted">You do not need to know which service you need first.</p>
            </div>

            <div className="rounded-[var(--radius-card)] shadow-card bg-surface p-6">
              <h2 className="text-h3 font-semibold">What happens next</h2>
              <ol className="mt-3 grid gap-3">
                {next.map((n, i) => (
                  <li key={n.t} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="font-display text-[20px] font-semibold text-action-text">{i + 1}</span>
                    <span><span className="block font-semibold text-text">{n.t}</span><span className="text-[15px] text-muted">{n.d}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
