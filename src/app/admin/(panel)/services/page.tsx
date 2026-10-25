import BundleEditor from '@/components/admin/BundleEditor';
import ServicesEditor from '@/components/admin/ServicesEditor';
import { listBundles } from '@/lib/bundles';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listAllServices, listServiceOptions } from '@/lib/services';

export const dynamic = 'force-dynamic';

const ServicesAdminPage = async () => {
  const client = await createSupabaseServerClient();
  const [bundles, services, options] = await Promise.all([listBundles(client), listAllServices(client), listServiceOptions(client)]);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Lead offer, services & prices</h1>
        <p className="mt-1 text-muted-foreground">
          Edits here write to Supabase and appear on the public site and calculator immediately — no redeploy.
        </p>
      </div>
      {(bundles ?? []).map((bundle) => <BundleEditor key={bundle.id} bundle={bundle} />)}
      {services ? <ServicesEditor services={services} options={options ?? []} /> : (
        <p className="rounded-[24px] border border-line bg-raised p-8 text-muted-foreground">No data yet (waiting on database access).</p>
      )}
    </div>
  );
};

export default ServicesAdminPage;
