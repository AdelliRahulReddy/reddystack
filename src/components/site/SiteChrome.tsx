import type { ReactNode } from 'react';

import PhoneActionBar from './PhoneActionBar';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import WhatsAppButton from './WhatsAppButton';

/** Site frame for every public page: header, page, footer, and the contact bar or button. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-theme">
      <a
        href="#main"
        className="fixed left-4 -top-16 z-[120] rounded-full bg-action px-4 py-2.5 font-semibold text-action-ink focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      {/* Room for the phone bottom bar so it never covers the footer. */}
      <div aria-hidden="true" className="h-[76px] bg-surface min-[961px]:hidden" />
      <WhatsAppButton />
      <PhoneActionBar />
    </div>
  );
}
