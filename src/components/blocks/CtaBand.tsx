'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { siteConfig } from '@/data/siteConfig';
import { Button, ButtonArrow } from '@/components/ui/button';
import { brandPaths } from '@/components/site/BrandSymbol';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';

type Props = {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
  id?: string;
};

const offsets = [{ x: -260, y: 180, rotation: -40 }, { x: 40, y: -320, rotation: 30 }, { x: 300, y: -60, rotation: 50 }];

/** Violet closing panel; the brand symbol assembles as it scrolls into view. */
export default function CtaBand({
  title = 'Bring one problem. Leave with a plan.',
  body = 'A short call to understand the goal, look at your current setup and agree whether a Proof Sprint makes sense.',
  href = '/contact',
  label = 'Start the conversation',
  id = 'cta-title',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      el.querySelectorAll<SVGPathElement>('[data-cta-mark] path').forEach((p, i) => {
        gsap.fromTo(p, { ...offsets[i], opacity: 0.2 }, {
          x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 55%', scrub: 1 },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby={id} className="py-[clamp(56px,8vw,120px)]">
      <div className="site-wrap">
        <div ref={ref} className="relative isolate overflow-hidden rounded-[40px] bg-violet px-[clamp(24px,5vw,80px)] py-[clamp(40px,7vw,104px)]">
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(60%_80%_at_100%_100%,rgb(210_237_122/0.55),transparent_60%),radial-gradient(50%_60%_at_0%_0%,rgb(255_118_94/0.35),transparent_60%)]" />
          <div aria-hidden="true" className="absolute -inset-[40%] -z-20 animate-[spin_60s_linear_infinite] bg-[repeating-conic-gradient(from_0deg_at_80%_70%,rgb(255_255_255/0.06)_0_6deg,transparent_6deg_18deg)]" />
          <svg
            data-cta-mark
            viewBox="125 125 1000 1000"
            aria-hidden="true"
            className="absolute -bottom-[6%] right-[2%] -z-10 w-[min(40%,460px)] overflow-visible max-[760px]:-right-[16%] max-[760px]:-bottom-[8%] max-[760px]:w-[62%] max-[760px]:opacity-35 [&_path]:origin-center [&_path]:[transform-box:fill-box]"
          >
            {brandPaths.map((p) => <path key={p.fill} fill={p.fill} d={p.d} />)}
          </svg>
          <h2 id={id} aria-label={title} data-split className="max-w-[12ch] text-[clamp(40px,7vw,108px)] text-white">
            <SplitText text={title} />
          </h2>
          <p className="mt-[22px] max-w-[48ch] text-lg text-white/88">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3.5">
            <MagneticButton>
              <Button asChild variant="dark" size="lg">
                <Link href={href}>{label} <ButtonArrow /></Link>
              </Button>
            </MagneticButton>
            <a
              href={siteConfig.socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="border-b border-white/50 pb-0.5 font-medium text-white transition-colors hover:border-white"
            >
              WhatsApp {siteConfig.phoneDisplay}
            </a>
          </div>
          <p className="mt-7 font-mono text-[13px] text-white/90">
            <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={`tel:${siteConfig.phoneHref}`} className="hover:underline">Call {siteConfig.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
