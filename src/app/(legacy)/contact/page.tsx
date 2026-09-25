import Contact from '@/components/contact';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';
import { buildBreadcrumbSchema, buildPageMetadata, contactPageSchema } from '@/data/siteConfig';


export const metadata = buildPageMetadata("contact");


const index = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const params = await searchParams;
  const initialService = typeof params.service === 'string' ? params.service : '';
  const sourcePage = typeof params.source === 'string' && params.source.length <= 200 && /^\/(?!\/)[a-z0-9/-]*(?![\s\S])/.test(params.source) ? params.source : '';
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Wrapper>
        <Contact key={`${initialService}:${sourcePage}`} initialService={initialService} sourcePage={sourcePage} />
      </Wrapper>
    </>
  );
};

export default index;
