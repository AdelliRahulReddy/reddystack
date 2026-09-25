'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export type TimelineStep = { label: string; text: string };

/** Vertical numbered steps; the rail fills with the brand gradient as you scroll through it. */
export default function ProcessTimeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-rail-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: true } });
      el.querySelectorAll('[data-step-node]').forEach((n) => {
        const st = ScrollTrigger.create({ trigger: n, start: 'top 68%', onEnter: () => n.setAttribute('data-on', ''), onLeaveBack: () => n.removeAttribute('data-on') });
        // Server markup has every node lit (no-JS); dim the ones not reached yet.
        if (st.progress === 0 && !st.isActive) n.removeAttribute('data-on');
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={ref} className={cn('relative grid gap-10', className)}>
      <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-line-strong" />
      <span aria-hidden="true" data-rail-fill className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-[linear-gradient(var(--color-violet),var(--color-lime))]" />
      {steps.map((st, i) => (
        <li key={st.label} className="relative grid grid-cols-[56px_1fr] gap-6" data-reveal>
          <span
            data-step-node
            data-on
            className="relative z-[1] grid size-14 place-items-center rounded-full border border-line-strong bg-ink font-mono text-[13px] text-lime transition-[background-color,color,border-color,box-shadow] duration-500 not-data-[on]:text-faint data-[on]:border-lime data-[on]:shadow-[0_0_0_6px_rgb(210_237_122/0.08)]"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="pt-3">
            <h3 className="text-[clamp(22px,2.2vw,28px)]">{st.label.replace(/^\d+\.\s*/, '')}</h3>
            <p className="mt-2.5 max-w-[60ch] text-muted-foreground">{st.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
