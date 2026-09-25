import Image from 'next/image';
import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import ParallaxImage from '@/components/blocks/ParallaxImage';
import { projectBadge } from '@/components/blocks/projectBadge';
import SectionHead from '@/components/blocks/SectionHead';
import { Button, ButtonArrow } from '@/components/ui/button';
import type { PortfolioProject } from '@/data/PortfolioProjectsData';

type Props = { project: PortfolioProject; previous: PortfolioProject; next: PortfolioProject };

export default function PortfolioDetailView({ project, previous, next }: Props) {
  const contactHref = `/contact?source=${project.path}`;
  const facts = [
    ['Project type', project.client],
    ['Category', project.category],
    ['Role', project.role],
    ['Year', String(project.year)],
  ];

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden pb-[clamp(40px,5vw,64px)] pt-[clamp(128px,17vh,176px)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-1/4 h-[80%] w-[60%] bg-[radial-gradient(closest-side,rgb(118_84_232/0.3),transparent_70%)] blur-[10px]" />
        <div className="site-wrap relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[0.1em] text-faint">
              <li><Link href="/" className="hover:text-ivory">Home</Link></li><li aria-hidden="true">/</li>
              <li><Link href="/portfolio" className="hover:text-ivory">Portfolio</Link></li><li aria-hidden="true">/</li>
              <li aria-current="page" className="text-muted-foreground">{project.title}</li>
            </ol>
          </nav>
          <p className="inline-flex items-center gap-2 rounded-full border border-coral/50 bg-coral/10 px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-coral">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-coral" />{projectBadge(project)}
          </p>
          <p className="eyebrow mt-6">{project.category}</p>
          <h1 className="mt-4 break-words text-[clamp(52px,9vw,140px)] leading-[0.92] tracking-[-0.05em]">{project.title}</h1>
          <p className="mt-8 max-w-[60ch] text-[clamp(17px,1.4vw,19px)] text-muted-foreground">{project.heroDescription}</p>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line min-[861px]:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-ink p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{k}</dt>
                <dd className="mt-1.5 text-[15.5px] text-ivory">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="site-wrap">
        <ParallaxImage src={project.listingImage} alt={`${project.title} project overview`} priority />
        <ol className="mt-4 grid gap-3 min-[761px]:grid-cols-3">
          {project.heroStats.map((st) => (
            <li key={st.label} className="flex items-center gap-4 rounded-2xl border border-line bg-graphite px-5 py-4">
              <span className="font-mono text-[13px] text-lime">{st.value}</span>
              <span className="font-display text-lg font-semibold tracking-[-0.02em]">{st.label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- story ---------- */}
      <section aria-labelledby="about-title" className="py-[clamp(64px,9vw,128px)]">
        <div className="site-wrap grid gap-[clamp(32px,5vw,80px)] min-[1025px]:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-[1025px]:sticky min-[1025px]:top-[calc(var(--header-h)+24px)] min-[1025px]:self-start" aria-label="Project details">
            <div className="rounded-[28px] border border-line bg-graphite p-6">
              <Eyebrow>Services</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.services.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1.5 text-[13.5px] text-ivory/90">{s}</li>)}
              </ul>
              <p className="mt-6 text-[14.5px] text-muted-foreground">Personal or demo work: the page describes design intent and decisions, not client results.</p>
              <Button asChild className="mt-6 w-full"><Link href={contactHref}>{project.ctaLabel} <ButtonArrow /></Link></Button>
            </div>
          </aside>
          <div className="max-w-[760px]">
            <Eyebrow>About the project</Eyebrow>
            <h2 id="about-title" className="mt-5 text-[clamp(30px,3.8vw,52px)]">{project.aboutTitle}</h2>
            <div className="prose-studio mt-8">
              {project.aboutDescription.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- overview + priorities ---------- */}
      <section aria-labelledby="overview-title" className="bg-[linear-gradient(var(--color-ink),var(--color-graphite)_30%,var(--color-graphite)_70%,var(--color-ink))] py-[clamp(64px,9vw,128px)]">
        <div className="site-wrap">
          <SectionHead id="overview-title" label="Overview" title="How to review this build." intro={project.overviewLead} />
          <ol className="grid gap-4 min-[961px]:grid-cols-3">
            {project.overviewPoints.map((pt, i) => {
              const [lead, ...rest] = pt.split(':');
              return (
                <li key={pt} data-reveal style={{ ['--reveal-delay' as string]: `${i * 0.08}s` }} className="rounded-[28px] border border-line bg-ink p-7">
                  <span className="font-mono text-[13px] text-lime">{String(i + 1).padStart(2, '0')}</span>
                  {rest.length ? (
                    <>
                      <h3 className="mt-4 text-2xl">{lead}</h3>
                      <p className="mt-3 text-[15.5px] text-muted-foreground">{rest.join(':').trim()}</p>
                    </>
                  ) : (
                    <p className="mt-4 text-[16px] text-ivory/90">{pt}</p>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-[clamp(48px,6vw,80px)] grid gap-8 min-[861px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
            <div>
              <Eyebrow>Design priorities</Eyebrow>
              <p className="mt-4 max-w-[36ch] text-muted-foreground">What the build set out to get right. These are intentions, not measured outcomes.</p>
            </div>
            <ol className="grid border-t border-line">
              {project.results.map((r) => (
                <li key={r.label} className="flex items-center gap-6 border-b border-line py-5">
                  <span className="font-mono text-[13px] text-lime">{r.value}</span>
                  <span className="font-display text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.02em]">{r.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- previous / next ---------- */}
      <nav aria-label="More projects" className="py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap grid gap-4 min-[761px]:grid-cols-2">
          {[{ p: previous, dir: '← Previous project' }, { p: next, dir: 'Next project →' }].map(({ p, dir }) => (
            <Link key={dir} href={p.path} data-view className="group/nx relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[28px] border border-line p-7">
              <Image src={p.listingImage} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" className="-z-10 object-cover opacity-45 transition-[transform,opacity] duration-1000 ease-studio group-hover/nx:scale-105 group-hover/nx:opacity-60" />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_20%,rgb(20_19_24/0.92))]" />
              <span className="eyebrow">{dir}</span>
              <span className="mt-2 font-display text-[clamp(28px,3.4vw,48px)] font-semibold tracking-[-0.04em]">{p.title}</span>
              <span className="text-[15px] text-muted-foreground">{p.category} · {projectBadge(p)}</span>
            </Link>
          ))}
        </div>
      </nav>

      <CtaBand href={contactHref} label={project.ctaLabel} title="Want something like this for your business?" body="Use this project to explain the direction you want. The real scope, content and acceptance checks come from your brief." />
    </>
  );
}
