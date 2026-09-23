'use client'
import React from 'react';
import HeaderFour from '@/layouts/headers/HeaderFour';
import PortfolioPageHero from './PortfolioPageHero';
import PortfolioArea from './PortfolioArea';
import FooterOne from '@/layouts/footers/FooterOne';


const Portfolio = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <PortfolioPageHero />
            <PortfolioArea />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
