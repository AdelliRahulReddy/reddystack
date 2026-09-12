import HomeOne from '@/components/homes/home';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';
import {
  buildFAQPageSchema,
  buildPageMetadata,
  homePageSchema,
} from '@/data/siteConfig';
import { homeFaqItems } from '@/data/HomeFaqData';


export const metadata = buildPageMetadata("home");

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
