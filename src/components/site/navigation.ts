// One menu for every public page. The header, the phone menu and the footer
// all read from here, so a visitor sees the same structure everywhere.
export const primaryNav = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Works', href: '/works' },
  { title: 'Process', href: '/process' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact', href: '/contact' },
] as const;

/** Footer: pages that are not in the main menu but must never be hidden. */
export const moreNav = [
  { title: 'Price calculator', href: '/calculator' },
  { title: 'About Rahul', href: '/about' },
  { title: 'Portfolio notes', href: '/portfolio' },
  { title: 'Guides and articles', href: '/blog' },
  { title: 'All service pages', href: '/service' },
] as const;

export const legalNav = [
  { title: 'Privacy', href: '/privacy-policy' },
  { title: 'Terms', href: '/terms' },
  { title: 'Revision policy', href: '/revision-policy' },
] as const;

/** The one action every page header offers. */
export const enquireAction = { title: 'Enquire', href: '/contact' } as const;

/** True when `href` is the current page or a section of it. Home matches only itself. */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}
