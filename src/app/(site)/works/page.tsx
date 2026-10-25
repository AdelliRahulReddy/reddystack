import type { Metadata } from 'next';

import CtaBand from '@/components/blocks/CtaBand';
import PageHero from '@/components/blocks/PageHero';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import WorksView from '@/components/views/WorksView';
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
        eyebrow="Work"
        title="What we have actually built."
        accent="actually built."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Work' }]}
        intro={
          <>
            Client work and portfolio projects are shown separately and labelled. We never present a demo or a
            personal project as client work.
          </>
        }
      />
      {groups ? <WorksView client={groups.client} portfolio={groups.portfolio} /> : <ContentUnavailable />}
      <CtaBand href="/contact?source=/works" />
    </>
  );
};

export default WorksPage;
