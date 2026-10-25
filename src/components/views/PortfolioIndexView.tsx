import Link from 'next/link';

import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import ProjectCard from '@/components/blocks/ProjectCard';
import { portfolioProjects } from '@/data/PortfolioProjectsData';

/** Portfolio notes: personal and demo builds, each badged as such, never presented as client results. */
export default function PortfolioIndexView() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Portfolio notes' }]}
        title="Our own builds, explained."
        intro="What was built, the decisions behind it, and what has not been measured. These are personal and demo projects, not client case studies. For client work, see the Works page."
        actions={
          <>
            <ButtonLink href="/works">See client work</ButtonLink>
            <TextLink href="#projects">Browse the builds</TextLink>
          </>
        }
      />

      <section id="projects" aria-label="Projects" className="section pt-0 scroll-mt-[calc(var(--header-h)+16px)]">
        <div className="site-wrap grid gap-4 min-[761px]:grid-cols-2">
          {portfolioProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={{ ...p, image: p.listingImage }} priority={i < 2} />
          ))}
        </div>
      </section>

      <section aria-labelledby="read-title" className="section bg-surface">
        <div className="site-wrap grid gap-6 min-[861px]:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <h2 id="read-title" className="text-h2">How to read these builds</h2>
          <div className="grid gap-4 text-muted">
            <p>Each page covers the problem, the decisions made, the working result and its limits. Client case studies are added only when the client agrees and the numbers are real.</p>
            <p>A similar project for your business needs its own brief and checks. Use an example to show the direction you want, then <Link href="/contact?source=/portfolio" className="font-semibold text-action-text underline underline-offset-4">tell us about it</Link>.</p>
          </div>
        </div>
      </section>

      <EnquiryStep href="/contact?source=/portfolio" title="Have a build in mind?" label="Get a price for this" />
    </>
  );
}
