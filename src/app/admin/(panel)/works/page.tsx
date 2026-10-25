import WorksManager from '@/components/admin/WorksManager';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listAllWorks } from '@/lib/works';

export const dynamic = 'force-dynamic';

const WorksAdminPage = async () => {
  const client = await createSupabaseServerClient();
  const works = await listAllWorks(client);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Works</h1>
        <p className="mt-1 text-muted-foreground">
          Client work and portfolio are separate and labelled — never mix them.
        </p>
      </div>
      {works ? <WorksManager works={works} /> : (
        <p className="rounded-[24px] border border-line bg-raised p-8 text-muted-foreground">No data yet (waiting on database access).</p>
      )}
    </div>
  );
};

export default WorksAdminPage;
