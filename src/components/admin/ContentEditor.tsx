'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Faq, SiteContent } from '@/types/database';
import { deleteFaq, saveFaq } from '@/lib/faqs';
import { saveSiteContent, type SiteContentSection } from '@/lib/siteContent';
import { getBrowserClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = { sections: SiteContent[]; faqs: Faq[] };

export default function ContentEditor({ sections, faqs }: Props) {
  const router = useRouter();

  return (
    <div className="grid gap-8">
      <section>
        <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em]">Site sections</h2>
        <div className="mt-4 grid gap-4">
          {sections.map((section) => (
            <SectionRow key={section.id} section={section} onSaved={() => router.refresh()} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em]">FAQs</h2>
        <div className="mt-4 grid gap-4">
          <NewFaqForm onSaved={() => router.refresh()} />
          {faqs.map((faq) => (
            <FaqRow key={faq.id} faq={faq} onSaved={() => router.refresh()} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionRow({ section, onSaved }: { section: SiteContent; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [body, setBody] = useState(section.body);
  const [isShown, setIsShown] = useState(section.is_shown);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    await saveSiteContent(client, section.section as SiteContentSection, { title, body, is_shown: isShown });
    setSaving(false);
    setEditing(false);
    onSaved();
  };

  return (
    <div className="rounded-[24px] border border-line bg-raised p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="font-mono text-sm uppercase tracking-[0.08em] text-lime">{section.section}</h3>
          {!section.is_shown && <Badge variant="secondary">Hidden</Badge>}
        </div>
        <Button size="sm" variant="ghost" onClick={() => setEditing((v) => !v)}>{editing ? 'Cancel' : 'Edit'}</Button>
      </div>

      {editing ? (
        <form onSubmit={submit} className="mt-4 grid gap-4">
          <div>
            <Label htmlFor={`content-title-${section.id}`}>Title</Label>
            <Input id={`content-title-${section.id}`} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor={`content-body-${section.id}`}>Body</Label>
            <textarea
              id={`content-body-${section.id}`}
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
          <label className="flex items-center gap-2 text-[14px] text-muted-foreground">
            <input type="checkbox" checked={isShown} onChange={(e) => setIsShown(e.target.checked)} className="size-4" />
            Visible on the site
          </label>
          <div>
            <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save section'}</Button>
          </div>
        </form>
      ) : (
        <div className="mt-3 grid gap-1">
          <p className="font-display text-[17px] font-semibold">{section.title}</p>
          <p className="text-[14.5px] text-muted-foreground">{section.body}</p>
        </div>
      )}
    </div>
  );
}

function FaqRow({ faq, onSaved }: { faq: Faq; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [isShown, setIsShown] = useState(faq.is_shown);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    await saveFaq(client, { id: faq.id, question, answer, is_shown: isShown, sort_order: faq.sort_order });
    setSaving(false);
    setEditing(false);
    onSaved();
  };

  const remove = async () => {
    const client = getBrowserClient();
    if (!client) return;
    await deleteFaq(client, faq.id);
    onSaved();
  };

  return (
    <div className="rounded-[24px] border border-line bg-raised p-6">
      {editing ? (
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <Label htmlFor={`faq-q-${faq.id}`}>Question</Label>
            <Input id={`faq-q-${faq.id}`} value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
          <div>
            <Label htmlFor={`faq-a-${faq.id}`}>Answer</Label>
            <textarea
              id={`faq-a-${faq.id}`}
              rows={2}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
          <label className="flex items-center gap-2 text-[14px] text-muted-foreground">
            <input type="checkbox" checked={isShown} onChange={(e) => setIsShown(e.target.checked)} className="size-4" />
            Visible on the site
          </label>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save FAQ'}</Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-[17px] font-semibold">{faq.question}</h3>
              {!faq.is_shown && <Badge variant="secondary">Hidden</Badge>}
            </div>
            <p className="mt-1 text-[14.5px] text-muted-foreground">{faq.answer}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
            <Button size="sm" variant="ghost" onClick={remove}>Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function NewFaqForm({ onSaved }: { onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getBrowserClient();
    if (!client) return;
    setSaving(true);
    await saveFaq(client, { question, answer });
    setSaving(false);
    setQuestion('');
    setAnswer('');
    setOpen(false);
    onSaved();
  };

  if (!open) {
    return <div><Button variant="ghost" onClick={() => setOpen(true)}>+ Add FAQ</Button></div>;
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[24px] border border-lime/40 bg-raised p-6">
      <div>
        <Label htmlFor="new-faq-q">Question</Label>
        <Input id="new-faq-q" required value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="new-faq-a">Answer</Label>
        <textarea
          id="new-faq-a"
          rows={2}
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-base text-ivory outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? 'Adding…' : 'Add FAQ'}</Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </form>
  );
}
