'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function AdminLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSignOut = async () => {
    if (loading) return;
    setLoading(true);
    const client = getBrowserClient();
    if (client) await client.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <Button variant="ghost" size="sm" onClick={onSignOut} disabled={loading}>
      {loading ? 'Signing out…' : 'Sign out'}
    </Button>
  );
}
