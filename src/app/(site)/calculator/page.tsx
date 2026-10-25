import type { Metadata } from 'next';

import PageHero from '@/components/blocks/PageHero';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import { listBundles } from '@/lib/bundles';
import CalculatorView from '@/components/views/CalculatorView';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';
import { listActiveServices, listServiceOptions } from '@/lib/services';
import { getSettings } from '@/lib/settings';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildPageMetadata('calculator');

const CalculatorPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const params = await searchParams;
  const initialPick = typeof params.pick === 'string' && /^[a-z0-9-]{1,80}$/.test(params.pick) ? params.pick : '';
  const client = await createSupabaseServerClient();
  const [bundles, services, options, settings] = await Promise.all([
    listBundles(client),
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
        title="Work out your price."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Calculator' }]}
        intro={
          <>
            Tick the main offer, or just the services you need. One-time and monthly totals are shown separately, and ad
            spend is always separate — <strong>paid directly to Meta, not to us</strong>.
          </>
        }
      />
      {services && options && settings ? (
        <CalculatorView bundles={bundles ?? []} services={services} options={options} settings={settings} initialPick={initialPick} />
      ) : (
        <ContentUnavailable />
      )}
    </>
  );
};

export default CalculatorPage;
