'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Work, WorkType } from '@/types/database';
import { saveWork, setWorkShown } from '@/lib/works';
import { getBrowserClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WORK_TYPES: { value: WorkType; label: string }[] = [
  { value: 'client', label: 'Client work' },
  { value: 'portfolio', label: 'Portfolio' },
];

export default function WorksManager({ works }: { works: Work[] }) {
  const router = useRouter();

  const toggleShown = async (work: Work) => {
    const client = getBrowserClient();
    if (!client) return;
    await setWorkShown(client, work.id, !work.is_shown);
    router.refresh();
  };

  return (
    <div className="grid gap-5">
      <NewWorkForm onSaved={() => router.refresh()} />

      {works.map((work) => (
        <WorkRow key={work.id} work={work} onToggle={() => toggleShown(work)} onSaved={() => router.refresh()} />
      ))}
    </div>
  );
}

function WorkRow({ work, onToggle, onSaved }: { work: Work; onToggle: () => void; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Work>>({});
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setForm({ ...work });
    setEditing(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    await saveWork(client, { ...form, id: work.id, work_type: (form.work_type ?? 'portfolio') as WorkType });
    setSaving(false);
    setEditing(false);
    onSaved();
  };

  if (editing) {
    return (
      <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-line bg-raised p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor={`work-title-${work.id}`}>Title</Label>
            <Input id={`work-title-${work.id}`} required value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor={`work-type-${work.id}`}>Type</Label>
            <select
              id={`work-type-${work.id}`}
              value={form.work_type ?? 'portfolio'}
              onChange={(e) => setForm({ ...form, work_type: e.target.value as WorkType })}
              className="mt-2 h-12 w-full rounded-2xl border border-input bg-graphite px-4 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {WORK_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor={`work-client-${work.id}`}>Client name</Label>
            <Input id={`work-client-${work.id}`} value={form.client_name ?? ''} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor={`work-sort-${work.id}`}>Sort order</Label>
            <Input id={`work-sort-${work.id}`} type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </div>
        </div>
        <div>
          <Label htmlFor={`work-desc-${work.id}`}>Description</Label>
          <Input id={`work-desc-${work.id}`} value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor={`work-image-${work.id}`}>Image URL</Label>
            <Input id={`work-image-${work.id}`} value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          </div>
          <div>
            <Label htmlFor={`work-link-${work.id}`}>Link</Label>
            <Input id={`work-link-${work.id}`} value={form.link ?? ''} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save work'}</Button>
          <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-[24px] border border-line bg-raised p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-[18px] font-semibold">{work.title}</h2>
            <Badge variant={work.work_type === 'client' ? 'default' : 'secondary'}>
              {work.work_type === 'client' ? 'Client' : 'Portfolio'}
            </Badge>
            {!work.is_shown && <Badge variant="secondary">Hidden</Badge>}
          </div>
          {work.client_name && <p className="mt-1 font-mono text-xs text-faint">{work.client_name}</p>}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={startEdit}>Edit</Button>
          <Button size="sm" variant="ghost" onClick={onToggle}>{work.is_shown ? 'Hide' : 'Show'}</Button>
        </div>
      </div>
      {work.description && <p className="mt-3 text-[14.5px] text-muted-foreground">{work.description}</p>}
    </div>
  );
}

function NewWorkForm({ onSaved }: { onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<WorkType>('portfolio');
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    await saveWork(client, { title, work_type: type });
    setSaving(false);
    setTitle('');
    setOpen(false);
    onSaved();
  };

  if (!open) {
    return (
      <div><Button variant="ghost" onClick={() => setOpen(true)}>+ Add work</Button></div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-lime/40 bg-raised p-6 sm:grid-cols-[1fr_180px_auto] sm:items-end">
      <div>
        <Label htmlFor="new-work-title">Title</Label>
        <Input id="new-work-title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="new-work-type">Type</Label>
        <select
          id="new-work-type"
          value={type}
          onChange={(e) => setType(e.target.value as WorkType)}
          className="mt-2 h-12 w-full rounded-2xl border border-input bg-graphite px-4 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {WORK_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>{saving ? 'Adding…' : 'Add'}</Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </form>
  );
}
