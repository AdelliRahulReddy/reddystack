'use client'
import React from 'react';
import ContactArea from './ContactArea';
import HeaderFour from '@/layouts/headers/HeaderFour';
import FooterOne from '@/layouts/footers/FooterOne';



const Contact = ({ initialService, sourcePage }: { initialService: string; sourcePage: string }) => {
  return (
    <>
      <HeaderFour />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main-content" tabIndex={-1}>
            <ContactArea initialService={initialService} sourcePage={sourcePage} />
          </main>
          <FooterOne style={true} />
        </div>
      </div>

    </>
  );
};

export default Contact;
