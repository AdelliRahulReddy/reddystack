import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import PageHero from '@/components/blocks/PageHero';
import ProjectCard from '@/components/blocks/ProjectCard';
import { Button, ButtonArrow } from '@/components/ui/button';
import { portfolioProjects } from '@/data/PortfolioProjectsData';
import { cn } from '@/lib/utils';

// Alternating wide/narrow rows, as on the homepage.
const spans = ['min-[861px]:col-span-7', 'min-[861px]:col-span-5', 'min-[861px]:col-span-5', 'min-[861px]:col-span-7'];

function ProofCard() {
  const years = portfolioProjects.map((p) => p.year);
  const [from, to] = [Math.min(...years), Math.max(...years)];
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-[radial-gradient(90%_70%_at_100%_100%,rgb(118_84_232/0.45),transparent_60%),radial-gradient(60%_50%_at_0%_0%,rgb(210_237_122/0.14),transparent_60%),var(--color-graphite)] p-[clamp(24px,3vw,36px)]">
      <div className="flex justify-between font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint"><span>Work index</span><span>{from === to ? from : `${from} — ${to}`}</span></div>
      <strong className="mt-6 block font-display text-[clamp(96px,12vw,168px)] font-semibold leading-[0.85] tracking-[-0.07em] text-ivory">
        {String(portfolioProjects.length).padStart(2, '0')}
      </strong>
      <span className="mt-3 block font-mono text-xs uppercase tracking-[0.14em] text-lime">Personal &amp; demo builds</span>
      <div className="my-6 h-px bg-line-strong" />
      <p className="font-display text-xl font-semibold tracking-[-0.02em]">Real outputs. Clear roles. Honest limits.</p>
      <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-faint">Client results are shared only when verified and approved.</p>
    </div>
  );
}

export default function PortfolioIndexView() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Portfolio' }]}
        eyebrow="Selected builds · transparent proof"
        title="Work you can inspect clearly."
        accent="inspect clearly."
        intro="See what was built, the decisions behind it, and what has and has not been measured. These projects are personal and demo builds, not invented client case studies."
        actions={
          <>
            <Button asChild size="lg"><a href="#projects">Explore the builds <ButtonArrow down /></a></Button>
            <Button asChild size="lg" variant="ghost"><Link href="/contact?source=/portfolio">Discuss your project <ButtonArrow /></Link></Button>
          </>
        }
        aside={<ProofCard />}
      />

      <section id="projects" aria-label="Projects" className="scroll-mt-[calc(var(--header-h)+16px)] py-[clamp(40px,6vw,80px)]">
        <div className="site-wrap">
          <div className="grid gap-[clamp(16px,2vw,24px)] min-[861px]:grid-cols-12">
            {portfolioProjects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={{ ...p, image: p.listingImage }}
                priority={i < 2}
                sizes="(max-width: 860px) 100vw, 58vw"
                className={cn('col-span-full', spans[i % 4])}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="read-title" className="py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <div data-reveal className="grid gap-8 rounded-[32px] border border-line bg-graphite p-[clamp(24px,4vw,56px)] min-[861px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
            <div>
              <Eyebrow>How to read these builds</Eyebrow>
              <h2 id="read-title" className="mt-4 text-[clamp(28px,3.4vw,46px)]">Decisions, not dashboards.</h2>
            </div>
            <div className="grid gap-4 text-[17px] leading-[1.75] text-muted-foreground">
              <p>Review each build by the problem it addresses, the decisions made, the working output, and the stated limitations. Client case studies will be added only when permission, baseline data, completed work, and a defensible result all exist.</p>
              <p>A similar commercial project needs its own brief, factual content, acceptance checks and operating responsibilities. Use an example to explain the direction you want, then <Link href="/contact?source=/portfolio" className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime">discuss the actual scope with Rahul</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand href="/contact?source=/portfolio" title="Have a build in mind? Bring the brief." />
    </>
  );
}
