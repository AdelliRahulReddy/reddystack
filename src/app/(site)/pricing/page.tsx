import PricingView from '@/components/views/PricingView';
import { buildBreadcrumbSchema, buildFAQPageSchema, buildPageMetadata } from '@/data/siteConfig';
import { listBundles } from '@/lib/bundles';
import { listFaqs } from '@/lib/faqs';
import { listActiveServices } from '@/lib/services';
import { DEFAULT_SETTINGS, getSettings } from '@/lib/settings';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata = buildPageMetadata('pricing');

const PricingRoute = async () => {
  const client = await createSupabaseServerClient();
  const [bundles, services, faqs, settings] = await Promise.all([
    listBundles(client),
    listActiveServices(client),
    listFaqs(client),
    getSettings(client),
  ]);

  const bundle = bundles?.[0] ?? null;

  const faqSchema = buildFAQPageSchema(
    (faqs ?? []).map((faq) => ({ question: faq.question, answer: faq.answer })),
    '/pricing',
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ]);

  return (
    <>
      {(faqs ?? []).length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PricingView
        bundle={bundle}
        services={services ?? []}
        faqs={faqs ?? []}
        settings={settings ?? DEFAULT_SETTINGS}
      />
    </>
  );
};

export default PricingRoute;
