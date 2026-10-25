import type { Metadata } from 'next';

import PageHero from '@/components/blocks/PageHero';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import CalculatorView from '@/components/views/CalculatorView';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';
import { listActiveServices, listServiceOptions } from '@/lib/services';
import { getSettings } from '@/lib/settings';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildPageMetadata('calculator');

const CalculatorPage = async () => {
  const client = await createSupabaseServerClient();
  const [services, options, settings] = await Promise.all([
    listActiveServices(client),
    listServiceOptions(client),
    getSettings(client),
  ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Calculator', path: '/calculator' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Price calculator"
        title="Add up your own stack."
        accent="stack."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Calculator' }]}
        intro={
          <>
            Tick the services and add-ons you need. One-time and monthly totals are shown separately, and ad
            spend is always separate — <strong>paid directly to Meta, not to us</strong>.
          </>
        }
      />
      {services && options && settings ? (
        <CalculatorView services={services} options={options} settings={settings} />
      ) : (
        <ContentUnavailable />
      )}
    </>
  );
};

export default CalculatorPage;
