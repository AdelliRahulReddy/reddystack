'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ComponentProps } from 'react';

import { siteConfig } from '@/data/siteConfig';
import { Button, ButtonArrow } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/blocks/MagneticButton';
import { BrandSymbol } from './BrandSymbol';
import { useSmoothScroll } from './SmoothScroll';
import { isActivePath, primaryNav } from './navigation';

function Brand({ className, ...props }: Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link
      href="/"
      aria-label="ReddyStack home"
      className={cn('group/brand inline-flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-[-0.03em] text-ivory', className)}
      {...props}
    >
      <BrandSymbol className="size-7 transition-transform duration-600 ease-studio group-hover/brand:-rotate-12 group-hover/brand:scale-110" />
      ReddyStack
    </Link>
  );
}

function MenuBars({ open }: { open?: boolean }) {
  const bar = 'absolute inset-x-[13px] h-[1.5px] bg-ivory transition-[transform,top] duration-400 ease-studio';
  return (
    <>
      <i aria-hidden="true" className={cn(bar, open ? 'top-[21.5px] rotate-45' : 'top-[18px]')} />
      <i aria-hidden="true" className={cn(bar, open ? 'top-[21.5px] -rotate-45' : 'top-[25px]')} />
    </>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const { subscribe, lock } = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastY = window.scrollY;
    return subscribe((y) => {
      if (!reduce) header.toggleAttribute('data-hidden', y > lastY && y > 480);
      header.toggleAttribute('data-scrolled', y > 24);
      lastY = y;
    });
  }, [subscribe]);

  useEffect(() => { lock(open); }, [open, lock]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 py-3.5 transition-transform duration-500 ease-studio data-[hidden]:-translate-y-[110%]"
    >
      <div className="site-wrap">
        <div className="flex items-center justify-between gap-6 rounded-full border border-line bg-ink/62 py-2 pl-[18px] pr-2 backdrop-blur-[18px] backdrop-saturate-[1.4]">
          <Brand />
          <nav aria-label="Primary" className="hidden gap-1 text-[15px] min-[901px]:flex">
            {primaryNav.map((l) => {
              const active = isActivePath(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-muted-foreground transition-colors duration-300 hover:bg-ivory/6 hover:text-ivory',
                    active && 'bg-ivory/6 text-ivory',
                  )}
                >
                  {l.title}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <MagneticButton>
              <Button asChild className="max-[460px]:hidden">
                <Link href="/contact">Start a project <ButtonArrow /></Link>
              </Button>
            </MagneticButton>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="relative size-11 rounded-full border border-line-strong min-[901px]:hidden">
                <span className="sr-only">Open menu</span>
                <MenuBars />
              </SheetTrigger>
              <SheetContent
                side="top"
                showCloseButton={false}
                className="h-dvh gap-0 border-0 bg-ink p-0 data-[state=closed]:duration-300 data-[state=open]:duration-500"
                data-lenis-prevent
              >
                <div className="site-wrap flex h-full w-full flex-col py-3.5">
                  <div className="flex items-center justify-between gap-6 rounded-full border border-line py-2 pl-[18px] pr-2">
                    <SheetClose asChild><Brand /></SheetClose>
                    <SheetClose className="relative size-11 rounded-full border border-line-strong">
                      <span className="sr-only">Close menu</span>
                      <MenuBars open />
                    </SheetClose>
                  </div>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                  <nav aria-label="Mobile" className="mt-10 grid gap-1.5">
                    {[...primaryNav, { title: 'Contact', href: '/contact' }].map((l, i) => (
                      <SheetClose asChild key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={isActivePath(pathname, l.href) ? 'page' : undefined}
                          style={{ animationDelay: `${0.12 + i * 0.05}s` }}
                          className="font-display text-[clamp(36px,10vw,56px)] leading-[1.1] tracking-[-0.04em] text-ivory animate-in fade-in-0 slide-in-from-bottom-6 fill-mode-both duration-600 hover:text-lime aria-[current=page]:text-lime"
                        >
                          {l.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto grid gap-1.5 pb-4 font-mono text-[13px] text-muted-foreground">
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-ivory">{siteConfig.email}</a>
                    <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ivory">WhatsApp {siteConfig.phoneDisplay}</a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
