'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Bundle } from '@/types/database';
import { updateBundle } from '@/lib/bundles';
import { formatInr } from '@/lib/money';
import { getBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const textareaClass =
  'mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-[15px] text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

/** Edits the lead offer (Enquiry Sprint): name, price, what it includes and its guarantee line. */
export default function BundleEditor({ bundle }: { bundle: Bundle }) {
  const router = useRouter();
  const [name, setName] = useState(bundle.name);
  const [price, setPrice] = useState(String(bundle.fixed_price));
  const [description, setDescription] = useState(bundle.description);
  const [guarantee, setGuarantee] = useState(bundle.guarantee_text);
  const [isActive, setIsActive] = useState(bundle.is_active);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const priceValue = Number(price);
  const priceValid = /^\d+$/.test(price.trim()) && priceValue >= 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceValid || !name.trim()) {
      setMessage({ ok: false, text: 'Enter a name and a whole-rupee price (digits only).' });
      return;
    }
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    setMessage(null);
    const ok = await updateBundle(client, bundle.id, {
      name: name.trim(),
      fixed_price: priceValue,
      description: description.trim(),
      guarantee_text: guarantee.trim(),
      is_active: isActive,
    });
    setSaving(false);
    setMessage(ok ? { ok: true, text: 'Saved. The site and calculator now show this.' } : { ok: false, text: 'Save failed. Check you are signed in as the owner and try again.' });
    if (ok) router.refresh();
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-lime/30 bg-raised p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em]">Lead offer</h2>
        <span className="text-[14px] text-muted-foreground">Shown now: {formatInr(bundle.fixed_price)} one-time</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          <Label htmlFor={`bundle-name-${bundle.id}`}>Name</Label>
          <Input id={`bundle-name-${bundle.id}`} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor={`bundle-price-${bundle.id}`}>Price, one-time (₹, digits only)</Label>
          <Input id={`bundle-price-${bundle.id}`} inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} aria-invalid={!priceValid} required />
        </div>
      </div>
      <div>
        <Label htmlFor={`bundle-desc-${bundle.id}`}>What it includes (shown in the Sprint box and calculator)</Label>
        <textarea id={`bundle-desc-${bundle.id}`} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={textareaClass} />
      </div>
      <div>
        <Label htmlFor={`bundle-guarantee-${bundle.id}`}>Guarantee line in the Sprint box</Label>
        <textarea id={`bundle-guarantee-${bundle.id}`} rows={2} value={guarantee} onChange={(e) => setGuarantee(e.target.value)} className={textareaClass} />
        <p className="pt-1.5 text-[13px] text-faint">The homepage guarantee section uses the separate guarantee text in Settings.</p>
      </div>
      <label className="flex items-center gap-3 text-[15px]">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="size-4 accent-lime" />
        Show this offer on the site
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save lead offer'}</Button>
        {message && (
          <p role={message.ok ? 'status' : 'alert'} className={message.ok ? 'text-[14px] text-lime' : 'text-[14px] text-coral'}>
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
