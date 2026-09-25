import Image from 'next/image';
import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import SectionHead from '@/components/blocks/SectionHead';
import { ServiceIllustration } from '@/components/illustrations/ServiceIllustrations';
import { hubService } from '@/components/views/HubView';
import { Button, ButtonArrow } from '@/components/ui/button';
import { blogCategories, blogPosts } from '@/data/BlogPostsData';
import { seoPages } from '@/data/SeoPagesData';
import { cn } from '@/lib/utils';

type Result = { title: string; path: string; note?: string; kind: string };

type Props =
  | { mode: 'index' }
  | { mode: 'results'; query: string; categoryKey: string; heading: string; summary: string; results: Result[] };

const hubs = seoPages.filter((p) => p.kind === 'hub' && p.parent === '/blog');
const guidesOf = (hubPath: string) => seoPages.filter((p) => p.kind === 'guide' && p.parent === hubPath);

function SearchForm({ query = '', className }: { query?: string; className?: string }) {
  return (
    <form action="/blog" method="get" role="search" className={cn('flex w-full max-w-[560px] items-center gap-2 rounded-full border border-line-strong bg-graphite p-2 pl-6 transition-colors focus-within:border-lime/60', className)}>
      <label htmlFor="blog-q" className="sr-only">Search articles</label>
      <input
        id="blog-q"
        type="search"
        name="q"
        defaultValue={query}
        maxLength={120}
        placeholder="Search guides: audit, budget, local SEO…"
        className="min-w-0 flex-1 bg-transparent text-[16px] text-ivory placeholder:text-faint focus:outline-none"
      />
      <Button type="submit">Search <ButtonArrow /></Button>
    </form>
  );
}

function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-[clamp(40px,6vw,80px)] pt-[clamp(128px,17vh,176px)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(247_244_235/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(247_244_235/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_70%_at_70%_20%,#000,transparent_75%)]" />
      <div className="site-wrap relative">{children}</div>
    </section>
  );
}

function Crumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex gap-2 font-mono text-xs uppercase tracking-[0.1em] text-faint">
        <li><Link href="/" className="hover:text-ivory">Home</Link></li><li aria-hidden="true">/</li>
        {current === 'Insights'
          ? <li aria-current="page" className="text-muted-foreground">Insights</li>
          : <><li><Link href="/blog" className="hover:text-ivory">Insights</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-muted-foreground">{current}</li></>}
      </ol>
    </nav>
  );
}

function CategoryChips({ active }: { active?: string }) {
  return (
    <nav aria-label="Article categories" className="flex flex-wrap gap-2">
      <Link href="/blog#articles" aria-current={!active ? 'page' : undefined} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] text-muted-foreground transition-colors hover:text-ivory aria-[current=page]:border-lime aria-[current=page]:text-lime">All</Link>
      {blogCategories.map((c) => (
        <Link key={c.key} href={`/blog?category=${encodeURIComponent(c.key)}`} aria-current={active === c.key ? 'page' : undefined} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] text-muted-foreground transition-colors hover:text-ivory aria-[current=page]:border-lime aria-[current=page]:text-lime">
          {c.label}
        </Link>
      ))}
    </nav>
  );
}

export default function BlogIndexView(props: Props) {
  if (props.mode === 'results') {
    return (
      <>
        <Hero>
          <Crumbs current={props.heading} />
          <p className="eyebrow">ReddyStack Insights</p>
          <h1 className="mt-5 text-[clamp(38px,5.4vw,80px)]">{props.heading}</h1>
          <p role="status" className="mt-5 text-[18px] text-muted-foreground">{props.summary}</p>
          <SearchForm query={props.query} className="mt-8" />
          <div className="mt-6"><CategoryChips active={props.categoryKey || undefined} /></div>
        </Hero>
        <section aria-label="Results" className="pb-[clamp(56px,8vw,112px)]">
          <div className="site-wrap">
            {props.results.length ? (
              <ol className="grid border-t border-line">
                {props.results.map((r) => (
                  <li key={r.path} className="border-b border-line">
                    <Link href={r.path} className="group/r grid gap-2 py-6 min-[761px]:grid-cols-[140px_1fr_auto] min-[761px]:items-center min-[761px]:gap-8">
                      <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-lime">{r.kind}</span>
                      <span>
                        <span className="block font-display text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.02em] transition-colors group-hover/r:text-lime">{r.title}</span>
                        {r.note && <span className="mt-1 line-clamp-2 block text-[15px] text-muted-foreground">{r.note}</span>}
                      </span>
                      <span aria-hidden="true" className="hidden size-11 place-items-center rounded-full border border-line transition-all duration-400 group-hover/r:-rotate-45 group-hover/r:border-lime group-hover/r:bg-lime group-hover/r:text-lime-ink min-[761px]:grid">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="rounded-[28px] border border-line bg-graphite p-8">
                <h2 className="text-2xl">No articles found</h2>
                <p className="mt-2 text-muted-foreground">Try another topic or return to the main Insights page.</p>
              </div>
            )}
            <Link href="/blog" className="group/btn mt-10 inline-flex items-center gap-2 font-medium text-lime">Return to Insights <ButtonArrow /></Link>
          </div>
        </section>
      </>
    );
  }

  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Hero>
        <Crumbs current="Insights" />
        <div className="grid items-end gap-10 min-[1025px]:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-2 pr-3 font-sans text-[13px] normal-case tracking-normal">
              <span aria-hidden="true" className="size-2 animate-pulse-dot rounded-full bg-lime" />Proof-first insights
            </p>
            <h1 className="mt-6 max-w-[16ch] text-[clamp(42px,6.2vw,96px)]">Make the next growth decision <em className="not-italic text-lime">with evidence.</em></h1>
            <SearchForm className="mt-10" />
          </div>
          <div className="grid gap-4 text-[16.5px] leading-[1.7] text-muted-foreground">
            <p>Use the topic guides to work through a specific decision: diagnose a bottleneck, plan a controlled ad test, prepare a creative brief, check search visibility, or review a website before launch. Each collection links to practical checklists and examples across the connected growth stack.</p>
            <p className="text-[15px] text-faint">Examples and calculations explain a method; they are not client results or forecasts. Where a guide discusses a platform rule, check the linked official reference before making a live change because requirements can change. For your own review, keep a note of the starting problem, the evidence and the change you decide to make.</p>
          </div>
        </div>
      </Hero>

      {/* ---------- topic hubs ---------- */}
      <section aria-labelledby="topics-title" className="py-[clamp(40px,6vw,80px)]">
        <div className="site-wrap">
          <SectionHead id="topics-title" label="Guide topics" title="Six collections. One stack." intro={`${seoPages.filter((p) => p.kind === 'guide').length} practical guides, checklists and templates, grouped by the part of the stack they help with.`} />
          <div className="grid gap-4 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-3">
            {hubs.map((h) => {
              const key = h.path.split('/')[2];
              const guides = guidesOf(h.path);
              return (
                <article key={h.path} data-reveal className="group/hub relative flex flex-col gap-4 rounded-[28px] border border-line bg-graphite p-6 transition-[border-color,transform,opacity] duration-500 ease-studio hover:-translate-y-1 hover:border-line-strong">
                  <ServiceIllustration slug={hubService[key] ?? 'seo-websites'} />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[26px]"><Link href={h.path} className="after:absolute after:inset-0 hover:text-lime">{h.title}</Link></h3>
                    <span className="font-mono text-xs text-lime">{guides.length}</span>
                  </div>
                  <ul className="relative z-[1] grid gap-1.5 text-[14.5px] text-muted-foreground">
                    {guides.slice(0, 3).map((g) => <li key={g.path}><Link href={g.path} className="hover:text-ivory">→ {g.title}</Link></li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- articles ---------- */}
      <section id="articles" aria-labelledby="articles-title" className="scroll-mt-[calc(var(--header-h)+16px)] py-[clamp(48px,7vw,96px)]">
        <div className="site-wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Articles</Eyebrow>
              <h2 id="articles-title" className="mt-4 text-[clamp(32px,4vw,56px)]">Longer reads on building.</h2>
            </div>
            <CategoryChips />
          </div>

          <Link href={featured.path} data-view className="group/f grid overflow-hidden rounded-[32px] border border-line bg-graphite transition-colors hover:border-line-strong min-[961px]:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden min-[961px]:aspect-auto">
              <Image src={featured.cardImage} alt="" fill sizes="(max-width: 960px) 100vw, 60vw" className="object-cover transition-transform duration-1000 ease-studio group-hover/f:scale-105" />
            </div>
            <div className="flex flex-col justify-end gap-4 p-[clamp(24px,3vw,44px)]">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-lime">{featured.categoryLabel} · {featured.readTime}</span>
              <h3 className="text-[clamp(28px,3vw,42px)] transition-colors group-hover/f:text-lime">{featured.title}</h3>
              <p className="text-muted-foreground">{featured.excerpt}</p>
              <span className="font-mono text-[12.5px] text-faint">{featured.displayDate}</span>
            </div>
          </Link>

          <ul className="mt-4 grid gap-4 min-[761px]:grid-cols-2 min-[1181px]:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug} data-reveal>
                <Link href={p.path} className="group/p flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-graphite transition-[border-color,transform] duration-500 ease-studio hover:-translate-y-1 hover:border-line-strong">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.cardImage} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw" className="object-cover transition-transform duration-1000 ease-studio group-hover/p:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-lime">{p.categoryLabel} · {p.readTime}</span>
                    <h3 className="text-[22px] leading-tight transition-colors group-hover/p:text-lime">{p.title}</h3>
                    <p className="line-clamp-3 text-[15px] text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- every guide ---------- */}
      <section aria-labelledby="all-guides" className="py-[clamp(40px,6vw,80px)]">
        <div className="site-wrap grid gap-8 min-[961px]:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow>Every guide</Eyebrow>
            <h2 id="all-guides" className="mt-4 text-[clamp(28px,3.4vw,46px)]">The full index.</h2>
          </div>
          <div>
            {hubs.map((h, i) => (
              <details key={h.path} open={i === 0} className="group/idx border-t border-line last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[22px] font-semibold tracking-[-0.02em] transition-colors hover:text-lime [&::-webkit-details-marker]:hidden">
                  {h.title}
                  <span className="flex items-center gap-3 font-mono text-xs text-faint">{guidesOf(h.path).length}<span aria-hidden="true" className="text-lg text-ivory transition-transform group-open/idx:rotate-45">+</span></span>
                </summary>
                <ul className="grid gap-x-8 gap-y-2 pb-6 text-[15.5px] min-[641px]:grid-cols-2">
                  {guidesOf(h.path).map((g) => <li key={g.path}><Link href={g.path} className="text-muted-foreground transition-colors hover:text-lime">{g.title}</Link></li>)}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand href="/contact?source=/blog" />
    </>
  );
}
