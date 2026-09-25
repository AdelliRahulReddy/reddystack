import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type Crumb = { name: string; href?: string };

type Props = {
  eyebrow?: string;
  /** Plain title; wrap a phrase in `accent` to colour it lime. */
  title: string;
  accent?: string;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  crumbs?: Crumb[];
  meta?: ReactNode;
  size?: 'lg' | 'md';
  className?: string;
};

function Title({ title, accent }: { title: string; accent?: string }) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const [before, after] = title.split(accent);
  return <>{before}<em className="not-italic text-lime">{accent}</em>{after}</>;
}

/**
 * Inner-page hero. Text renders visible from the server (CSS-only entrance), so it never
 * waits on JavaScript and stays the LCP element.
 */
export default function PageHero({ eyebrow, title, accent, intro, actions, aside, crumbs, meta, size = 'lg', className }: Props) {
  return (
    <section className={cn('relative overflow-hidden pb-[clamp(48px,7vw,96px)] pt-[clamp(128px,17vh,176px)]', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(247_244_235/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(247_244_235/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_70%_at_75%_30%,#000,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-1/3 left-1/3 -right-[10%] h-4/5 bg-[radial-gradient(closest-side,rgb(118_84_232/0.28),transparent_70%)] blur-[10px]" />
      <div className={cn('site-wrap relative grid items-center gap-[clamp(28px,5vw,64px)]', aside && 'min-[961px]:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]')}>
        <div>
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:fill-mode-both">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-faint">
                {crumbs.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {c.href ? <Link href={c.href} className="transition-colors hover:text-ivory">{c.name}</Link> : <span aria-current="page" className="text-muted-foreground">{c.name}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-2 pr-3 normal-case tracking-normal font-sans text-[13px] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:fill-mode-both">
              <span aria-hidden="true" className="size-2 flex-none animate-pulse-dot rounded-full bg-lime shadow-[0_0_0_4px_rgb(210_237_122/0.16)]" />
              {eyebrow}
            </p>
          )}
          <h1 className={cn(size === 'lg' ? 'text-[clamp(40px,6vw,92px)]' : 'text-[clamp(36px,4.8vw,68px)]', 'max-w-[18ch]')}>
            <Title title={title} accent={accent} />
          </h1>
          {intro && (
            <div className="mt-7 max-w-[56ch] text-[clamp(17px,1.4vw,19px)] text-muted-foreground [&_strong]:font-medium [&_strong]:text-ivory">
              {intro}
            </div>
          )}
          {actions && (
            <div className="mt-9 flex flex-wrap gap-3 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:delay-300 motion-safe:duration-1000 motion-safe:fill-mode-both">
              {actions}
            </div>
          )}
          {meta && <div className="mt-12 border-t border-line pt-5 font-mono text-[12.5px] tracking-[0.04em] text-faint">{meta}</div>}
        </div>
        {aside && <div className="relative motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:delay-200 motion-safe:duration-1000 motion-safe:fill-mode-both">{aside}</div>}
      </div>
    </section>
  );
}
