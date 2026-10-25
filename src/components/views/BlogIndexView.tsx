import Image from 'next/image';
import Link from 'next/link';

import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import SectionHead from '@/components/blocks/SectionHead';
import { TextLink } from '@/components/blocks/ButtonLink';
import { blogCategories, blogPosts } from '@/data/BlogPostsData';
import { seoPages } from '@/data/SeoPagesData';
import { cn } from '@/lib/utils';

type Result = { title: string; path: string; note?: string; kind: string };

type Props =
  | { mode: 'index' }
  | { mode: 'results'; query: string; categoryKey: string; heading: string; summary: string; results: Result[] };

const hubs = seoPages.filter((p) => p.kind === 'hub' && p.parent === '/blog');
const guidesOf = (hubPath: string) => seoPages.filter((p) => p.kind === 'guide' && p.parent === hubPath);
const tile = 'block rounded-[var(--radius-card)] shadow-card bg-surface p-5 transition-colors hover:bg-surface-2 sm:p-6';

function SearchForm({ query = '' }: { query?: string }) {
  return (
    <form action="/blog" method="get" role="search" className="flex w-full max-w-[520px] items-center gap-2 rounded-full bg-surface p-1.5 pl-5">
      <label htmlFor="blog-q" className="sr-only">Search guides and articles</label>
      <input id="blog-q" type="search" name="q" defaultValue={query} maxLength={120} placeholder="Search: ads, budget, local search…" className="min-w-0 flex-1 bg-transparent text-base text-text placeholder:text-muted focus:outline-none" />
      <button type="submit" className="min-h-11 rounded-full bg-action px-5 font-semibold text-action-ink hover:bg-action-hover">Search</button>
    </form>
  );
}

function CategoryLinks({ active }: { active?: string }) {
  const chip = 'rounded-full px-3.5 py-1.5 text-[14px] transition-colors aria-[current=page]:bg-text aria-[current=page]:text-ground';
  return (
    <nav aria-label="Article topics" className="flex flex-wrap gap-2">
      <Link href="/blog#articles" aria-current={!active ? 'page' : undefined} className={cn(chip, 'bg-surface text-muted hover:text-text')}>All</Link>
      {blogCategories.map((c) => (
        <Link key={c.key} href={`/blog?category=${encodeURIComponent(c.key)}`} aria-current={active === c.key ? 'page' : undefined} className={cn(chip, 'bg-surface text-muted hover:text-text')}>
          {c.label}
        </Link>
      ))}
    </nav>
  );
}

/** Guides and articles: search, topic collections, articles, the full index, and an enquiry step. */
export default function BlogIndexView(props: Props) {
  if (props.mode === 'results') {
    return (
      <>
        <PageHero
          crumbs={[{ name: 'Home', href: '/' }, { name: 'Guides and articles', href: '/blog' }, { name: props.heading }]}
          title={props.heading}
          intro={<span role="status">{props.summary}</span>}
          actions={<SearchForm query={props.query} />}
          meta={<CategoryLinks active={props.categoryKey || undefined} />}
        />
        <section aria-label="Results" className="section pt-0">
          <div className="site-wrap">
            {props.results.length ? (
              <ul className="grid gap-2">
                {props.results.map((r) => (
                  <li key={r.path}>
                    <Link href={r.path} className={tile}>
                      <span className="block text-small text-muted">{r.kind}</span>
                      <span className="mt-1 block font-semibold text-text">{r.title}</span>
                      {r.note && <span className="mt-1 line-clamp-2 block text-[15px] text-muted">{r.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-[var(--radius-card)] shadow-card bg-surface p-8">
                <h2 className="text-h3 font-semibold">No articles found</h2>
                <p className="mt-2 text-muted">Try another topic, or go back to all guides and articles.</p>
              </div>
            )}
            <div className="mt-8"><TextLink href="/blog">All guides and articles</TextLink></div>
          </div>
        </section>
        <EnquiryStep href="/contact?source=/blog" />
      </>
    );
  }

  const guideCount = seoPages.filter((p) => p.kind === 'guide').length;

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Guides and articles' }]}
        title="Guides for getting more customers."
        intro="Plain guides on ads, pages and getting found on Google. Examples explain a method; they are not client results."
        actions={<SearchForm />}
      />

      <section aria-labelledby="topics-title" className="section pt-0">
        <div className="site-wrap">
          <SectionHead id="topics-title" title="Guide collections" intro={`${guideCount} guides and checklists, grouped by topic.`} />
          <ul className="grid gap-3 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-3">
            {hubs.map((h) => (
              <li key={h.path}>
                <Link href={h.path} className={cn(tile, 'h-full')}>
                  <span className="block text-h3 font-semibold text-text">{h.title}</span>
                  <span className="mt-1 block text-[15px] text-muted">{guidesOf(h.path).length} guides</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="articles" aria-labelledby="articles-title" className="section bg-surface scroll-mt-[calc(var(--header-h)+16px)]">
        <div className="site-wrap">
          <SectionHead id="articles-title" title="Articles" intro="Longer reads on websites, products and automation." />
          <div className="mb-8"><CategoryLinks /></div>
          <ul className="grid gap-4 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-3">
            {blogPosts.map((p) => (
              <li key={p.slug}>
                <Link href={p.path} className="group/p flex h-full flex-col rounded-[var(--radius-card)] shadow-card bg-ground p-4 transition-colors hover:bg-surface-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface-2">
                    <Image src={p.cardImage} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw" className="object-cover" />
                  </div>
                  <span className="mt-4 text-small text-muted">{p.categoryLabel}, {p.readTime}</span>
                  <span className="mt-1 font-semibold leading-snug text-text group-hover/p:text-action-text">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="all-guides" className="section">
        <div className="site-wrap grid gap-8 min-[961px]:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)]">
          <h2 id="all-guides" className="text-h2">Every guide</h2>
          <div className="grid gap-2">
            {hubs.map((h, i) => (
              <details key={h.path} open={i === 0} className="rounded-[var(--radius-card)] shadow-card bg-surface px-5 sm:px-6">
                <summary className="cursor-pointer py-4 font-semibold text-text">{h.title} ({guidesOf(h.path).length})</summary>
                <ul className="grid gap-x-8 gap-y-2 pb-5 text-[15.5px] min-[641px]:grid-cols-2">
                  {guidesOf(h.path).map((g) => <li key={g.path}><Link href={g.path} className="text-muted hover:text-action-text">{g.title}</Link></li>)}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <EnquiryStep href="/contact?source=/blog" />
    </>
  );
}
