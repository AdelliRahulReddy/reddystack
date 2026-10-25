import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import Breadcrumbs from '@/components/blocks/Breadcrumbs';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import TableOfContents from '@/components/blocks/TableOfContents';
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
  /** Short pages (policies) read better without a contents list. */
  toc?: boolean;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function formatDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso + 'T00:00:00Z');
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

function readingMinutes(a: ArticleData) {
  const text = [a.intro, ...(a.lede ?? []), ...a.sections.flatMap((s) => [...(s.body ?? []), ...(s.bullets ?? []), ...(s.bodyAfter ?? []), s.quote ?? ''])].join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

const cardLink = 'block rounded-[var(--radius-card)] shadow-card bg-surface px-5 py-4 font-semibold text-text transition-colors hover:bg-surface-2 hover:text-action-text';

/** Reading layout for guides, blog posts and policies: breadcrumbs, title, contents, body, related, enquiry step. */
export default function ArticleView({ article }: { article: ArticleData }) {
  const toc = article.sections.filter((s) => s.title).map((s) => ({ id: slugify(s.title!), title: s.title! }));
  const showToc = (article.toc ?? true) && toc.length > 2;
  const published = formatDate(article.publishedAt);
  const updated = formatDate(article.updatedAt);

  return (
    <article>
      <header className="pb-[clamp(28px,4vw,56px)] pt-[clamp(28px,5vw,72px)]">
        <div className="site-wrap">
          <Breadcrumbs crumbs={article.crumbs} />
          <p className="text-small text-muted">{article.label}</p>
          <h1 className="mt-2 max-w-[24ch] text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] leading-[1.04]">{article.title}</h1>
          {article.intro && <p className="mt-5 max-w-[62ch] text-[clamp(17px,1.35vw,20px)] text-muted">{article.intro}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-muted">
            {article.byline && (
              <Link href="/about/rahul-reddy-adelli" className="flex items-center gap-2.5 text-text hover:text-action-text">
                <Image src={portrait} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
                Rahul Reddy Adelli
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
          <Image src={article.heroImage} alt="" priority sizes="(max-width: 1240px) 100vw, 1240px" className="aspect-[2/1] w-full rounded-[var(--radius-panel)] shadow-card object-cover" />
        </div>
      )}

      <div className="site-wrap py-[clamp(32px,5vw,72px)]">
        <div className={showToc ? 'grid gap-[clamp(28px,4vw,64px)] min-[1101px]:grid-cols-[240px_minmax(0,720px)]' : 'mx-auto max-w-[760px]'}>
          {showToc && (
            <aside className="min-[1101px]:sticky min-[1101px]:top-[calc(var(--header-h)+24px)] min-[1101px]:self-start" aria-label="Contents">
              <details className="rounded-[var(--radius-card)] shadow-card bg-surface p-4 min-[1101px]:hidden">
                <summary className="cursor-pointer font-semibold text-text">On this page</summary>
                <TableOfContents items={toc} className="mt-3" />
              </details>
              <div className="max-[1100px]:hidden">
                <p className="mb-3 text-small text-muted">On this page</p>
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}

          <div className="min-w-0">
            {article.lede && <div className="prose-studio mb-10">{article.lede.map((p) => <p key={p}>{p}</p>)}</div>}
            <div className="prose-studio">
              {article.sections.map((s, i) => (
                <section key={(s.title ?? 'section') + i} aria-labelledby={s.title ? slugify(s.title) : undefined}>
                  {s.title && <h2 id={slugify(s.title)}>{s.title}</h2>}
                  {s.body?.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                  {s.image && (
                    <figure className="my-8">
                      <Image src={s.image.src} alt={s.image.alt} sizes="(max-width: 760px) 100vw, 720px" className="h-auto w-full" />
                    </figure>
                  )}
                  {s.bodyAfter?.map((p) => <p key={p}>{p}</p>)}
                  {s.quote && <blockquote><p>{s.quote}</p></blockquote>}
                  {s.links && s.links.length > 0 && (
                    <ul className="not-prose mt-6! grid list-none! gap-2 pl-0!">
                      {s.links.map((l) => <li key={l.path} className="mt-0!"><Link href={l.path} className={cardLink}>{l.title}</Link></li>)}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {article.tags && article.tags.length > 0 && (
              <p className="mt-10 text-small text-muted">Topics: {article.tags.join(', ')}</p>
            )}

            {article.relatedService && (
              <p className="mt-10 rounded-[var(--radius-card)] shadow-card bg-surface p-6 text-muted">
                Need this for your business? <Link href={article.relatedService.path} className="font-semibold text-action-text underline underline-offset-4">See {article.relatedService.title}</Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {article.related && article.related.length > 0 && (
        <section aria-labelledby="related-reading" className="section-tight">
          <div className="site-wrap">
            <h2 id="related-reading" className="text-h3 font-semibold">{article.relatedTitle ?? 'Related guides'}</h2>
            <ul className="mt-4 grid gap-2 min-[761px]:grid-cols-2">
              {article.related.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className={cardLink}>
                    {r.title}
                    {r.note && <span className="mt-1 block text-[15px] font-normal text-muted">{r.note}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(article.previous || article.next) && (
        <nav aria-label="More articles" className="section-tight pt-0">
          <div className="site-wrap grid gap-3 min-[761px]:grid-cols-2">
            {article.previous && (
              <Link href={article.previous.path} className={cardLink}>
                <span className="block text-small font-normal text-muted">Previous</span>{article.previous.title}
              </Link>
            )}
            {article.next && (
              <Link href={article.next.path} className={`${cardLink} min-[761px]:col-start-2`}>
                <span className="block text-small font-normal text-muted">Next</span>{article.next.title}
              </Link>
            )}
          </div>
        </nav>
      )}

      <EnquiryStep href={article.cta?.href ?? '/contact'} title={article.cta?.title} body={article.cta?.body} />
    </article>
  );
}
