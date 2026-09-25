'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { homeFaqItems } from '@/data/HomeFaqData';
import { marketPages } from '@/data/MarketPageData';
import type { Market } from '@/data/MarketConfig';
import CtaBand from '@/components/blocks/CtaBand';
import EngagementCards from '@/components/blocks/EngagementCards';
import Eyebrow from '@/components/blocks/Eyebrow';
import Faq from '@/components/blocks/Faq';
import MagneticButton from '@/components/blocks/MagneticButton';
import ProjectCard, { type ProjectCardData } from '@/components/blocks/ProjectCard';
import SectionHead from '@/components/blocks/SectionHead';
import { useSmoothScroll } from '@/components/site/SmoothScroll';
import { Button, ButtonArrow } from '@/components/ui/button';
import {
  BrandSymbol,
  DiagnosticVisual,
  OrbitText,
  ProcessWave,
  SignalFlow,
  capabilityIllustrations,
} from './Illustrations';
import { capabilities, marqueeItems, problems, processSteps, signals, stackLayers } from './homeContent';
import s from './home-v3.module.scss';

export type HomeProject = ProjectCardData;

const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;
const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ');

const clockZones = [
  { city: 'Hyderabad', tz: 'Asia/Kolkata', home: true },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
];

const projectLayout = ['wide', 'narrow', 'narrow', 'wide'] as const;

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
  const { subscribe, getLenis } = useSmoothScroll();
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = problems[problemIndex];
  const marketPage = market ? marketPages[market.code] : undefined;
  const source = market ? market.href : '/';

  /* ---------- homepage scenes ---------- */
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
      const mq = root.querySelector<HTMLElement>('[data-marquee]');
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
      gsap.to('[data-flow], [data-chip]', { opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'center top', end: 'bottom top', scrub: true } });

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
              <MagneticButton>
                <Button asChild size="lg"><Link href={`/contact?source=${source}`}>Tell me the problem <ButtonArrow /></Link></Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild size="lg" variant="ghost"><a href="#work">See selected work <ButtonArrow down /></a></Button>
              </MagneticButton>
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
                <button key={p.id} id={`hv3-tab-${p.id}`} type="button" role="tab" className={s.choice} aria-selected={i === problemIndex} aria-controls="hv3-answer" tabIndex={i === problemIndex ? 0 : -1} onClick={() => setProblemIndex(i)} onKeyDown={(e) => onProblemKey(e, i)}>
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
                <MagneticButton>
                  <Button asChild><Link href={`/contact?service=proof-sprint&source=${source}`}>Discuss this problem <ButtonArrow /></Link></Button>
                </MagneticButton>
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
                <article key={item.title} className={s.marketCard} data-reveal style={cssVars({ '--reveal-delay': i * 0.08 + 's' })}>
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
              {processSteps.map((st, i) => (
                <li className={s.step} key={st.n} data-reveal style={cssVars({ '--reveal-delay': i * 0.08 + 's' })}>
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
              <ProjectCard key={p.slug} project={p} className={projectLayout[i] === 'wide' ? s.wide : s.narrow} />
            ))}
          </div>
          <div className={s.workFoot}>
            <p>These are personal and demo projects, labelled as such. No client results are shown here until they exist and clients agree to share them.</p>
            <MagneticButton>
              <Button asChild variant="ghost"><Link href="/portfolio">All project notes <ButtonArrow /></Link></Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ---------- engagements ---------- */}
      <section className={s.sec} id="engage" style={{ paddingTop: 0 }} aria-labelledby="hv3-engage">
        <div className={s.wrap}>
          <SectionHead id="hv3-engage" label="Ways to work" title="Start focused. Scale with evidence." intro="Each engagement is quoted after a short call, with the problem, scope, deliverables and ownership written down first." />
          <EngagementCards source={source} />
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
            <Eyebrow>Who you&apos;ll work with</Eyebrow>
            <h2 id="hv3-founder" className="sr-only">About Rahul Reddy Adelli</h2>
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
            <Link className={cx(s.textLink, 'group/btn')} href="/about/rahul-reddy-adelli">More about Rahul <ButtonArrow /></Link>
          </div>
        </div>
      </section>

      <Faq items={homeFaqItems} id="hv3-faq" className="pt-0" />

      <CtaBand id="hv3-cta" href={`/contact?source=${source}`} />
    </div>
  );
}
