'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useSmoothScroll } from '@/components/site/SmoothScroll';

/**
 * Pointer, scroll and capability scenes for the server-rendered homepage.
 * Renders nothing; it only attaches behaviour to the markup.
 */
export default function HomeScenes() {
  const { subscribe, getLenis } = useSmoothScroll();

  /* ---------- homepage scenes ---------- */
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-home]');
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: (() => void)[] = [];
    const on = (el: HTMLElement | Window | Document, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions) => {
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    };

    /* capability highlight */
    const caps = Array.from(root.querySelectorAll<HTMLElement>('[data-cap]'));
    const capPlates = Array.from(root.querySelectorAll<HTMLElement>('#hv3-cap-stack [data-k]'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const key = (entry.target as HTMLElement).dataset.cap;
        caps.forEach((c) => c.toggleAttribute('data-active', c === entry.target));
        capPlates.forEach((p) => p.toggleAttribute('data-hot', p.dataset.k === key));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    caps.forEach((c) => io.observe(c));
    cleanups.push(() => io.disconnect());

    // Touch screens: let the signal packets run through the entrance, then hold the hero still.
    if (!fine && !reduce) {
      const flow = root.querySelector<SVGSVGElement>('[data-flow]');
      const hold = window.setTimeout(() => { flow?.setAttribute('data-held', ''); try { flow?.pauseAnimations(); } catch { /* unsupported */ } }, 3500);
      cleanups.push(() => window.clearTimeout(hold));
    }

    if (fine && !reduce) {
      /* hero spotlight + stack separation */
      const hero = root.querySelector<HTMLElement>('[data-hero]');
      const stage = root.querySelector<HTMLElement>('[data-hero-stage]');
      const heroStack = root.querySelector<HTMLElement>('#hv3-hero-stack');
      if (hero && stage && heroStack) {
        on(hero, 'pointermove', (e) => {
          const ev = e as PointerEvent;
          const r = hero.getBoundingClientRect();
          hero.style.setProperty('--mx', ev.clientX - r.left + 'px');
          hero.style.setProperty('--my', ev.clientY - r.top + 'px');
        });
        on(stage, 'pointermove', (e) => {
          const ev = e as PointerEvent;
          const r = stage.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - 0.5;
          const y = (ev.clientY - r.top) / r.height - 0.5;
          heroStack.style.transform = `rotateX(${58 - y * 16}deg) rotateZ(${-42 + x * 22}deg)`;
          heroStack.style.setProperty('--gap', 30 + (1 - Math.min(1, Math.hypot(x, y) * 2)) * 34 + 'px');
        });
        on(stage, 'pointerleave', () => {
          heroStack.style.transform = '';
          heroStack.style.setProperty('--gap', '30px');
        });
      }
    }

    if (reduce) {
      root.querySelectorAll('svg').forEach((svg) => { try { svg.pauseAnimations(); } catch { /* not supported */ } });
      return () => cleanups.forEach((fn) => fn());
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* marquee reacts to scroll speed and direction */
      // The velocity-reactive marquee follows Lenis (fine pointers only); touch keeps the compositor-run CSS marquee.
      const mq = fine ? root.querySelector<HTMLElement>('[data-marquee]') : null;
      if (mq) {
        mq.style.animation = 'none';
        const mqTween = gsap.to(mq, { xPercent: -50, repeat: -1, duration: 38, ease: 'none' });
        cleanups.push(subscribe(() => {
          const lenis = getLenis();
          if (!lenis) return;
          const v = lenis.velocity;
          gsap.to(mqTween, { timeScale: (lenis.direction < 0 ? -1 : 1) * (1 + Math.min(Math.abs(v) * 0.25, 6)), duration: 0.3, overwrite: true });
          gsap.to(mq, { skewX: -Math.max(-8, Math.min(8, v * 0.4)), duration: 0.4, overwrite: 'auto' });
        }));
      }

      gsap.to('#hv3-hero-stack', { '--spread': '30px', ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });
      // fromTo: the CSS entrance may still be at opacity 0 when this is created; never capture that.
      gsap.fromTo('[data-flow], [data-chip]', { opacity: 1 }, { opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'center top', end: 'bottom top', scrub: true } });

      gsap.fromTo('[data-wave-fill]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-process]', start: 'top 78%', end: 'bottom 60%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('[data-node]').forEach((n, i) => {
        gsap.from(n, { scale: 0, rotate: -90, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: '[data-process]', start: `top ${78 - i * 6}%`, once: true } });
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [subscribe, getLenis]);

  return null;
}
