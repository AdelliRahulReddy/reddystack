'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const LINKS = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Services', href: '/admin/services' },
  { title: 'Enquiries', href: '/admin/enquiries' },
  { title: 'Works', href: '/admin/works' },
  { title: 'Content', href: '/admin/content' },
  { title: 'Settings', href: '/admin/settings' },
] as const;

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex flex-wrap gap-1">
      {LINKS.map((link) => {
        const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-full px-3.5 py-2 text-[14.5px] transition-colors',
              active ? 'bg-lime text-lime-ink' : 'text-muted-foreground hover:bg-ivory/6 hover:text-ivory',
            )}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
