'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { AppSettings, SettingKey } from '@/types/database';
import { saveSetting } from '@/lib/settings';
import { getBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FIELDS: { key: SettingKey; label: string; type: 'text' | 'number' }[] = [
  { key: 'whatsapp_number', label: 'WhatsApp number (digits only)', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'advance_percent', label: 'Advance %', type: 'number' },
  { key: 'guarantee_text', label: 'Guarantee text (homepage guarantee section)', type: 'text' },
];

export default function SettingsEditor({ settings }: { settings: AppSettings }) {
  const router = useRouter();
  const [values, setValues] = useState<AppSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    setMessage('');
    const results = await Promise.all(
      FIELDS.map((field) => saveSetting(client, field.key, String(values[field.key]))),
    );
    setSaving(false);
    setMessage(results.every(Boolean) ? 'Saved.' : 'Save failed.');
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="grid max-w-[560px] gap-4 rounded-[24px] border border-line bg-raised p-6">
      {FIELDS.map((field) => (
        <div key={field.key}>
          <Label htmlFor={`setting-${field.key}`}>{field.label}</Label>
          <Input
            id={`setting-${field.key}`}
            type={field.type}
            value={values[field.key]}
            onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
          />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</Button>
        {message && <p className="text-[14px] text-muted-foreground">{message}</p>}
      </div>
    </form>
  );
}
