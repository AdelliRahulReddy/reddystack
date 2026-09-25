import Link from 'next/link';
import { Check } from 'lucide-react';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import Faq from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import ProcessTimeline from '@/components/blocks/ProcessTimeline';
import ProjectCard from '@/components/blocks/ProjectCard';
import SectionHead from '@/components/blocks/SectionHead';
import { IllustrationStage } from '@/components/illustrations/ServiceIllustrations';
import { Button, ButtonArrow } from '@/components/ui/button';
import { getPortfolioProject, type PortfolioProject } from '@/data/PortfolioProjectsData';
import type { ServiceDetail } from '@/data/ServiceDetailData';

// Development examples for build services. Ad and creative services get none:
// the portfolio shows development work, not campaign results.
const buildExamples: Record<string, string> = {
  applications: 'multi-format-converter',
  'mvp-builds': 'gitwall-app',
  'ai-automations': 'telegram-auto-reply-bot',
};

type Props = {
  service: ServiceDetail;
  previous: ServiceDetail;
  next: ServiceDetail;
  /** Service whose illustration and examples apply (intent pages point at their parent service). */
  illustrationSlug?: string;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 rounded-2xl border border-line bg-graphite/60 px-4 py-3.5 text-[16px] text-ivory/90">
          <span aria-hidden="true" className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-lime/15 text-lime"><Check className="size-3.5" strokeWidth={2.5} /></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServiceDetailView({ service, previous, next, illustrationSlug }: Props) {
  const illSlug = illustrationSlug ?? service.slug;
  const contactHref = `/contact?${new URLSearchParams({ service: service.contactService || service.slug, source: service.path })}`;

  const sections = service.answerSections ?? [
    { title: 'Overview', paragraphs: [service.overviewPrimary, service.overviewSecondary], bullets: service.features },
  ];

  const links = service.relatedLinks ?? [];
  const guideLinks = links.filter((l) => !l.path.startsWith('/portfolio/'));
  const projectSlugs = [
    ...links.filter((l) => l.path.startsWith('/portfolio/')).map((l) => l.path.split('/').pop()!),
    ...(buildExamples[illSlug] ? [buildExamples[illSlug]] : []),
  ];
  const projects = [...new Set(projectSlugs)]
    .map((slug) => getPortfolioProject(slug))
    .filter((p): p is PortfolioProject => Boolean(p))
    .slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/service' }, { name: service.title }]}
        eyebrow={service.subtitle}
        title={service.title}
        size="lg"
        intro={<><p>{service.introPrimary}</p><p className="mt-4 text-[0.92em] text-faint">{service.introSecondary}</p></>}
        actions={
          <>
            <Button asChild size="lg"><Link href={contactHref}>Discuss your problem <ButtonArrow /></Link></Button>
            {service.processSteps && <Button asChild size="lg" variant="ghost"><a href="#process">How it works <ButtonArrow down /></a></Button>}
          </>
        }
        aside={<IllustrationStage slug={illSlug} caption={service.sideTitle} detail={service.categories[0]} />}
      />

      {/* ---------- scope ---------- */}
      <section aria-label={`${service.title} scope`} className="py-[clamp(48px,7vw,104px)]">
        <div className="site-wrap grid gap-[clamp(32px,5vw,72px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(300px,380px)]">
          <div className="grid gap-[clamp(48px,6vw,80px)]">
            {sections.map((section, i) => (
              <section key={section.title} aria-labelledby={`scope-${i}`} data-reveal>
                <p className="font-mono text-xs tracking-[0.12em] text-lime">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`scope-${i}`} className="mt-3 text-[clamp(28px,3.2vw,44px)]">{section.title}</h2>
                {section.paragraphs?.map((p) => <p key={p} className="mt-5 max-w-[64ch] text-[17px] leading-[1.75] text-muted-foreground">{p}</p>)}
                {section.bullets && <BulletList items={section.bullets} />}
              </section>
            ))}
          </div>

          <aside className="min-[1025px]:sticky min-[1025px]:top-[calc(var(--header-h)+24px)] min-[1025px]:self-start" aria-label="Service summary">
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(100%_70%_at_0%_0%,rgb(118_84_232/0.45),transparent_65%),var(--color-raised)] p-7">
              <Eyebrow>{service.sideTitle}</Eyebrow>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.categories.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-ink/40 px-3 py-1.5 text-[13px] text-ivory/90">{c}</li>
                ))}
              </ul>
              <h3 className="mt-7 text-[clamp(24px,2.2vw,30px)] first-letter:uppercase">{service.highlightTitle[0]} {service.highlightTitle[1]}</h3>
              <p className="mt-3 text-[15.5px] text-muted-foreground">{service.highlightText}</p>
              <Button asChild className="mt-6 w-full"><Link href={contactHref}>Start a project <ButtonArrow /></Link></Button>
              <p className="mt-4 text-center font-mono text-[11.5px] uppercase tracking-[0.08em] text-faint">Custom quote · ad spend separate</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- process ---------- */}
      {service.processSteps && (
        <section id="process" aria-labelledby="process-title" className="bg-[linear-gradient(var(--color-ink),var(--color-graphite)_30%,var(--color-graphite)_70%,var(--color-ink))] py-[clamp(64px,9vw,128px)]">
          <div className="site-wrap">
            <SectionHead id="process-title" label="Process" title={service.processTitle ?? 'How it works'} intro="Nothing moves to the next step until the one before it has been checked with you." />
            <ProcessTimeline steps={service.processSteps} className="max-w-[860px]" />
          </div>
        </section>
      )}

      {/* ---------- pricing ---------- */}
      {service.pricingText && (
        <section aria-labelledby="pricing-title" className="py-[clamp(56px,8vw,112px)]">
          <div className="site-wrap">
            <div data-reveal className="grid gap-8 rounded-[32px] border border-line bg-graphite p-[clamp(24px,4vw,56px)] min-[861px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] min-[861px]:items-end">
              <div>
                <Eyebrow>Pricing</Eyebrow>
                <h2 id="pricing-title" className="mt-4 text-[clamp(28px,3.4vw,46px)]">{service.pricingTitle ?? 'Custom quotes'}</h2>
              </div>
              <div>
                <p className="text-[17px] leading-[1.75] text-muted-foreground">{service.pricingText}</p>
                <Link href="/pricing" className="group/btn mt-6 inline-flex items-center gap-2.5 font-medium text-lime">
                  See ways to work and scope guidance <ButtonArrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- related ---------- */}
      {(guideLinks.length > 0 || projects.length > 0) && (
        <section aria-labelledby="related-title" className="py-[clamp(48px,7vw,96px)]">
          <div className="site-wrap">
            <SectionHead id="related-title" label="Keep reading" title="Guides and examples" intro="Practical notes on this work, and builds that show how Rahul approaches it. Projects are personal or demo work, labelled as such." />
            {guideLinks.length > 0 && (
              <ul className="grid border-t border-line">
                {guideLinks.map((l) => (
                  <li key={l.path} className="border-b border-line">
                    <Link href={l.path} className="group/row flex items-center justify-between gap-6 py-6 font-display text-[clamp(20px,2vw,28px)] font-semibold tracking-[-0.02em] transition-colors hover:text-lime">
                      {l.title}
                      <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-full border border-line text-base text-ivory transition-all duration-400 ease-studio group-hover/row:-rotate-45 group-hover/row:border-lime group-hover/row:bg-lime group-hover/row:text-lime-ink">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {projects.length > 0 && (
              <div className="mt-10 grid gap-5 min-[861px]:grid-cols-2">
                {projects.map((p) => (
                  <ProjectCard key={p.slug} project={{ ...p, image: p.listingImage }} sizes="(max-width: 860px) 100vw, 50vw" />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Faq
        items={service.faqItems}
        label="FAQ"
        title={service.presentation?.faqTitle ?? `Questions about ${service.title}`}
        intro={service.presentation?.faqDescription}
      />

      <CtaBand
        title={service.finalCtaTitle ?? 'Bring one problem. Leave with a plan.'}
        body={service.finalCtaText || service.closingSummary}
        href={contactHref}
        label="Start your project"
      />

      {/* ---------- previous / next ---------- */}
      <nav aria-label="More services" className="pb-[clamp(40px,6vw,80px)]">
        <div className="site-wrap grid gap-4 min-[761px]:grid-cols-2">
          {[{ s: previous, dir: 'Previous' }, { s: next, dir: 'Next' }].map(({ s, dir }) => (
            <Link
              key={dir}
              href={s.path}
              className={`group/nx flex flex-col gap-3 rounded-[28px] border border-line bg-graphite p-7 transition-[border-color,transform] duration-500 ease-studio hover:-translate-y-1 hover:border-line-strong ${dir === 'Next' ? 'min-[761px]:items-end min-[761px]:text-right' : ''}`}
            >
              <span className="eyebrow">{dir === 'Previous' ? '← Previous' : 'Next →'}</span>
              <span className="font-display text-[clamp(24px,2.6vw,36px)] font-semibold tracking-[-0.03em] transition-colors group-hover/nx:text-lime">
                {s.title}
              </span>
              <span className="text-[15px] text-muted-foreground">{s.subtitle}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
