'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrollListener = (y: number) => void;

type SmoothScrollApi = {
  /** The active Lenis instance, or null when scrolling is native. */
  getLenis: () => Lenis | null;
  /** Subscribe to scroll position (Lenis when smoothing, native otherwise). Returns an unsubscribe function. */
  subscribe: (fn: ScrollListener) => () => void;
  /** Pause scrolling, e.g. while a menu or dialog is open. */
  lock: (locked: boolean) => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  getLenis: () => null,
  subscribe: () => () => {},
  lock: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/**
 * The one Lenis instance for the whole site. It drives GSAP's ticker so
 * ScrollTrigger scenes stay in sync, and is skipped for reduced motion and
 * coarse pointers (touch devices keep native momentum scrolling).
 */
export default function SmoothScroll({ enabled = true, children }: { enabled?: boolean; children: ReactNode }) {
  const pathname = usePathname();
  const listeners = useRef(new Set<ScrollListener>());
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const emit = (y: number) => listeners.current.forEach((fn) => fn(y));
    const onNative = () => { if (!lenisRef.current) emit(window.scrollY); };
    window.addEventListener('scroll', onNative, { passive: true });

    const smooth = enabled
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!smooth) return () => window.removeEventListener('scroll', onNative);

    const instance = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { offset: -96 } });
    lenisRef.current = instance;
    instance.on('scroll', ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update();
      emit(scroll);
    });
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', onNative);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  // After client navigation: start at the top (or the hash target) and re-measure scroll scenes.
  // The first load is left alone so the browser can restore its own position.
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) { firstPath.current = false; return; }
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (lenisRef.current) lenisRef.current.scrollTo(target ?? 0, { immediate: true, force: true });
    else if (!target) window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const getLenis = useCallback(() => lenisRef.current, []);
  const subscribe = useCallback((fn: ScrollListener) => {
    listeners.current.add(fn);
    return () => { listeners.current.delete(fn); };
  }, []);
  const lock = useCallback((locked: boolean) => {
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);
  const api = useMemo(() => ({ getLenis, subscribe, lock }), [getLenis, subscribe, lock]);

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
