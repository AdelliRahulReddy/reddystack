import Link from "next/link";

import SiteChrome from "@/components/site/SiteChrome";
import { brandPaths } from "@/components/site/BrandSymbol";
import { Button, ButtonArrow } from "@/components/ui/button";
import { buildPageMetadata } from "@/data/siteConfig";

export const metadata = buildPageMetadata("notFound");

const destinations = [
  { title: "Capabilities", body: "Websites, search, ads, creative, tracking and automation.", href: "/service" },
  { title: "Selected work", body: "Personal and demo builds, with the decisions explained.", href: "/portfolio" },
  { title: "Insights", body: "Practical guides on ads, SEO and websites.", href: "/blog" },
  { title: "Ways to work", body: "Proof Sprint, Stack Build, Operate & Improve.", href: "/pricing" },
];

// The three pieces drift apart, as if the stack lost its signal.
const drift = [
  "motion-safe:animate-[nf-a_7s_ease-in-out_infinite]",
  "motion-safe:animate-[nf-b_7s_ease-in-out_infinite]",
  "motion-safe:animate-[nf-c_7s_ease-in-out_infinite]",
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative overflow-hidden pb-[clamp(64px,9vw,120px)] pt-[clamp(140px,20vh,200px)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(247_244_235/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(247_244_235/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_70%_at_70%_40%,#000,transparent_75%)]" />
        <div className="site-wrap relative grid items-center gap-12 min-[961px]:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow"><b aria-hidden="true" className="mr-2.5 font-medium text-coral">●</b>Error 404</p>
            <h1 className="mt-5 text-[clamp(44px,7vw,108px)]">Lost the <em className="not-italic text-lime">signal.</em></h1>
            <p className="mt-7 max-w-[48ch] text-[clamp(17px,1.4vw,19px)] text-muted-foreground">
              This page moved or never existed. The rest of the stack is still here. Start from the homepage or pick a direction below.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href="/">Back to the homepage <ButtonArrow /></Link></Button>
              <Button asChild size="lg" variant="ghost"><Link href="/contact">Ask Rahul directly <ButtonArrow /></Link></Button>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-[12%] rounded-full border border-dashed border-line-strong motion-safe:animate-spin-slow" />
            <svg viewBox="125 125 1000 1000" className="absolute inset-[18%] overflow-visible [&_path]:origin-center [&_path]:[transform-box:fill-box]">
              {brandPaths.map((p, i) => <path key={p.fill} fill={p.fill} d={p.d} className={drift[i]} />)}
            </svg>
          </div>
        </div>
      </section>
      <section aria-labelledby="nf-dest" className="pb-[clamp(64px,9vw,120px)]">
        <div className="site-wrap">
          <h2 id="nf-dest" className="eyebrow mb-6">Popular destinations</h2>
          <ul className="grid gap-3 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
            {destinations.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group/d flex h-full flex-col gap-3 rounded-[24px] border border-line bg-graphite p-6 transition-[border-color,transform] duration-400 ease-studio hover:-translate-y-1 hover:border-line-strong">
                  <span className="flex items-center justify-between font-display text-2xl font-semibold tracking-[-0.03em]">
                    {d.title}
                    <span className="grid size-9 place-items-center rounded-full border border-line text-base transition-all duration-400 ease-studio group-hover/d:-rotate-45 group-hover/d:border-lime group-hover/d:bg-lime group-hover/d:text-lime-ink">→</span>
                  </span>
                  <span className="text-[15px] text-muted-foreground">{d.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
