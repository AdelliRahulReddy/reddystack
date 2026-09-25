'use client';

import { useEffect } from 'react';

const SELECTOR = '[data-reveal], [data-split], [data-scramble]';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+';

function scramble(el: HTMLElement) {
  const final = el.dataset.text ?? el.textContent ?? '';
  el.dataset.text = final;
  let frame = 0;
  const total = final.length + 10;
  const step = () => {
    el.textContent = final
      .split('')
      .map((c, i) => (i < frame - 10 || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join('');
    frame += 1;
    if (frame <= total) window.setTimeout(step, 28);
    else el.textContent = final;
  };
  step();
}

/**
 * Drives every `[data-reveal]`, `[data-split]` and `[data-scramble]` element on the site.
 * Nothing is hidden until this runs: elements already on screen are marked shown first,
 * then `html[data-motion=on]` enables the hidden state for everything further down.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.removeAttribute('data-motion');
      return;
    }

    const show = (el: HTMLElement) => {
      if (el.hasAttribute('data-shown')) return;
      el.setAttribute('data-shown', '');
      if (el.hasAttribute('data-scramble')) scramble(el);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.hasAttribute('data-shown') || el.hasAttribute('data-observed')) return;
        el.setAttribute('data-observed', '');
        const r = el.getBoundingClientRect();
        // Above the fold (or already scrolled past): show without animating.
        if (r.top < window.innerHeight * 0.92 && !root.hasAttribute('data-motion')) {
          el.setAttribute('data-shown', '');
          return;
        }
        io.observe(el);
      });
    };

    scan();
    root.setAttribute('data-motion', 'on');

    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
      root.removeAttribute('data-motion');
    };
  }, []);

  return null;
}
