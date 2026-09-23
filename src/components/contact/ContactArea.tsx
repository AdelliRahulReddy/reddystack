'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import founderPortrait from "@/assets/img/hero/ab-hero-1.jpg";
import brandLogo from "@/assets/img/logo/reddystack-symbol.svg";
import ContactForm from '../forms/ContactForm';
import { siteConfig } from '@/data/siteConfig';
import { contactCategories } from '@/data/contactOptions';


interface DataType {
  subtitle: string;
  title_1: string;
  title_2: string;
  email: string;
  mail_text: React.JSX.Element;
}


const contact_content: DataType = {
  subtitle: "Start Here",
  title_1: "Bring One",
  title_2: "Growth Problem",
  email: siteConfig.email,
  mail_text: <>Share the business problem, website or product link, desired outcome, what has already been tried, and any budget or deadline boundary. You do not need to diagnose the channel first. Rahul will review whether the next step should be a Proof Sprint, connected Stack Build, ongoing improvement, or no engagement yet. An enquiry does not automatically start paid work. Keep passwords, payment details, and private customer records out of the form.</>,
}

const {
  subtitle,
  title_1,
  title_2,
  email,
  mail_text,
} = contact_content


const ContactArea = ({ initialService, sourcePage }: { initialService: string; sourcePage: string }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(() => {
    const serviceId = ['applications', 'mvp-builds', 'ai-automations'].includes(initialService) ? 'additional' : initialService;
    const index = contactCategories.findIndex((category) => category.id === serviceId);
    return index < 0 ? [] : [index];
  });

  // Function to toggle the selection of a category
  const toggleSelection = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const selectedCategoryTitles = selectedCategories.flatMap((index) => {
    const category = contactCategories[index];
    return category ? [category.title] : [];
  });


  return (
    <>
      <div className="contact-inner__area contact-inner__ptb rs-contact-page p-relative black-bg-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11 offset-xl-1">
              <div className="row align-items-center">
                <div className="col-xl-9 col-lg-10">
                  <div className="contact-inner__top-section-title-box mb-70">
                    <span className="contact-inner__subtitle">{subtitle}</span>
                    <h1 className="contact-inner__title tp-char-animation tp-hero-3__content">{title_1} {' '}
                      <span><Image src={founderPortrait} width={190} height={90} style={{ objectFit: 'cover', objectPosition: 'center 30%' }} alt="Rahul Reddy, founder of ReddyStack" /></span> <br />
                      {title_2}
                    </h1>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 d-none d-lg-block text-end">
                  <div className="contact-inner__shape-1 text-center text-lg-end">
                    <Image src={brandLogo} width={160} height={160} alt="ReddyStack logo" />
                  </div>
                </div>
              </div>
              <div className="contact-inner__mail-box mb-90">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="contact-inner__mail-info">
                      <span>Email Us:</span>
                      <a href={`mailto:${email}`}>{email}</a>
                      <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="contact-inner__mail-text">
                      <p>{mail_text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="contact-inner__category mb-85">
                  <h4 className="contact-inner__category-title">Where should we begin?</h4>
                  <div className="contact-inner__category-wrapper">
                    {contactCategories.map((item, index) => (
                      <button key={index} type="button"
                        aria-pressed={selectedCategories.includes(index)}
                        onClick={() => toggleSelection(index)}
                        className={`contact-category-btn ${selectedCategories.includes(index) ? 'active' : ''}`}>
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ContactForm selectedCategories={selectedCategoryTitles} sourcePage={sourcePage} />
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactArea;
