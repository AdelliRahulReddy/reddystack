import EnquiriesPipeline from '@/components/admin/EnquiriesPipeline';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listEnquiries } from '@/lib/enquiries';

export const dynamic = 'force-dynamic';

const EnquiriesAdminPage = async () => {
  const client = await createSupabaseServerClient();
  const enquiries = await listEnquiries(client);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Enquiries</h1>
        <p className="mt-1 text-muted-foreground">Move each enquiry through new → contacted → quoted → won / lost.</p>
      </div>
      {enquiries ? <EnquiriesPipeline enquiries={enquiries} /> : (
        <p className="rounded-[24px] border border-line bg-raised p-8 text-muted-foreground">No data yet (waiting on database access).</p>
      )}
    </div>
  );
};

export default EnquiriesAdminPage;
