import React from 'react';
import HeaderFour from '@/layouts/headers/HeaderFour';
import HeroPortfolioDetailsArea from './HeroPortfolioDetailsArea';
import PortfolioAboutArea from './PortfolioAboutArea';
import PortfolioDetailsArea from './PortfolioDetailsArea';
import FooterOne from '@/layouts/footers/FooterOne';
import type { PortfolioProject } from '@/data/PortfolioProjectsData';

type PortfolioDetailsProps = {
  project: PortfolioProject;
  previousProject: PortfolioProject;
  nextProject: PortfolioProject;
};

const PortfolioDetails = ({
  project,
  previousProject,
  nextProject,
}: PortfolioDetailsProps) => {
  return (
    <>
      <HeaderFour style={true} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <HeroPortfolioDetailsArea project={project} />
            <PortfolioAboutArea project={project} />
            <PortfolioDetailsArea
              project={project}
              previousProject={previousProject}
              nextProject={nextProject}
            />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default PortfolioDetails;
