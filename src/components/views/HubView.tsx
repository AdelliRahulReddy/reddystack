import Link from 'next/link';

import EnquiryStep from '@/components/blocks/EnquiryStep';
import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import PageHero from '@/components/blocks/PageHero';
import { getSeoPage } from '@/data/SeoPagesData';
import { getServiceDetail } from '@/data/ServiceDetailData';
import type { getSeoContext } from '@/components/seo/seoContent';

// Topic hub → the service it supports.
export const hubService: Record<string, string> = {
  'meta-ads': 'meta-ads',
  'google-ads': 'google-ads',
  'ad-creatives': 'ad-creatives',
  'ai-ugc-videos': 'ai-ugc-videos',
  'website-development': 'seo-websites',
  'seo-local-seo': 'seo-local-seo',
};

export default function HubView({ ctx }: { ctx: ReturnType<typeof getSeoContext> }) {
  const { page, parents } = ctx;
  const key = page.path.split('/')[2];
  const service = getServiceDetail(hubService[key] ?? '');
  const guideSections = page.sections.filter((s) => s.links?.some((l) => l.path.startsWith(page.path + '/')));
  const otherSections = page.sections.filter((s) => !guideSections.includes(s));
  const guides = guideSections.flatMap((s) => s.links ?? []);
  const contactParams = new URLSearchParams({ ...(service ? { service: service.contactService || service.slug } : {}), source: page.path });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ctx.schemaJson }} />
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, ...parents.map((p) => ({ name: p.name, href: p.path })), { name: page.title }]}
        title={page.title}
        intro={page.intro}
        meta={`${page.subtitle}. ${guides.length} guides.`}
        actions={
          <>
            <ButtonLink href={`/contact?${contactParams}`}>Get a price for this</ButtonLink>
            <TextLink href="#guides">Browse the guides</TextLink>
          </>
        }
      />

      <section id="guides" aria-labelledby="guides-title" className="section pt-0 scroll-mt-[calc(var(--header-h)+16px)]">
        <div className="site-wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="guides-title" className="text-h2">Start with the problem you can see</h2>
            <form action="/blog" method="get" role="search" className="flex w-full max-w-[360px] items-center gap-2 rounded-full bg-surface p-1.5 pl-5">
              <label htmlFor="hub-q" className="sr-only">Search all guides</label>
              <input id="hub-q" type="search" name="q" placeholder="Search all guides" maxLength={120} className="min-w-0 flex-1 bg-transparent text-[15px] text-text placeholder:text-muted focus:outline-none" />
              <button type="submit" className="rounded-full bg-surface-2 px-4 py-2 text-[14px] font-semibold text-text hover:bg-charcoal">Search</button>
            </form>
          </div>
          <ul className="grid gap-2 min-[761px]:grid-cols-2">
            {guides.map((g) => {
              const guide = getSeoPage(g.path);
              return (
                <li key={g.path}>
                  <Link href={g.path} className="block h-full rounded-[var(--radius-card)] shadow-card bg-surface p-5 transition-colors hover:bg-surface-2 sm:p-6">
                    <span className="block font-semibold text-text">{g.title}</span>
                    {guide && <span className="mt-1 line-clamp-2 block text-[15px] text-muted">{guide.description}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          {service && <p className="mt-8 text-muted">Want it done for you? <TextLink href={service.path}>See the {service.title} service</TextLink></p>}
        </div>
      </section>

      {otherSections.length > 0 && (
        <section aria-label="How to use these guides" className="section pt-0">
          <div className="site-wrap grid gap-4 min-[961px]:grid-cols-2">
            {otherSections.map((s) => (
              <div key={s.title} className="rounded-[var(--radius-card)] shadow-card bg-surface p-[clamp(24px,3vw,40px)]">
                <h2 className="text-h3 font-semibold">{s.title}</h2>
                <div className="prose-studio mt-5 text-[16.5px]">
                  {s.body.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
                {s.links && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.links.map((l) => <Link key={l.path} href={l.path} className="rounded-full bg-surface-2 px-3.5 py-1.5 text-[14px] transition-colors hover:text-action-text">{l.title}</Link>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <EnquiryStep
        href={`/contact?${contactParams}`}
        title="Rather have Rahul look at it?"
        label="Get a price for this"
        body="Send the problem you can see, what you have tried and the outcome you need. The first reply says what should be checked first."
      />
    </>
  );
}
