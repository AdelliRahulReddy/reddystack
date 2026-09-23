import React from 'react';
import ServicePageHero from './ServicePageHero';
import ServiceInfoArea from './ServiceInfoArea';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderFour from '@/layouts/headers/HeaderFour';
import PriceAreaHomeOne from '../homes/home/PriceAreaHomeOne';
import ServiceAreaHomeThree from './ServiceAreaHomeThree';
import TestimonialAreaHomeOne from '../homes/home/TestimonialAreaHomeOne';


const Service = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <ServicePageHero />
            <ServiceAreaHomeThree /> {/* Restored original 'Our Process' design */}
            <ServiceInfoArea />
            <TestimonialAreaHomeOne style={true} />
            <PriceAreaHomeOne style={true} />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default Service;
