import HomeOne from '@/components/homes/home';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';
import {
  buildCanonicalUrl,
  buildFAQPageSchema,
  buildPageMetadata,
  homePageSchema,
} from '@/data/siteConfig';
import type { Metadata } from 'next';
import { marketRootLanguageAlternates } from '@/data/MarketSeo';
import { homeFaqItems } from '@/data/HomeFaqData';


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
      <Wrapper>
        <HomeOne />
      </Wrapper>
    </>
  );
};

export default MainHome;
