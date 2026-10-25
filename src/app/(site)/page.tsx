import {
  buildCanonicalUrl,
  buildFAQPageSchema,
  buildPageMetadata,
  homePageSchema,
} from '@/data/siteConfig';
import type { Metadata } from 'next';
import { marketRootLanguageAlternates } from '@/data/MarketSeo';
import HomeView from '@/components/views/HomeView';
import { listBundles } from '@/lib/bundles';
import { listFaqs } from '@/lib/faqs';
import { listActiveServices } from '@/lib/services';
import { DEFAULT_SETTINGS, getSettings } from '@/lib/settings';
import { buildHeroContent, getSiteContent } from '@/lib/siteContent';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { groupWorksByType, listVisibleWorks } from '@/lib/works';

export const metadata: Metadata = {
  ...buildPageMetadata("home"),
  alternates: {
    canonical: buildCanonicalUrl("/"),
    languages: marketRootLanguageAlternates,
  },
};

const MainHome = async () => {
  const client = await createSupabaseServerClient();

  const [heroRow, positioningRow, bundles, services, works, faqs, settings] = await Promise.all([
    getSiteContent(client, 'hero'),
    getSiteContent(client, 'positioning'),
    listBundles(client),
    listActiveServices(client),
    listVisibleWorks(client),
    listFaqs(client),
    getSettings(client),
  ]);

  const hero = buildHeroContent(heroRow);
  const positioning = buildHeroContent(positioningRow);
  const bundle = bundles?.[0] ?? null;
  const workGroups = groupWorksByType(works ?? []);

  const homeFaqSchema = buildFAQPageSchema(
    (faqs ?? []).map((faq) => ({ question: faq.question, answer: faq.answer })),
    '/',
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      {(faqs ?? []).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
        />
      )}
      <HomeView
        hero={hero}
        positioning={positioning}
        bundle={bundle}
        services={services ?? []}
        works={workGroups}
        faqs={faqs ?? []}
        settings={settings ?? DEFAULT_SETTINGS}
      />
    </>
  );
};

export default MainHome;
