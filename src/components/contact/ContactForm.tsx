'use client';

import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Check } from 'lucide-react';

import { trackLeadEvent } from '@/components/analytics/gaEvents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { contactBudgetOptions } from '@/data/contactOptions';
import type { EnquiryChoice } from '@/lib/enquiryChoices';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

type FormData = { name: string; phone: string; email: string; company: string; message: string };

// Same limits as /api/contact.
const schema = yup
  .object({
    name: yup.string().trim().max(100).required().label('Name'),
    company: yup.string().trim().max(200).required().label('Business name'),
    phone: yup.string().trim().max(30).matches(/^\+?[0-9][0-9 -]{6,}$/, 'Enter a phone number, e.g. +91 98765 43210').required().label('Phone'),
    email: yup.string().trim().max(254).email().default('').label('Email'),
    message: yup.string().trim().max(4000).required().label('Message'),
  })
  .required();

const MESSAGE_MAX = 4000;

const chip =
  'rounded-full border px-4 py-2 text-[14.5px] font-medium transition-[background-color,border-color,color] duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

function FieldError({ id, message }: { id: string; message?: string }) {
  return <p id={id} role="alert" className="min-h-5 pt-1.5 text-[13.5px] text-coral">{message}</p>;
}

type Props = {
  choices: EnquiryChoice[];
  initialService: string;
  sourcePage: string;
  whatsappNumber: string;
};

export default function ContactForm({ choices, initialService, sourcePage, whatsappNumber }: Props) {
  const honeypot = useRef<HTMLInputElement>(null);
  const [services, setServices] = useState<string[]>(() => {
    const match = choices.find((c) => c.slug === initialService);
    return match ? [match.title] : [];
  });
  const [budget, setBudget] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [sentRef, setSentRef] = useState<string | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
  const messageLength = useWatch({ control, name: 'message' })?.length ?? 0;
  const whatsapp = buildWhatsAppLink(whatsappNumber, 'Hi, I want more enquiries for my business.');

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

  return (
    <div className="relative">
        {sentRef !== null ? (
          <div
            role="status"
            className="grid justify-items-start gap-5 py-6"
          >
            <span className="grid size-14 place-items-center rounded-full bg-lime text-lime-ink"><Check className="size-7" strokeWidth={2.5} /></span>
            <h2 className="text-[clamp(28px,3vw,40px)]">Message sent.</h2>
            <p className="max-w-[48ch] text-muted-foreground">
              Thank you. Rahul reads every enquiry himself and will reply on WhatsApp or by phone.
              {sentRef && <> Your reference is <span className="tabular-nums text-ivory">{sentRef.slice(0, 8)}</span>.</>}
            </p>
            <Button type="button" variant="ghost" onClick={() => setSentRef(null)}>Send another enquiry</Button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={(event) => { void handleSubmit(onSubmit)(event); }}
            className="grid gap-9"
          >
            <div hidden>
              <label htmlFor="contact-website">Leave this field empty</label>
              <input ref={honeypot} id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-x-5 gap-y-2 min-[641px]:grid-cols-2">
              <div>
                <Label htmlFor="contact-name">Your name</Label>
                <Input id="contact-name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby="contact-name-error" {...register('name')} />
                <FieldError id="contact-name-error" message={errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="contact-company">Business name</Label>
                <Input id="contact-company" autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby="contact-company-error" {...register('company')} />
                <FieldError id="contact-company-error" message={errors.company?.message} />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone (WhatsApp)</Label>
                <Input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby="contact-phone-error" {...register('phone')} />
                <FieldError id="contact-phone-error" message={errors.phone?.message} />
              </div>
              <div>
                <Label htmlFor="contact-email">Email (optional)</Label>
                <Input id="contact-email" type="email" autoComplete="email" spellCheck={false} aria-invalid={Boolean(errors.email)} aria-describedby="contact-email-error" {...register('email')} />
                <FieldError id="contact-email-error" message={errors.email?.message} />
              </div>
            </div>

            {choices.length > 0 && (
              <fieldset>
                <legend className="font-display text-[22px] font-semibold tracking-[-0.02em]">What do you need?</legend>
                <p className="mt-1 text-[14.5px] text-muted-foreground">Optional. Pick any that fit.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {choices.map((c) => {
                    const on = services.includes(c.title);
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleService(c.title)}
                        className={cn(chip, on ? 'border-action-text bg-lime text-lime-ink' : 'border-line-strong text-ivory hover:border-ivory/40')}
                      >
                        {c.title}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <Label htmlFor="contact-message">What do you want more of?</Label>
                <span className={cn('tabular-nums text-xs', messageLength > MESSAGE_MAX ? 'text-coral' : 'text-faint')} aria-live="polite">
                  {messageLength > MESSAGE_MAX * 0.8 ? `${messageLength} / ${MESSAGE_MAX}` : ''}
                </span>
              </div>
              <Textarea
                id="contact-message"
                rows={5}
                placeholder="WhatsApp chats, calls, Instagram DMs or form fills? Tell us your business and city."
                aria-invalid={Boolean(errors.message)}
                aria-describedby="contact-message-error contact-message-hint"
                {...register('message')}
              />
              <p id="contact-message-hint" className="pt-1.5 text-[13px] text-faint">Keep passwords, payment details and private customer records out of the form.</p>
              <FieldError id="contact-message-error" message={errors.message?.message} />
            </div>

            <fieldset>
              <legend className="font-display text-[22px] font-semibold tracking-[-0.02em]">Budget range</legend>
              <p className="mt-1 text-[14.5px] text-muted-foreground">Optional. Ad spend is separate and paid directly to Meta.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {contactBudgetOptions.map((o) => {
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
                <a href={whatsapp} target="_blank" rel="noreferrer" className="font-medium text-action-text underline underline-offset-4">Send it on WhatsApp instead</a>.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5">
              <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
                {submitting ? 'Sending…' : <>Send enquiry</>}
              </Button>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-action-text underline underline-offset-4 hover:text-ivory">
                Or WhatsApp us directly
              </a>
            </div>
            <p className="-mt-5 text-[14px] text-faint">An enquiry does not start paid work.</p>
          </form>
        )}
    </div>
  );
}
