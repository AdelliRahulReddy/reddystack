import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AdminLogout from '@/components/admin/AdminLogout';
import AdminNav from '@/components/admin/AdminNav';
import { getAdminEmail, isAdminUser } from '@/lib/admin';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin | ReddyStack',
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="grid min-h-dvh place-items-center bg-ink px-4 py-16 text-ivory">
        <div className="max-w-[52ch] rounded-[28px] border border-coral/40 bg-coral/10 p-8">
          <h1 className="font-display text-[24px] font-semibold tracking-[-0.02em]">Database not connected</h1>
          <p className="mt-3 text-muted-foreground">
            Paste NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY into .env.local to use the admin.
          </p>
        </div>
      </main>
    );
  }

  const client = await createSupabaseServerClient();
  if (!client) {
    redirect('/admin/login');
  }

  const email = await getAdminEmail(client);
  if (!email) {
    redirect('/admin/login');
  }

  const owner = await isAdminUser(client, email);
  if (!owner) {
    return (
      <main className="grid min-h-dvh place-items-center bg-ink px-4 py-16 text-ivory">
        <div className="max-w-[52ch] rounded-[28px] border border-line bg-raised p-8">
          <h1 className="font-display text-[24px] font-semibold tracking-[-0.02em]">Not authorised</h1>
          <p className="mt-3 text-muted-foreground">
            Signed in as <span className="font-mono text-ivory">{email}</span>, but that email is not an owner in
            admin_users. Ask the owner to add your email there.
          </p>
          <div className="mt-6"><AdminLogout /></div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-dvh bg-ink text-ivory">
      <header className="border-b border-line bg-graphite/60 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-[18px] font-semibold tracking-[-0.02em]">ReddyStack admin</span>
            <AdminNav />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-faint min-[640px]:inline">{email}</span>
            <AdminLogout />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1120px] px-5 py-8">{children}</main>
    </div>
  );
}
