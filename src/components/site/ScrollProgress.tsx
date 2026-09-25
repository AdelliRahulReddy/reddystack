'use client';

import { useEffect, useRef } from 'react';
import { useSmoothScroll } from './SmoothScroll';

/** Thin brand-gradient bar showing how far down the page the reader is. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { subscribe } = useSmoothScroll();

  useEffect(() => subscribe((y) => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
  }), [subscribe]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-violet),var(--color-lime),var(--color-coral))]"
    />
  );
}
