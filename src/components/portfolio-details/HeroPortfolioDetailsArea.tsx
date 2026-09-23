'use client';
import React from 'react';
import { scroller } from 'react-scroll';

import PortfolioDownArrowIcon from '@/svg/icons/PortfolioDownArrowIcon';
import type { PortfolioProject } from '@/data/PortfolioProjectsData';

const scrollTo = () => {
  scroller.scrollTo('porfolio-details', {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
  });
};

type HeroPortfolioDetailsAreaProps = {
  project: PortfolioProject;
};

const HeroPortfolioDetailsArea = ({ project }: HeroPortfolioDetailsAreaProps) => {
  return (
    <div className="porfolio-details__area porfolio-details__color-customize rs-project-detail-hero p-relative smooth black-bg-3">
      <a className="pointer" onClick={scrollTo}>
        <div className="tp-hero-3__scrool-down z-index-5">
          <span className="text">Scroll</span>
          <PortfolioDownArrowIcon />
        </div>
      </a>
      <div className="container">
        <div className="portfolio-details__hero-copy">
          <div className="row align-items-end">
            <div className="col-xl-8 col-lg-8">
              <div className="portfolio-details__hero-main">
                <span className="tp-section-subtitle-4 mb-20 d-inline-block">{project.category}</span>
                <h1 className="tp-section-title-4 portfolio-details__hero-title">{project.title}</h1>
                <p className="portfolio-details__hero-text">{project.heroDescription}</p>
                <div className="portfolio-details__hero-meta">
                  <div className="portfolio-details__hero-meta-item">
                    <span className="label">Project type</span>
                    <span className="value">{project.client}</span>
                  </div>
                  <div className="portfolio-details__hero-meta-item">
                    <span className="label">Category</span>
                    <span className="value">{project.category}</span>
                  </div>
                  <div className="portfolio-details__hero-meta-item">
                    <span className="label">Year</span>
                    <span className="value">{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="portfolio-details__hero-stats">
                {project.heroStats.map((stat) => (
                  <div key={`${project.slug}-${stat.label}`} className="portfolio-details__hero-stat">
                    <span className="value">{stat.value}</span>
                    <span className="label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPortfolioDetailsArea;
