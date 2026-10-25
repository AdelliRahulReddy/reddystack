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
    <ol className={cn('grid gap-0.5', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            className="block rounded-lg px-3 py-1.5 text-[15px] leading-snug text-muted transition-colors hover:text-text aria-[current=location]:bg-surface-2 aria-[current=location]:text-text"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
