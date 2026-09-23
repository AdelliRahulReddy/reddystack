'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import shape1 from "@/assets/img/portfolio/shape-3.png";
import { getFeaturedPortfolioProjects } from '@/data/PortfolioProjectsData';

const TestimonialAreaHomeTwo = () => {
  const featuredProjects = getFeaturedPortfolioProjects(5);
  const hoverTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef(0);
  const slideCount = featuredProjects.length;

  const moveText = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hoverTextRef = hoverTextRefs.current[index];

    if (hoverTextRef) {
      const item = hoverTextRef.getBoundingClientRect();
      const x = e.clientX - item.left;
      const y = e.clientY - item.top;

      const label = hoverTextRef.querySelector<HTMLElement>('.tp-portfolio-view');
      if (label) label.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const [activeIndex, setActiveIndex] = useState<number>(2);

  const shiftActiveIndex = (step: number) => {
    setActiveIndex((prevIndex) => Math.max(0, Math.min(prevIndex + step, slideCount - 1)));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const sensitivity = 50;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

    if (Math.abs(deltaX) <= sensitivity) {
      return;
    }

    if ((isRtl && deltaX < 0) || (!isRtl && deltaX > 0)) {
      shiftActiveIndex(1);
      return;
    }

    shiftActiveIndex(-1);
  };

  const getSlideClassName = (index: number) => {
    if (index === activeIndex) {
      return 'active';
    }

    if (index === activeIndex - 1) {
      return 'prev-1';
    }

    if (index === activeIndex - 2) {
      return 'prev-2';
    }

    if (index === activeIndex + 1) {
      return 'next-1';
    }

    if (index === activeIndex + 2) {
      return 'next-2';
    }

    return '';
  };

  return (
    <section className="tp-about-area fix">
      <div className="container container-large">
        <div
          className="tp-about-inner tp-hero-2__space-4 p-relative z-index-1"
          style={{ paddingBottom: '120px' }}
        >
          <span className="tp-about-inner-border transition-3"></span>
          <div className="tp-section-title-wrapper text-center mb-40">
            <h2 className="tp-section-title">Work You Can Inspect</h2>
            <p>Personal and demo builds, clearly labelled. <Link href="/portfolio">See all work</Link>.</p>
          </div>
          <div className="tp-hero-2__boder-circle">
            <span></span>
          </div>
          <div className="tp-portfolio-shape">
            <Image className="tp-portfolio-shape-2-1 tp-zoom-in-out" src={shape1} alt="Portfolio accent" />
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-3d-slide-container">
                <button type="button" disabled={activeIndex === 0}
                  className="tp-3d-slide-arrow tp-3d-slide-arrow-left z-index-9"
                  onClick={() => shiftActiveIndex(-1)}
                  aria-label="Show previous project"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 1L1 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button type="button" disabled={activeIndex === slideCount - 1}
                  className="tp-3d-slide-arrow tp-3d-slide-arrow-right z-index-9"
                  onClick={() => shiftActiveIndex(1)}
                  aria-label="Show next project"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className="tp-3d-slide-wrapper"
                  id="tp-3d-slide-wrapper"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {featuredProjects.map((item, index) => (
                    <div
                      key={item.slug}
                      aria-hidden={index !== activeIndex}
                      className={`tp-3d-slide tp-hover-reveal-text ${getSlideClassName(index)}`.trim()}
                      ref={(element) => {
                        hoverTextRefs.current[index] = element;
                      }}
                      onMouseMove={(e) => moveText(e, index)}
                    >
                      <Link
                        href={item.path}
                        className="tp-portfolio-item-2 include-bg"
                        tabIndex={index === activeIndex ? 0 : -1}
                      >
                        <Image src={item.listingImage} alt={`${item.title} project preview`} fill sizes="(max-width: 767px) 90vw, (max-width: 1199px) 630px, 770px" className="tp-portfolio-card-image" />
                        <div className="tp-portfolio-meta-2">
                          <span>{item.category}</span>
                          <span>{item.year}</span>
                        </div>
                        <h3 className="tp-portfolio-title-2">{item.title}</h3>
                        <div className="tp-portfolio-view tp-portfolio-view-btn">
                          <span>View <br /> Work</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialAreaHomeTwo;
