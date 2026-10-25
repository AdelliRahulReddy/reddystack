import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import { projectBadge } from '@/components/blocks/projectBadge';
import SectionHead from '@/components/blocks/SectionHead';
import type { PortfolioProject } from '@/data/PortfolioProjectsData';

type Props = { project: PortfolioProject; previous: PortfolioProject; next: PortfolioProject };

/** One portfolio build: badge, picture, the story, how to review it, and an enquiry step. */
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
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Portfolio notes', href: '/portfolio' }, { name: project.title }]}
        title={project.title}
        intro={<><span className="mb-3 inline-flex rounded-full bg-text px-2.5 py-0.5 text-[12.5px] font-semibold text-ground">{projectBadge(project)}</span><p>{project.heroDescription}</p></>}
        meta={
          <dl className="grid grid-cols-2 gap-2 min-[861px]:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-[var(--radius-card)] bg-surface p-4">
                <dt className="text-small text-muted">{k}</dt>
                <dd className="mt-1 text-[15.5px] text-text">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <div className="site-wrap">
        <Image src={project.listingImage} alt={`${project.title} project overview`} priority sizes="(max-width: 1240px) 100vw, 1240px" className="aspect-[3/2] w-full rounded-[var(--radius-panel)] object-cover" />
        <ol className="mt-4 grid gap-2 min-[761px]:grid-cols-3">
          {project.heroStats.map((st, i) => (
            <li key={st.label} className="flex items-center gap-4 rounded-[var(--radius-card)] bg-surface px-5 py-4">
              <span className="font-display text-[22px] font-semibold text-action">{i + 1}</span>
              <span className="font-semibold">{st.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <section aria-labelledby="about-title" className="section">
        <div className="site-wrap grid gap-[clamp(32px,5vw,72px)] min-[1025px]:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[var(--radius-card)] bg-surface p-6 min-[1025px]:sticky min-[1025px]:top-[calc(var(--header-h)+24px)]" aria-label="Project details">
            <p className="text-small text-muted">Services</p>
            <p className="mt-1 text-text">{project.services.join(', ')}</p>
            <p className="mt-5 text-small text-muted">Personal or demo work: this page describes design intent and decisions, not client results.</p>
            <ButtonLink href={contactHref} className="mt-6 w-full">{project.ctaLabel}</ButtonLink>
          </aside>
          <div className="max-w-[760px]">
            <h2 id="about-title" className="text-h2">{project.aboutTitle}</h2>
            <div className="prose-studio mt-6">{project.aboutDescription.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
        </div>
      </section>

      <section aria-labelledby="overview-title" className="section bg-surface">
        <div className="site-wrap">
          <SectionHead id="overview-title" title="How to review this build" intro={project.overviewLead} />
          <ol className="grid gap-4 min-[961px]:grid-cols-3">
            {project.overviewPoints.map((pt, i) => {
              const [lead, ...rest] = pt.split(':');
              return (
                <li key={pt} className="rounded-[var(--radius-card)] bg-ground p-6">
                  <span className="font-display text-[24px] font-semibold text-action">{i + 1}</span>
                  {rest.length ? (
                    <>
                      <h3 className="mt-2 text-h3 font-semibold">{lead}</h3>
                      <p className="mt-2 text-muted">{rest.join(':').trim()}</p>
                    </>
                  ) : (
                    <p className="mt-2 text-text/90">{pt}</p>
                  )}
                </li>
              );
            })}
          </ol>
          <h3 className="mt-12 text-h3 font-semibold">Design priorities</h3>
          <p className="mt-1 text-muted">What the build set out to get right. These are intentions, not measured outcomes.</p>
          <ul className="mt-4 grid list-disc gap-1.5 pl-5 marker:text-action">
            {project.results.map((r) => <li key={r.label}>{r.label}</li>)}
          </ul>
        </div>
      </section>

      <nav aria-label="More projects" className="section-tight">
        <div className="site-wrap grid gap-3 min-[761px]:grid-cols-2">
          {[{ p: previous, dir: 'Previous project' }, { p: next, dir: 'Next project' }].map(({ p, dir }) => (
            <Link key={dir} href={p.path} className="group/nx rounded-[var(--radius-card)] bg-surface p-6 transition-colors hover:bg-surface-2">
              <span className="text-small text-muted">{dir}</span>
              <span className="mt-1 block text-h3 font-semibold group-hover/nx:text-action">{p.title}</span>
              <span className="mt-1 block text-[15px] text-muted">{p.category}, {projectBadge(p)}</span>
            </Link>
          ))}
        </div>
      </nav>

      <EnquiryStep href={contactHref} label={project.ctaLabel} title="Want something like this for your business?" body="Use this project to show the direction you want. The real scope, content and checks come from your brief." />
    </>
  );
}
