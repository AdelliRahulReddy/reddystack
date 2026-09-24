'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import brandSymbol from '@/assets/img/logo/reddystack-symbol.svg';
import CountryChoiceLinks from '@/components/country/CountryChoiceLinks';
import UseThemeCheck from '@/hooks/UseThemeCheck';
import { homeFaqItems } from '@/data/HomeFaqData';
import { marketPages, type MarketFocusContent } from '@/data/MarketPageData';
import type { Market } from '@/data/MarketConfig';
import { siteConfig } from '@/data/siteConfig';
import styles from './prototype.module.scss';

type Project = {
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

const bottlenecks = [
  { id: 'visibility', title: 'People are not finding us', detail: 'Search and local discovery feel quiet.', firstStep: 'Start by checking what customers find when they search.', message: 'People cannot find my business online.' },
  { id: 'conversion', title: 'Visitors are not enquiring', detail: 'The offer or next step may need work.', firstStep: 'Review the journey from the first click to the enquiry.', message: 'People visit, but few enquire.' },
  { id: 'measurement', title: 'We cannot tell what is working', detail: 'Spend and enquiries are hard to connect.', firstStep: 'Check the tracking before increasing ad spend.', message: 'I cannot tell which marketing brings enquiries.' },
] as const;

const journeySteps = [
  {
    id: 'discover', number: '01', label: 'DISCOVER', title: 'Show up when the need appears.',
    description: 'Help the right people come across your business while they are searching or exploring.',
    services: [
      { title: 'SEO & Local SEO', href: '/service/seo-local-seo' },
      { title: 'Google Ads', href: '/service/google-ads' },
      { title: 'Meta Ads', href: '/service/meta-ads' },
    ],
  },
  {
    id: 'trust', number: '02', label: 'TRUST', title: 'Make the offer easy to understand.',
    description: 'A clear website and useful creative explain who you help and what someone can do next.',
    services: [
      { title: 'Website development', href: '/service/seo-websites' },
      { title: 'Ad creatives', href: '/service/ad-creatives' },
      { title: 'AI UGC-style videos', href: '/service/ai-ugc-videos' },
    ],
  },
  {
    id: 'enquire', number: '03', label: 'ENQUIRE', title: 'Make the next move feel natural.',
    description: 'Keep the promise, the page and the contact action in sync—from the first tap to a real conversation.',
    services: [{ title: 'Landing pages & websites', href: '/service/seo-websites' }],
  },
  {
    id: 'learn', number: '04', label: 'LEARN', title: 'Let evidence guide what grows.',
    description: 'Review actual enquiries and campaign signals with Rahul. Improve the weak point before adding more.',
    services: [],
  },
] as const;

const workSteps = [
  { number: '01', title: 'Talk through the goal', description: 'Start with your business, audience, current setup, and the problem you want to solve.' },
  { number: '02', title: 'Agree the scope', description: 'Define the work, baseline, budget boundaries, and quote before anything begins.' },
  { number: '03', title: 'Build and review', description: 'Complete the agreed work, review the signal, and decide what makes sense next.' },
] as const;

const marketHeroLabels: Record<Market['code'], string> = {
  us: 'the US',
  au: 'Australia',
  ca: 'Canada',
  uk: 'the UK',
  ae: 'the UAE',
  sg: 'Singapore',
  in: 'India',
};

function whatsappHref(message: string) {
  return siteConfig.socialLinks.whatsapp + '?text=' + encodeURIComponent(message);
}

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">{diagonal ? <path d="M5 15 15 5M6 5h9v9" /> : <path d="M3 10h13m-5-5 5 5-5 5" />}</svg>;
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M20.1 11.7a8.1 8.1 0 0 1-11.98 7.1L4 20l1.24-3.93a8.1 8.1 0 1 1 14.86-4.37Z" />
      <path d="M9.1 8.6c.16-.36.33-.37.57-.38h.49c.16 0 .4.06.5.4l.64 1.53c.08.2.05.37-.05.53l-.48.61c-.13.16-.1.31-.02.46.49.86 1.17 1.53 2.02 2.02.15.08.3.1.46-.04l.64-.55c.16-.14.33-.17.52-.09l1.47.7c.22.1.36.16.39.3.03.15-.02.75-.39 1.2-.36.44-.9.66-1.52.61-.61-.05-1.4-.26-2.45-.84-1.53-.84-2.56-2.25-2.87-2.7-.31-.44-.91-1.3-.91-2.21 0-.9.46-1.36.62-1.55Z" />
    </svg>
  );
}

function GrowthPathVisual() {
  return (
    <aside className={styles.heroVisual} data-hero-visual aria-label="A connected customer journey: discover, trust, enquire, and learn">
      <div className={styles.visualHeader}><span>THE CUSTOMER JOURNEY</span><span>01 — 04</span></div>
      <div className={styles.heroJourneyMap}>
        <svg className={styles.heroRoute} viewBox="0 0 600 520" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="growth-route-gradient" x1="96" y1="433" x2="480" y2="65" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D2ED7A" /><stop offset=".55" stopColor="#A9CF72" /><stop offset="1" stopColor="#A993FF" />
            </linearGradient>
          </defs>
          <path className={styles.heroRouteBase} d="M80 435C203 435 157 347 287 335S500 270 418 194 272 77 504 72" />
          <path className={styles.heroRouteLine} data-hero-route d="M80 435C203 435 157 347 287 335S500 270 418 194 272 77 504 72" />
        </svg>
        <div className={[styles.heroPoint, styles.heroPointDiscover].join(' ')} data-hero-node>
          <span className={styles.heroPointDot}>01</span><span className={styles.heroPointCopy}><small>DISCOVER</small><strong>Be there when it matters</strong></span>
        </div>
        <div className={[styles.heroPoint, styles.heroPointTrust].join(' ')} data-hero-node>
          <span className={styles.heroPointDot}>02</span><span className={styles.heroPointCopy}><small>TRUST</small><strong>Make the value clear</strong></span>
        </div>
        <div className={[styles.heroPoint, styles.heroPointEnquire].join(' ')} data-hero-node>
          <span className={styles.heroPointDot}>03</span><span className={styles.heroPointCopy}><small>ENQUIRE</small><strong>Make the next step easy</strong></span>
        </div>
        <div className={[styles.heroPoint, styles.heroPointLearn].join(' ')} data-hero-node>
          <span className={styles.heroPointDot}>04</span><span className={styles.heroPointCopy}><small>LEARN</small><strong>Choose what to improve</strong></span>
        </div>
      </div>
      <div className={styles.visualFooter}><span>ONE CONNECTED EXPERIENCE</span><span>HYDERABAD · WORLDWIDE</span></div>
    </aside>
  );
}

function GrowthSignalWidget({ activeNeed, setActiveNeed }: { activeNeed: number; setActiveNeed: (index: number) => void }) {
  const need = bottlenecks[activeNeed];
  return (
    <article className={styles.diagnosticWidget} data-reveal>
      <div className={styles.diagnosticChoices} role="group" aria-label="Choose the growth problem that feels closest">
        {bottlenecks.map((option, index) => (
          <button
            aria-pressed={activeNeed === index}
            className={[styles.diagnosticChoice, activeNeed === index ? styles.diagnosticChoiceActive : ''].filter(Boolean).join(' ')}
            key={option.id}
            onClick={() => setActiveNeed(index)}
            type="button"
          >
            <span className={styles.choiceText}><strong>{option.title}</strong><small>{option.detail}</small></span>
            <span className={styles.choiceArrow} aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className={styles.diagnosticAnswer} key={need.id} role="status" aria-live="polite" aria-atomic="true">
        <p className={styles.answerKicker}>A useful place to start</p>
        <h3>{need.firstStep}</h3>
        <a className={styles.answerLink} href={whatsappHref('Hi Rahul, I want help with my business. ' + need.message + ' What would you look at first?')} target="_blank" rel="noreferrer">
          Talk it through with Rahul <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function GrowthJourney() {
  return (
    <section className={styles.journeySection} id="journey" data-journey-section aria-labelledby="journey-title">
      <div className={styles.frame}>
        <div className={styles.journeyHeading} data-reveal>
          <p className={styles.sectionEyebrow}>A CUSTOMER&apos;S VIEW</p>
          <h2 id="journey-title">One journey.<br /><i>Four moments.</i></h2>
          <p>People don&apos;t experience separate channels. They see whether you show up, make sense, and make the next step clear.</p>
        </div>
        <div className={styles.journeyLayout} id="services">
          <div className={styles.journeyVisual} aria-hidden="true">
            <div className={styles.journeyVisualHead}><span>THE PATH TO AN ENQUIRY</span><span className={styles.journeyVisualCount}>01 / 04</span></div>
            <svg className={styles.journeyRoute} viewBox="0 0 360 660" fill="none" preserveAspectRatio="none">
              <path className={styles.journeyRouteBase} d="M92 40C245 88 86 184 246 218S91 352 246 394 96 532 246 620" />
              <path className={styles.journeyRouteLine} data-journey-route d="M92 40C245 88 86 184 246 218S91 352 246 394 96 532 246 620" />
            </svg>
            <div className={styles.journeyNodes}>
              {journeySteps.map((step) => (
                <div className={[styles.journeyNode, step.id === 'discover' ? styles.journeyNodeActive : ''].filter(Boolean).join(' ')} data-journey-node={step.id} key={step.id}>
                  <span>{step.number}</span><small>{step.label}</small>
                </div>
              ))}
            </div>
            <div className={styles.journeyVisualFoot}><span>Find the weak step.</span><span>Make the next move clear.</span></div>
          </div>
          <div className={styles.journeyStory}>
            {journeySteps.map((step) => (
              <article className={styles.journeyStep} data-journey-step={step.id} key={step.id}>
                <span className={styles.journeyStepNumber}>{step.number}</span>
                <div className={styles.journeyStepCopy}>
                  <p className={styles.stepKicker}>{step.label}</p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.services.length > 0 && (
                    <ul className={styles.journeyServiceList} aria-label={`${step.label.toLowerCase()} services`}>
                      {step.services.map((service) => <li key={service.title}><Link href={service.href}>{service.title}<ArrowIcon diagonal /></Link></li>)}
                    </ul>
                  )}
                  {step.id === 'learn' && <Link className={styles.journeyTalkLink} href="#approach">How Rahul works <ArrowIcon /></Link>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <article className={styles.workCard} data-reveal>
      <Link className={styles.workImage} href={project.path} aria-label={'View project notes for ' + project.title}>
        <Image src={project.image.src} alt={project.title + ' project preview'} fill sizes="(max-width: 700px) 100vw, 33vw" />
      </Link>
      <div className={styles.workCopy}>
        <div className={styles.workMeta}><span>Personal / demo project</span><span>{project.category} · {project.year}</span></div>
        <h3><Link href={project.path}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className={styles.workRole}><span>MY ROLE</span><strong>{project.role}</strong></div>
        <Link className={styles.workLink} href={project.path}>Explore the project <ArrowIcon /></Link>
      </div>
    </article>
  );
}

function MarketFocusSection({ marketName, focus }: { marketName: string; focus: MarketFocusContent }) {
  return (
    <section className={styles.marketFocusSection} aria-labelledby="market-focus-title">
      <div className={styles.sectionHeader} data-reveal>
        <div><p className={styles.sectionEyebrow}>{focus.eyebrow}</p><h2 id="market-focus-title">{focus.title}</h2></div>
        <p>{focus.intro}</p>
      </div>
      <div className={styles.marketFocusGrid}>
        {focus.items.map((item, index) => (
          <article className={styles.marketFocusCard} data-reveal key={item.title}>
            <span><i>0{index + 1}</i>{marketName}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
      <div className={styles.faqHeading} data-reveal>
        <div><p className={styles.sectionEyebrow}>BEFORE YOU START</p><h2 id="faq-title">A few things<br /><i>to know.</i></h2></div>
        <p>How the work starts, what it costs, and what you can expect before you commit.</p>
      </div>
      <div className={styles.faqList}>
        {homeFaqItems.map((faq) => (
          <details className={styles.faqItem} data-reveal key={faq.id}>
            <summary>{faq.question}<span aria-hidden="true">+</span></summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.workSection} id="work" aria-labelledby="work-title">
      <div className={styles.frame}>
        <div className={styles.workHeading} data-reveal>
          <div><p className={styles.sectionEyebrow}>SELECTED BUILDS · PERSONAL / DEMO</p><h2 id="work-title">A few things<br /><i>I have built.</i></h2></div>
          <p>Older design and development projects, shared as examples of the work—not client campaign case studies.</p>
        </div>
        <div className={styles.workGrid}>{projects.map((project) => <WorkCard project={project} key={project.slug} />)}</div>
        <Link className={styles.workAllLink} href="/portfolio">See all project notes <ArrowIcon /></Link>
      </div>
    </section>
  );
}

function WorkApproach({ contactMessage }: { contactMessage: string }) {
  return (
    <section className={styles.approachSection} id="approach" aria-labelledby="approach-title">
      <div className={styles.frame}>
        <div className={styles.approachHeading} data-reveal>
          <div><p className={styles.sectionEyebrow}>PROOF BEFORE SCALE</p><h2 id="approach-title">A clear next step.<br /><i>Then evidence.</i></h2></div>
          <p>Start with the business goal. Set a baseline, agree the scope, then review the signal with Rahul.</p>
        </div>
        <ol className={styles.processList}>
          {workSteps.map((step) => (
            <li className={styles.processStep} data-reveal key={step.number}>
              <span className={styles.processNumber}>{step.number}</span>
              <h3>{step.title}</h3><p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className={styles.closingCard} data-reveal>
          <div>
            <p>START WITH THE QUESTION THAT MATTERS</p>
            <h3>Where does growth feel stuck?</h3>
            <span>Tell Rahul what is happening now. Together, we’ll agree on a sensible first move.</span>
          </div>
          <a data-mobile-contact-anchor href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">
            Talk through your goal <WhatsAppIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function PrototypeExperience({ projects, market }: { projects: Project[]; market?: Market }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeNeed, setActiveNeed] = useState(0);
  const [showMobileContact, setShowMobileContact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { active: darkMode, toggleTheme } = UseThemeCheck();
  const marketPage = market ? marketPages[market.code] : undefined;
  const contactMessage = market
    ? `Hi Rahul, I would like to discuss growing my business in ${market.name}. What is the best first step?`
    : 'Hi Rahul, I want help growing my brand. Can we discuss the best first step?';

  useEffect(() => {
    const root = rootRef.current;
    const anchors = root?.querySelectorAll<HTMLElement>('[data-mobile-contact-anchor]');
    if (!anchors?.length) return;

    const visibility = new Map<HTMLElement, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibility.set(entry.target as HTMLElement, entry.isIntersecting));
      setShowMobileContact(!Array.from(visibility.values()).some(Boolean));
    }, { threshold: 0.1 });
    anchors.forEach((anchor) => observer.observe(anchor));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const compactMotion = window.matchMedia('(max-width: 640px)').matches;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.fromTo('[data-intro]', { autoAlpha: 0, y: compactMotion ? 12 : 20 }, { autoAlpha: 1, y: 0, duration: compactMotion ? 0.42 : 0.68, stagger: compactMotion ? 0.04 : 0.075, clearProps: 'all' });
      intro.fromTo('[data-hero-node]', { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.11, clearProps: 'all' }, 0.24);

      const heroRoute = root.querySelector<SVGPathElement>('[data-hero-route]');
      if (heroRoute) {
        const length = heroRoute.getTotalLength();
        gsap.set(heroRoute, { strokeDasharray: length, strokeDashoffset: length });
        intro.to(heroRoute, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.36);
      }

      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, y: compactMotion ? 14 : 24 }, {
          autoAlpha: 1,
          y: 0,
          duration: compactMotion ? 0.48 : 0.72,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });

      const journeyRoute = root.querySelector<SVGPathElement>('[data-journey-route]');
      const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-journey-step]'));
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-journey-node]'));
      const activate = (id: string) => {
        nodes.forEach((node) => {
          const active = node.dataset.journeyNode === id;
          node.classList.toggle(styles.journeyNodeActive, active);
        });
      };

      if (journeyRoute && steps.length > 1) {
        const length = journeyRoute.getTotalLength();
        gsap.set(journeyRoute, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(journeyRoute, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: steps[0],
            start: 'center 58%',
            endTrigger: steps[steps.length - 1],
            end: 'center 58%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'center 58%',
          onEnter: () => activate(step.dataset.journeyStep ?? ''),
          onEnterBack: () => activate(step.dataset.journeyStep ?? ''),
          onLeaveBack: () => activate(steps[index - 1]?.dataset.journeyStep ?? steps[0].dataset.journeyStep ?? ''),
        });
      });
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main className={styles.page} ref={rootRef}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <section className={styles.opening}>
        <div className={styles.frame}>
          <header className={styles.header} data-intro>
            <Link className={styles.brand} href="/" aria-label="ReddyStack home"><Image src={brandSymbol} alt="" width={31} height={31} priority /><span>ReddyStack</span></Link>
            <nav className={[styles.nav, mobileMenuOpen ? styles.navOpen : ''].filter(Boolean).join(' ')} id="main-navigation" aria-label="Main navigation">
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
              <a href="#approach" onClick={() => setMobileMenuOpen(false)}>How I work</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
            </nav>
            <button className={styles.themeToggle} type="button" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">{darkMode ? <path d="M16.5 12.3A7 7 0 0 1 7.7 3.5 7 7 0 1 0 16.5 12.3Z" /> : <><circle cx="10" cy="10" r="3.2" /><path d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2m14-5.8-1.4 1.4m-8.8 8.8-1.4 1.4m11.6 0-1.4-1.4M5.2 5.2 3.8 3.8" /></>}</svg>
              <span>{darkMode ? 'Dark' : 'Light'}</span>
            </button>
            <button className={styles.menuToggle} type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="main-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">{mobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <><path d="M4 7h16M4 12h16M4 17h16" /></>}</svg>
            </button>
            <a className={styles.headerCta} href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer" aria-label="Message Rahul on WhatsApp">WhatsApp Rahul <WhatsAppIcon /></a>
          </header>

          <div className={styles.heroMeta} data-intro><span>{marketPage?.hero.sub_title ?? 'FOUNDER-LED DIGITAL GROWTH STUDIO'}</span><span>HYDERABAD · WORKING WORLDWIDE</span></div>

          <section className={styles.hero} id="main-content" tabIndex={-1} aria-labelledby="prototype-title">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-intro>GROWTH, CONNECTED · RAHUL REDDY</p>
              <h1 id="prototype-title">{marketPage && market ? <><span data-intro>Grow in</span><span data-intro><i>{marketHeroLabels[market.code]}</i></span></> : <><span data-intro>From first look</span><span data-intro><i>to an enquiry.</i></span></>}</h1>
              <p className={styles.heroDescription} data-intro>{marketPage?.hero.sm_info ?? 'I connect search, ads, creative and your website into one clear customer journey—then use real signals to decide what deserves to grow.'}</p>
              <div className={styles.heroActions} data-intro>
                <a className={styles.primaryButton} data-mobile-contact-anchor href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">Talk about your next step <WhatsAppIcon /></a>
                <a className={styles.textButton} href="#journey">Follow the journey <ArrowIcon diagonal /></a>
              </div>
              <div className={styles.trustPoints} data-intro aria-label="What to expect"><span>Work directly with Rahul</span><span>Clear scope before work begins</span><span>Your accounts stay yours</span></div>
            </div>
            <GrowthPathVisual />
          </section>

          <div className={styles.heroBase}><span>SHOW UP</span><span>BUILD TRUST</span><span>MAKE THE NEXT STEP CLEAR</span><span>LEARN WHAT WORKED</span></div>
        </div>
      </section>

      <GrowthJourney />

      <div className={styles.paperArea}>
        <div className={styles.frame}>
          <section className={styles.diagnosticSection} id="diagnose" aria-labelledby="diagnose-title">
            <div className={styles.sectionHeader} data-reveal>
              <div><p className={styles.sectionEyebrow}>FIND THE BREAK IN THE JOURNEY</p><h2 id="diagnose-title">Where does your customer<br /><i>lose the thread?</i></h2></div>
              <p>Choose the moment that feels weakest. Start there before adding another channel or more spend.</p>
            </div>
            <GrowthSignalWidget activeNeed={activeNeed} setActiveNeed={setActiveNeed} />
            {marketPage && market && <MarketFocusSection marketName={market.name} focus={marketPage.focus} />}
          </section>
          <FaqSection />
        </div>
      </div>

      <WorkApproach contactMessage={contactMessage} />

      <div className={styles.paperArea}><WorkSection projects={projects} /></div>

      <footer className={styles.footer} data-mobile-contact-anchor>
        <div className={styles.footerMarkets}>
          <div className={styles.frame}><CountryChoiceLinks collapsible /></div>
        </div>
        <div className={styles.frame}>
          <Link className={styles.footerBrand} href="/" aria-label="ReddyStack home"><Image src={brandSymbol} alt="" width={27} height={27} /><span>ReddyStack</span></Link>
          <p>Built by Rahul Reddy · Hyderabad, India · Working worldwide</p>
          <a href={siteConfig.socialLinks.email}>Email Rahul <ArrowIcon diagonal /></a>
        </div>
      </footer>

      {showMobileContact && <a className={styles.mobileContact} href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer" aria-label="Talk through your goal with Rahul on WhatsApp">
        <WhatsAppIcon /> Talk to Rahul on WhatsApp
      </a>}
    </main>
  );
}
