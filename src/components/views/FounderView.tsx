import Image from 'next/image';
import Link from 'next/link';

import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import { siteConfig } from '@/data/siteConfig';
import type { getSeoContext } from '@/components/seo/seoContent';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';

const facts = [
  ['Based in', 'Hyderabad, India'],
  ['Founded', 'April 2026'],
  ['Works with', 'Businesses across India'],
  ['Leads', 'Every engagement directly'],
] as const;

export default function FounderView({ ctx }: { ctx: ReturnType<typeof getSeoContext> }) {
  const { page, parents } = ctx;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ctx.schemaJson }} />
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, ...parents.map((p) => ({ name: p.name, href: p.path })), { name: page.title }]}
        title={page.title}
        intro={page.intro}
        size="md"
        aside={
          <div className="grid gap-4">
            <Image src={portrait} alt="Rahul Reddy Adelli" priority sizes="(max-width: 960px) 92vw, 520px" className="aspect-[7/6] w-full rounded-[var(--radius-panel)] shadow-card object-cover" />
            <dl className="grid grid-cols-2 gap-2">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-[var(--radius-card)] shadow-card bg-surface p-4">
                  <dt className="text-small text-muted">{k}</dt>
                  <dd className="mt-1 text-[15px] text-ivory">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section aria-label="Profile" className="section pt-0">
        <div className="site-wrap grid gap-[clamp(32px,5vw,80px)] min-[1025px]:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label="On this page" className="max-[1024px]:hidden min-[1025px]:sticky min-[1025px]:top-[calc(var(--header-h)+24px)] min-[1025px]:self-start">
            <p className="mb-3 text-small text-muted">On this page</p>
            <ol className="grid gap-1">
              {page.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s-${i}`} className="block py-1 text-[15px] text-muted transition-colors hover:text-text">{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid max-w-[760px] gap-[clamp(40px,5vw,64px)]">
            {page.sections.map((s, i) => (
              <section key={s.title} id={`s-${i}`} aria-labelledby={`s-${i}-t`} className="scroll-mt-[calc(var(--header-h)+24px)]">
                <h2 id={`s-${i}-t`} className="text-h2">{s.title}</h2>
                <div className="prose-studio mt-5">
                  {s.body.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
                {s.links && (
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {s.links.map((l) => (
                      <Link key={l.path} href={l.path} className="rounded-full bg-surface px-4 py-2 text-[15px] font-medium transition-colors hover:bg-surface-2 hover:text-action-text">{l.title}</Link>
                    ))}
                  </div>
                )}
              </section>
            ))}
            <p className="text-small text-muted">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ivory">{siteConfig.email}</a> · <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-ivory">Call {siteConfig.phoneDisplay}</a> · <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ivory">WhatsApp</a>
              {page.updatedAt && <> · Updated <time dateTime={page.updatedAt}>{page.updatedAt}</time></>}
            </p>
          </div>
        </div>
      </section>

      <EnquiryStep href="/contact?source=/about/rahul-reddy-adelli" />
    </>
  );
}
