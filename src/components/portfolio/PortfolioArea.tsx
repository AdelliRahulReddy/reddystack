'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { portfolioProjects } from '@/data/PortfolioProjectsData';

const PortfolioArea = () => {
  const firstColumnProjects = portfolioProjects.slice(0, 3);
  const secondColumnProjects = portfolioProjects.slice(3);

  return (
    <div className="porfolio-inner__thumb-wrapper tp-portfolio-effect portfolio-list-scroll-text-animation p-relative fix  black-bg-3 pt-80 pb-50"
      data-scrub="0.0001">
      <div className="portfolio-list-scroll-text pb-80 d-flex align-items-center">
        <p>All Projects</p>
        <p>All Projects</p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="service-details__banner-text mb-80 text-center">
              <p>
                Reddystack projects cover founder websites, service landing pages, developer tools,
                restaurant websites, automation experiments, and MVP-style product builds. Each case
                study is selected to show how the work moves from positioning and scope into a usable
                digital experience with clearer messaging, responsive execution, and a direct path to
                inquiry or product use. The portfolio is intentionally practical: fewer showcase claims,
                more examples of structure, clarity, and launch-ready delivery. Some projects are client-facing
                websites, while others are internal product experiments that show how Reddystack thinks through
                utility, automation, and first-version product scope. The common thread is simple: make the offer
                easier to understand, make the interface easier to use, and keep the build aligned with a real
                business or workflow goal.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="service-details__banner-text mb-80 text-center">
              <p>
                The work here is not limited to one category. Some builds are designed to help founders explain their
                offer quickly, some support small business visibility, and some explore internal tools or automation
                paths that reduce repeated manual effort. Each project is kept close to its business context so the
                final page or product can be judged by clarity, usability, and whether it helps someone take the next
                useful action.
              </p>
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
