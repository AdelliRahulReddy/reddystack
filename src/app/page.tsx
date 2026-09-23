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
import PrototypeExperience from '@/app/prototype/PrototypeExperience';


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
      <PrototypeExperience projects={featuredPortfolioProjects} />
    </>
  );
};

export default MainHome;
