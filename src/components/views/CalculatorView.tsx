'use client';

import { useMemo, useState } from 'react';

import type { AppSettings, Service, ServiceOption } from '@/types/database';
import { formatInr } from '@/lib/money';
import { computeQuoteTotals, type PricedItem } from '@/lib/quote';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import ServiceCardFacts from '@/components/blocks/ServiceCardFacts';
import { Button, ButtonArrow } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  services: Service[];
  options: ServiceOption[];
  settings: AppSettings;
};

type Result = {
  quote_id: string;
  items_summary: string;
  total_one_time: number;
  total_monthly: number;
  ad_spend_estimate: number;
};

const AD_SPEND_HINT = 'Paid directly to Meta, not to us.';

export default function CalculatorView({ services, options, settings }: Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [adSpend, setAdSpend] = useState(0);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const items: PricedItem[] = useMemo(() => {
    const chosen = services.filter((s) => selectedServices.includes(s.id));
    const serviceItems: PricedItem[] = chosen.map((s) => ({
      name: s.name,
      type: 'service',
      price: s.base_price,
      billing_type: s.billing_type,
    }));
    const optionItems: PricedItem[] = options
      .filter((o) => selectedOptions.includes(o.id) && selectedServices.includes(o.service_id))
      .map((o) => ({ name: o.option_name, type: 'option', price: o.extra_price, billing_type: 'one_time' as const }));
    return [...serviceItems, ...optionItems];
  }, [services, options, selectedServices, selectedOptions]);

  const totals = useMemo(() => computeQuoteTotals(items), [items]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (!next.includes(id)) {
        const tied = options.filter((o) => o.service_id === id).map((o) => o.id);
        setSelectedOptions((opts) => opts.filter((o) => !tied.includes(o)));
      }
      return next;
    });
  };

  const toggleOption = (id: string) =>
    setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const whatsappMessage = result
    ? [
        `ReddyStack quote #${result.quote_id.slice(0, 8)}`,
        `Items: ${result.items_summary}`,
        `One-time: ${formatInr(result.total_one_time)}`,
        result.total_monthly ? `Monthly: ${formatInr(result.total_monthly)}` : '',
        `Ad spend (paid to Meta): ${formatInr(result.ad_spend_estimate)}`,
        '',
        'I would like to go ahead with this quote.',
      ]
        .filter(Boolean)
        .join('\n')
    : '';

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError('');
    if (items.length === 0) {
      setError('Pick at least one service to build a quote.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_ids: selectedServices,
          option_ids: selectedOptions,
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

  return (
    <section className="site-wrap py-[clamp(48px,7vw,96px)]">
      <div className="grid gap-10 min-[961px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="grid content-start gap-4">
          {services.map((service) => {
            const on = selectedServices.includes(service.id);
            const serviceOptions = options.filter((o) => o.service_id === service.id);
            return (
              <article
                key={service.id}
                className={cn('rounded-[28px] border bg-graphite p-6 transition-colors sm:p-8', on ? 'border-lime' : 'border-line')}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleService(service.id)}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid size-6 flex-none place-items-center rounded-full border text-[13px] leading-none transition-colors',
                      on ? 'border-lime bg-lime text-lime-ink' : 'border-line-strong text-transparent',
                    )}
                  >
                    ✓
                  </span>
                  <span>
                    <span className="font-display text-[20px] font-semibold tracking-[-0.02em]">{service.name}</span>
                    <span className="mt-1 block text-muted-foreground">{service.description}</span>
                  </span>
                </button>

                <div className="mt-5">
                  <ServiceCardFacts service={service} />
                </div>

                {serviceOptions.length > 0 && on && (
                  <div className="mt-5 grid gap-2 border-t border-line pt-5">
                    {serviceOptions.map((option) => {
                      const optionOn = selectedOptions.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={optionOn}
                          onClick={() => toggleOption(option.id)}
                          className={cn(
                            'flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left text-[15px] transition-colors',
                            optionOn ? 'border-violet-soft bg-raised' : 'border-line',
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={cn(
                                'grid size-5 flex-none place-items-center rounded-md border text-[12px]',
                                optionOn ? 'border-violet-soft bg-violet text-white' : 'border-line-strong text-transparent',
                              )}
                            >
                              ✓
                            </span>
                            {option.option_name}
                          </span>
                          <span className="font-medium text-ivory">+{formatInr(option.extra_price)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <aside className="h-fit min-[961px]:sticky min-[961px]:top-[calc(var(--header-h)+24px)]">
          <div className="rounded-[28px] border border-line bg-raised p-6 sm:p-8">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">Your quote</h2>

            <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-[15px]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">One-time</dt>
                <dd className="font-display text-[22px] font-semibold">{formatInr(totals.total_one_time)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Monthly</dt>
                <dd className="font-display text-[22px] font-semibold">{formatInr(totals.total_monthly)}</dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-line pt-5">
              <Label htmlFor="calc-adspend">Monthly ad spend you plan to run (optional)</Label>
              <Input
                id="calc-adspend"
                type="number"
                min={0}
                step={500}
                inputMode="numeric"
                value={adSpend || ''}
                onChange={(e) => setAdSpend(Number(e.target.value) || 0)}
              />
              <p className="pt-1.5 text-[13px] text-faint">{AD_SPEND_HINT}</p>
            </div>

            {result ? (
              <div className="mt-6 grid gap-4">
                <p className="rounded-2xl border border-lime/40 bg-lime/10 px-4 py-3 text-[15px] text-ivory">
                  Quote saved. Your reference is <span className="font-mono">#{result.quote_id.slice(0, 8)}</span>.
                </p>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-semibold text-lime-ink transition-colors hover:bg-ivory"
                  href={buildWhatsAppLink(settings.whatsapp_number, whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Send this quote on WhatsApp
                </a>
                <button type="button" onClick={() => setResult(null)} className="text-[14px] text-muted-foreground underline underline-offset-4 hover:text-ivory">
                  Edit my selection
                </button>
              </div>
            ) : (
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
                  <Label htmlFor="calc-phone">Phone (for WhatsApp)</Label>
                  <Input id="calc-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" />
                </div>
                <div>
                  <Label htmlFor="calc-email">Email</Label>
                  <Input id="calc-email" required value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="calc-message">Anything else we should know (optional)</Label>
                  <textarea
                    id="calc-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-input bg-graphite px-4 py-3 text-base text-ivory outline-none placeholder:text-faint focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                </div>

                {error && <p role="alert" className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-[15px] text-ivory">{error}</p>}

                <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
                  {submitting ? 'Saving…' : <>Save quote <ButtonArrow /></>}
                </Button>
                <p className="text-[13px] text-faint">A saved quote does not start paid work.</p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
