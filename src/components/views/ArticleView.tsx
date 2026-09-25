import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import TableOfContents from '@/components/blocks/TableOfContents';
import { ButtonArrow } from '@/components/ui/button';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';

export type ArticleSection = {
  title?: string;
  body?: string[];
  bullets?: string[];
  links?: { title: string; path: string }[];
  image?: { src: StaticImageData; alt: string };
  quote?: string;
  bodyAfter?: string[];
};

export type ArticleData = {
  title: string;
  label: string;
  intro?: string;
  lede?: string[];
  crumbs: { name: string; href?: string }[];
  byline?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  heroImage?: StaticImageData;
  sections: ArticleSection[];
  tags?: string[];
  relatedService?: { title: string; path: string };
  related?: { title: string; path: string; note?: string }[];
  relatedTitle?: string;
  previous?: { title: string; path: string };
  next?: { title: string; path: string };
  cta?: { title?: string; body?: string; href: string };
  /** Short pages (policies) read better without a contents rail. */
  toc?: boolean;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function formatDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso + 'T00:00:00Z');
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function readingMinutes(a: ArticleData) {
  const text = [a.intro, ...(a.lede ?? []), ...a.sections.flatMap((s) => [...(s.body ?? []), ...(s.bullets ?? []), ...(s.bodyAfter ?? []), s.quote ?? ''])].join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export default function ArticleView({ article }: { article: ArticleData }) {
  const titled = article.sections.filter((s) => s.title);
  const toc = titled.map((s) => ({ id: slugify(s.title!), title: s.title! }));
  const showToc = (article.toc ?? true) && toc.length > 2;
  const published = formatDate(article.publishedAt);
  const updated = formatDate(article.updatedAt);

  return (
    <article>
      {/* ---------- header ---------- */}
      <header className="relative overflow-hidden pb-[clamp(32px,5vw,64px)] pt-[clamp(128px,17vh,176px)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-1/3 h-[90%] w-[60%] bg-[radial-gradient(closest-side,rgb(118_84_232/0.26),transparent_70%)] blur-[10px]" />
        <div className="site-wrap relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-faint">
              {article.crumbs.map((c, i) => (
                <li key={c.name + i} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.href ? <Link href={c.href} className="hover:text-ivory">{c.name}</Link> : <span aria-current="page" className="text-muted-foreground">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <p className="inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-2 pr-3 text-[13px] text-muted-foreground">
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />{article.label}
          </p>
          <h1 className="mt-6 max-w-[22ch] text-[clamp(38px,5.4vw,80px)]">{article.title}</h1>
          {article.intro && <p className="mt-7 max-w-[62ch] text-[clamp(18px,1.5vw,21px)] leading-[1.6] text-muted-foreground">{article.intro}</p>}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 font-mono text-[12.5px] tracking-[0.02em] text-faint">
            {article.byline && (
              <Link href="/about/rahul-reddy-adelli" className="flex items-center gap-3 font-sans text-[15px] text-ivory hover:text-lime">
                <Image src={portrait} alt="" width={36} height={36} className="size-9 rounded-full object-cover" />
                <span>Rahul Reddy Adelli <span className="text-muted-foreground">· Founder</span></span>
              </Link>
            )}
            {published && <span>Published <time dateTime={article.publishedAt}>{published}</time></span>}
            {updated && updated !== published && <span>Updated <time dateTime={article.updatedAt}>{updated}</time></span>}
            <span>{readingMinutes(article)} min read</span>
          </div>
        </div>
      </header>

      {article.heroImage && (
        <div className="site-wrap">
          <div className="relative overflow-hidden rounded-[32px] border border-line">
            <Image src={article.heroImage} alt="" priority sizes="(max-width: 1320px) 100vw, 1320px" className="aspect-[2/1] w-full object-cover" />
          </div>
        </div>
      )}

      {/* ---------- body ---------- */}
      <div className="site-wrap py-[clamp(40px,6vw,88px)]">
        <div className={showToc ? 'grid gap-[clamp(32px,5vw,80px)] min-[1101px]:grid-cols-[240px_minmax(0,720px)]' : 'mx-auto max-w-[760px]'}>
          {showToc && (
            <aside className="min-[1101px]:sticky min-[1101px]:top-[calc(var(--header-h)+24px)] min-[1101px]:self-start" aria-label="Contents">
              <details className="group/toc rounded-2xl border border-line bg-graphite p-4 min-[1101px]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground [&::-webkit-details-marker]:hidden">
                  On this page <span aria-hidden="true" className="transition-transform group-open/toc:rotate-45">+</span>
                </summary>
                <TableOfContents items={toc} className="mt-4" />
              </details>
              <div className="max-[1100px]:hidden">
                <p className="eyebrow mb-4">On this page</p>
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}

          <div className="min-w-0">
            {article.lede && (
              <div className="prose-studio mb-12 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2em] first-letter:leading-[0.8] first-letter:text-lime">
                {article.lede.map((p) => <p key={p}>{p}</p>)}
              </div>
            )}
            <div className="prose-studio">
              {article.sections.map((s, i) => (
                <section key={(s.title ?? 'section') + i} aria-labelledby={s.title ? slugify(s.title) : undefined}>
                  {s.title && <h2 id={slugify(s.title)}>{s.title}</h2>}
                  {s.body?.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                  {s.image && (
                    <figure className="my-10 overflow-hidden rounded-[24px] border border-line">
                      <Image src={s.image.src} alt={s.image.alt} sizes="(max-width: 760px) 100vw, 720px" className="h-auto w-full" />
                    </figure>
                  )}
                  {s.bodyAfter?.map((p) => <p key={p}>{p}</p>)}
                  {s.quote && <blockquote><p>{s.quote}</p></blockquote>}
                  {s.links && s.links.length > 0 && (
                    <ul className="not-prose mt-6! grid gap-2.5 pl-0!">
                      {s.links.map((l) => (
                        <li key={l.path} className="pl-0! before:hidden!">
                          <Link href={l.path} className="group/btn flex items-center justify-between gap-4 rounded-2xl border border-line bg-graphite px-5 py-4 font-display text-[17px] font-semibold tracking-[-0.01em] text-ivory! no-underline! transition-colors hover:border-lime/60 hover:text-lime!">
                            {l.title}<ButtonArrow />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {article.tags && article.tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
                {article.tags.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted-foreground">{t}</li>)}
              </ul>
            )}

            {article.byline && (
              <div className="mt-12 flex flex-wrap items-center gap-5 rounded-[28px] border border-line bg-graphite p-6">
                <Image src={portrait} alt="Rahul Reddy Adelli" width={72} height={72} className="size-[72px] rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-semibold tracking-[-0.02em]">Rahul Reddy Adelli</p>
                  <p className="mt-1 text-[15px] text-muted-foreground">Founder of ReddyStack, a proof-first digital growth studio connecting web, search, paid acquisition, creative, tracking and automation.</p>
                </div>
                <Link href="/about/rahul-reddy-adelli" className="group/btn inline-flex items-center gap-2 text-[15px] font-medium text-lime">About Rahul <ButtonArrow /></Link>
              </div>
            )}

            {article.relatedService && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-violet-soft/30 bg-[radial-gradient(90%_90%_at_0%_0%,rgb(118_84_232/0.3),transparent_60%),var(--color-graphite)] p-6">
                <div>
                  <Eyebrow>Related service</Eyebrow>
                  <p className="mt-2 text-muted-foreground">Need similar help for your business? Explore {article.relatedService.title}.</p>
                </div>
                <Link href={article.relatedService.path} className="group/btn inline-flex items-center gap-2 font-medium text-lime">Explore service <ButtonArrow /></Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- related + adjacent ---------- */}
      {article.related && article.related.length > 0 && (
        <section aria-labelledby="related-reading" className="pb-[clamp(40px,6vw,80px)]">
          <div className="site-wrap">
            <h2 id="related-reading" className="eyebrow mb-5">{article.relatedTitle ?? 'Related guides'}</h2>
            <ul className="grid gap-4 min-[761px]:grid-cols-2">
              {article.related.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="group/rl flex h-full flex-col gap-2 rounded-[24px] border border-line bg-graphite p-6 transition-[border-color,transform] duration-400 ease-studio hover:-translate-y-1 hover:border-line-strong">
                    <span className="font-display text-[22px] font-semibold tracking-[-0.02em] transition-colors group-hover/rl:text-lime">{r.title}</span>
                    {r.note && <span className="text-[15px] text-muted-foreground">{r.note}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="site-wrap pb-[clamp(40px,6vw,80px)]">
        <form action="/blog" method="get" role="search" className="flex w-full max-w-[560px] items-center gap-2 rounded-full border border-line-strong bg-graphite p-1.5 pl-5 focus-within:border-lime/60">
          <label htmlFor="article-q" className="sr-only">Search articles</label>
          <input id="article-q" type="search" name="q" maxLength={120} placeholder="Search all guides and articles…" className="min-w-0 flex-1 bg-transparent text-[15px] text-ivory placeholder:text-faint focus:outline-none" />
          <button type="submit" className="rounded-full bg-lime px-4 py-2 text-[14px] font-semibold text-lime-ink transition-colors hover:bg-ivory">Search</button>
        </form>
      </div>

      {(article.previous || article.next) && (
        <nav aria-label="More articles" className="pb-[clamp(40px,6vw,80px)]">
          <div className="site-wrap grid gap-4 min-[761px]:grid-cols-2">
            {article.previous && (
              <Link href={article.previous.path} className="rounded-[24px] border border-line p-6 transition-colors hover:border-line-strong">
                <span className="eyebrow">← Previous</span>
                <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.02em]">{article.previous.title}</span>
              </Link>
            )}
            {article.next && (
              <Link href={article.next.path} className="rounded-[24px] border border-line p-6 text-right transition-colors hover:border-line-strong min-[761px]:col-start-2">
                <span className="eyebrow">Next →</span>
                <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.02em]">{article.next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {article.cta && <CtaBand href={article.cta.href} title={article.cta.title} body={article.cta.body} />}
    </article>
  );
}
