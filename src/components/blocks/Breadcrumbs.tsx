import Link from 'next/link';

export type Crumb = { name: string; href?: string };

/** Plain breadcrumb trail for deep pages (guides, service pages, policies). */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
        {crumbs.map((c, i) => (
          <li key={`${c.name}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? (
              <Link href={c.href} className="underline-offset-4 hover:text-text hover:underline">{c.name}</Link>
            ) : (
              <span aria-current="page" className="text-text/80">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
