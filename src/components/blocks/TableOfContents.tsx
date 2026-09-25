'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type TocItem = { id: string; title: string };

/** Section list that tracks the heading currently being read. */
export default function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -70% 0px' });
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <ol className={cn('grid border-l border-line', className)}>
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-[14.5px] leading-snug text-muted-foreground transition-colors hover:text-ivory aria-[current=location]:border-lime aria-[current=location]:text-ivory"
          >
            <span className="font-mono text-[11px] leading-[1.9] text-faint">{String(i + 1).padStart(2, '0')}</span>
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
