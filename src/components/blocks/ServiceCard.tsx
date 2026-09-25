import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  index?: number;
  kicker?: string;
  title: string;
  body: string;
  illustration?: ReactNode;
  tags?: string[];
  className?: string;
};

/** Capability card: numbered, with an optional animated illustration and an arrow that turns on hover. */
export default function ServiceCard({ href, index, kicker, title, body, illustration, tags, className }: Props) {
  return (
    <Link
      href={href}
      data-reveal
      className={cn(
        'group/svc relative flex flex-col gap-4 overflow-hidden rounded-[28px] border border-line bg-graphite p-[clamp(22px,2.4vw,32px)] transition-[transform,border-color,opacity] duration-500 ease-studio hover:-translate-y-1.5 hover:border-line-strong',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em]">
        <span className="text-lime">{index !== undefined ? String(index + 1).padStart(2, '0') : null}{kicker ? `${index !== undefined ? ' — ' : ''}${kicker}` : null}</span>
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border border-line text-ivory transition-all duration-400 ease-studio group-hover/svc:-rotate-45 group-hover/svc:border-lime group-hover/svc:bg-lime group-hover/svc:text-lime-ink">→</span>
      </div>
      {illustration}
      <h3 className="text-[clamp(24px,2.3vw,32px)]">{title}</h3>
      <p className="text-[15.5px] text-muted-foreground">{body}</p>
      {tags && tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {tags.map((t) => <li key={t} className="rounded-full border border-line bg-ivory/5 px-3 py-1 text-[13px] text-ivory/85">{t}</li>)}
        </ul>
      )}
    </Link>
  );
}
