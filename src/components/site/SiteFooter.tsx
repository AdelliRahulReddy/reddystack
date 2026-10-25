'use client';

import Link from 'next/link';

import { markets } from '@/data/MarketConfig';
import { useSettings } from '@/lib/useSettings';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { saveMarketChoice } from '@/utils/marketPreference';
import { BrandSymbol } from './BrandSymbol';
import CurrentYear from './CurrentYear';
import { legalNav, moreNav, primaryNav } from './navigation';

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-small font-sans font-medium tracking-normal text-muted">{title}</h2>
      <ul className="mt-3 grid gap-2 text-[15px] [&_a]:text-text/85 [&_a]:transition-colors [&_a:hover]:text-action">{children}</ul>
    </div>
  );
}

/** One footer for every public page: contact first, then every page group, including the country pages. */
export default function SiteFooter() {
  const settings = useSettings();
  const phone = `+${settings.whatsapp_number}`;

  return (
    <footer className="bg-surface">
      <div className="site-wrap grid gap-12 py-16 min-[900px]:grid-cols-[1.3fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 font-display text-[22px] font-semibold tracking-[-0.03em] text-text">
            <BrandSymbol className="size-8" />ReddyStack
          </Link>
          <p className="mt-4 max-w-[36ch] text-muted">
            More customer enquiries for Indian businesses: a page, Facebook &amp; Instagram ads, and every enquiry tracked. Run by Rahul Reddy from Hyderabad.
          </p>
          <ul className="mt-6 grid gap-1.5 text-[15px]">
            <li><a href={buildWhatsAppLink(settings.whatsapp_number, 'Hi, I want more enquiries for my business.')} target="_blank" rel="noreferrer" className="font-semibold text-action hover:underline">Chat on WhatsApp</a></li>
            <li><a href={`tel:${phone}`} className="text-text/85 hover:text-action">Call {phone}</a></li>
            <li><a href={`mailto:${settings.email}`} className="break-all text-text/85 hover:text-action">{settings.email}</a></li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-10 min-[640px]:grid-cols-4">
          <Column title="Website">
            {primaryNav.map((l) => <li key={l.href}><Link href={l.href}>{l.title}</Link></li>)}
          </Column>
          <Column title="More">
            {moreNav.map((l) => <li key={l.href}><Link href={l.href}>{l.title}</Link></li>)}
          </Column>
          <Column title="Countries">
            <li><Link href="/" onClick={() => saveMarketChoice('global')}>Global</Link></li>
            {markets.map((m) => <li key={m.code}><Link href={m.href} onClick={() => saveMarketChoice(m.code)}>{m.name}</Link></li>)}
          </Column>
          <Column title="Policies">
            {legalNav.map((l) => <li key={l.href}><Link href={l.href}>{l.title}</Link></li>)}
          </Column>
        </div>
      </div>
      <div className="site-wrap flex flex-wrap justify-between gap-3 pb-10 text-small text-muted">
        <p>© <CurrentYear /> ReddyStack. Prices in Indian rupees. Ad spend is paid directly to Meta.</p>
        <p>Hyderabad, India</p>
      </div>
    </footer>
  );
}
