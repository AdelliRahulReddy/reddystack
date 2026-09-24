'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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

const serviceGroups = [
  {
    number: '01',
    title: 'Reach the right people',
    description: 'Paid campaigns and creative shaped around your audience, offer, and budget.',
    services: [
      { title: 'Meta Ads', href: '/service/meta-ads' },
      { title: 'Google Ads', href: '/service/google-ads' },
      { title: 'Ad creatives', href: '/service/ad-creatives' },
      { title: 'AI UGC-style videos', href: '/service/ai-ugc-videos' },
    ],
  },
  {
    number: '02',
    title: 'Make discovery count',
    description: 'Search visibility and useful websites that help people understand your offer and take the next step.',
    services: [
      { title: 'SEO & Local SEO', href: '/service/seo-local-seo' },
      { title: 'Website development', href: '/service/seo-websites' },
    ],
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
    <aside className={styles.growthVisual} data-growth-visual aria-label="Reddystack's approach: understand the goal, build the right mix, and review the evidence">
      <p className={styles.growthVisualLabel}>A PRACTICAL GROWTH PATH</p>
      <h2>Proof before<br /><i>scale.</i></h2>
      <p className={styles.growthVisualIntro}>Start with the business goal. Connect only the work that helps answer it.</p>
      <div className={styles.pathTrack} aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span></div>
      <div className={styles.pathLabels}>
        <span>Understand</span><span>Build</span><span>Review</span>
      </div>
      <span className={styles.growthMark} aria-hidden="true">R</span>
    </aside>
  );
}

function GrowthSignalWidget({ activeNeed, setActiveNeed }: { activeNeed: number; setActiveNeed: (index: number) => void }) {
  const need = bottlenecks[activeNeed];
  return (
    <article className={styles.diagnosticWidget} data-scroll-reveal>
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

function ServiceGroup({ group }: { group: typeof serviceGroups[number] }) {
  return (
    <article className={styles.serviceGroup} data-scroll-reveal>
      <span className={styles.serviceNumber}>{group.number}</span>
      <div className={styles.serviceGroupCopy}>
        <h3>{group.title}</h3>
        <p>{group.description}</p>
      </div>
      <div className={styles.serviceLinks}>
        {group.services.map((service) => (
          <Link className={styles.serviceLink} href={service.href} key={service.title}>
            <span>{service.title}</span><ArrowIcon diagonal />
          </Link>
        ))}
      </div>
    </article>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <article className={styles.workCard} data-scroll-reveal>
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
      <div className={styles.sectionHeader} data-scroll-reveal>
        <div><p className={styles.sectionEyebrow}>{focus.eyebrow}</p><h2 id="market-focus-title">{focus.title}</h2></div>
        <p>{focus.intro}</p>
      </div>
      <div className={styles.marketFocusGrid}>
        {focus.items.map((item, index) => (
          <article className={styles.marketFocusCard} data-scroll-reveal key={item.title}>
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
      <div className={styles.faqHeading} data-scroll-reveal>
        <div><p className={styles.sectionEyebrow}>BEFORE YOU START</p><h2 id="faq-title">A few things<br /><i>to know.</i></h2></div>
        <p>How the work starts, what it costs, and what you can expect before you commit.</p>
      </div>
      <div className={styles.faqList}>
        {homeFaqItems.map((faq) => (
          <details className={styles.faqItem} data-scroll-reveal key={faq.id}>
            <summary>{faq.question}<span aria-hidden="true">+</span></summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function WorkApproach({ contactMessage }: { contactMessage: string }) {
  return (
    <section className={styles.approachSection} id="approach" aria-labelledby="approach-title">
      <div className={styles.frame}>
        <div className={styles.approachHeading} data-scroll-reveal>
          <div><p className={styles.sectionEyebrow}>HOW THE WORK MOVES</p><h2 id="approach-title">Understand first.<br /><i>Then build.</i></h2></div>
          <p>Every engagement starts with a conversation about your goal. We agree the work and its boundaries before it begins.</p>
        </div>
        <ol className={styles.processList}>
          {workSteps.map((step) => (
            <li className={styles.processStep} data-scroll-reveal key={step.number}>
              <span className={styles.processNumber}>{step.number}</span>
              <h3>{step.title}</h3><p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className={styles.closingCard} data-scroll-reveal>
          <div>
            <p>START WITH A CONVERSATION</p>
            <h3>Tell Rahul what you want to change.</h3>
            <span>We’ll talk through the goal, what you have tried, and what a sensible next step could be.</span>
          </div>
          <a data-mobile-contact-anchor href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">
            Talk to Rahul on WhatsApp <WhatsAppIcon />
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
    const compactMotion = window.matchMedia('(max-width: 640px)').matches;

    const context = gsap.context(() => {
      gsap.fromTo('[data-intro]', { autoAlpha: 0, y: compactMotion ? 10 : 16 }, { autoAlpha: 1, y: 0, duration: compactMotion ? 0.38 : 0.62, stagger: compactMotion ? 0.035 : 0.06, ease: 'power3.out', clearProps: 'all' });
      gsap.fromTo('[data-growth-visual]', { autoAlpha: 0, y: compactMotion ? 8 : 14 }, { autoAlpha: 1, y: 0, duration: compactMotion ? 0.4 : 0.65, ease: 'power3.out', clearProps: 'all' });
    }, root);

    const revealAnimations: gsap.core.Tween[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealAnimations.push(gsap.fromTo(entry.target, { autoAlpha: 0.68, y: compactMotion ? 8 : 15 }, { autoAlpha: 1, y: 0, duration: compactMotion ? 0.34 : 0.55, ease: 'power3.out', clearProps: 'all' }));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13 });

    root.querySelectorAll('[data-scroll-reveal]').forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      revealAnimations.forEach((animation) => animation.kill());
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
              <p className={styles.eyebrow} data-intro>RAHUL REDDY · PROOF-FIRST GROWTH</p>
              <h1 id="prototype-title">{marketPage && market ? <><span data-intro>Grow in</span><span data-intro><i>{marketHeroLabels[market.code]}</i></span></> : <><span data-intro>One problem.</span><span data-intro><i>One connected stack.</i></span></>}</h1>
              <p className={styles.heroDescription} data-intro>{marketPage?.hero.sm_info ?? 'I connect websites, search, paid acquisition, creative and tracking around the business goal that matters most—then use real signals to guide the next move.'}</p>
              <div className={styles.heroActions} data-intro>
                <a className={styles.primaryButton} data-mobile-contact-anchor href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">Talk through your goal <WhatsAppIcon /></a>
                <a className={styles.textButton} href="#work">See selected work <ArrowIcon diagonal /></a>
              </div>
              <div className={styles.trustPoints} data-intro aria-label="What to expect"><span>Work directly with Rahul</span><span>Clear scope before work begins</span><span>Your accounts stay yours</span></div>
            </div>
            <GrowthPathVisual />
          </section>

          <div className={styles.heroBase}><span>ONE CLEAR GOAL</span><span>THE RIGHT DIGITAL MIX</span><span>PROOF BEFORE SCALE</span></div>
        </div>
      </section>

      <div className={styles.paperArea}>
        <div className={styles.frame}>
          <section className={styles.diagnosticSection} id="diagnose" aria-labelledby="diagnose-title">
            <div className={styles.sectionHeader} data-scroll-reveal>
              <div><p className={styles.sectionEyebrow}>FIND A USEFUL STARTING POINT</p><h2 id="diagnose-title">Where does growth<br /><i>get stuck?</i></h2></div>
              <p>Choose the closest problem. Get a practical first place to look—before adding another channel or more spend.</p>
            </div>
            <GrowthSignalWidget activeNeed={activeNeed} setActiveNeed={setActiveNeed} />
            <div className={styles.serviceHeader} data-scroll-reveal id="services">
              <div><p className={styles.sectionEyebrow}>CONNECTED CAPABILITIES</p><h3>The right work for the goal.</h3></div>
              <Link href="/service">All capabilities <ArrowIcon /></Link>
            </div>
            <div className={styles.serviceGrid}>{serviceGroups.map((group) => <ServiceGroup group={group} key={group.number} />)}</div>
            {marketPage && market && <MarketFocusSection marketName={market.name} focus={marketPage.focus} />}
          </section>

          <section className={styles.workSection} id="work" aria-labelledby="work-title">
            <div className={styles.sectionHeader} data-scroll-reveal>
              <div><p className={styles.sectionEyebrow}>SELECTED BUILDS</p><h2 id="work-title">Work with<br /><i>context.</i></h2></div>
              <p>Website and product projects, with the purpose and role made clear. No invented campaign results.</p>
            </div>
            <div className={styles.workGrid}>{projects.map((project) => <WorkCard project={project} key={project.slug} />)}</div>
            <div className={styles.workDisclosure} data-scroll-reveal>
              <span>PERSONAL / DEMO WORK</span>
              <p>These projects demonstrate design and development work. They are not paid client campaign case studies.</p>
              <Link href="/portfolio">Explore all projects <ArrowIcon /></Link>
            </div>
          </section>
          <FaqSection />
        </div>
      </div>

      <WorkApproach contactMessage={contactMessage} />

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
