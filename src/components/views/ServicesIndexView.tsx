import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import ServiceCard from '@/components/blocks/ServiceCard';
import { ServiceIllustration } from '@/components/illustrations/ServiceIllustrations';
import { Button, ButtonArrow } from '@/components/ui/button';
import { intentLandingPages } from '@/data/IntentLandingPagesData';
import { primaryServices, primaryServiceSlugs, serviceDetailData } from '@/data/ServiceDetailData';

const capabilityMap = [
  ['01', 'Digital foundations', 'Websites, landing pages, products'],
  ['02', 'Search visibility', 'Technical, local and content SEO'],
  ['03', 'Paid acquisition', 'Campaigns built to test demand'],
  ['04', 'Creative testing', 'Useful messages, measured fairly'],
  ['05', 'Tracking & analytics', 'Know what is happening'],
  ['06', 'Automation & products', 'Connected tools and workflows'],
] as const;

const method = [
  { label: 'Diagnose the bottleneck', text: 'Clarify the commercial goal, inspect the current setup, and establish a useful baseline.', tags: ['Problem', 'Baseline'] },
  { label: 'Build the right stack', text: 'Select and connect only the pages, search, paid, creative, tracking, or automation work the problem needs.', tags: ['Scope', 'Ownership'] },
  { label: 'Prove what changed', text: 'Check the implementation, compare against the baseline, and document evidence and limitations.', tags: ['Evidence', 'Learning'] },
  { label: 'Scale the evidence', text: 'Continue, expand, revise, or stop based on what the work actually showed, not on activity alone.', tags: ['Decision', 'Next move'] },
];

function CapabilityMap() {
  return (
    <div className="rounded-[32px] border border-line bg-[radial-gradient(90%_70%_at_100%_0%,rgb(118_84_232/0.35),transparent_60%),var(--color-graphite)] p-[clamp(18px,2.4vw,28px)] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
      <div className="flex justify-between font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
        <span className="inline-flex items-center gap-2"><i className="size-2 animate-pulse-dot rounded-full bg-lime" />Growth stack</span>
        <span>01 — 06</span>
      </div>
      <ol className="mt-5 grid gap-2">
        {capabilityMap.map(([n, title, detail], i) => (
          <li
            key={n}
            style={{ animationDelay: `${0.25 + i * 0.07}s` }}
            className="group/cap grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-line bg-ink/50 px-4 py-3 transition-colors duration-300 hover:border-lime/50 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-4 motion-safe:fill-mode-both motion-safe:duration-700"
          >
            <span className="font-mono text-xs text-lime">{n}</span>
            <span><strong className="block font-display text-[17px] font-semibold tracking-[-0.02em]">{title}</strong><small className="text-[13.5px] text-muted-foreground">{detail}</small></span>
            <span aria-hidden="true" className="text-faint transition-transform duration-300 group-hover/cap:-rotate-45 group-hover/cap:text-lime">→</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        <span>One accountable lead</span><span>Proof before scale</span>
      </div>
    </div>
  );
}

export default function ServicesIndexView() {
  const extended = serviceDetailData.filter((s) => !primaryServiceSlugs.includes(s.slug));

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
        eyebrow="Connected capabilities · one clear goal"
        title="Build the stack the problem needs."
        accent="the problem needs."
        intro="Start with one business problem. Connect only the digital capabilities needed to address it, then use evidence to choose the next step."
        actions={
          <>
            <Button asChild size="lg"><Link href="/contact?source=/service">Tell Rahul what is stuck <ButtonArrow /></Link></Button>
            <Button asChild size="lg" variant="ghost"><Link href="/pricing">See ways to work <ButtonArrow /></Link></Button>
          </>
        }
        aside={<CapabilityMap />}
      />

      {/* ---------- core ---------- */}
      <section aria-labelledby="core-title" className="py-[clamp(56px,8vw,112px)]">
        <div className="site-wrap">
          <SectionHead
            id="core-title"
            label="Core capabilities"
            title="Six ways into the growth problem."
            intro="ReddyStack specialises in solving one measurable digital growth problem with a connected set of capabilities. Each page explains the possible deliverables and the boundaries."
          />
          <div className="grid gap-4 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-3">
            {primaryServices.map((s, i) => (
              <ServiceCard
                key={s.slug}
                href={s.path}
                index={i}
                kicker={s.subtitle}
                title={s.title}
                body={s.introPrimary}
                illustration={<ServiceIllustration slug={s.slug} />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- how chosen ---------- */}
      <section aria-labelledby="chosen-title" className="bg-[linear-gradient(var(--color-ink),var(--color-graphite)_30%,var(--color-graphite)_70%,var(--color-ink))] py-[clamp(64px,9vw,128px)]">
        <div className="site-wrap grid gap-[clamp(32px,5vw,88px)] min-[961px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div>
            <Eyebrow>How the stack is chosen</Eyebrow>
            <h2 id="chosen-title" className="mt-5 text-[clamp(32px,4vw,56px)]">Components, not a bundle you have to buy.</h2>
          </div>
          <div data-reveal className="grid gap-5 text-[17px] leading-[1.75] text-muted-foreground">
            <p>Buyers should not need to diagnose their own channel before asking for help. Start with the commercial goal, the current setup, what has already been tried, and where the system appears to break. Rahul uses that evidence to identify the first useful scope.</p>
            <p>The stack may include a website or landing page, technical and on-page search work, Meta or Google campaigns, creative assets, conversion tracking, analytics, or automation. These are components, not six mandatory services and not a promise that every problem needs every tool.</p>
            <p>Each capability page explains possible deliverables and boundaries. The final proposal connects them around one problem and confirms ownership, access, approvals, costs, checks, reporting, and what happens after delivery.</p>
          </div>
        </div>
      </section>

      {/* ---------- extended ---------- */}
      <section aria-labelledby="ext-title" className="py-[clamp(56px,8vw,112px)]">
        <div className="site-wrap">
          <SectionHead id="ext-title" label="Extended capabilities" title="When the fix is a product." intro="Applications, first releases and automations, built when the growth problem needs software rather than another campaign." />
          <div className="grid gap-4 min-[961px]:grid-cols-3">
            {extended.map((s, i) => (
              <ServiceCard key={s.slug} href={s.path} index={i + primaryServices.length} kicker={s.subtitle} title={s.title} body={s.introPrimary} illustration={<ServiceIllustration slug={s.slug} />} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- method ---------- */}
      <section aria-labelledby="method-title" className="py-[clamp(56px,8vw,112px)]">
        <div className="site-wrap">
          <SectionHead id="method-title" label="The ReddyStack method" title="From bottleneck to evidence." intro="One accountable process across every capability and engagement." />
          <ol className="grid gap-4 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-4">
            {method.map((m, i) => (
              <li key={m.label} data-reveal style={{ ['--reveal-delay' as string]: `${i * 0.08}s` }} className="flex flex-col gap-4 rounded-[28px] border border-line bg-graphite p-7">
                <span className="grid size-12 place-items-center rounded-full border border-line-strong font-mono text-[13px] text-lime">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[26px]">{m.label}</h3>
                <p className="text-[15.5px] text-muted-foreground">{m.text}</p>
                <div className="mt-auto flex gap-2 pt-2">{m.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{t}</span>)}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- specific needs ---------- */}
      <section aria-labelledby="needs-title" className="py-[clamp(40px,6vw,80px)]">
        <div className="site-wrap">
          <SectionHead id="needs-title" label="Looking for something specific?" title="Common starting points." intro="Pages for the requests Rahul hears most often, each with scope, process, pricing notes and answers." />
          <ul className="grid border-t border-line min-[861px]:grid-cols-2 min-[861px]:gap-x-10">
            {intentLandingPages.map((p) => (
              <li key={p.path} className="border-b border-line">
                <Link href={p.path} className="group/row flex items-center justify-between gap-4 py-5 text-[17px] font-medium transition-colors hover:text-lime">
                  {p.navLabel}
                  <span aria-hidden="true" className="text-faint transition-transform duration-300 group-hover/row:-rotate-45 group-hover/row:text-lime">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand href="/contact?source=/service" />
    </>
  );
}
