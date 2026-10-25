import type { Metadata } from 'next';

import PageHero from '@/components/blocks/PageHero';
import FaqBlock from '@/components/blocks/Faq';
import ContentUnavailable from '@/components/blocks/ContentUnavailable';
import { buildBreadcrumbSchema, buildFAQPageSchema, buildPageMetadata } from '@/data/siteConfig';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import { listFaqs } from '@/lib/faqs';
import { DEFAULT_SETTINGS, getSettings } from '@/lib/settings';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = buildPageMetadata('faq');

const FaqPage = async () => {
  const client = await createSupabaseServerClient();
  const [faqs, settings] = await Promise.all([listFaqs(client), getSettings(client)]);
  const whatsappHref = buildWhatsAppLink((settings ?? DEFAULT_SETTINGS).whatsapp_number, 'Hi, I have a question about ReddyStack.');

  const items = (faqs ?? []).map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]);
  const faqSchema = buildFAQPageSchema(items, '/faq');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {items.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <PageHero
        title="Questions, answered plainly."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'FAQ' }]}
        intro={<>What it costs, how long it takes, what you get, and what happens after you pay.</>}
      />
      {faqs ? (
        <FaqBlock
          items={items}
          title="Before you get in touch."
          id="faq-title"
          whatsappHref={whatsappHref}
          className="pb-[clamp(56px,8vw,120px)] pt-0"
        />
      ) : (
        <ContentUnavailable />
      )}
      <EnquiryStep href="/contact?source=/faq" />
    </>
  );
};

export default FaqPage;
