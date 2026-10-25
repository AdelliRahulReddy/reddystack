'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import s from './HeroJourney.module.css';

const AUTO_STEP_MS = 2800;

type Step = { title: string; body: string };

/**
 * Tap-through journey for the homepage hero: three steps beside a phone that
 * changes with each tap. It plays through once on its own and stops for good
 * the moment the visitor touches, clicks or focuses it. Screens arrive
 * server-rendered, so only the tapping logic ships to the browser; the caption
 * and the reduced-motion still picture live in HomeJourney (server).
 */
export default function HeroJourney({ steps, screens }: { steps: readonly Step[]; screens: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers = [1, 2].map((step) =>
      window.setTimeout(() => { if (!touched.current) setActive(step); }, AUTO_STEP_MS * step),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const stop = () => { touched.current = true; };

  return (
    <div className={cn(s.interactive, 'grid items-center gap-6 min-[560px]:grid-cols-[minmax(0,1fr)_280px]')} onPointerDown={stop} onFocusCapture={stop}>
      <div role="tablist" aria-label="Steps of an enquiry" className="grid gap-2 max-[559px]:order-2">
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            id={`hero-step-${i}`}
            aria-selected={active === i}
            aria-controls="hero-phone"
            onClick={() => { stop(); setActive(i); }}
            className={cn(
              'flex min-h-12 items-start gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-200',
              active === i ? 'bg-text text-ground' : 'bg-surface text-text shadow-[0_0_0_1px_var(--color-edge)] hover:bg-surface-2',
            )}
          >
            <span className={cn('font-display text-[18px] font-semibold leading-6', active === i ? 'text-action' : 'text-action-text')}>{i + 1}</span>
            <span>
              <span className="block font-semibold leading-6">{step.title}</span>
              <span className={cn('block text-[14px]', active === i ? 'text-ground/85' : 'text-muted')}>{step.body}</span>
            </span>
          </button>
        ))}
      </div>

      <div id="hero-phone" role="tabpanel" aria-labelledby={`hero-step-${active}`} className={s.phone}>
        <div className={s.screen}>
          {screens.map((screen, i) => (
            <div key={i} className={s.slide} data-active={active === i ? '' : undefined} aria-hidden={active !== i}>
              {screen}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
