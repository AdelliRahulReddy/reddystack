import Link from 'next/link';
import { Check } from 'lucide-react';

import CtaBand from '@/components/blocks/CtaBand';
import EngagementCards from '@/components/blocks/EngagementCards';
import Eyebrow from '@/components/blocks/Eyebrow';
import Faq, { type FaqItem } from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import { EngagementGlyph } from '@/components/home-v3/Illustrations';
import { Button, ButtonArrow } from '@/components/ui/button';

const quoteNames = ['The problem', 'The baseline', 'Deliverables', 'Access', 'Approvals', 'Revisions', 'Exclusions', 'Separate costs', 'Evidence plan', 'Handover'];

const separateCosts = ['Advertising spend', 'Hosting & domains', 'Paid tools', 'Stock assets', 'AI model usage', 'Other third-party costs'];

const compare = [
  { id: 'sprint' as const, title: 'Proof Sprint', fit: 'One important unknown or bottleneck.', output: 'A focused audit, build, fix or test, plus the evidence and its limits.', shape: 'Bounded project' },
  { id: 'build' as const, title: 'Stack Build', fit: 'A defined implementation that needs several connected capabilities.', output: 'The connected pieces your plan needs, with a clean handover of accounts.', shape: 'Bounded project' },
  { id: 'operate' as const, title: 'Operate & Improve', fit: 'A working system that needs ongoing testing and decisions.', output: 'Agreed priorities, regular reporting and review periods.', shape: 'Ongoing' },
];

function Ladder() {
  return (
    <div aria-hidden="true" className="relative mx-auto grid w-full max-w-[480px] gap-3">
      {compare.map((c, i) => (
        <div
          key={c.id}
          style={{ marginLeft: `${i * 12}%`, animationDelay: `${0.2 + i * 0.12}s` }}
          className={`flex items-center gap-4 rounded-[24px] border p-4 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-6 motion-safe:fill-mode-both motion-safe:duration-1000 ${i === 0 ? 'ring-sweep relative border-violet-soft/40 bg-raised' : 'border-line bg-graphite'}`}
        >
          <EngagementGlyph id={c.id} />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-lime">Step {i + 1} · {c.shape}</p>
            <p className="font-display text-xl font-semibold tracking-[-0.02em]">{c.title}</p>
          </div>
        </div>
      ))}
      <p className="mt-2 text-right font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">Scale only what earned it ↑</p>
    </div>
  );
}

export default function PricingView({ faqItems }: { faqItems: FaqItem[] }) {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Ways to Work' }]}
        eyebrow="Ways to work · custom quotes"
        title="Start focused. Scale with evidence."
        accent="Scale with evidence."
        intro={
          <>
            <p>ReddyStack offers three engagement shapes: a focused Proof Sprint, a connected Stack Build, and ongoing Operate and Improve support. The right starting point depends on the decision you need to make, the current evidence, and how much implementation is required.</p>
            <p className="mt-4 text-[0.92em] text-faint">Every quote names the problem, baseline, deliverables, access, approvals, revisions, exclusions, separate costs, evidence plan, and handover. Prices come after the scope is understood; no package hides media spend, platform costs, or client responsibilities.</p>
          </>
        }
        actions={
          <>
            <Button asChild size="lg"><Link href="/contact?service=proof-sprint&source=/pricing">Discuss a Proof Sprint <ButtonArrow /></Link></Button>
            <Button asChild size="lg" variant="ghost"><a href="#engagements">Compare engagements <ButtonArrow down /></a></Button>
          </>
        }
        aside={<Ladder />}
      />

      <section id="engagements" aria-labelledby="eng-title" className="scroll-mt-[calc(var(--header-h)+16px)] py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <SectionHead id="eng-title" label="Engagements" title="Three shapes. One method." intro="Proof Sprint, Stack Build, or ongoing improvement, each quoted with a defined problem, scope, evidence plan, and ownership." />
          <EngagementCards source="/pricing" />

          <div className="mt-[clamp(40px,5vw,64px)] overflow-x-auto rounded-[28px] border border-line">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <caption className="sr-only">Engagement comparison</caption>
              <thead>
                <tr className="border-b border-line font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
                  <th scope="col" className="p-5 font-medium">Engagement</th>
                  <th scope="col" className="p-5 font-medium">Fits when you have</th>
                  <th scope="col" className="p-5 font-medium">What you get</th>
                  <th scope="col" className="p-5 font-medium">Shape</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <th scope="row" className="p-5 font-display text-lg font-semibold tracking-[-0.02em]">{c.title}</th>
                    <td className="p-5 text-[15.5px] text-muted-foreground">{c.fit}</td>
                    <td className="p-5 text-[15.5px] text-muted-foreground">{c.output}</td>
                    <td className="p-5"><span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ivory/85">{c.shape}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="quote-title" className="py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap grid gap-4 min-[961px]:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <div data-reveal className="rounded-[32px] border border-line bg-graphite p-[clamp(24px,3.4vw,48px)]">
            <Eyebrow>What every quote names</Eyebrow>
            <h2 id="quote-title" className="mt-4 text-[clamp(28px,3.2vw,44px)]">Written down before work starts.</h2>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 min-[641px]:grid-cols-3">
              {quoteNames.map((q) => (
                <li key={q} className="flex items-center gap-2.5 rounded-2xl border border-line bg-ink/60 px-3.5 py-3 text-[15px]">
                  <span aria-hidden="true" className="grid size-5 flex-none place-items-center rounded-full bg-lime/15 text-lime"><Check className="size-3.5" strokeWidth={2.5} /></span>{q}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-[32px] border border-coral/30 bg-[radial-gradient(90%_70%_at_100%_0%,rgb(255_118_94/0.18),transparent_60%),var(--color-graphite)] p-[clamp(24px,3.4vw,48px)]">
            <Eyebrow>Kept separate</Eyebrow>
            <h2 className="mt-4 text-[clamp(26px,2.8vw,36px)]">Costs that stay in your name.</h2>
            <ul className="mt-6 grid gap-2">
              {separateCosts.map((c) => (
                <li key={c} className="flex items-center justify-between border-b border-line py-2.5 text-[15.5px]">{c}<span className="font-mono text-[11px] uppercase tracking-[0.08em] text-coral">Not in fees</span></li>
              ))}
            </ul>
            <p className="mt-5 text-[14.5px] text-muted-foreground">Unless the proposal explicitly says otherwise. You approve spending boundaries before anything launches.</p>
          </div>
        </div>
      </section>

      <Faq items={faqItems} label="Pricing questions" title="What to expect before you start." id="pricing-faq" />

      <CtaBand href="/contact?source=/pricing" />
    </>
  );
}
