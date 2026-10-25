'use client';

import { useMemo, useState } from 'react';

import type { AppSettings, Bundle, Service, ServiceOption } from '@/types/database';
import { formatInr } from '@/lib/money';
import { computeQuoteTotals } from '@/lib/quote';
import { resolveQuoteSelection } from '@/lib/quoteSelection';
import { cn } from '@/lib/utils';
import ServiceCardFacts from '@/components/blocks/ServiceCardFacts';
import CalculatorQuoteForm from '@/components/calculator/CalculatorQuoteForm';
import CalculatorSprintCard from '@/components/calculator/CalculatorSprintCard';
import CalculatorSummaryBar from '@/components/calculator/CalculatorSummaryBar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  bundles: Bundle[];
  services: Service[];
  options: ServiceOption[];
  settings: AppSettings;
  /** Slug from ?pick=, e.g. "enquiry-sprint" or a service slug, ticked on arrival. */
  initialPick: string;
};

const AD_SPEND_HINT = 'Paid directly to Meta, not to us.';

const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

export default function CalculatorView({ bundles, services, options, settings, initialPick }: Props) {
  const activeBundles = bundles.filter((b) => b.is_active);
  const [selectedBundles, setSelectedBundles] = useState<string[]>(() => activeBundles.filter((b) => b.slug === initialPick).map((b) => b.id));
  const [selectedServices, setSelectedServices] = useState<string[]>(() => services.filter((s) => s.slug === initialPick).map((s) => s.id));
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [adSpend, setAdSpend] = useState(0);

  const selection = { bundleIds: selectedBundles, serviceIds: selectedServices, optionIds: selectedOptions };
  const { items } = useMemo(
    () => resolveQuoteSelection({ bundleIds: selectedBundles, serviceIds: selectedServices, optionIds: selectedOptions }, { bundles, services, options }),
    [bundles, services, options, selectedBundles, selectedServices, selectedOptions],
  );
  const totals = useMemo(() => computeQuoteTotals(items), [items]);

  const toggleService = (id: string) => {
    const next = toggle(selectedServices, id);
    setSelectedServices(next);
    if (!next.includes(id)) {
      const tied = options.filter((o) => o.service_id === id).map((o) => o.id);
      setSelectedOptions((opts) => opts.filter((o) => !tied.includes(o)));
    }
  };

  return (
    <section className="site-wrap py-[clamp(48px,7vw,96px)] max-[960px]:pb-32">
      <div className="grid gap-10 min-[961px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="grid content-start gap-4">
          {activeBundles.map((bundle) => (
            <CalculatorSprintCard
              key={bundle.id}
              bundle={bundle}
              on={selectedBundles.includes(bundle.id)}
              onToggle={() => setSelectedBundles((prev) => toggle(prev, bundle.id))}
            />
          ))}
          {services.map((service) => {
            const on = selectedServices.includes(service.id);
            const serviceOptions = options.filter((o) => o.service_id === service.id);
            return (
              <article
                key={service.id}
                id={`pick-${service.slug}`}
                className={cn('scroll-mt-[calc(var(--header-h)+16px)] rounded-[var(--radius-card)] border bg-graphite p-6 transition-colors sm:p-8', on ? 'border-lime' : 'border-line')}
              >
                <button type="button" aria-pressed={on} onClick={() => toggleService(service.id)} className="flex w-full items-start gap-4 text-left">
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
                          onClick={() => setSelectedOptions((prev) => toggle(prev, option.id))}
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

        <aside id="calc-quote" className="h-fit scroll-mt-[calc(var(--header-h)+16px)] min-[961px]:sticky min-[961px]:top-[calc(var(--header-h)+24px)]">
          <div className="rounded-[var(--radius-card)] border border-line bg-raised p-6 sm:p-8">
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em]">Your quote</h2>
            {items.length > 0 && <p className="mt-2 text-[14.5px] text-muted-foreground">{items.map((i) => i.name).join(', ')}</p>}
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

            <CalculatorQuoteForm selection={selection} hasItems={items.length > 0} adSpend={adSpend} whatsappNumber={settings.whatsapp_number} />
          </div>
        </aside>
      </div>
      <CalculatorSummaryBar totals={totals} count={items.length} />
    </section>
  );
}
