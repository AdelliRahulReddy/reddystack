'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Service, ServiceOption } from '@/types/database';
import { formatInr } from '@/lib/money';
import { saveService, saveServiceOption, setServiceActive } from '@/lib/services';
import { getBrowserClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = { services: Service[]; options: ServiceOption[] };

export default function ServicesEditor({ services, options }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const client = getBrowserClient();

  const run = async (key: string, fn: () => Promise<boolean>) => {
    setSaving(key);
    setMessage('');
    const ok = await fn();
    setMessage(ok ? 'Saved.' : 'Save failed.');
    setSaving(null);
    router.refresh();
  };

  const toggleActive = (service: Service) => {
    if (!client) return;
    void run(service.id, () => setServiceActive(client, service.id, !service.is_active));
  };

  return (
    <div className="grid gap-5">
      <NewServiceForm onSaved={() => router.refresh()} />

      {services.map((service) => (
        <ServiceRow
          key={service.id}
          service={service}
          options={options.filter((o) => o.service_id === service.id)}
          busy={saving === service.id}
          onSave={(input) => {
            if (!client) return;
            void run(service.id, () => saveService(client, { ...input, id: service.id }));
          }}
          onToggle={() => toggleActive(service)}
        />
      ))}

      {message && <p className="text-[14px] text-muted-foreground">{message}</p>}
    </div>
  );
}

function NewServiceForm({ onSaved }: { onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [billingType, setBillingType] = useState<'one_time' | 'monthly'>('one_time');
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    await saveService(client, {
      name,
      base_price: Number(basePrice) || 0,
      billing_type: billingType,
    });
    setSaving(false);
    setName('');
    setBasePrice('');
    setOpen(false);
    onSaved();
  };

  if (!open) {
    return (
      <div>
        <Button variant="ghost" onClick={() => setOpen(true)}>+ Add service</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-lime/40 bg-raised p-6">
      <h2 className="font-display text-[18px] font-semibold">Add service</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="new-service-name">Name</Label>
          <Input id="new-service-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="new-service-price">Base price (INR)</Label>
          <Input id="new-service-price" required type="number" min={0} value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="new-service-billing">Billing</Label>
        <select
          id="new-service-billing"
          value={billingType}
          onChange={(e) => setBillingType(e.target.value as 'one_time' | 'monthly')}
          className="mt-2 h-12 w-full rounded-2xl border border-input bg-graphite px-4 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="one_time">One-time</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Adding…' : 'Add service'}</Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </form>
  );
}

function ServiceRow({
  service,
  options,
  busy,
  onSave,
  onToggle,
}: {
  service: Service;
  options: ServiceOption[];
  busy: boolean;
  onSave: (input: Partial<Service>) => void;
  onToggle: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Service>>({});

  const startEdit = () => {
    setForm({ ...service });
    setEditing(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setEditing(false);
  };

  return (
    <div className="rounded-[24px] border border-line bg-raised p-6">
      {editing ? (
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={`svc-name-${service.id}`}>Name</Label>
              <Input id={`svc-name-${service.id}`} value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor={`svc-slug-${service.id}`}>Slug</Label>
              <Input id={`svc-slug-${service.id}`} value={form.slug ?? ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor={`svc-desc-${service.id}`}>Description</Label>
            <Input id={`svc-desc-${service.id}`} value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={`svc-includes-${service.id}`}>Includes (one line)</Label>
              <Input id={`svc-includes-${service.id}`} value={form.includes ?? ''} onChange={(e) => setForm({ ...form, includes: e.target.value })} />
            </div>
            <div>
              <Label htmlFor={`svc-excludes-${service.id}`}>Excludes (one line)</Label>
              <Input id={`svc-excludes-${service.id}`} value={form.excludes ?? ''} onChange={(e) => setForm({ ...form, excludes: e.target.value })} />
            </div>
            <div>
              <Label htmlFor={`svc-delivery-${service.id}`}>Delivery time</Label>
              <Input id={`svc-delivery-${service.id}`} value={form.delivery_time ?? ''} onChange={(e) => setForm({ ...form, delivery_time: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`svc-price-${service.id}`}>Price (INR)</Label>
                <Input id={`svc-price-${service.id}`} type="number" min={0} value={form.base_price ?? 0} onChange={(e) => setForm({ ...form, base_price: Number(e.target.value) })} />
              </div>
              <div>
                <Label htmlFor={`svc-sort-${service.id}`}>Sort</Label>
                <Input id={`svc-sort-${service.id}`} type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor={`svc-billing-${service.id}`}>Billing</Label>
            <select
              id={`svc-billing-${service.id}`}
              value={form.billing_type ?? 'one_time'}
              onChange={(e) => setForm({ ...form, billing_type: e.target.value as 'one_time' | 'monthly' })}
              className="mt-2 h-12 w-full rounded-2xl border border-input bg-graphite px-4 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="one_time">One-time</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save service'}</Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-display text-[18px] font-semibold">{service.name}</h2>
                {!service.is_active && <Badge variant="secondary">Hidden</Badge>}
              </div>
              <p className="mt-1 font-mono text-xs text-faint">/{service.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-[22px] font-semibold">{formatInr(service.base_price)}</span>
              <span className="rounded-full border border-line px-3 py-1 text-[12px] text-muted-foreground">
                {service.billing_type === 'monthly' ? 'Per month' : 'One-time'}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="ghost" onClick={startEdit}>Edit</Button>
            <Button size="sm" variant="ghost" onClick={onToggle}>
              {service.is_active ? 'Hide' : 'Show'}
            </Button>
          </div>
          {options.length > 0 && (
            <div className="mt-4 border-t border-line pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-faint">Options</p>
              <ul className="mt-2 grid gap-1.5">
                {options.map((option) => (
                  <li key={option.id} className="flex items-center justify-between gap-3 text-[14px] text-muted-foreground">
                    <span>{option.option_name}</span>
                    <span className="font-medium text-ivory">+{formatInr(option.extra_price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <AddOptionForm serviceId={service.id} />
        </>
      )}
    </div>
  );
}

function AddOptionForm({ serviceId }: { serviceId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    await saveServiceOption(client, {
      service_id: serviceId,
      option_name: name,
      extra_price: Number(price) || 0,
    });
    setName('');
    setPrice('');
    setOpen(false);
  };

  if (!open) {
    return (
      <div className="mt-4">
        <button type="button" onClick={() => setOpen(true)} className="text-[13.5px] text-lime underline underline-offset-4 hover:text-ivory">
          + Add option
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 rounded-2xl border border-line bg-graphite p-4 sm:grid-cols-[1fr_140px_auto] sm:items-end">
      <div>
        <Label htmlFor={`opt-name-${serviceId}`}>Option name</Label>
        <Input id={`opt-name-${serviceId}`} required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor={`opt-price-${serviceId}`}>Price (INR)</Label>
        <Input id={`opt-price-${serviceId}`} required type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm">Add</Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </form>
  );
}
