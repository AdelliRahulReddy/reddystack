import type { Metadata } from 'next';

import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin sign in | ReddyStack',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-ink px-4 py-16 text-ivory">
      <div className="w-full max-w-[400px] rounded-[28px] border border-line bg-raised p-8">
        <h1 className="font-display text-[24px] font-semibold tracking-[-0.02em]">ReddyStack admin</h1>
        <p className="mt-2 text-[14.5px] text-muted-foreground">
          Owner access only. Sign in with your Supabase account.
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
