'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Enquiry, EnquiryStatus } from '@/types/database';
import { updateEnquiry } from '@/lib/enquiries';
import { getBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STATUSES: EnquiryStatus[] = ['new', 'contacted', 'quoted', 'won', 'lost'];

function formatIst(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function EnquiriesPipeline({ enquiries }: { enquiries: Enquiry[] }) {
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all');

  const visible = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter);
  const counts = (status: EnquiryStatus | 'all') =>
    status === 'all' ? enquiries.length : enquiries.filter((e) => e.status === status).length;

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(['all', ...STATUSES] as const).map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={filter === status}
            onClick={() => setFilter(status)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-[14px] transition-colors',
              filter === status ? 'border-lime bg-lime text-lime-ink' : 'border-line text-muted-foreground hover:border-ivory/40',
            )}
          >
            {status} <span className="opacity-70">({counts(status)})</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-[24px] border border-line bg-raised p-8 text-muted-foreground">No enquiries in this stage.</p>
      ) : (
        <div className="grid gap-4">
          {visible.map((enquiry) => (
            <EnquiryRow key={enquiry.id} enquiry={enquiry} />
          ))}
        </div>
      )}
    </div>
  );
}

function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.notes);
  const [followUp, setFollowUp] = useState(enquiry.follow_up_date ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const persist = async (patch: Partial<Enquiry>) => {
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    const ok = await updateEnquiry(client, enquiry.id, patch);
    setSaving(false);
    setSaved(ok);
    router.refresh();
  };

  const onStatusChange = (next: EnquiryStatus) => {
    setStatus(next);
    void persist({ status: next });
  };

  return (
    <article className="rounded-[24px] border border-line bg-raised p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-[18px] font-semibold">{enquiry.name}</h2>
          <p className="mt-0.5 text-[13.5px] text-muted-foreground">
            {enquiry.business_name} · {formatIst(enquiry.created_at)} · <span className="font-mono text-xs">{enquiry.source}</span>
          </p>
        </div>
        <label className="sr-only" htmlFor={`status-${enquiry.id}`}>Status</label>
        <select
          id={`status-${enquiry.id}`}
          value={status}
          onChange={(e) => onStatusChange(e.target.value as EnquiryStatus)}
          className="h-10 rounded-full border border-line bg-graphite px-3 text-[14px] text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <dl className="mt-3 grid gap-1 text-[14px] text-muted-foreground">
        {enquiry.phone && (
          <div className="flex gap-2"><dt className="text-faint">Phone</dt><dd className="text-ivory">{enquiry.phone}</dd></div>
        )}
        {enquiry.email && (
          <div className="flex gap-2"><dt className="text-faint">Email</dt><dd className="text-ivory">{enquiry.email}</dd></div>
        )}
        {enquiry.service_interest && (
          <div className="flex gap-2"><dt className="text-faint">Interested in</dt><dd className="text-ivory">{enquiry.service_interest}</dd></div>
        )}
      </dl>

      {enquiry.message && <p className="mt-3 rounded-2xl bg-graphite p-4 text-[15px]">{enquiry.message}</p>}

      <div className="mt-4 grid gap-3">
        <div>
          <label htmlFor={`notes-${enquiry.id}`} className="text-[13px] font-medium text-muted-foreground">Notes</label>
          <textarea
            id={`notes-${enquiry.id}`}
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => notes !== enquiry.notes && persist({ notes })}
            className="mt-1.5 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-[15px] text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <label htmlFor={`followup-${enquiry.id}`} className="text-[13px] font-medium text-muted-foreground">Follow-up date</label>
            <input
              id={`followup-${enquiry.id}`}
              type="date"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onBlur={() => followUp !== (enquiry.follow_up_date ?? '') && persist({ follow_up_date: followUp || null })}
              className="mt-1.5 block h-11 rounded-2xl border border-input bg-graphite px-3 text-[15px] text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
          <Button size="sm" variant="ghost" disabled={saving} onClick={() => persist({ status, notes, follow_up_date: followUp || null })}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
        {saved && <p className="text-[13px] text-lime">Saved.</p>}
      </div>
    </article>
  );
}
