import ContactView from '@/components/views/ContactView';
import { buildBreadcrumbSchema, buildPageMetadata, contactPageSchema } from '@/data/siteConfig';
import { listEnquiryChoices } from '@/lib/enquiryChoices';
import { DEFAULT_SETTINGS, getSettings } from '@/lib/settings';
import { createSupabaseServerClient } from '@/lib/supabase/server';


export const metadata = buildPageMetadata("contact");


const index = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const params = await searchParams;
  const client = await createSupabaseServerClient();
  const [choices, settings] = await Promise.all([listEnquiryChoices(client), getSettings(client)]);
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
      <ContactView key={`${initialService}:${sourcePage}`} choices={choices ?? []} settings={settings ?? DEFAULT_SETTINGS} initialService={initialService} sourcePage={sourcePage} />
    </>
  );
};

export default index;
