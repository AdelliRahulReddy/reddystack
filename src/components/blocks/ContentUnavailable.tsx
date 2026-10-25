import { missingSupabaseVariables } from '@/lib/supabase/env';

/**
 * Honest fallback shown on DB-backed pages when data cannot be read: either
 * the env keys are missing, or reads are being blocked (e.g. RLS has no
 * policies yet). Never shows fake content.
 */
export default function ContentUnavailable() {
  const missing = missingSupabaseVariables();

  if (missing.length > 0) {
    return (
      <section className="site-wrap py-[clamp(48px,7vw,96px)]">
        <div className="max-w-[56ch] rounded-[var(--radius-card)] shadow-card border border-coral/40 bg-coral/10 p-8">
          <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">Content not connected yet</h2>
          <p className="mt-3 text-muted-foreground">
            This page reads from the shared database, which is not configured. Paste the following into
            <code className="mx-1 rounded-md bg-raised px-1.5 py-0.5 font-mono text-[13px]">.env.local</code>
            from the Supabase dashboard:
          </p>
          <ul className="mt-4 grid gap-2 font-mono text-[14px] text-ivory">
            {missing.map((name) => (
              <li key={name} className="rounded-xl bg-raised px-4 py-2">{name}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="site-wrap py-[clamp(48px,7vw,96px)]">
      <div className="max-w-[56ch] rounded-[var(--radius-card)] shadow-card border border-line bg-raised p-8">
        <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">Content not available yet</h2>
        <p className="mt-3 text-muted-foreground">
          This content reads from the shared database and is not available right now. It will appear once the
          database access is set up.
        </p>
      </div>
    </section>
  );
}
