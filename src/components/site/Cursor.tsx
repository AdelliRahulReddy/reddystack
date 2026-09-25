'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor for fine pointers: a dot plus a trailing ring that grows over links
 * and turns into a "View" disc over `[data-view]` elements. Hidden for touch and reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    root.setAttribute('data-cursor', 'on');
    let x = window.innerWidth / 2, y = window.innerHeight / 2, rx = x, ry = y, raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      root.setAttribute('data-cursor-moved', '');
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const view = t?.closest('[data-view]');
      const link = t?.closest('a, button, summary, [role="tab"], label, select');
      ring.toggleAttribute('data-view', !!view);
      ring.toggleAttribute('data-link', !view && !!link);
    };
    const onLeave = () => root.removeAttribute('data-cursor-moved');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      root.removeEventListener('pointerleave', onLeave);
      root.removeAttribute('data-cursor');
      root.removeAttribute('data-cursor-moved');
    };
  }, []);

  const base = 'pointer-events-none fixed left-0 top-0 z-[95] hidden rounded-full opacity-0 transition-opacity duration-300 [html[data-cursor=on]_&]:grid [html[data-cursor-moved]_&]:opacity-100';
  return (
    <>
      <div ref={dotRef} aria-hidden="true" className={`${base} -ml-[3px] -mt-[3px] size-1.5 bg-lime`} />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`${base} group/ring -ml-5 -mt-5 size-10 place-items-center border border-ivory/45 text-[13px] font-semibold text-lime-ink [transition:width_.35s_var(--ease-studio),height_.35s_var(--ease-studio),margin_.35s_var(--ease-studio),background-color_.35s,border-color_.35s,opacity_.3s] data-[link]:-ml-8 data-[link]:-mt-8 data-[link]:size-16 data-[link]:border-lime data-[link]:bg-lime/8 data-[view]:-ml-12 data-[view]:-mt-12 data-[view]:size-24 data-[view]:border-lime data-[view]:bg-lime`}
      >
        <span className="opacity-0 transition-opacity duration-200 group-data-[view]/ring:opacity-100">View</span>
      </div>
    </>
  );
}
