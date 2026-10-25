import type { Metadata } from 'next';

import { ButtonLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
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
        title="What we can do for your business."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
        intro={
          <>
            Pages that bring enquiries, Facebook &amp; Instagram ads, and getting found on Google. Every service has a
            public price, and ad spend is always separate — <strong>paid directly to Meta, not to us</strong>.
          </>
        }
        actions={<ButtonLink href="/calculator">Work out my price</ButtonLink>}
      />
      <section aria-label="Services and prices" className="section bg-surface">
        {services ? <ServicesPricingView services={services} /> : <ContentUnavailable />}
      </section>
      <EnquiryStep href="/contact?source=/services" />
    </>
  );
};

export default ServicesPage;
