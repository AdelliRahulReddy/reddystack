import type { Metadata } from 'next';

import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import WorkShowcase from '@/components/work/WorkShowcase';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { groupWorksByType, listVisibleWorks } from '@/lib/works';

export const metadata: Metadata = buildPageMetadata('works');

const WorksPage = async () => {
  const client = await createSupabaseServerClient();
  const works = await listVisibleWorks(client);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/works' },
  ]);

  const groups = works ? groupWorksByType(works) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        title="Work we have built."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Works' }]}
        intro={<>Client work and our own projects are shown separately and labelled. A demo is never shown as client work.</>}
      />
      <section aria-label="Client work and our own projects" className="section pt-0">
        <div className="site-wrap">{groups ? <WorkShowcase works={groups} headingLevel={2} /> : <ContentUnavailable />}</div>
      </section>
      <EnquiryStep href="/contact?source=/works" />
    </>
  );
};

export default WorksPage;
