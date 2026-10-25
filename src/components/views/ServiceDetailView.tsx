import Link from 'next/link';
import { Check } from 'lucide-react';

import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import Faq from '@/components/blocks/Faq';
import PageHero from '@/components/blocks/PageHero';
import ProcessTimeline from '@/components/blocks/ProcessTimeline';
import ProjectCard from '@/components/blocks/ProjectCard';
import SectionHead from '@/components/blocks/SectionHead';
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
  /** Service whose examples apply (intent pages point at their parent service). */
  illustrationSlug?: string;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-text/90">
          <Check aria-hidden="true" className="mt-1 size-4 flex-none text-action" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Service and search-intent pages: what it is, scope, steps, price note, examples, questions, enquiry. */
export default function ServiceDetailView({ service, previous, next, illustrationSlug }: Props) {
  const exampleSlug = illustrationSlug ?? service.slug;
  const contactHref = `/contact?${new URLSearchParams({ service: service.contactService || service.slug, source: service.path })}`;

  const sections = service.answerSections ?? [
    { title: 'Overview', paragraphs: [service.overviewPrimary, service.overviewSecondary], bullets: service.features },
  ];

  const links = service.relatedLinks ?? [];
  const guideLinks = links.filter((l) => !l.path.startsWith('/portfolio/'));
  const projectSlugs = [
    ...links.filter((l) => l.path.startsWith('/portfolio/')).map((l) => l.path.split('/').pop()!),
    ...(buildExamples[exampleSlug] ? [buildExamples[exampleSlug]] : []),
  ];
  const projects = [...new Set(projectSlugs)]
    .map((slug) => getPortfolioProject(slug))
    .filter((p): p is PortfolioProject => Boolean(p))
    .slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/service' }, { name: service.title }]}
        title={service.heading ?? service.title}
        intro={<><p>{service.introPrimary}</p><p className="mt-3">{service.introSecondary}</p></>}
        actions={
          <>
            <ButtonLink href={contactHref}>Get a price for this</ButtonLink>
            <TextLink href="/pricing">See prices</TextLink>
          </>
        }
      />

      <section aria-label={`${service.title}: what is covered`} className="section pt-0">
        <div className="site-wrap grid gap-[clamp(32px,5vw,72px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
          <div className="grid gap-[clamp(40px,5vw,64px)]">
            {sections.map((section, i) => (
              <section key={section.title} aria-labelledby={`scope-${i}`}>
                <h2 id={`scope-${i}`} className="text-h2">{section.title}</h2>
                {section.paragraphs?.map((p) => <p key={p} className="mt-4 max-w-[64ch] text-muted">{p}</p>)}
                {section.bullets && <BulletList items={section.bullets} />}
              </section>
            ))}
          </div>

          <aside className="h-fit rounded-[var(--radius-panel)] bg-surface p-6 sm:p-7 min-[1025px]:sticky min-[1025px]:top-[calc(var(--header-h)+24px)]" aria-label="Summary">
            <p className="text-small text-muted">{service.sideTitle}</p>
            <h2 className="mt-2 text-h3 font-semibold first-letter:uppercase">{service.highlightTitle[0]} {service.highlightTitle[1]}</h2>
            <p className="mt-2 text-muted">{service.highlightText}</p>
            <p className="mt-4 text-small text-muted">Covers: {service.categories.join(', ')}</p>
            <ButtonLink href={contactHref} className="mt-6 w-full">Get a price for this</ButtonLink>
            <p className="mt-3 text-center text-small text-muted">Prices for Indian businesses are public. Ad spend is separate.</p>
          </aside>
        </div>
      </section>

      {service.processSteps && (
        <section id="process" aria-labelledby="process-title" className="section bg-surface">
          <div className="site-wrap">
            <SectionHead id="process-title" title={service.processTitle ?? 'How it works'} intro="Each step is checked with you before the next one starts." />
            <ProcessTimeline steps={service.processSteps} className="max-w-[860px]" />
          </div>
        </section>
      )}

      {service.pricingText && (
        <section aria-labelledby="pricing-title" className="section">
          <div className="site-wrap grid gap-6 min-[861px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
            <h2 id="pricing-title" className="text-h2">{service.pricingTitle ?? 'What it costs'}</h2>
            <div>
              <p className="text-muted">{service.pricingText}</p>
              <div className="mt-6"><TextLink href="/pricing">See every public price</TextLink></div>
            </div>
          </div>
        </section>
      )}

      {(guideLinks.length > 0 || projects.length > 0) && (
        <section aria-labelledby="related-title" className="section pt-0">
          <div className="site-wrap">
            <SectionHead id="related-title" title="Guides and examples" intro="Practical notes on this work, and builds that show the approach. Projects are personal or demo work, labelled as such." />
            {guideLinks.length > 0 && (
              <ul className="grid gap-2">
                {guideLinks.map((l) => (
                  <li key={l.path}>
                    <Link href={l.path} className="block rounded-[var(--radius-card)] bg-surface px-5 py-4 font-semibold text-text transition-colors hover:bg-surface-2 hover:text-action sm:px-6">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {projects.length > 0 && (
              <div className="mt-8 grid gap-4 min-[861px]:grid-cols-2">
                {projects.map((p) => <ProjectCard key={p.slug} project={{ ...p, image: p.listingImage }} />)}
              </div>
            )}
          </div>
        </section>
      )}

      <Faq items={service.faqItems} title={service.presentation?.faqTitle ?? `Questions about ${service.title}`} intro={service.presentation?.faqDescription} />

      <nav aria-label="More services" className="section-tight">
        <div className="site-wrap grid gap-3 min-[761px]:grid-cols-2">
          {[{ s: previous, dir: 'Previous service' }, { s: next, dir: 'Next service' }].map(({ s, dir }) => (
            <Link key={dir} href={s.path} className="group/nx rounded-[var(--radius-card)] bg-surface p-6 transition-colors hover:bg-surface-2">
              <span className="text-small text-muted">{dir}</span>
              <span className="mt-1 block text-h3 font-semibold group-hover/nx:text-action">{s.title}</span>
              <span className="mt-1 block text-[15px] text-muted">{s.subtitle}</span>
            </Link>
          ))}
        </div>
      </nav>

      <EnquiryStep body={service.finalCtaText || service.closingSummary} href={contactHref} label="Get a price for this" />
    </>
  );
}
