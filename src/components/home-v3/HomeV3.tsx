'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { homeFaqItems } from '@/data/HomeFaqData';
import { marketPages } from '@/data/MarketPageData';
import { markets, type Market } from '@/data/MarketConfig';
import { siteConfig } from '@/data/siteConfig';
import { saveMarketChoice } from '@/utils/marketPreference';
import {
  BrandSymbol,
  DiagnosticVisual,
  EngagementGlyph,
  OrbitText,
  ProcessWave,
  SignalFlow,
  capabilityIllustrations,
} from './Illustrations';
import { capabilities, engagements, marqueeItems, problems, processSteps, signals, stackLayers } from './homeContent';
import s from './home-v3.module.scss';

export type HomeProject = {
  slug: string;
  path: string;
  title: string;
  category: string;
  year: number;
  client: string;
  role: string;
  summary: string;
  image: { src: string; width: number; height: number };
};

const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;
const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ');

const navLinks = [
  { title: 'Work', href: '/portfolio' },
  { title: 'Capabilities', href: '/service' },
  { title: 'Ways to work', href: '/pricing' },
  { title: 'Insights', href: '/blog' },
  { title: 'About', href: '/about' },
];

const clockZones = [
  { city: 'Hyderabad', tz: 'Asia/Kolkata', home: true },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
];

const projectLayout = ['wide', 'narrow', 'narrow', 'wide'] as const;

function Arrow({ down = false }: { down?: boolean }) {
  return <span className={s.arr} aria-hidden="true">{down ? '↓' : '→'}</span>;
}

function SplitWords({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={s.w} aria-hidden="true"><span>{w}</span></span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

function Label({ children }: { children: string }) {
  return (
    <span className={s.label}>
      <b aria-hidden="true">●</b>&nbsp; <span data-scramble>{children}</span>
    </span>
  );
}

function SectionHead({ label, title, intro, id }: { label: string; title: string; intro: string; id: string }) {
  return (
    <div className={s.secHead}>
      <div>
        <Label>{label}</Label>
        <h2 id={id} aria-label={title} data-split>
          <SplitWords text={title} />
        </h2>
      </div>
      <p data-reveal>{intro}</p>
    </div>
  );
}

function Stack({ id, withGoal, gap, className }: { id: string; withGoal?: boolean; gap: number; className?: string }) {
  return (
    <div className={cx(s.stack, className)} id={id} style={cssVars({ '--gap': gap + 'px' })}>
      {stackLayers.map((layer, i) => (
        <div className={s.plate} key={layer.key} data-k={layer.key} style={cssVars({ '--i': i })}>
          <span><i>0{i + 1}</i>{layer.label}</span>
        </div>
      ))}
      {withGoal && (
        <div className={cx(s.plate, s.goal)} style={cssVars({ '--i': 6.4 })}>
          <span><i>↑</i>Your goal</span>
        </div>
      )}
    </div>
  );
}

function Clocks() {
  const [times, setTimes] = useState<string[]>(clockZones.map(() => '--:--'));
  useEffect(() => {
    const fmts = clockZones.map((z) => new Intl.DateTimeFormat('en-GB', { timeZone: z.tz, hour: '2-digit', minute: '2-digit' }));
    const tick = () => setTimes(fmts.map((f) => f.format(new Date())));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return (
    <div className={s.clocks} aria-label="Local times">
      {clockZones.map((z, i) => (
        <span key={z.city} className={z.home ? s.home : undefined}>
          {z.city} <b suppressHydrationWarning>{times[i]}</b>
          {z.home && <i className={s.secDot} aria-hidden="true" />}
        </span>
      ))}
    </div>
  );
}

export default function HomeV3({ projects, market }: { projects: HomeProject[]; market?: Market }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [problemIndex, setProblemIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const problem = problems[problemIndex];
  const marketPage = market ? marketPages[market.code] : undefined;

  /* ---------- motion + interactions ---------- */
  useEffect(() => {
    const root = rootRef.current;
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

    /* nav hide + progress */
    const nav = root.querySelector<HTMLElement>('[data-nav]');
    const progress = root.querySelector<HTMLElement>('[data-progress]');
    let lastY = window.scrollY;
    const onScroll = (y: number) => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      if (nav && !reduce) nav.toggleAttribute('data-hidden', y > lastY && y > 480);
      lastY = y;
    };
    // Lenis reports its own (fractional) position once it runs; the native listener covers reduced motion.
    on(window, 'scroll', () => { if (!lenisRef.current) onScroll(window.scrollY); }, { passive: true });

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

      /* cursor */
      const dot = root.querySelector<HTMLElement>('[data-cur-dot]');
      const ring = root.querySelector<HTMLElement>('[data-cur-ring]');
      if (dot && ring) {
        root.setAttribute('data-cursor', 'on');
        let x = window.innerWidth / 2, y = window.innerHeight / 2, rx = x, ry = y, raf = 0;
        on(window, 'pointermove', (e) => {
          const ev = e as PointerEvent;
          x = ev.clientX; y = ev.clientY;
          root.setAttribute('data-cursor-moved', '');
          dot.style.transform = `translate(${x}px, ${y}px)`;
        });
        const loop = () => {
          rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
          ring.style.transform = `translate(${rx}px, ${ry}px)`;
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        cleanups.push(() => cancelAnimationFrame(raf));
        on(document, 'pointerover', (e) => {
          const t = e.target as Element | null;
          const view = t?.closest('[data-view]');
          const link = t?.closest('a, button, summary');
          ring.toggleAttribute('data-view', !!view);
          ring.toggleAttribute('data-link', !view && !!link);
        });
        on(document.documentElement, 'pointerleave', () => root.removeAttribute('data-cursor-moved'));
      }

      /* magnetic buttons */
      root.querySelectorAll<HTMLElement>('[data-mag]').forEach((b) => {
        on(b, 'pointermove', (e) => {
          const ev = e as PointerEvent;
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * 0.2}px, ${(ev.clientY - r.top - r.height / 2) * 0.3}px)`;
        });
        on(b, 'pointerleave', () => { b.style.transform = ''; });
      });

      /* project tilt + glare */
      root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((p) => {
        on(p, 'pointermove', (e) => {
          const ev = e as PointerEvent;
          const r = p.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
          p.style.transform = `perspective(1200px) rotateY(${(x - 0.5) * 7}deg) rotateX(${(0.5 - y) * 6}deg)`;
          p.style.setProperty('--gx', x * 100 + '%');
          p.style.setProperty('--gy', y * 100 + '%');
        });
        on(p, 'pointerleave', () => { p.style.transform = ''; });
      });
    }

    if (reduce) {
      root.querySelectorAll('svg').forEach((svg) => { try { svg.pauseAnimations(); } catch { /* not supported */ } });
      return () => cleanups.forEach((fn) => fn());
    }

    /* scramble labels */
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+';
    const timers: number[] = [];
    const scramble = (el: HTMLElement) => {
      const final = el.dataset.text ?? el.textContent ?? '';
      el.dataset.text = final;
      let f = 0;
      const total = final.length + 10;
      const step = () => {
        el.textContent = final.split('').map((c, i) => (i < f - 10 || c === ' ' ? c : glyphs[(Math.random() * glyphs.length) | 0])).join('');
        f += 1;
        if (f <= total) timers.push(window.setTimeout(step, 28));
        else el.textContent = final;
      };
      step();
    };
    cleanups.push(() => timers.forEach((t) => window.clearTimeout(t)));

    /* GSAP + Lenis */
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const mq = root.querySelector<HTMLElement>('[data-marquee]');
      let mqTween: gsap.core.Tween | null = null;
      if (mq) {
        mq.style.animation = 'none';
        mqTween = gsap.to(mq, { xPercent: -50, repeat: -1, duration: 38, ease: 'none' });
      }
      lenis.on('scroll', ({ scroll, velocity, direction }: { scroll: number; velocity: number; direction: number }) => {
        ScrollTrigger.update();
        onScroll(scroll);
        if (mqTween && mq) {
          gsap.to(mqTween, { timeScale: (direction < 0 ? -1 : 1) * (1 + Math.min(Math.abs(velocity) * 0.25, 6)), duration: 0.3, overwrite: true });
          gsap.to(mq, { skewX: -Math.max(-8, Math.min(8, velocity * 0.4)), duration: 0.4, overwrite: 'auto' });
        }
      });

      gsap.to('#hv3-hero-stack', { '--spread': '30px', ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-flow], [data-chip]', { opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'center top', end: 'bottom top', scrub: true } });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((h) => {
        gsap.fromTo(h.querySelectorAll(`.${s.w} > span`), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-scramble]').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => scramble(el) });
      });

      gsap.fromTo('[data-wave-fill]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-process]', start: 'top 78%', end: 'bottom 60%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('[data-node]').forEach((n, i) => {
        gsap.from(n, { scale: 0, rotate: -90, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: '[data-process]', start: `top ${78 - i * 6}%`, once: true } });
      });

      gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((p) => {
        const media = p.querySelector<HTMLElement>('[data-media]');
        const inner = p.querySelector<HTMLElement>('[data-media-inner]');
        if (inner) gsap.fromTo(inner, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } });
        if (media) gsap.from(media, { clipPath: 'inset(18% 10% 18% 10% round 27px)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 85%', once: true } });
      });

      const offsets = [{ x: -260, y: 180, rotation: -40 }, { x: 40, y: -320, rotation: 30 }, { x: 300, y: -60, rotation: 50 }];
      root.querySelectorAll<SVGPathElement>('[data-cta-mark] path').forEach((p, i) => {
        gsap.fromTo(p, { ...offsets[i], opacity: 0.2 }, { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '[data-cta]', start: 'top bottom', end: 'center 55%', scrub: 1 } });
      });

      // Played once rather than scrubbed: the wordmark sits too close to the page end for a scrub to finish.
      gsap.from('[data-wordmark] span', { yPercent: 100, opacity: 0, stagger: 0.05, duration: 1.1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '[data-wordmark]', start: 'top 98%', once: true } });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  /* menu: lock scroll + escape */
  useEffect(() => {
    if (!menuOpen) return;
    lenisRef.current?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const selectProblem = (i: number) => setProblemIndex(i);
  const onProblemKey = (e: ReactKeyboardEvent<HTMLButtonElement>, i: number) => {
    let j: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % problems.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + problems.length) % problems.length;
    if (e.key === 'Home') j = 0;
    if (e.key === 'End') j = problems.length - 1;
    if (j === null) return;
    e.preventDefault();
    setProblemIndex(j);
    document.getElementById(`hv3-tab-${problems[j].id}`)?.focus();
  };

  const kicker = marketPage ? marketPage.hero.sub_title : 'Remote from Hyderabad · working with US & UK teams';

  return (
    <div className={s.root} ref={rootRef}>
      <a className={s.skip} href="#hv3-main">Skip to content</a>
      <div className={s.progress} data-progress aria-hidden="true" />
      <div className={s.curDot} data-cur-dot aria-hidden="true" />
      <div className={s.curRing} data-cur-ring aria-hidden="true"><span>View</span></div>

      {/* ---------- nav ---------- */}
      <header className={s.nav} data-nav>
        <div className={s.wrap}>
          <div className={s.navIn}>
            <Link className={s.brand} href="/" aria-label="ReddyStack home"><BrandSymbol />ReddyStack</Link>
            <nav className={s.navLinks} aria-label="Primary">
              {navLinks.map((l) => <Link key={l.href} href={l.href}>{l.title}</Link>)}
            </nav>
            <div className={s.navRight}>
              <Link className={s.btn} href="/contact" data-mag>Start a project <Arrow /></Link>
              <button type="button" className={s.menuBtn} aria-expanded={menuOpen} aria-controls="hv3-menu" onClick={() => setMenuOpen((v) => !v)}>
                <span className={s.srOnly}>{menuOpen ? 'Close menu' : 'Open menu'}</span>
                <i aria-hidden="true" /><i aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={s.menu} id="hv3-menu" data-open={menuOpen ? 'true' : 'false'} hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {[...navLinks, { title: 'Contact', href: '/contact' }].map((l, i) => (
            <Link key={l.href} href={l.href} style={cssVars({ '--d': i * 0.05 + 's' })} onClick={() => setMenuOpen(false)}>{l.title}</Link>
          ))}
        </nav>
        <div className={s.menuFoot}>
          <span>{siteConfig.email}</span>
          <span>WhatsApp {siteConfig.phoneDisplay}</span>
        </div>
      </div>

      <main id="hv3-main">
        {/* ---------- hero ---------- */}
        <section className={s.hero} data-hero aria-labelledby="hv3-title">
          <div className={s.gridBg} aria-hidden="true" />
          <div className={cx(s.wrap, s.heroGrid)}>
            <div>
              <div className={s.heroKicker}>
                <span className={s.pill}><span className={s.dot} aria-hidden="true" />{kicker}</span>
                <span className={s.label}>Founder-led growth studio</span>
              </div>
              {marketPage ? (
                <h1 id="hv3-title" className={s.marketTitle}>
                  <span className={s.ln}><span>{marketPage.hero.title_before}<em>{marketPage.hero.title_accent}</em>{marketPage.hero.title_after}</span></span>
                </h1>
              ) : (
                <h1 id="hv3-title" aria-label="One growth problem. One connected stack.">
                  <span className={s.ln} aria-hidden="true"><span>One growth</span></span>
                  <span className={s.ln} aria-hidden="true" style={cssVars({ '--d': '.09s' })}><span><em>problem.</em></span></span>
                  <span className={s.ln} aria-hidden="true" style={cssVars({ '--d': '.18s' })}><span className={s.out}>One connected</span></span>
                  <span className={cx(s.ln, s.drop)} aria-hidden="true">
                    <span>
                      {'stack.'.split('').map((c, i) => (
                        <span key={i} className={cx(s.ch, c === '.' && s.dotc)} style={cssVars({ '--d': 0.35 + i * 0.07 + 's', '--r': [(-24), 18, (-12), 30, (-20), 14][i] + 'deg' })}>{c}</span>
                      ))}
                    </span>
                  </span>
                </h1>
              )}
              <p className={s.heroSub}>
                {marketPage ? marketPage.hero.sm_info : (
                  <>ReddyStack connects your <strong>website, search, paid ads, creative, tracking and automation</strong> around the one problem holding growth back. You work directly with Rahul, and every step is measured before it is scaled.</>
                )}
              </p>
              <div className={s.heroCta}>
                <Link className={s.btn} href="/contact" data-mag>Tell me the problem <Arrow /></Link>
                <a className={cx(s.btn, s.ghost)} href="#work" data-mag>See selected work <Arrow down /></a>
              </div>
              <Clocks />
            </div>

            <div className={s.stage} data-hero-stage aria-hidden="true">
              <SignalFlow />
              {signals.map((sig) => (
                <span key={sig.label} className={s.chip} data-chip style={{ ...sig.pos, ...cssVars({ '--c': sig.color, '--d': sig.delay }) }}><i />{sig.label}</span>
              ))}
              <div className={s.stageShadow} />
              <Stack id="hv3-hero-stack" className={s.heroStack} withGoal gap={30} />
              <div className={s.stageCap}>Every signal lands in one stack<br /><b>Move the pointer over it</b></div>
            </div>
          </div>
        </section>

        <div className={s.marquee} aria-hidden="true">
          <div className={s.mqTrack} data-marquee>
            {[...marqueeItems, ...marqueeItems].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>

        {/* ---------- diagnostic ---------- */}
        <section className={s.sec} id="start" aria-labelledby="hv3-start">
          <div className={s.wrap}>
            <SectionHead id="hv3-start" label="Start here" title="Where is growth stuck?" intro="You don't need to pick a service. Pick the symptom. The first step, and the layers of the stack involved, follow from it." />
            <div className={s.diag} data-reveal>
              <div className={s.choices} role="tablist" aria-label="Choose the main problem">
                {problems.map((p, i) => (
                  <button key={p.id} id={`hv3-tab-${p.id}`} type="button" role="tab" className={s.choice} aria-selected={i === problemIndex} aria-controls="hv3-answer" tabIndex={i === problemIndex ? 0 : -1} onClick={() => selectProblem(i)} onKeyDown={(e) => onProblemKey(e, i)}>
                    <span className={s.q}>{p.letter}</span>
                    <span><strong>{p.title}</strong><small>{p.detail}</small></span>
                    <span className={s.chev} aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
              <div className={s.answer} id="hv3-answer" role="tabpanel" aria-labelledby={`hv3-tab-${problem.id}`}>
                <div className={s.answerTop}>
                  <div key={problem.id} className={s.answerText}>
                    <span className={s.label}>First step</span>
                    <h3>{problem.firstStep}</h3>
                  </div>
                  <DiagnosticVisual id={problem.id} key={problem.id + '-viz'} />
                </div>
                <p className={s.lead} key={problem.id + '-body'}>{problem.body}</p>
                <ul className={s.layers} aria-label="Layers involved">
                  {stackLayers.map((l) => <li key={l.key} data-on={problem.layers.includes(l.key) ? 'true' : 'false'}>{l.label}</li>)}
                </ul>
                <div className={s.answerRow}>
                  <span>Usually starts as a <b>Proof Sprint</b></span>
                  <Link className={s.btn} href="/contact?service=proof-sprint&source=/" data-mag>Discuss this problem <Arrow /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- market focus ---------- */}
        {market && marketPage && (
          <section className={s.sec} style={{ paddingTop: 0 }} aria-labelledby="hv3-market">
            <div className={s.wrap}>
              <SectionHead id="hv3-market" label={marketPage.focus.eyebrow} title={marketPage.focus.title} intro={marketPage.focus.intro} />
              <div className={s.marketGrid}>
                {marketPage.focus.items.map((item, i) => (
                  <article key={item.title} className={s.marketCard} data-reveal>
                    <span className={s.label}>0{i + 1} · {market.name}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- stack ---------- */}
        <section className={cx(s.sec, s.stackSec)} id="stack" aria-labelledby="hv3-stack">
          <div className={s.wrap}>
            <SectionHead id="hv3-stack" label="Capabilities" title="Six layers. Chosen by the problem." intro="Most growth problems cross more than one channel. The stack keeps them connected, so the ad, the page and the tracking describe the same promise." />
            <div className={s.capGrid}>
              <div className={s.capSticky}>
                <div className={s.stage} aria-hidden="true">
                  <div className={s.stageShadow} />
                  <Stack id="hv3-cap-stack" gap={40} />
                </div>
              </div>
              <div className={s.capList}>
                {capabilities.map((c) => {
                  const Ill = capabilityIllustrations[c.key];
                  return (
                    <article key={c.key} className={s.cap} data-cap={c.key}>
                      <span className={s.n}>{c.kicker}</span>
                      <h3>{c.title}</h3>
                      <Ill />
                      <p>{c.body}</p>
                      <div className={s.tags}>{c.links.map((l) => <Link key={l.href} href={l.href}>{l.title}</Link>)}</div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- process ---------- */}
        <section className={s.sec} id="process" aria-labelledby="hv3-process">
          <div className={s.wrap}>
            <SectionHead id="hv3-process" label="Process" title="Prove it small. Then scale it." intro="Every engagement moves through the same four stages. Nothing is scaled until the step before it has produced evidence." />
            <div className={s.process} data-process>
              <ProcessWave />
              <ol className={s.steps}>
              {processSteps.map((st) => (
                <li className={s.step} key={st.n} data-reveal>
                  <div className={s.node} data-node>
                    <svg viewBox="0 0 68 68" aria-hidden="true"><circle cx="34" cy="34" r="32" /></svg>
                    {st.n}
                  </div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                  <div className={s.stepOut}>Output: <b>{st.output}</b></div>
                </li>
              ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- work ---------- */}
        <section className={s.sec} id="work" style={{ paddingTop: 0 }} aria-labelledby="hv3-work">
          <div className={s.wrap}>
            <SectionHead id="hv3-work" label="Selected work" title="Built by the person you'll talk to." intro="Websites, product interfaces and automations designed and built by Rahul. Each page explains the problem and the decisions behind it." />
            <div className={s.work}>
              {projects.slice(0, 4).map((p, i) => (
                <Link key={p.slug} href={p.path} className={cx(s.proj, projectLayout[i] === 'wide' ? s.wide : s.narrow)} data-tilt data-view data-reveal>
                  <span className={s.badge}>{p.client.toLowerCase().includes('personal') ? 'Personal / demo' : 'Build'} · {p.year}</span>
                  <div className={s.media} data-media>
                    <div className={s.mediaInner} data-media-inner>
                      <Image src={p.image.src} alt={`${p.title}: ${p.summary}`} fill sizes="(max-width: 860px) 100vw, 58vw" />
                    </div>
                  </div>
                  <div className={s.meta}>
                    <div><h3>{p.title}</h3><p className={s.cat}>{p.category}</p></div>
                    <div className={s.tagline}>{p.role.split(',').slice(0, 2).map((r) => r.trim()).join(' · ')}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={s.workFoot}>
              <p>These are personal and demo projects, labelled as such. No client results are shown here until they exist and clients agree to share them.</p>
              <Link className={cx(s.btn, s.ghost)} href="/portfolio" data-mag>All project notes <Arrow /></Link>
            </div>
          </div>
        </section>

        {/* ---------- engagements ---------- */}
        <section className={s.sec} id="engage" style={{ paddingTop: 0 }} aria-labelledby="hv3-engage">
          <div className={s.wrap}>
            <SectionHead id="hv3-engage" label="Ways to work" title="Start focused. Scale with evidence." intro="Each engagement is quoted after a short call, with the problem, scope, deliverables and ownership written down first." />
            <div className={s.eng}>
              {engagements.map((e) => (
                <div key={e.id} className={cx(s.card, e.featured && s.feature)} data-reveal>
                  <div className={s.top}>
                    <EngagementGlyph id={e.id} />
                    {e.featured && <span className={s.rec}>Most start here</span>}
                  </div>
                  <span className={s.kind}>{e.kind}</span>
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                  <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  <Link className={cx(s.btn, !e.featured && s.ghost)} href={e.href} data-mag>{e.cta} <Arrow /></Link>
                </div>
              ))}
            </div>
            <p className={s.note}>Every quote is custom to the agreed scope. Ad spend, hosting and third-party tools are separate and stay in your name.</p>
          </div>
        </section>

        {/* ---------- founder ---------- */}
        <section className={s.sec} id="about" style={{ paddingTop: 0 }} aria-labelledby="hv3-founder">
          <div className={cx(s.wrap, s.founder)}>
            <div className={s.portrait} data-reveal>
              <OrbitText />
              <BrandSymbol className={s.sym} pieceClasses={[s.p1, s.p2, s.p3]} />
              <div className={s.ph}><span>RAHUL REDDY ADELLI</span><span>HYDERABAD · IN</span></div>
            </div>
            <div data-reveal>
              <Label>Who you&apos;ll work with</Label>
              <h2 id="hv3-founder" className={s.srOnly}>About Rahul Reddy Adelli</h2>
              <blockquote className={s.quote}>
                “I started ReddyStack to work the way I&apos;d want an agency to work with me. <span>One problem at a time, the person who quotes is the person who builds, and nothing gets called a result until it is one.”</span>
              </blockquote>
              <div className={s.sig}>
                <div className={s.av} aria-hidden="true">RR</div>
                <div><b>Rahul Reddy Adelli</b><span>Founder, ReddyStack · Hyderabad, working with US &amp; UK teams</span></div>
              </div>
              <div className={s.principles}>
                <div><b>Direct</b><span>No account managers. You talk to the builder.</span></div>
                <div><b>Yours</b><span>Accounts, data and assets stay in your name.</span></div>
                <div><b>Honest</b><span>No invented results, ratings or guarantees.</span></div>
              </div>
              <Link className={s.textLink} href="/about/rahul-reddy-adelli">More about Rahul <Arrow /></Link>
            </div>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className={s.sec} id="faq" style={{ paddingTop: 0 }} aria-labelledby="hv3-faq">
          <div className={cx(s.wrap, s.faq)}>
            <div>
              <Label>Questions</Label>
              <h2 id="hv3-faq" aria-label="Before you get in touch." data-split><SplitWords text="Before you get in touch." /></h2>
            </div>
            <div data-reveal>
              {homeFaqItems.map((f, i) => (
                <details key={f.id} className={s.qa} open={i === 0}>
                  <summary>{f.question}<span className={s.pm} aria-hidden="true" /></summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section className={s.sec} id="contact" style={{ paddingTop: 0 }} aria-labelledby="hv3-cta">
          <div className={s.wrap}>
            <div className={s.cta} data-cta>
              <div className={s.rays} aria-hidden="true" />
              <svg className={s.ctaMark} data-cta-mark viewBox="125 125 1000 1000" aria-hidden="true">
                <path fill="#7055E8" d="M380 432H398C414 432 426 444 426 460V536C426 612 469 666 543 666H600C617 666 630 679 630 696V746C630 784 662 814 698 814H942C999 814 1045 860 1045 917S999 1019 942 1019H416C302 1019 209 926 209 812V603C209 509 286 432 380 432Z" />
                <path fill="#CDEB76" d="M564 294C623 294 670 341 670 400V430C670 483 712 528 765 540C783 544 794 554 794 572V611C794 626 782 638 767 638H565C506 638 458 590 458 531V400C458 341 505 294 564 294Z" />
                <path fill="#FF765E" d="M739 235H870C967 235 1045 313 1045 410V765C1045 781 1033 793 1017 793H944C882 793 832 743 832 681V558C832 539 820 528 801 524C750 514 713 470 713 419V261C713 247 725 235 739 235Z" />
              </svg>
              <h2 id="hv3-cta" aria-label="Bring one problem. Leave with a plan." data-split><SplitWords text="Bring one problem. Leave with a plan." /></h2>
              <p>A short call to understand the goal, look at your current setup and agree whether a Proof Sprint makes sense.</p>
              <div className={s.ctaActions}>
                <Link className={s.btn} href="/contact?source=/" data-mag>Start the conversation <Arrow /></Link>
                <a className={s.ctaAlt} href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp {siteConfig.phoneDisplay}</a>
              </div>
              <div className={s.contact}><span>{siteConfig.email}</span></div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.foot}>
            <div>
              <Link className={s.brand} href="/"><BrandSymbol />ReddyStack</Link>
              <p>A founder-led growth studio connecting web, search, ads, creative, tracking and automation.</p>
            </div>
            <div>
              <h4>Studio</h4>
              <ul>{navLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.title}</Link></li>)}<li><Link href="/contact">Contact</Link></li></ul>
            </div>
            <div>
              <h4>Markets</h4>
              <ul>
                <li><Link href="/" onClick={() => saveMarketChoice('global')}>Global</Link></li>
                {markets.map((m) => <li key={m.code}><Link href={m.href} onClick={() => saveMarketChoice(m.code)}>{m.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <ul>
                <li><a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href={siteConfig.socialLinks.x} target="_blank" rel="noreferrer">X</a></li>
                <li><a href={siteConfig.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className={s.wordmark} data-wordmark aria-hidden="true">
            {'ReddyStack'.split('').map((c, i) => <span key={i} style={cssVars({ '--c': ['#7654E8', '#D2ED7A', '#FF765E'][i % 3] })}>{c}</span>)}
          </div>
          <div className={s.legal}>
            <span>© {new Date().getFullYear()} ReddyStack · {siteConfig.ownerName}</span>
            <span><Link href="/privacy-policy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/revision-policy">Revision policy</Link></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
