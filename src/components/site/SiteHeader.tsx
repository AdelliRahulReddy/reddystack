'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useSettings } from '@/lib/useSettings';
import { cn } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { BrandSymbol } from './BrandSymbol';
import { enquireAction, isActivePath, primaryNav } from './navigation';

function Brand() {
  return (
    <Link href="/" aria-label="ReddyStack home" className="inline-flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-0.03em] text-text">
      <BrandSymbol className="size-7" />
      ReddyStack
    </Link>
  );
}

const enquireClass =
  'inline-flex h-11 items-center rounded-full bg-action px-5 text-[15px] font-semibold text-action-ink transition-colors hover:bg-text';

/** Sticky top bar: wordmark, the one menu, one Enquire action. Below 1100px the menu moves into a sheet. */
export default function SiteHeader() {
  const pathname = usePathname();
  const settings = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ground/95 pt-[env(safe-area-inset-top,0px)] backdrop-saturate-150">
      <div className="site-wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-1 min-[1100px]:flex">
          {primaryNav.map((l) => {
            const active = isActivePath(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-2 text-[15px] transition-colors hover:text-text',
                  active ? 'bg-surface-2 text-text' : 'text-muted',
                )}
              >
                {l.title}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href={enquireAction.href} className={enquireClass}>{enquireAction.title}</Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-surface-2 px-3.5 text-[15px] font-medium text-text min-[1100px]:hidden">
              <Menu aria-hidden="true" className="size-[18px]" /> <span className="max-[419px]:sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="top" showCloseButton={false} className="h-dvh gap-0 border-0 bg-ground p-0">
              <div className="site-wrap flex h-full w-full flex-col">
                <div className="flex h-[var(--header-h)] items-center justify-between">
                  <SheetClose asChild><Brand /></SheetClose>
                  <SheetClose className="inline-flex h-11 items-center gap-2 rounded-full bg-surface-2 px-4 text-[15px] font-medium text-text">
                    <X aria-hidden="true" className="size-[18px]" /> Close
                  </SheetClose>
                </div>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Pages on the ReddyStack website</SheetDescription>
                <nav aria-label="Main" className="mt-6 grid">
                  {primaryNav.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={isActivePath(pathname, l.href) ? 'page' : undefined}
                        className="py-2.5 font-display text-[32px] font-semibold leading-tight tracking-[-0.03em] text-text aria-[current=page]:text-action"
                      >
                        {l.title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto grid gap-3 pb-8">
                  <SheetClose asChild>
                    <Link href={enquireAction.href} className={cn(enquireClass, 'h-12 justify-center')}>Get customer enquiries</Link>
                  </SheetClose>
                  <a
                    href={buildWhatsAppLink(settings.whatsapp_number, 'Hi, I want more enquiries for my business.')}
                    target="_blank"
                    rel="noreferrer"
                    className="text-center text-[15px] font-medium text-muted underline underline-offset-4 hover:text-text"
                  >
                    Or chat on WhatsApp
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
