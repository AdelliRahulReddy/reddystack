import { createSupabaseServerClient } from '@/lib/supabase/server';
import { listEnquiries } from '@/lib/enquiries';
import { countEnquiriesByStatus, countEnquiriesSince, listMostPickedServices } from '@/lib/stats';
import { startOfTodayIso, startOfWeekIso } from '@/lib/dates';

export const dynamic = 'force-dynamic';

const STATUS_LABELS = ['new', 'contacted', 'quoted', 'won', 'lost'] as const;

function formatIst(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const DashboardPage = async () => {
  const client = await createSupabaseServerClient();

  const [today, week, byStatus, mostPicked, latest] = await Promise.all([
    countEnquiriesSince(client, startOfTodayIso()),
    countEnquiriesSince(client, startOfWeekIso()),
    countEnquiriesByStatus(client),
    listMostPickedServices(client),
    listEnquiries(client),
  ]);

  if (byStatus === null) {
    return (
      <div className="rounded-[24px] border border-line bg-raised p-8 text-muted-foreground">
        No data yet. Enquiries and quotes will appear here once database access is set up.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Live counts from the shared database.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[24px] border border-line bg-raised p-6">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-faint">Enquiries today</p>
          <p className="mt-2 font-display text-[36px] font-semibold">{today ?? '—'}</p>
        </div>
        <div className="rounded-[24px] border border-line bg-raised p-6">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-faint">This week</p>
          <p className="mt-2 font-display text-[36px] font-semibold">{week ?? '—'}</p>
        </div>
        <div className="rounded-[24px] border border-line bg-raised p-6">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-faint">By status</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUS_LABELS.map((status) => (
              <span key={status} className="rounded-full border border-line px-3 py-1 text-[13px] text-muted-foreground">
                {status} <span className="font-semibold text-ivory">{byStatus[status]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[24px] border border-line bg-raised p-6">
          <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em]">Most-picked services</h2>
          {mostPicked && mostPicked.length > 0 ? (
            <ul className="mt-4 grid gap-2">
              {mostPicked.map((item) => (
                <li key={item.name} className="flex items-center justify-between gap-4 rounded-xl bg-graphite px-4 py-3">
                  <span className="text-[15px]">{item.name}</span>
                  <span className="font-mono text-sm text-lime">{item.count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted-foreground">No calculator quotes yet.</p>
          )}
        </section>

        <section className="rounded-[24px] border border-line bg-raised p-6">
          <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em]">Latest enquiries</h2>
          {latest && latest.length > 0 ? (
            <ul className="mt-4 grid gap-2">
              {latest.slice(0, 6).map((enquiry) => (
                <li key={enquiry.id} className="rounded-xl bg-graphite px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{enquiry.name}</span>
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted-foreground">{enquiry.status}</span>
                  </div>
                  <p className="mt-1 truncate text-[13.5px] text-muted-foreground">
                    {enquiry.service_interest || 'No service selected'} · {formatIst(enquiry.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted-foreground">No enquiries yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
