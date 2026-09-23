
import React from 'react';
import AboutInfo from './AboutInfo';
import FunfactArea from './FunfactArea';
import PersonalInfo from './PersonalInfo';
import HeroAreaAbout from './HeroAreaAbout';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderFour from '@/layouts/headers/HeaderFour';


const About = () => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper" className="black-bg-3">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <HeroAreaAbout />
            <AboutInfo />
            <PersonalInfo />
            <FunfactArea />
          </main>
          <FooterFour />
        </div>
      </div>
    </>
  );
};

export default About;
