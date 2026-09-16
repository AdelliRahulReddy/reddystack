import React from 'react';
import Link from 'next/link';

import type { PortfolioProject } from '@/data/PortfolioProjectsData';
import { getServiceDetail } from '@/data/ServiceDetailData';

type PortfolioAboutAreaProps = {
  project: PortfolioProject;
};

const relatedServiceByProjectSlug = {
  'kalyamram': 'seo-websites',
  'multi-format-converter': 'applications',
  'telegram-auto-reply-bot': 'ai-automations',
  'gitwall-app': 'applications',
  'reelsxpress': 'seo-websites',
  'bachelor-brother': 'seo-websites',
} as const;

const PortfolioAboutArea = ({ project }: PortfolioAboutAreaProps) => {
  const relatedServiceSlug = relatedServiceByProjectSlug[project.slug as keyof typeof relatedServiceByProjectSlug];
  const relatedService = relatedServiceSlug ? getServiceDetail(relatedServiceSlug) : undefined;

  return (
    <div id="porfolio-details" className="porfolio-details__info-wrap black-bg-3 pt-120 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-4">
            <div className="porfolio-details__left-info">
              <div className="porfolio-details__left-content">
                <h4 className="porfolio-details__left-info-title">Project type</h4>
                <span>{project.client}</span>
              </div>
              <div className="porfolio-details__left-content">
                <h4 className="porfolio-details__left-info-title">Role in project</h4>
                <span>{project.role}</span>
              </div>
              <div className="porfolio-details__left-content">
                <h4 className="porfolio-details__left-info-title mb-20">Services</h4>
                {project.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <div className="porfolio-details__left-content">
                <h4 className="porfolio-details__left-info-title">Year</h4>
                <span>{project.year}</span>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-8">
            <div className="porfolio-details__right-info">
              <div className="porfolio-details__right-title-box">
                <span className="tp-section-subtitle-4 mb-20">ABOUT THE PROJECT</span>
                <h4 className="tp-section-title-4 mb-35">{project.aboutTitle}</h4>
                {project.aboutDescription.map((paragraph, index) => (
                  <p key={`${project.slug}-about-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="porfolio-details__right-btn">
                <Link className="tp-btn-border-md" href={project.ctaHref}>
                  {project.ctaLabel}
                  <span>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 10L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1H10V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
              {relatedService && (
                <div className="porfolio-details__right-btn pt-20">
                  <Link className="tp-btn-border-md" href={relatedService.path}>
                    Explore {relatedService.title}
                    <span>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 10L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1H10V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAboutArea;
