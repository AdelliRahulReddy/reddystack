import Link from "next/link";

import SiteChrome from "@/components/site/SiteChrome";
import { ButtonLink, TextLink } from "@/components/blocks/ButtonLink";
import EnquiryStep from "@/components/blocks/EnquiryStep";
import { buildPageMetadata } from "@/data/siteConfig";

export const metadata = buildPageMetadata("notFound");

const destinations = [
  { title: "Pricing", body: "Every public price, in rupees.", href: "/pricing" },
  { title: "Services", body: "Pages, ads and getting found on Google.", href: "/services" },
  { title: "Works", body: "Client work and our own projects.", href: "/works" },
  { title: "Guides", body: "Plain guides on ads, pages and search.", href: "/blog" },
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="pb-[clamp(40px,6vw,88px)] pt-[clamp(28px,5vw,72px)]">
        <div className="site-wrap">
          <p className="text-small text-muted">Page not found</p>
          <h1 className="mt-2 max-w-[18ch] text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] leading-[1.04]">This page moved, or never existed.</h1>
          <p className="mt-5 max-w-[48ch] text-muted">Start from the homepage, or pick one of the pages below.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/">Back to the homepage</ButtonLink>
            <TextLink href="/contact">Ask Rahul directly</TextLink>
          </div>
        </div>
      </section>
      <section aria-labelledby="nf-dest" className="section pt-0">
        <div className="site-wrap">
          <h2 id="nf-dest" className="sr-only">Popular pages</h2>
          <ul className="grid gap-3 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
            {destinations.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="block h-full rounded-[var(--radius-card)] shadow-card bg-surface p-6 transition-colors hover:bg-surface-2">
                  <span className="block text-h3 font-semibold text-text">{d.title}</span>
                  <span className="mt-1 block text-[15px] text-muted">{d.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <EnquiryStep id="nf-enquiry" />
    </SiteChrome>
  );
}
