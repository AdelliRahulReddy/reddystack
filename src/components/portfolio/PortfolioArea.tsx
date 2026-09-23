'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { portfolioProjects } from '@/data/PortfolioProjectsData';

const PortfolioArea = () => {
  const firstColumnProjects = portfolioProjects.slice(0, 3);
  const secondColumnProjects = portfolioProjects.slice(3);

  return (
    <div id="portfolio-projects" className="porfolio-inner__thumb-wrapper tp-portfolio-effect portfolio-list-scroll-text-animation p-relative fix black-bg-3 pt-80 pb-50 rs-portfolio-projects"
      data-scrub="0.0001">
      <div className="portfolio-list-scroll-text pb-80 d-flex align-items-center">
        <p>Work & Proof</p>
        <p>Work & Proof</p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="service-details__banner-text mb-50 text-center">
              <p>
                ReddyStack&apos;s proof standard is simple: show the real work, state the actual role,
                separate implementation evidence from business outcomes, and name what has not been
                measured. These current projects are personal and demo builds—not invented client case studies.
              </p>
              <p>Review each build by the problem it addresses, the decisions made, the working output, and the stated limitations. Client case studies will be added only when permission, baseline data, completed work, and a defensible result all exist.</p>
              <p>A similar commercial project needs its own brief, factual content, acceptance checks and operating responsibilities. Use an example to explain the direction you want, then <Link href="/contact">discuss the actual scope with Rahul</Link>.</p>
            </div>
          </div>
        </div>
        <div className="row grid gx-90">
          <div className="col-xl-6 grid-item">
            <div className="tp-portfolio-item-wrapper">
              {firstColumnProjects.map((item) => (
                <div key={item.slug} className="tp-portfolio-item mb-70">
                  <Link href={item.path}>
                    <div className={`tp-portfolio-thumb img-${item.thumbVariant} w-img fix`}>
                      <div
                        className="tp-portfolio-thumb-img include-bg d-none"
                        style={{ backgroundImage: `url(${item.listingBackgroundImage})` }}
                      ></div>
                      <div className="tp-portfolio-thumb-img">
                        <Image data-speed="0.85" style={{ height: 'auto' }} src={item.listingImage} alt={item.title} />
                      </div>
                    </div>
                    <div className="tp-portfolio-content">
                      <h3 className="tp-portfolio-title">{item.title}</h3>
                      <div className="tp-portfolio-meta d-flex align-items-center">
                        <span className="tp-portfolio-meta-count">{String(item.id).padStart(2, '0')}</span>
                        <span className="tp-portfolio-meta-arrow">
                          <svg width="42" height="13" viewBox="0 0 42 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.4889 1L41 6.33338L35.4889 11.6667" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M0.999998 6.33179H41" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <div className="tp-portfolio-meta-hover">
                          <span>{item.category}</span>
                          <span className="tp-portfolio-meta-link">View Project</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xl-6 grid-item">
            <div className="tp-portfolio-item-wrapper">
              {secondColumnProjects.map((item) => (
                <div key={item.slug} className="tp-portfolio-item mb-70">
                  <Link href={item.path}>
                    <div className={`tp-portfolio-thumb img-${item.thumbVariant} w-img fix`}>
                      <div
                        className="tp-portfolio-thumb-img include-bg d-none"
                        style={{ backgroundImage: `url(${item.listingBackgroundImage})` }}
                      ></div>
                      <div className="tp-portfolio-thumb-img">
                        <Image data-speed="0.85" style={{ height: 'auto' }} src={item.listingImage} alt={item.title} />
                      </div>
                    </div>
                    <div className="tp-portfolio-content">
                      <h3 className="tp-portfolio-title">{item.title}</h3>
                      <div className="tp-portfolio-meta d-flex align-items-center">
                        <span className="tp-portfolio-meta-count">{String(item.id).padStart(2, '0')}</span>
                        <span className="tp-portfolio-meta-arrow">
                          <svg width="42" height="13" viewBox="0 0 42 13" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.4889 1L41 6.33338L35.4889 11.6667" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M0.999998 6.33179H41" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <div className="tp-portfolio-meta-hover">
                          <span>{item.category}</span>
                          <span className="tp-portfolio-meta-link">View Project</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioArea;
