import type { Metadata } from 'next';

import PageHero from '@/components/blocks/PageHero';
import FaqBlock from '@/components/blocks/Faq';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import { buildBreadcrumbSchema, buildFAQPageSchema, buildPageMetadata } from '@/data/siteConfig';
import { listFaqs } from '@/lib/faqs';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildPageMetadata('faq');

const FaqPage = async () => {
  const client = await createSupabaseServerClient();
  const faqs = await listFaqs(client);

  const items = (faqs ?? []).map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]);
  const faqSchema = buildFAQPageSchema(items, '/faq');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly."
        accent="plainly."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'FAQ' }]}
        intro={<>What it costs, how long it takes, what you get, and what happens after you pay.</>}
      />
      {faqs ? (
        <FaqBlock
          items={items}
          title="Before you get in touch."
          label="Questions"
          id="faq-title"
          className="pb-[clamp(56px,8vw,120px)] pt-0"
        />
      ) : (
        <ContentUnavailable />
      )}
    </>
  );
};

export default FaqPage;
