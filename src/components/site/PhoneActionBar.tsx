'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone } from 'lucide-react';

import { useSettings } from '@/lib/useSettings';
import { buildWhatsAppLink } from '@/lib/whatsapp';

/**
 * Phone-only bottom bar: WhatsApp, Call and Get quote, in thumb reach. It takes
 * the floating button's job below 961px so nothing covers page text (SiteChrome
 * adds a matching spacer after the footer). The calculator has its own total bar.
 */
export default function PhoneActionBar() {
  const pathname = usePathname();
  const settings = useSettings();
  if (pathname === '/calculator') return null;

  const cell = 'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-semibold';
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-[95] border-t border-line-strong bg-ground pb-[env(safe-area-inset-bottom,0px)] backdrop-blur min-[961px]:hidden"
    >
      <div className="site-wrap flex gap-2 py-2.5">
        <a
          href={buildWhatsAppLink(settings.whatsapp_number, 'Hi, I want more enquiries for my business.')}
          target="_blank"
          rel="noreferrer"
          className={`${cell} bg-lime text-lime-ink`}
        >
          <MessageCircle aria-hidden="true" className="size-[18px]" /> WhatsApp
        </a>
        <a href={`tel:+${settings.whatsapp_number}`} className={`${cell} border border-line-strong text-ivory`}>
          <Phone aria-hidden="true" className="size-[18px]" /> Call
        </a>
        <Link href="/calculator" className={`${cell} border border-line-strong text-ivory`}>
          Get quote
        </Link>
      </div>
    </nav>
  );
}
