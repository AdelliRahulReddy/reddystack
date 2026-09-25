'use client';

import Link from 'next/link';

import { markets } from '@/data/MarketConfig';
import { siteConfig } from '@/data/siteConfig';
import { saveMarketChoice } from '@/utils/marketPreference';
import { BrandSymbol } from './BrandSymbol';
import { legalNav, primaryNav } from './navigation';

const wordmarkColors = ['#7654E8', '#D2ED7A', '#FF765E'];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-faint">{title}</h2>
      <ul className="grid gap-2 text-[15.5px] [&_a]:text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-ivory">{children}</ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden pb-8 pt-[72px]">
      <div className="site-wrap">
        <div className="grid grid-cols-2 gap-8 pb-14 min-[861px]:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="col-span-2 min-[861px]:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-0.03em] text-ivory">
              <BrandSymbol className="size-7" />ReddyStack
            </Link>
            <p className="mt-3.5 max-w-[34ch] text-[15.5px] text-muted-foreground">
              A founder-led growth studio connecting web, search, ads, creative, tracking and automation.
            </p>
            <p className="mt-5 grid gap-1 font-mono text-[13px] text-muted-foreground">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ivory">{siteConfig.email}</a>
              <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ivory">WhatsApp {siteConfig.phoneDisplay}</a>
            </p>
          </div>
          <Column title="Studio">
            {primaryNav.map((l) => <li key={l.href}><Link href={l.href}>{l.title}</Link></li>)}
            <li><Link href="/contact">Contact</Link></li>
          </Column>
          <Column title="Markets">
            <li><Link href="/" onClick={() => saveMarketChoice('global')}>Global</Link></li>
            {markets.map((m) => <li key={m.code}><Link href={m.href} onClick={() => saveMarketChoice(m.code)}>{m.name}</Link></li>)}
          </Column>
          <Column title="Elsewhere">
            <li><a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={siteConfig.socialLinks.x} target="_blank" rel="noreferrer">X</a></li>
            <li><a href={siteConfig.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a></li>
          </Column>
        </div>

        <div
          aria-hidden="true"
          data-split
          className="-ml-[0.04em] flex select-none whitespace-nowrap pb-[0.16em] font-display text-[min(14.2vw,222px)] font-semibold leading-[0.9] tracking-[-0.06em]"
        >
          {'ReddyStack'.split('').map((c, i) => (
            <span
              key={i}
              className="split-w group/ch pt-[0.14em] [transition:translate_.5s_var(--ease-studio)] hover:-translate-y-[12%]"
              style={{ ['--i' as string]: i }}
            >
              <span
                style={{ ['--c' as string]: wordmarkColors[i % 3] }}
                className="text-transparent [-webkit-text-stroke:1px_rgb(247_244_235/0.2)] [transition:transform_1s_var(--ease-expo)_calc(var(--i)*.05s),color_.3s,-webkit-text-stroke-color_.3s] group-hover/ch:text-(--c) group-hover/ch:[-webkit-text-stroke-color:var(--c)]"
              >
                {c}
              </span>
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-[22px] text-[13.5px] text-faint">
          <span>© {new Date().getFullYear()} ReddyStack · {siteConfig.ownerName} · Hyderabad, India</span>
          <nav aria-label="Legal" className="flex gap-3">
            {legalNav.map((l) => <Link key={l.href} href={l.href} className="hover:text-ivory">{l.title}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
