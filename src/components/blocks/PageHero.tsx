import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';

export type { Crumb };

type Props = {
  title: string;
  intro?: ReactNode;
  /** One primary action (a ButtonLink), optionally followed by a quiet text link. */
  actions?: ReactNode;
  aside?: ReactNode;
  crumbs?: Crumb[];
  meta?: ReactNode;
  size?: 'lg' | 'md';
  className?: string;
};

/**
 * Page opener used by every inner page: breadcrumbs, one headline, one plain
 * sentence, one action. Server-rendered and never animated in, so the heading
 * is visible at once (protects LCP and no-JS reading).
 */
export default function PageHero({ title, intro, actions, aside, crumbs, meta, size = 'md', className }: Props) {
  return (
    <section className={cn('pb-[clamp(40px,6vw,88px)] pt-[clamp(28px,5vw,72px)]', className)}>
      <div className={cn('site-wrap grid items-center gap-[clamp(32px,5vw,72px)]', aside && 'min-[961px]:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]')}>
        <div className="min-w-0">
          {crumbs && <Breadcrumbs crumbs={crumbs} />}
          <h1 className={cn('max-w-[20ch]', size === 'lg' ? 'text-display' : 'text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] leading-[1.04]')}>
            {title}
          </h1>
          {intro && (
            <div className="mt-5 max-w-[54ch] text-[clamp(17px,1.3vw,19px)] text-muted [&_strong]:font-semibold [&_strong]:text-text">
              {intro}
            </div>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>}
          {meta && <div className="mt-8 text-small text-muted">{meta}</div>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </section>
  );
}
