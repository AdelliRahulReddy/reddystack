import type { Metadata } from 'next';

import CtaBand from '@/components/blocks/CtaBand';
import PageHero from '@/components/blocks/PageHero';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import ServicesPricingView from '@/components/views/ServicesPricingView';
import { buildBreadcrumbSchema, buildPageMetadata } from '@/data/siteConfig';
import { listActiveServices } from '@/lib/services';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildPageMetadata('servicesPricing');

const ServicesPage = async () => {
  const client = await createSupabaseServerClient();
  const services = await listActiveServices(client);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Services"
        title="Plain prices, no surprises."
        accent="prices,"
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
        intro={
          <>
            Every service is priced up front. One-time vs monthly is always labelled, and ad spend is always
            separate — <strong>paid directly to Meta, not to us</strong>.
          </>
        }
      />
      {services ? <ServicesPricingView services={services} /> : <ContentUnavailable />}
      <CtaBand href="/contact?source=/services" />
    </>
  );
};

export default ServicesPage;
