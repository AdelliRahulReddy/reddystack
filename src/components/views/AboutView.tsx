import Image from 'next/image';
import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import SectionHead from '@/components/blocks/SectionHead';
import ScrubText from '@/components/blocks/ScrubText';
import { BrandSymbol } from '@/components/site/BrandSymbol';
import { Button, ButtonArrow } from '@/components/ui/button';
import { siteConfig } from '@/data/siteConfig';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';
import signature from '@/assets/img/brand/rahul-signature-ivory.png';

const capabilityLinks = [
  { title: 'digital foundations', href: '/service/seo-websites' },
  { title: 'search visibility', href: '/service/seo-local-seo' },
  { title: 'paid acquisition', href: '/service/meta-ads' },
  { title: 'automation systems', href: '/service/ai-automations' },
];

const capabilities = ['Growth diagnostics', 'Web & landing pages', 'Search visibility', 'Paid acquisition', 'Creative testing', 'Tracking & analytics', 'AI workflows', 'Product builds'];

const principles = [
  ['Problem before channel', 'The work starts with the commercial problem and current evidence, not a preselected service package.'],
  ['Proof before scale', 'A focused build or test creates evidence before more budget, more channels, or a longer engagement is recommended.'],
  ['Transparent AI use', 'AI can support research and execution. Rahul remains responsible for review, decisions, quality, and communication.'],
  ['Client-owned foundations', "Domains, hosting, advertising accounts, analytics, and core business assets remain under the client's ownership."],
] as const;

const background = [
  ['2022 – 2025', 'Analyst', 'HCLTech · Olin project'],
  ['2025 – Present', 'Senior Analyst', 'HCLTech · Verizon project'],
  ['Apr 2026 – Present', 'Founder', 'ReddyStack'],
] as const;

const structure = [
  { n: '4', label: 'Method stages', detail: 'Diagnose, Build, Prove, Scale' },
  { n: '1', label: 'Connected stack', detail: 'Chosen by the problem' },
  { n: '1', label: 'Accountable lead', detail: 'The person who quotes builds' },
];

export default function AboutView() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden pb-[clamp(48px,7vw,96px)] pt-[clamp(128px,17vh,176px)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(247_244_235/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(247_244_235/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_70%_at_75%_30%,#000,transparent_75%)]" />
        <div className="site-wrap relative grid items-end gap-[clamp(32px,5vw,72px)] min-[961px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex gap-2 font-mono text-xs uppercase tracking-[0.1em] text-faint">
                <li><Link href="/" className="hover:text-ivory">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-muted-foreground">About</li>
              </ol>
            </nav>
            <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-2 pr-3 font-sans text-[13px] normal-case tracking-normal">
              <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-lime" />About ReddyStack
            </p>
            <h1 className="text-[clamp(48px,7.4vw,112px)] leading-[0.98]">
              Built by <br /><em className="not-italic text-lime">Rahul Reddy.</em>
            </h1>
            <p className="mt-7 max-w-[50ch] text-[clamp(17px,1.4vw,19px)] text-muted-foreground">
              An independent, founder-led growth studio operated from Hyderabad. One accountable lead, one defined problem, and evidence before anything is scaled.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/contact?source=/about">Talk to Rahul <ButtonArrow /></Link></Button>
              <Button asChild size="lg" variant="ghost"><Link href="/about/rahul-reddy-adelli">Founder profile <ButtonArrow /></Link></Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative overflow-hidden rounded-[36px] border border-line-strong shadow-[0_50px_90px_-40px_rgb(0_0_0/0.9)]">
              <Image
                src={portrait}
                alt="Rahul Reddy Adelli, founder of ReddyStack"
                priority
                sizes="(max-width: 960px) 92vw, 560px"
                className="aspect-[7/6] w-full object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(20_19_24/0.85))]" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-ivory/85">
                <span>Rahul Reddy Adelli<br /><span className="text-lime">Founder</span></span>
                <span className="text-right">Hyderabad · IN<br />Working with US &amp; UK</span>
              </div>
            </div>
            <div aria-hidden="true" className="absolute -left-6 -top-6 grid size-28 place-items-center rounded-full border border-line-strong bg-ink/80 backdrop-blur max-[560px]:-left-2 max-[560px]:size-20">
              <BrandSymbol className="size-12 motion-safe:animate-[spin_24s_linear_infinite] max-[560px]:size-9" />
            </div>
            <Image
              src={signature}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-8 -right-3 w-[150px] rotate-[-6deg] motion-safe:animate-[sig-wipe_1.6s_.6s_var(--ease-studio)_both]"
            />
          </div>
        </div>
      </section>

      {/* ---------- statement ---------- */}
      <section aria-label="What ReddyStack is" className="py-[clamp(56px,9vw,140px)]">
        <div className="site-wrap">
          <ScrubText className="max-w-[26ch] font-display text-[clamp(30px,4.4vw,64px)] font-semibold leading-[1.12] tracking-[-0.035em]">
            {`I'm Rahul Reddy. I built ReddyStack as a proof-first studio. We begin with one important growth problem, connect only the capabilities it needs, and use evidence to decide what happens next.`}
          </ScrubText>
          <p data-reveal className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground">
            <span>Across</span>
            {capabilityLinks.map((c) => (
              <Link key={c.href} href={c.href} className="rounded-full border border-line px-3.5 py-1.5 text-[15px] text-ivory transition-colors hover:border-lime hover:text-lime">{c.title}</Link>
            ))}
          </p>
        </div>
      </section>

      {/* ---------- founder-led ---------- */}
      <section aria-labelledby="founder-led" className="py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap grid gap-[clamp(32px,5vw,88px)] min-[961px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div className="min-[961px]:sticky min-[961px]:top-[calc(var(--header-h)+24px)] min-[961px]:self-start">
            <Eyebrow>Founder-led, proof-first</Eyebrow>
            <h2 id="founder-led" className="mt-5 text-[clamp(32px,4vw,56px)]">One accountable lead. A defined problem.</h2>
            <p className="mt-6 max-w-[46ch] text-muted-foreground">
              ReddyStack is an independent digital growth studio operated by Rahul Reddy Adelli from Hyderabad. Every engagement has one accountable lead, a defined problem, a connected scope, and an evidence plan.
            </p>
            <div className="mt-7 grid gap-1.5 font-mono text-[13.5px]">
              <a href={`mailto:${siteConfig.email}`} className="text-ivory hover:text-lime">{siteConfig.email}</a>
              <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-ivory hover:text-lime">WhatsApp {siteConfig.phoneDisplay}</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Capabilities">
              {capabilities.map((c, i) => (
                <li
                  key={c}
                  className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-medium ${['bg-lime text-lime-ink', 'bg-coral text-lime-ink', 'bg-violet text-white'][i % 3]}`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-[clamp(40px,5vw,64px)]">
            <div data-reveal>
              <h2 className="text-[clamp(26px,2.8vw,36px)]">How I work</h2>
              <div className="mt-5 grid gap-4 text-[17px] leading-[1.75] text-muted-foreground">
                <p>I start with the offer, customer, commercial goal, current setup, and what has already been tried. The first recommendation may be a page, search fix, campaign test, tracking repair, creative comparison, or workflow, not every capability at once.</p>
                <p>Before work starts, the proposal names deliverables, access, approvals, costs, review points, exclusions, and the evidence that can reasonably be collected. Results are interpreted with their limits; no lead volume, revenue, or ranking is guaranteed.</p>
                <p>Current portfolio items remain clearly marked as personal or demo work. Client outcomes will be published only when the work is real, permission exists, and the measurement supports the claim.</p>
              </div>
            </div>

            <div>
              <h2 className="text-[clamp(26px,2.8vw,36px)]">Operating principles</h2>
              <ol className="mt-6 grid gap-3">
                {principles.map(([title, body], i) => (
                  <li key={title} data-reveal className="grid grid-cols-[auto_1fr] gap-5 rounded-[24px] border border-line bg-graphite p-6">
                    <span className="font-mono text-[13px] text-lime">0{i + 1}</span>
                    <div><h3 className="text-[21px]">{title}</h3><p className="mt-2 text-[15.5px] text-muted-foreground">{body}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-8 min-[641px]:grid-cols-2">
              <div data-reveal>
                <h2 className="text-[clamp(22px,2.2vw,28px)]">Background</h2>
                <ol className="mt-5 grid gap-0 border-l border-line-strong pl-5">
                  {background.map(([time, role, where]) => (
                    <li key={time} className="relative pb-5 last:pb-0">
                      <span aria-hidden="true" className="absolute -left-[25px] top-1.5 size-2.5 rounded-full border border-lime bg-ink" />
                      <span className="font-mono text-xs uppercase tracking-[0.08em] text-faint">{time}</span>
                      <p className="mt-1 font-display text-lg font-semibold tracking-[-0.02em]">{role}</p>
                      <p className="text-[15px] text-muted-foreground">{where}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div data-reveal>
                <h2 className="text-[clamp(22px,2.2vw,28px)]">Education</h2>
                <div className="mt-5 border-l border-line-strong pl-5">
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-faint">2022 – Present</span>
                  <p className="mt-1 font-display text-lg font-semibold tracking-[-0.02em]">B.Sc. Design &amp; Computing (WILP)</p>
                  <p className="text-[15px] text-muted-foreground">BITS Pilani</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- structure ---------- */}
      <section aria-labelledby="structure-title" className="py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <SectionHead id="structure-title" label="How the studio is built" title="Small on purpose." intro="Not headcount or client numbers: the structure every engagement runs on." />
          <ul className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line min-[761px]:grid-cols-3">
            {structure.map((s, i) => (
              <li key={s.label} data-reveal style={{ ['--reveal-delay' as string]: `${i * 0.08}s` }} className="bg-ink p-[clamp(24px,3vw,40px)]">
                <span className="block font-display text-[clamp(72px,9vw,128px)] font-semibold leading-none tracking-[-0.06em] text-lime">{s.n}</span>
                <span className="mt-4 block font-display text-2xl font-semibold tracking-[-0.02em]">{s.label}</span>
                <span className="mt-1 block text-muted-foreground">{s.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand href="/contact?source=/about" />
    </>
  );
}
