import type { ReactNode } from 'react';

import Cursor from './Cursor';
import RevealObserver from './RevealObserver';
import ScrollProgress from './ScrollProgress';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import SmoothScroll from './SmoothScroll';

/** Site frame: one smooth-scroll instance, header, footer, cursor and scroll reveals. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="fixed left-4 -top-16 z-[120] rounded-full bg-lime px-4 py-2.5 font-semibold text-lime-ink focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <RevealObserver />
      <SiteHeader />
      <main id="main" className="grain">{children}</main>
      <SiteFooter />
    </SmoothScroll>
  );
}
