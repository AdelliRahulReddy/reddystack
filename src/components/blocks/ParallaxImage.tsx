'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

/** Large image that unmasks from the centre and drifts slower than the page. */
export default function ParallaxImage({
  src, alt, priority, sizes = '(max-width: 1320px) 100vw, 1320px', className, aspect = 'aspect-[3/2]',
}: { src: StaticImageData; alt: string; priority?: boolean; sizes?: string; className?: string; aspect?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-px]', { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      if (el.getBoundingClientRect().top > window.innerHeight * 0.6) {
        gsap.from(el, { clipPath: 'inset(12% 8% 12% 8% round 32px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-[32px] border border-line', aspect, className)}>
      <div data-px className="absolute inset-x-0 -inset-y-[8%]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
