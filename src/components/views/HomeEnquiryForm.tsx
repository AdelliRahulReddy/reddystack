'use client';

import { useState } from 'react';

import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  whatsappNumber: string;
};

/**
 * Short homepage enquiry form. Posts to the existing /api/contact endpoint,
 * which validates, rate-limits and records the enquiry (and emails the owner
 * once Resend is configured in production). WhatsApp remains a one-tap option.
 */
export default function HomeEnquiryForm({ whatsappNumber }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          message,
          budget: 'Not specified',
          services: [],
          website: '',
          sourcePage: '/',
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send right now.');
      setSent(true);
      setName('');
      setPhone('');
      setEmail('');
      setCompany('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div role="status" className="grid justify-items-start gap-4">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-lime-ink">✓</span>
        <h3 className="font-display text-[24px] font-semibold tracking-[-0.02em]">Message sent.</h3>
        <p className="text-muted-foreground">Thank you. Rahul reads every enquiry himself and will reply on WhatsApp or by phone.</p>
        <button type="button" onClick={() => setSent(false)} className="text-[14px] text-action-text underline underline-offset-4 hover:text-ivory">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 min-[641px]:grid-cols-2">
        <div>
          <Label htmlFor="home-name">Your name</Label>
          <Input id="home-name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="home-company">Business name</Label>
          <Input id="home-company" required value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </div>
      </div>
      <div className="grid gap-4 min-[641px]:grid-cols-2">
        <div>
          <Label htmlFor="home-phone">Phone (WhatsApp)</Label>
          <Input id="home-phone" type="tel" inputMode="tel" required pattern="\+?[0-9][0-9 \-]{6,}" title="A phone number, e.g. +91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div>
          <Label htmlFor="home-email">Email (optional)</Label>
          <Input id="home-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
      </div>
      <div>
        <Label htmlFor="home-message">What do you want more of?</Label>
        <textarea
          id="home-message"
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="WhatsApp chats, calls, Instagram DMs or form fills? Tell us your business and city."
          className="mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-base text-ivory outline-none placeholder:text-faint focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-[15px] text-ivory">
          {error}{' '}
          <a href={buildWhatsAppLink(whatsappNumber, '')} target="_blank" rel="noreferrer" className="font-medium text-action-text underline underline-offset-4">
            Message us on WhatsApp
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
          {submitting ? 'Sending…' : <>Send enquiry</>}
        </Button>
        <a
          href={buildWhatsAppLink(whatsappNumber, '')}
          target="_blank"
          rel="noreferrer"
          className="text-[15px] font-medium text-action-text underline underline-offset-4 hover:text-ivory"
        >
          Or WhatsApp us directly
        </a>
      </div>
      <p className="text-[13px] text-faint">An enquiry does not start paid work.</p>
    </form>
  );
}
