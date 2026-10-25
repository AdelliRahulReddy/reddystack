import ContentEditor from '@/components/admin/ContentEditor';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listAllFaqs } from '@/lib/faqs';
import { listAllSiteContent } from '@/lib/siteContent';

export const dynamic = 'force-dynamic';

const ContentAdminPage = async () => {
  const client = await createSupabaseServerClient();
  const [sections, faqs] = await Promise.all([listAllSiteContent(client), listAllFaqs(client)]);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Content</h1>
        <p className="mt-1 text-muted-foreground">Edit the home hero, positioning and FAQs. Changes appear on the site immediately.</p>
      </div>
      {sections ? (
        <ContentEditor sections={sections} faqs={faqs ?? []} />
      ) : (
        <p className="rounded-[24px] border border-line bg-raised p-8 text-muted-foreground">No data yet (waiting on database access).</p>
      )}
    </div>
  );
};

export default ContentAdminPage;
