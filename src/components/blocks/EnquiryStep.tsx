'use client';

import { useSettings } from '@/lib/useSettings';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ButtonLink, TextLink } from './ButtonLink';

type Props = {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
  id?: string;
};

/** The step every page ends on: one plain line, one button to enquire, WhatsApp as the quiet alternative. */
export default function EnquiryStep({
  title = 'Tell us what you want more of.',
  body = 'WhatsApp chats, calls, Instagram messages or form fills. Share your business and get a clear plan with a fixed price.',
  href = '/contact',
  label = 'Get customer enquiries',
  id = 'enquiry-step',
}: Props) {
  const settings = useSettings();
  return (
    <section aria-labelledby={id} className="bg-surface">
      <div className="site-wrap grid items-end gap-8 py-[clamp(56px,7vw,104px)] min-[900px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <h2 id={id} className="max-w-[18ch] text-h2">{title}</h2>
          <p className="mt-4 max-w-[52ch] text-muted">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 min-[900px]:justify-end">
          <ButtonLink href={href}>{label}</ButtonLink>
          <TextLink href={buildWhatsAppLink(settings.whatsapp_number, 'Hi, I want more enquiries for my business.')} external>
            Or chat on WhatsApp
          </TextLink>
        </div>
      </div>
    </section>
  );
}
