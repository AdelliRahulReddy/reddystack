'use client'
import Link from 'next/link';
import { type JSX, useEffect, useRef, useState } from 'react';
import HeroArrowIcon from '@/svg/home/HeroIcons/HeroArrowIcon';
import { HeroSocialLinks } from '@/components/common/SocialLinks';
import type { LottieRefCurrentProps } from 'lottie-react';
import { useInView } from 'react-intersection-observer';
interface DataType {
  slide_text: string[];
  sub_title: string;
  title_1: string;
  sm_info: JSX.Element;
  btn_text: JSX.Element;
}

const hero_content: DataType = {
  slide_text: [
    "Meta Ads",
    "Google Ads",
    "Ad Creatives",
    "AI UGC-Style Videos",
    "Website Development",
    "SEO & Local SEO",
  ],
  sub_title: "DIGITAL MARKETING & WEBSITES",
  title_1: "Ads, Creative & Websites That Grow Your Business.",
  sm_info: <>
    Reach more customers with Meta & Google Ads, ad creatives, AI UGC-style videos, websites, and SEO.
  </>,
  btn_text: <>Let’s <br /> Talk</>,
}
const {
  slide_text,
  sub_title,
  title_1,
  sm_info,
  btn_text
} = hero_content;

const HeroAreaHome = () => {
  const { ref, inView } = useInView({ initialInView: true });
  const animation = useRef<LottieRefCurrentProps>(null);
  const [paused, setPaused] = useState(false);
  const [artwork, setArtwork] = useState<{ Player: typeof import('lottie-react').default; data: object } | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (paused || !inView) animation.current?.pause(); else animation.current?.play();
  }, [paused, inView, ready]);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => { animation.current?.pause(); setPaused(true); };
    if (motion.matches) syncMotion();
    motion.addEventListener('change', syncMotion);
    return () => motion.removeEventListener('change', syncMotion);
  }, []);
  useEffect(() => {
    if (artwork || paused || !inView) return;
    const controller = new AbortController();
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const load = () => {
      Promise.all([
        import('lottie-react'),
        fetch('/assets/lottie/hero-animation.json', { signal: controller.signal }).then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        }),
      ]).then(([{ default: Player }, data]) => {
        if (!controller.signal.aborted) setArtwork({ Player, data });
      }).catch(error => {
        if (!controller.signal.aborted) console.error('Could not load the hero illustration', error);
      });
    };
    const schedule = () => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(load, { timeout: 2000 });
      else timer = setTimeout(load, 1000);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      controller.abort();
      window.removeEventListener('load', schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, [artwork, paused, inView]);
  return (
    <>

      <section ref={ref} className="tp-hero-area p-relative tp-btn-trigger z-index-1 fix theme-bg-2">
        <div className="tp-hero-social-wrapper">
          <span className="tp-hero-social-bar"></span>
          <div className="tp-hero-social">
            <HeroSocialLinks />
          </div>
        </div>
        <div className="tp-hero-shape">
          <div className="tp-hero-shape-1 background-white-mode" style={{ backgroundImage: 'url(/assets/img/hero/hero-overlay.png)' }}></div>
          <div className="tp-hero-shape-1 background-dark-mode" style={{ backgroundImage: 'url(/assets/img/hero/hero-overlay-2.png)' }}></div>
          <span className="tp-hero-shape-2"></span>
        </div>
        <div className="tp-hero-bottom-text-wrapper" aria-hidden="true">
          <div className="tp-hero-bottom-text">
            {slide_text.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="tp-hero-bottom-text">
            {slide_text.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row tp-hero-row">
            <div className="col-xl-7 col-lg-7 col-md-12">
              <div className="tp-hero-left-wrapper">
                <div className="tp-hero-content p-relative z-index-1">
                  <span className="singleLine">{sub_title}</span>
                  <h1 className="tp-hero-title tp_title_anim">
                    <strong className="tp-hero-title-static">{title_1}</strong>
                  </h1>
                  <p>{sm_info}</p>
                  <div className="tp-hero-btn d-flex align-items-center flex-wrap gap-3">
                    <div className="tp-hover-btn-wrapper">
                      <Link href="/contact" className="tp-hover-btn tp-hover-btn-item tp-btn-circle square">
                        <span className="tp-btn-circle-text" >
                          {btn_text}
                        </span>
                        <span className="tp-btn-circle-arrow">
                          <HeroArrowIcon />
                        </span>
                        <i className="tp-btn-circle-dot"></i>
                      </Link>
                    </div>
                    <Link href="/service" className="tp-btn-border-sm border-0 px-2 text-decoration-underline">
                      Explore Services
                    </Link>
                  </div>
                  <div className="tp-hero-scroll smooth">
                    <a className="pointer" href="#tp-sv" aria-label="Scroll to services">
                      <span className="tp-hero-scroll-bar"></span>
                      <span className="tp-hero-scroll-mouse"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12">
              <div className="tp-hero-thumb-wrapper text-center text-lg-end p-relative z-index-1">
                <div className="tp-hero-thumb-shape">
                  <span className="tp-hero-thumb-shape-3"></span>
                </div>
                <button type="button" className="tp-hero-thumb p-0 border-0 bg-transparent"
                  aria-label={paused ? 'Play illustration' : 'Pause illustration'}
                  title={paused ? 'Play illustration' : 'Pause illustration'}
                  onClick={() => { if (paused) animation.current?.play(); else animation.current?.pause(); setPaused(!paused); }}>
                  <span className="tp-hero-artwork" data-ready={ready}>
                    {/* These are exact frames of the existing illustration, available before hydration. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/lottie/hero-still-dark.svg" width="1600" height="1164" alt="" className="tp-hero-still background-white-mode" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/lottie/hero-still-light.svg" width="1600" height="1164" alt="" className="tp-hero-still background-dark-mode" />
                  {artwork && <artwork.Player
                    lottieRef={animation}
                    autoplay={false}
                    onDOMLoaded={() => { animation.current?.setSubframe(false); setReady(true); }}
                    aria-hidden="true"
                    animationData={artwork.data}
                    loop={true}
                    className="tp-hero-lottie"
                    // Trim unused canvas below the base, then align the artwork to the bottom.
                    rendererSettings={{ viewBoxSize: '0 0 1600 1164', preserveAspectRatio: 'xMidYMax meet' }}
                    style={{ width: '100%', height: '100%' }}
                  />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroAreaHome;
