import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import Eyebrow from '@/components/blocks/Eyebrow';
import PageHero from '@/components/blocks/PageHero';
import { IllustrationStage } from '@/components/illustrations/ServiceIllustrations';
import { Button, ButtonArrow } from '@/components/ui/button';
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
        eyebrow={`${page.subtitle} · ${guides.length} guides`}
        title={page.title}
        intro={page.intro}
        actions={
          <>
            <Button asChild size="lg"><a href="#guides">Browse the guides <ButtonArrow down /></a></Button>
            {service && <Button asChild size="lg" variant="ghost"><Link href={service.path}>{service.title} service <ButtonArrow /></Link></Button>}
          </>
        }
        aside={<IllustrationStage slug={hubService[key] ?? 'seo-websites'} caption="Guides & checklists" detail={`${guides.length} guides`} />}
      />

      <section id="guides" aria-labelledby="guides-title" className="scroll-mt-[calc(var(--header-h)+16px)] py-[clamp(40px,6vw,80px)]">
        <div className="site-wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{guideSections[0]?.title ?? 'Guides'}</Eyebrow>
              <h2 id="guides-title" className="mt-4 text-[clamp(32px,4vw,56px)]">Start with the problem you can see.</h2>
            </div>
            <form action="/blog" method="get" role="search" className="flex w-full max-w-[360px] items-center gap-2 rounded-full border border-line-strong bg-graphite p-1.5 pl-5">
              <label htmlFor="hub-q" className="sr-only">Search all guides</label>
              <input id="hub-q" type="search" name="q" placeholder="Search all guides…" maxLength={120} className="min-w-0 flex-1 bg-transparent text-[15px] text-ivory placeholder:text-faint focus:outline-none" />
              <Button type="submit" size="icon-sm" aria-label="Search">→</Button>
            </form>
          </div>
          <ol className="grid gap-3 min-[761px]:grid-cols-2">
            {guides.map((g, i) => {
              const guide = getSeoPage(g.path);
              return (
                <li key={g.path} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 4) * 0.05}s` }}>
                  <Link href={g.path} className="group/g flex h-full gap-5 rounded-[24px] border border-line bg-graphite p-6 transition-[border-color,transform,opacity] duration-400 ease-studio hover:-translate-y-1 hover:border-line-strong">
                    <span className="font-mono text-[13px] text-lime">{String(i + 1).padStart(2, '0')}</span>
                    <span className="grid gap-2">
                      <span className="font-display text-[21px] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover/g:text-lime">{g.title}</span>
                      {guide && <span className="line-clamp-2 text-[15px] text-muted-foreground">{guide.description}</span>}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {otherSections.length > 0 && (
        <section aria-label="How to use these guides" className="py-[clamp(48px,7vw,96px)]">
          <div className="site-wrap grid gap-4 min-[961px]:grid-cols-2">
            {otherSections.map((s) => (
              <div key={s.title} data-reveal className="rounded-[28px] border border-line p-[clamp(24px,3vw,40px)]">
                <h2 className="text-[clamp(24px,2.6vw,34px)]">{s.title}</h2>
                <div className="prose-studio mt-5 text-[16.5px]">
                  {s.body.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
                {s.links && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.links.map((l) => <Link key={l.path} href={l.path} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[14px] transition-colors hover:border-lime hover:text-lime">{l.title}</Link>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBand
        href={`/contact?${contactParams}`}
        title="Rather have Rahul look at it?"
        body="Send the problem you can see, what you have tried and the outcome you need. The first reply says what should be checked first."
      />
    </>
  );
}
