'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Check } from 'lucide-react';

import { trackLeadEvent } from '@/components/analytics/gaEvents';
import { Button, ButtonArrow } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { contactBudgetCurrencies, contactCategories, type ContactCurrency } from '@/data/contactOptions';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/utils';
import { readMarketChoice } from '@/utils/marketPreference';

type FormData = { name: string; email: string; company: string; message: string };

// Same limits as /api/contact.
const schema = yup
  .object({
    name: yup.string().trim().max(100).required().label('Name'),
    email: yup.string().trim().max(254).required().email().label('Email'),
    company: yup.string().trim().max(200).required().label('Business / project name'),
    message: yup.string().trim().max(4000).required().label('Message'),
  })
  .required();

const MESSAGE_MAX = 4000;

// Build services share one enquiry category.
const categoryForService = (service: string) =>
  ['applications', 'mvp-builds', 'ai-automations'].includes(service) ? 'additional' : service;

function currencyForMarket(): ContactCurrency {
  const market = readMarketChoice();
  if (market === 'uk') return 'GBP';
  if (market === 'in') return 'INR';
  return 'USD';
}

const chip =
  'rounded-full border px-4 py-2 text-[14.5px] font-medium transition-[background-color,border-color,color] duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

function FieldError({ id, message }: { id: string; message?: string }) {
  return <p id={id} role="alert" className="min-h-5 pt-1.5 text-[13.5px] text-coral">{message}</p>;
}

export default function ContactForm({ initialService, sourcePage }: { initialService: string; sourcePage: string }) {
  const honeypot = useRef<HTMLInputElement>(null);
  const [services, setServices] = useState<string[]>(() => {
    const match = contactCategories.find((c) => c.id === categoryForService(initialService));
    return match ? [match.title] : [];
  });
  const [currency, setCurrency] = useState<ContactCurrency>('USD');
  const [budget, setBudget] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [sentRef, setSentRef] = useState<string | null>(null);

  // Default the budget currency to the visitor's chosen market (stored in the browser only).
  useEffect(() => {
    const id = window.setTimeout(() => setCurrency(currencyForMarket()), 0);
    return () => window.clearTimeout(id);
  }, []);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
  const messageLength = useWatch({ control, name: 'message' })?.length ?? 0;

  const toggleService = (title: string) =>
    setServices((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]));

  const onSubmit = async (data: FormData) => {
    if (submitting) return;
    setSubmitError('');
    setSubmitting(true);
    const budgetValue = budget ?? 'Not specified';
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypot.current?.value || '',
          budget: budgetValue,
          services,
          sourcePage,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send the message right now.');

      trackLeadEvent('contact_form_submit', {
        contact_method: 'form',
        form_location: 'contact_page',
        selected_budget: budgetValue,
        selected_services: services.join(', '),
        source_page: sourcePage || '/contact',
        lead_id: result.requestId,
      });
      setSentRef(result.requestId ?? '');
      reset();
      setBudget(null);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send the message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeCurrency = contactBudgetCurrencies.find((c) => c.code === currency) ?? contactBudgetCurrencies[0];

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {sentRef !== null ? (
          <m.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid justify-items-start gap-5 py-6"
          >
            <span className="grid size-14 place-items-center rounded-full bg-lime text-lime-ink"><Check className="size-7" strokeWidth={2.5} /></span>
            <h2 className="text-[clamp(28px,3vw,40px)]">Message sent.</h2>
            <p className="max-w-[48ch] text-muted-foreground">
              Thank you. Rahul reads every enquiry himself and will reply by email.
              {sentRef && <> Your reference is <span className="font-mono text-ivory">{sentRef.slice(0, 8)}</span>.</>}
            </p>
            <Button type="button" variant="ghost" onClick={() => setSentRef(null)}>Send another enquiry</Button>
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={(event) => { void handleSubmit(onSubmit)(event); }}
            initial={false}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-9"
          >
            <div hidden>
              <label htmlFor="contact-website">Leave this field empty</label>
              <input ref={honeypot} id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <fieldset>
              <legend className="font-display text-[22px] font-semibold tracking-[-0.02em]">Where should we begin?</legend>
              <p className="mt-1 text-[14.5px] text-muted-foreground">Optional. Pick any that fit, or start with the bottleneck.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {contactCategories.map((c) => {
                  const on = services.includes(c.title);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleService(c.title)}
                      className={cn(chip, on ? 'border-lime bg-lime text-lime-ink' : 'border-line-strong text-ivory hover:border-ivory/40')}
                    >
                      {c.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-x-5 gap-y-2 min-[641px]:grid-cols-2">
              <div>
                <Label htmlFor="contact-name">Your name</Label>
                <Input id="contact-name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby="contact-name-error" {...register('name')} />
                <FieldError id="contact-name-error" message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="contact-company">Business / project name</Label>
                <Input id="contact-company" autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby="contact-company-error" {...register('company')} />
                <FieldError id="contact-company-error" message={errors.company?.message} />
              </div>
              <div className="min-[641px]:col-span-2">
                <Label htmlFor="contact-email">Your email</Label>
                <Input id="contact-email" type="email" autoComplete="email" spellCheck={false} aria-invalid={Boolean(errors.email)} aria-describedby="contact-email-error" {...register('email')} />
                <FieldError id="contact-email-error" message={errors.email?.message} />
              </div>
              <div className="min-[641px]:col-span-2">
                <div className="flex items-baseline justify-between gap-4">
                  <Label htmlFor="contact-message">Describe the problem</Label>
                  <span className={cn('font-mono text-xs', messageLength > MESSAGE_MAX ? 'text-coral' : 'text-faint')} aria-live="polite">
                    {messageLength > MESSAGE_MAX * 0.8 ? `${messageLength} / ${MESSAGE_MAX}` : ''}
                  </span>
                </div>
                <Textarea
                  id="contact-message"
                  rows={6}
                  placeholder="What is stuck, what you have tried, and what a good outcome looks like."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby="contact-message-error contact-message-hint"
                  {...register('message')}
                />
                <p id="contact-message-hint" className="pt-1.5 text-[13px] text-faint">Keep passwords, payment details and private customer records out of the form.</p>
                <FieldError id="contact-message-error" message={errors.message?.message} />
              </div>
            </div>

            <fieldset>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <legend className="font-display text-[22px] font-semibold tracking-[-0.02em]">Budget range</legend>
                  <p className="mt-1 text-[14.5px] text-muted-foreground">Optional. Ad spend and third-party costs are separate.</p>
                </div>
                <div role="group" aria-label="Budget currency" className="inline-flex h-10 items-center rounded-full border border-line bg-graphite p-1">
                  {contactBudgetCurrencies.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      aria-pressed={currency === c.code}
                      onClick={() => { setCurrency(c.code); setBudget(null); }}
                      className="h-full rounded-full px-3.5 font-mono text-xs tracking-[0.08em] text-muted-foreground transition-colors outline-none hover:text-ivory focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-pressed:bg-lime aria-pressed:text-lime-ink"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeCurrency.options.map((o) => {
                  const on = budget === o.title;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setBudget(on ? null : o.title)}
                      className={cn(chip, on ? 'border-violet-soft bg-violet text-white' : 'border-line-strong text-ivory hover:border-ivory/40')}
                    >
                      {o.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {submitError && (
              <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-5 py-4 text-[15px] text-ivory">
                {submitError}{' '}
                <a href={siteConfig.socialLinks.email} className="font-medium text-lime underline underline-offset-4">Email your enquiry</a>.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5">
              <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Sending…' : <>Send enquiry <ButtonArrow /></>}
              </Button>
              <p className="text-[14px] text-faint">An enquiry does not start paid work.</p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
