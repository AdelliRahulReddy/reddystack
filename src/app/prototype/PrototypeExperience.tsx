'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
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
  { id: 'visibility', title: 'People cannot find us', detail: 'Search and local discovery are quiet.', firstStep: 'Check what customers find when they search.', focus: 'SEO & local visibility', message: 'People cannot find my business online.' },
  { id: 'conversion', title: 'People visit, but do not enquire', detail: 'The offer or next step may not be clear.', firstStep: 'Review the page from first click to enquiry.', focus: 'Website & landing page', message: 'People visit, but few enquire.' },
  { id: 'measurement', title: 'We do not know what is working', detail: 'Spend and enquiries are hard to connect.', firstStep: 'Check tracking before increasing ad spend.', focus: 'Ads & measurement', message: 'I cannot tell which marketing brings enquiries.' },
] as const;

const services = [
  { title: 'SEO & local search', description: 'Help customers find you when they are looking.', href: '/service/seo-local-seo', icon: 'search' },
  { title: 'Websites & landing pages', description: 'Explain the offer and make the next step clear.', href: '/service/seo-websites', icon: 'page' },
  { title: 'Meta & Google Ads', description: 'Reach the right people with a plan to measure.', href: '/service/meta-ads', icon: 'reach' },
  { title: 'Creative & short-form video', description: 'Build focused ad creative and video concepts.', href: '/service/ad-creatives', icon: 'spark' },
] as const;

const offers = [
  { number: '01', label: 'START', title: 'Proof Sprint', description: 'Set a baseline, solve one important problem, and capture evidence for the next decision.' },
  { number: '02', label: 'BUILD', title: 'Stack Build', description: 'Build only the website, search, ads, creative, or tracking the agreed problem needs.' },
  { number: '03', label: 'IMPROVE', title: 'Operate & Improve', description: 'Keep testing a working system with clear priorities and regular review.' },
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

function CapabilityIcon({ kind }: { kind: typeof services[number]['icon'] }) {
  const shapes = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    page: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" /></>,
    reach: <><path d="M3 11v2a2 2 0 0 0 2 2h2l7 5V4l-7 5H5a2 2 0 0 0-2 2Z" /><path d="M14 8a5 5 0 0 1 0 8M7 15l1.5 5" /></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
  }[kind];
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{shapes}</svg>;
}

function setSpotlight(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--spot-x', (event.clientX - bounds.left) + 'px');
  event.currentTarget.style.setProperty('--spot-y', (event.clientY - bounds.top) + 'px');
}

function GrowthMapVisual() {
  return (
    <aside className={styles.growthVisual} data-growth-visual aria-label="Rahul connects SEO, websites, and advertising around the goal of more enquiries">
      <div className={styles.growthVisualHead}>
        <span><i /> THE BRAND GROWTH MAP</span>
        <span className={styles.growthVisualStatus}>BUILT AROUND YOUR GOAL</span>
      </div>
      <div className={styles.growthCanvas}>
        <span className={styles.growthOrbit} aria-hidden="true" />
        <svg className={styles.growthConnections} viewBox="0 0 600 330" preserveAspectRatio="none" aria-hidden="true">
          <path d="M360 55 C410 55 386 165 414 165" />
          <path d="M360 165 H414" />
          <path d="M360 275 C410 275 386 165 414 165" />
          <circle cx="414" cy="165" r="4" />
        </svg>
        <div className={[styles.growthSource, styles.growthSourceSearch].join(' ')}>
          <span className={styles.growthSourceNumber}>01</span>
          <span className={styles.growthSourceCopy}><small>GET DISCOVERED</small><strong>SEO + local search</strong></span>
          <ArrowIcon diagonal />
        </div>
        <div className={[styles.growthSource, styles.growthSourceWebsite].join(' ')}>
          <span className={styles.growthSourceNumber}>02</span>
          <span className={styles.growthSourceCopy}><small>BUILD TRUST</small><strong>Websites</strong></span>
          <ArrowIcon diagonal />
        </div>
        <div className={[styles.growthSource, styles.growthSourceAds].join(' ')}>
          <span className={styles.growthSourceNumber}>03</span>
          <span className={styles.growthSourceCopy}><small>REACH PEOPLE</small><strong>Ads + creative</strong></span>
          <ArrowIcon diagonal />
        </div>
        <div className={styles.growthOutcome}>
          <span className={styles.outcomeSpark} aria-hidden="true">✳</span>
          <small>THE BUSINESS GOAL</small>
          <strong>More right-fit enquiries</strong>
          <span>One connected plan.</span>
        </div>
      </div>
      <div className={styles.growthVisualFoot}><span>RIGHT CHANNELS</span><i /><span>ONE CLEAR GOAL</span><i /><span>RAHUL REDDY</span></div>
    </aside>
  );
}

function GrowthSignalWidget({ activeNeed, setActiveNeed }: { activeNeed: number; setActiveNeed: (index: number) => void }) {
  const need = bottlenecks[activeNeed];
  return (
    <article className={styles.diagnosticWidget} data-scroll-reveal>
      <div className={styles.diagnosticChoices}>
        {bottlenecks.map((option, index) => (
          <button
            aria-pressed={activeNeed === index}
            className={[styles.diagnosticChoice, activeNeed === index ? styles.diagnosticChoiceActive : ''].filter(Boolean).join(' ')}
            key={option.id}
            onClick={() => setActiveNeed(index)}
            type="button"
          >
            <span className={styles.choiceNumber}>0{index + 1}</span>
            <span className={styles.choiceText}><strong>{option.title}</strong><small>{option.detail}</small></span>
            <span className={styles.choiceArrow} aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className={styles.diagnosticAnswer} key={need.id} role="status" aria-live="polite" aria-atomic="true">
        <div className={styles.answerKicker}><span>FIRST PLACE TO LOOK</span><span className={styles.answerPulse}><i /> PRACTICAL NEXT STEP</span></div>
        <h3>{need.firstStep}</h3>
        <span className={styles.answerTag}>{need.focus}</span>
        <a className={styles.answerLink} href={whatsappHref('Hi Rahul, I want help with my brand. ' + need.message + ' What would you check first?')} target="_blank" rel="noreferrer">
          Ask Rahul about this <WhatsAppIcon />
        </a>
      </div>
    </article>
  );
}

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  return (
    <Link className={styles.serviceCard} data-scroll-reveal data-spotlight onPointerMove={setSpotlight} href={service.href}>
      <span className={styles.serviceIndex}>0{index + 1} / {service.title.toUpperCase()}</span>
      <span className={styles.serviceIcon}><CapabilityIcon kind={service.icon} /></span>
      <strong>{service.title}</strong>
      <span className={styles.serviceDescription}>{service.description}</span>
      <span className={styles.serviceArrow}><ArrowIcon diagonal /></span>
    </Link>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={styles.workCard} data-scroll-reveal data-spotlight onPointerMove={setSpotlight}>
      <Link className={styles.workImage} href={project.path} aria-label={'View project notes for ' + project.title}>
        <Image src={project.image.src} alt={project.title + ' project preview'} fill sizes="(max-width: 700px) 100vw, 33vw" />
        <span className={styles.workNumber}>0{index + 1} / PERSONAL BUILD</span>
        <span className={styles.workImageArrow}><ArrowIcon diagonal /></span>
      </Link>
      <div className={styles.workCopy}>
        <div className={styles.workMeta}><span>{project.category}</span><span>{project.year}</span></div>
        <h3><Link href={project.path}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className={styles.workRole}><span>MY ROLE</span><strong>{project.role}</strong></div>
        <Link className={styles.workLink} href={project.path}>See the project details <ArrowIcon /></Link>
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
        <div><p className={styles.sectionEyebrow}>GOOD TO KNOW</p><h2 id="faq-title">Clear answers.<br /><i>No guesswork.</i></h2></div>
        <p>What we do, how a project starts, and what to expect before you commit.</p>
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
          <div><p className={styles.sectionEyebrow}>03 / HOW WE WORK</p><h2 id="approach-title">Start with one problem.<br /><i>Build from evidence.</i></h2></div>
          <p>Pick the right level of support. The scope stays clear, and each step gives us something useful to learn.</p>
        </div>
        <div className={styles.offerGrid}>
          {offers.map((offer) => (
            <article className={styles.offerCard} data-scroll-reveal key={offer.title}>
              <div className={styles.offerMeta}><span>{offer.number}</span><span>{offer.label}</span></div>
              <h3>{offer.title}</h3><p>{offer.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.aiNote} data-scroll-reveal>
          <div className={styles.aiGlyph} aria-hidden="true"><span>AI</span><i>+</i></div>
          <div className={styles.aiCopy}>
            <p>HUMAN-LED · AI-ASSISTED</p>
            <h3>AI can speed the work. Rahul owns the decisions.</h3>
            <span>Used where it helps with research, creative options, and repeatable tasks. Every recommendation and final output is reviewed by Rahul.</span>
          </div>
          <div className={styles.aiFlow} aria-label="Human-led workflow: research, explore, review"><span>RESEARCH</span><i /><span>EXPLORE</span><i /><span>REVIEW</span></div>
        </div>
        <div className={styles.closingCard} data-scroll-reveal>
          <div>
            <p>BEFORE YOU SPEND MORE</p>
            <h3>Check that your offer, page and tracking are ready to do their part.</h3>
            <span>Tell Rahul what feels stuck. Start with a useful conversation, not a preset package.</span>
          </div>
          <a href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">
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
  const { active: darkMode, toggleTheme } = UseThemeCheck();
  const marketPage = market ? marketPages[market.code] : undefined;
  const contactMessage = market
    ? `Hi Rahul, I would like to discuss growing my business in ${market.name}. What is the best first step?`
    : 'Hi Rahul, I want help growing my brand. Can we discuss the best first step?';

  useEffect(() => {
    const primaryContact = rootRef.current?.querySelector<HTMLElement>('[data-primary-contact]');
    if (!primaryContact) return;

    const observer = new IntersectionObserver(([entry]) => setShowMobileContact(!entry.isIntersecting), { threshold: 0.05 });
    observer.observe(primaryContact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.fromTo('[data-intro]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.06, ease: 'power3.out', clearProps: 'all' });
      gsap.fromTo('[data-growth-visual]', { autoAlpha: 0.7, y: 17, rotate: 1.5 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' });
    }, root);

    const revealAnimations: gsap.core.Tween[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealAnimations.push(gsap.fromTo(entry.target, { autoAlpha: 0.68, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'all' }));
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
            <nav className={styles.nav} aria-label="Main navigation"><a href="#services">Services</a><a href="#work">Work</a><a href="#approach">How I work</a><a href="#faq">FAQs</a><Link href="/blog">Insights</Link></nav>
            <button className={styles.themeToggle} type="button" onClick={toggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">{darkMode ? <path d="M16.5 12.3A7 7 0 0 1 7.7 3.5 7 7 0 1 0 16.5 12.3Z" /> : <><circle cx="10" cy="10" r="3.2" /><path d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2m14-5.8-1.4 1.4m-8.8 8.8-1.4 1.4m11.6 0-1.4-1.4M5.2 5.2 3.8 3.8" /></>}</svg>
              <span>{darkMode ? 'Dark' : 'Light'}</span>
            </button>
            <a className={styles.headerCta} href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">WhatsApp Rahul <WhatsAppIcon /></a>
          </header>

          <div className={styles.heroMeta} data-intro><span><i /> {marketPage?.hero.sub_title ?? 'INDEPENDENT BRAND GROWTH PARTNER'}</span><span>HYDERABAD · WORKING WORLDWIDE</span></div>

          <section className={styles.hero} id="main-content" tabIndex={-1} aria-labelledby="prototype-title">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-intro>RAHUL REDDY · SEO · WEBSITES · ADS · CREATIVE</p>
              <h1 id="prototype-title">{marketPage && market ? <><span data-intro>Grow in</span><span data-intro><i>{marketHeroLabels[market.code]}</i></span></> : <><span data-intro>Get found.</span><span data-intro><i>Get chosen.</i></span></>}</h1>
              <p className={styles.heroDescription} data-intro>{marketPage?.hero.sm_info ?? 'I’m Rahul Reddy. I connect SEO, websites, ads and creative so the right people can find your business, trust it and get in touch.'}</p>
              <div className={styles.heroActions} data-intro>
                <a className={styles.primaryButton} data-primary-contact href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer">Talk to Rahul on WhatsApp <WhatsAppIcon /></a>
                <a className={styles.textButton} href="#services">Explore services <ArrowIcon diagonal /></a>
              </div>
              <p className={styles.heroNote} data-intro>Have clicks but few enquiries? Tell me what feels stuck.</p>
              <div className={styles.trustPoints} data-intro aria-label="What to expect"><span>Work directly with Rahul</span><i /><span>Clear scope before build</span><i /><span>You keep your accounts</span></div>
            </div>
            <GrowthMapVisual />
          </section>

          <div className={styles.heroBase}><span>ONE BUSINESS PROBLEM</span><i /><span>THE RIGHT DIGITAL MIX</span><i /><span>LEARN BEFORE YOU SCALE</span></div>
        </div>
      </section>

      <div className={styles.paperArea}>
        <div className={styles.frame}>
          <section className={styles.diagnosticSection} id="diagnose" aria-labelledby="diagnose-title">
            <div className={styles.sectionHeader} data-scroll-reveal>
              <div><p className={styles.sectionEyebrow}>01 / FIND THE GROWTH GAP</p><h2 id="diagnose-title">What is slowing<br /><i>growth?</i></h2></div>
              <p>Choose the closest problem. Get a practical first place to look—before adding another channel or more spend.</p>
            </div>
            <GrowthSignalWidget activeNeed={activeNeed} setActiveNeed={setActiveNeed} />
            <div className={styles.serviceHeader} data-scroll-reveal id="services">
              <div><p className={styles.sectionEyebrow}>WHAT I CAN HELP WITH</p><h3>One goal. The right tools.</h3></div>
              <Link href="/service">See all services <ArrowIcon /></Link>
            </div>
            <div className={styles.serviceGrid}>{services.map((service, index) => <ServiceCard service={service} index={index} key={service.title} />)}</div>
            {marketPage && market && <MarketFocusSection marketName={market.name} focus={marketPage.focus} />}
          </section>

          <section className={styles.workSection} id="work" aria-labelledby="work-title">
            <div className={styles.sectionHeader} data-scroll-reveal>
              <div><p className={styles.sectionEyebrow}>02 / SELECTED BUILDS</p><h2 id="work-title">Work you can<br /><i>look through.</i></h2></div>
              <p>See what I planned and built. These examples show the work itself—not unverified client outcomes.</p>
            </div>
            <div className={styles.workGrid}>{projects.map((project, index) => <WorkCard project={project} index={index} key={project.slug} />)}</div>
            <div className={styles.workDisclosure} data-scroll-reveal>
              <span><i /> CLEAR PROOF, ALWAYS</span>
              <p>These are personal/demo builds, not paid client case studies. I do not invent campaign results, leads or revenue claims.</p>
              <Link href="/portfolio">Browse all project notes <ArrowIcon /></Link>
            </div>
          </section>
          <FaqSection />
        </div>
      </div>

      <WorkApproach contactMessage={contactMessage} />

      <footer className={styles.footer}>
        <div className={styles.footerMarkets}>
          <div className={styles.frame}><CountryChoiceLinks collapsible /></div>
        </div>
        <div className={styles.frame}>
          <Link className={styles.footerBrand} href="/" aria-label="ReddyStack home"><Image src={brandSymbol} alt="" width={27} height={27} /><span>ReddyStack</span></Link>
          <p>Built by Rahul Reddy · Hyderabad, India · Working worldwide</p>
          <a href={siteConfig.socialLinks.email}>Email Rahul <ArrowIcon diagonal /></a>
        </div>
      </footer>

      {showMobileContact && <a className={styles.mobileContact} href={whatsappHref(contactMessage)} target="_blank" rel="noreferrer" aria-label="Talk to Rahul on WhatsApp">
        <WhatsAppIcon /> Talk to Rahul on WhatsApp
      </a>}
    </main>
  );
}
