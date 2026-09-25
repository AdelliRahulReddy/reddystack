import Image from 'next/image';
import Link from 'next/link';

import ContactForm from '@/components/contact/ContactForm';
import { BrandSymbol } from '@/components/site/BrandSymbol';
import { siteConfig } from '@/data/siteConfig';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';

const include = [
  'The business problem, in your words',
  'Your website or product link',
  'The outcome you want',
  'What has already been tried',
  'Any budget or deadline boundary',
];

const next = [
  { t: 'Rahul reads it', d: 'The person who replies is the person who would do the work.' },
  { t: 'A short call, if useful', d: 'To understand the goal and look at your current setup.' },
  { t: 'A written recommendation', d: 'Proof Sprint, Stack Build, ongoing improvement, or no engagement yet.' },
];

export default function ContactView({ initialService, sourcePage }: { initialService: string; sourcePage: string }) {
  return (
    <section className="relative overflow-hidden pb-[clamp(56px,8vw,112px)] pt-[clamp(128px,17vh,176px)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(247_244_235/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(247_244_235/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(50%_60%_at_20%_10%,#000,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] top-[20%] h-[70%] w-[55%] bg-[radial-gradient(closest-side,rgb(118_84_232/0.28),transparent_70%)] blur-[10px]" />
      <div className="site-wrap relative">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex gap-2 font-mono text-xs uppercase tracking-[0.1em] text-faint">
            <li><Link href="/" className="hover:text-ivory">Home</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page" className="text-muted-foreground">Contact</li>
          </ol>
        </nav>

        <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-2 pr-3 font-sans text-[13px] normal-case tracking-normal">
          <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-lime" />Start here
        </p>
        <h1 className="mt-6 text-[clamp(44px,7vw,108px)] leading-[0.98]">
          Bring one{' '}
          <span aria-hidden="true" className="relative inline-block h-[0.78em] w-[1.7em] -translate-y-[0.04em] overflow-hidden rounded-full border border-line-strong align-baseline">
            <Image src={portrait} alt="" fill priority sizes="200px" className="object-cover object-[center_30%]" />
          </span>
          <br />
          <em className="not-italic text-lime">growth problem.</em>
        </h1>

        <div className="mt-[clamp(40px,6vw,80px)] grid gap-[clamp(28px,4vw,56px)] min-[1025px]:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
          <div className="rounded-[32px] border border-line bg-raised/70 p-[clamp(22px,3.4vw,48px)] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)] backdrop-blur">
            <ContactForm initialService={initialService} sourcePage={sourcePage} />
          </div>

          <aside className="grid content-start gap-4" aria-label="Other ways to reach Rahul">
            <div className="rounded-[28px] border border-line bg-graphite p-6">
              <p className="eyebrow">Direct</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-3 block break-all font-display text-[22px] font-semibold tracking-[-0.02em] transition-colors hover:text-lime">{siteConfig.email}</a>
              <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="group/btn mt-4 inline-flex items-center gap-2 font-medium text-lime">
                Chat on WhatsApp <span aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5">→</span>
              </a>
              <p className="mt-1 font-mono text-[13px] text-faint">{siteConfig.phoneDisplay}</p>
            </div>

            <div className="rounded-[28px] border border-line bg-graphite p-6">
              <p className="eyebrow">Worth including</p>
              <ul className="mt-4 grid gap-2.5 text-[15px]">
                {include.map((i) => (
                  <li key={i} className="flex gap-2.5"><span aria-hidden="true" className="mt-[0.6em] size-1.5 flex-none rotate-45 rounded-[2px] bg-violet-soft" />{i}</li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-muted-foreground">You do not need to diagnose the channel first.</p>
            </div>

            <div className="rounded-[28px] border border-line bg-graphite p-6">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-4 grid gap-4">
                {next.map((n, i) => (
                  <li key={n.t} className="grid grid-cols-[auto_1fr] gap-3.5">
                    <span className="grid size-8 place-items-center rounded-full border border-line-strong font-mono text-xs text-lime">{i + 1}</span>
                    <span><strong className="block font-display text-[17px] font-semibold tracking-[-0.01em]">{n.t}</strong><span className="text-[14.5px] text-muted-foreground">{n.d}</span></span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-3 px-2 pt-2 text-[13.5px] text-faint">
              <BrandSymbol className="size-6 flex-none" />
              <span>Remote from Hyderabad, working with US &amp; UK teams. <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-ivory">Privacy</Link></span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
