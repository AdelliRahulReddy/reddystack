import Image from 'next/image';
import Link from 'next/link';

import CtaBand from '@/components/blocks/CtaBand';
import PageHero from '@/components/blocks/PageHero';
import { ButtonArrow } from '@/components/ui/button';
import { siteConfig } from '@/data/siteConfig';
import type { getSeoContext } from '@/components/seo/seoContent';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';

const facts = [
  ['Based in', 'Hyderabad, India'],
  ['Founded', 'April 2026'],
  ['Works with', 'US & UK teams, remotely'],
  ['Leads', 'Every engagement directly'],
] as const;

export default function FounderView({ ctx }: { ctx: ReturnType<typeof getSeoContext> }) {
  const { page, parents } = ctx;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ctx.schemaJson }} />
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, ...parents.map((p) => ({ name: p.name, href: p.path })), { name: page.title }]}
        eyebrow={page.subtitle}
        title={page.title}
        intro={page.intro}
        size="md"
        aside={
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-[32px] border border-line-strong">
              <Image src={portrait} alt="Rahul Reddy Adelli" priority sizes="(max-width: 960px) 92vw, 520px" className="aspect-[7/6] w-full object-cover" />
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-graphite p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{k}</dt>
                  <dd className="mt-1 text-[15px] text-ivory">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section aria-label="Profile" className="py-[clamp(40px,6vw,88px)]">
        <div className="site-wrap grid gap-[clamp(32px,5vw,80px)] min-[1025px]:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label="On this page" className="max-[1024px]:hidden min-[1025px]:sticky min-[1025px]:top-[calc(var(--header-h)+24px)] min-[1025px]:self-start">
            <p className="eyebrow mb-4">On this page</p>
            <ol className="grid gap-2 border-l border-line">
              {page.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s-${i}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-[15px] text-muted-foreground transition-colors hover:border-lime hover:text-ivory">{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid max-w-[760px] gap-[clamp(40px,5vw,64px)]">
            {page.sections.map((s, i) => (
              <section key={s.title} id={`s-${i}`} aria-labelledby={`s-${i}-t`} data-reveal className="scroll-mt-[calc(var(--header-h)+24px)]">
                <p className="font-mono text-xs tracking-[0.12em] text-lime">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`s-${i}-t`} className="mt-3 text-[clamp(26px,3vw,40px)]">{s.title}</h2>
                <div className="prose-studio mt-5">
                  {s.body.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
                {s.links && (
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {s.links.map((l) => (
                      <Link key={l.path} href={l.path} className="group/btn inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[15px] font-medium transition-colors hover:border-lime hover:text-lime">
                        {l.title} <ButtonArrow className="size-5" />
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}
            <p className="font-mono text-[13px] text-faint">
              {siteConfig.email} · WhatsApp {siteConfig.phoneDisplay}
              {page.updatedAt && <> · Updated <time dateTime={page.updatedAt}>{page.updatedAt}</time></>}
            </p>
          </div>
        </div>
      </section>

      <CtaBand href="/contact?source=/about/rahul-reddy-adelli" />
    </>
  );
}
