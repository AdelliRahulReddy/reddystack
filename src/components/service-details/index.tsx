import React from 'react';
import HeaderFour from '@/layouts/headers/HeaderFour';
import FooterOne from '@/layouts/footers/FooterOne';

import NavigationArea from './NavigationArea';
import ServiceDetailsArea from './ServiceDetailsArea';
import ServiceFaqArea from './ServiceFaqArea';
import type { ServiceDetail } from '@/data/ServiceDetailData';

type ServiceDetailsProps = {
  service: ServiceDetail;
  previousService: ServiceDetail;
  nextService: ServiceDetail;
};

const ServiceDetails = ({ service, previousService, nextService }: ServiceDetailsProps) => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" className="rs-subpage" tabIndex={-1}>
            <ServiceDetailsArea service={service} />
            <ServiceFaqArea service={service} />
            <NavigationArea previousService={previousService} nextService={nextService} />
          </main>
          <FooterOne style={true} />
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
