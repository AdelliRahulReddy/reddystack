export const primaryNav = [
  { title: 'Work', href: '/portfolio' },
  { title: 'Capabilities', href: '/service' },
  { title: 'Ways to work', href: '/pricing' },
  { title: 'Insights', href: '/blog' },
  { title: 'About', href: '/about' },
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
