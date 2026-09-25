import {
  buildCanonicalUrl,
  buildFAQPageSchema,
  buildPageMetadata,
  homePageSchema,
} from '@/data/siteConfig';
import type { Metadata } from 'next';
import { marketRootLanguageAlternates } from '@/data/MarketSeo';
import { homeFaqItems } from '@/data/HomeFaqData';
import { featuredPortfolioProjects } from '@/data/FeaturedPortfolioProjects';
import HomeV3 from '@/components/home-v3/HomeV3';


export const metadata: Metadata = {
  ...buildPageMetadata("home"),
  alternates: {
    canonical: buildCanonicalUrl("/"),
    languages: marketRootLanguageAlternates,
  },
};

const MainHome = () => {
  const homeFaqSchema = buildFAQPageSchema(homeFaqItems, "/");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <HomeV3 projects={featuredPortfolioProjects} />
    </>
  );
};

export default MainHome;
