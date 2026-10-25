'use client';

import { useState } from 'react';

import { formatInr } from '@/lib/money';
import type { QuoteSelection } from '@/lib/quoteSelection';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Button, ButtonArrow } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Result = {
  quote_id: string;
  items_summary: string;
  total_one_time: number;
  total_monthly: number;
  ad_spend_estimate: number;
};

type Props = {
  selection: QuoteSelection;
  hasItems: boolean;
  adSpend: number;
  whatsappNumber: string;
};

function quoteMessage(result: Result) {
  return [
    `ReddyStack quote #${result.quote_id.slice(0, 8)}`,
    `Items: ${result.items_summary}`,
    `One-time: ${formatInr(result.total_one_time)}`,
    result.total_monthly ? `Monthly: ${formatInr(result.total_monthly)}` : '',
    `Ad spend (paid to Meta): ${formatInr(result.ad_spend_estimate)}`,
    '',
    'I would like to go ahead with this quote.',
  ]
    .filter(Boolean)
    .join('\n');
}

const textareaClass =
  'mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-base text-ivory outline-none placeholder:text-faint focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

/** Saves the ticked items as a quote + enquiry, then offers the WhatsApp send. */
export default function CalculatorQuoteForm({ selection, hasItems, adSpend, whatsappNumber }: Props) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError('');
    if (!hasItems) {
      setError('Pick the Enquiry Sprint or at least one service to build a quote.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundle_ids: selection.bundleIds,
          service_ids: selection.serviceIds,
          option_ids: selection.optionIds,
          ad_spend_estimate: adSpend,
          name,
          business_name: businessName,
          phone,
          email,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to save the quote right now.');
      setResult({
        quote_id: data.quote_id,
        items_summary: data.items_summary,
        total_one_time: data.totals.total_one_time,
        total_monthly: data.totals.total_monthly,
        ad_spend_estimate: adSpend,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save the quote right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="mt-6 grid gap-4">
        <p className="rounded-2xl border border-lime/40 bg-lime/10 px-4 py-3 text-[15px] text-ivory">
          Quote saved. Your reference is <span className="font-mono">#{result.quote_id.slice(0, 8)}</span>.
        </p>
        <a
          className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-semibold text-lime-ink transition-colors hover:bg-ivory"
          href={buildWhatsAppLink(whatsappNumber, quoteMessage(result))}
          target="_blank"
          rel="noreferrer"
        >
          Send this quote on WhatsApp
        </a>
        <button type="button" onClick={() => setResult(null)} className="text-[14px] text-muted-foreground underline underline-offset-4 hover:text-ivory">
          Edit my selection
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div>
        <Label htmlFor="calc-name">Your name</Label>
        <Input id="calc-name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="calc-business">Business name</Label>
        <Input id="calc-business" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoComplete="organization" />
      </div>
      <div>
        <Label htmlFor="calc-phone">Phone (WhatsApp)</Label>
        <Input id="calc-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" />
      </div>
      <div>
        <Label htmlFor="calc-email">Email (optional)</Label>
        <Input id="calc-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="calc-message">Anything else we should know (optional)</Label>
        <textarea id="calc-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={textareaClass} />
      </div>
      {error && <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-[15px] text-ivory">{error}</p>}
      <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
        {submitting ? 'Saving…' : <>Save quote <ButtonArrow /></>}
      </Button>
      <p className="text-[13px] text-faint">A saved quote does not start paid work.</p>
    </form>
  );
}
