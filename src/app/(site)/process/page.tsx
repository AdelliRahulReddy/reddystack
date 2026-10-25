import type { Metadata } from 'next';

import PageHero from '@/components/blocks/PageHero';
import ProcessView from '@/components/views/ProcessView';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';
import { DEFAULT_SETTINGS, getSettings } from '@/lib/settings';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildPageMetadata('process');

const ProcessPage = async () => {
  const client = await createSupabaseServerClient();
  const settings = await getSettings(client);
  const advancePercent = settings?.advance_percent ?? DEFAULT_SETTINGS.advance_percent;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Process', path: '/process' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Process"
        title="How a project runs."
        accent="runs."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Process' }]}
        intro={
          <>
            Four steps, written updates, no daily calls needed. You always know what is done and what happens
            next.
          </>
        }
      />
      <ProcessView advancePercent={advancePercent} />
    </>
  );
};

export default ProcessPage;
