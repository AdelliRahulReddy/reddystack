export const primaryNav = [
  { title: 'Services', href: '/services' },
  { title: 'Calculator', href: '/calculator' },
  { title: 'Work', href: '/works' },
  { title: 'Process', href: '/process' },
  { title: 'FAQ', href: '/faq' },
  { title: 'About', href: '/about' },
] as const;

// Earlier pages that still carry traffic; kept reachable from the footer while
// the new India-stack pages own the header.
export const legacyNav = [
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'Capabilities', href: '/service' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Insights', href: '/blog' },
] as const;

export const legalNav = [
  { title: 'Privacy', href: '/privacy-policy' },
  { title: 'Terms', href: '/terms' },
  { title: 'Revision policy', href: '/revision-policy' },
] as const;

/** True when `href` is the current page or a section of it. */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + '/');
}
