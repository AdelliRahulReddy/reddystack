import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/**
 * The site's one button: filled, fully round, named for the outcome.
 * Used once per section; anything secondary is a TextLink, never a second button.
 */
export function ButtonLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-full bg-action px-6 text-base font-semibold text-action-ink transition-[background-color,transform] duration-200 hover:bg-action-hover active:scale-[0.98]',
        className,
      )}
      {...props}
    />
  );
}

/** Quiet secondary action: an underlined link, so a section never shows two competing buttons. */
export function TextLink({ className, external, ...props }: ComponentProps<'a'> & { external?: boolean }) {
  return (
    <a
      className={cn('text-[15px] font-medium text-text underline decoration-text/40 underline-offset-4 transition-colors hover:text-action-text hover:decoration-current', className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    />
  );
}
