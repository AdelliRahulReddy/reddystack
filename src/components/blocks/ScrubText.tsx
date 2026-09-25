'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Statement text whose words light up one by one as it scrolls through the viewport.
 * Fully readable without JavaScript or with reduced motion.
 */
export default function ScrubText({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('span'), { opacity: 0.16 }, {
        opacity: 1, ease: 'none', stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const words = children.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => <span key={i}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}
    </p>
  );
}
