'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import contact_img from "@/assets/img/contact/contact.jpg";
import contact_flower_img_1 from "@/assets/img/contact/contact-flower.png";
import contact_flower_img_2 from "@/assets/img/contact/contact-flower-text.png";
import ContactForm from '../forms/ContactForm';
import { siteConfig } from '@/data/siteConfig';


interface DataType {
  subtitle: string;
  title_1: string;
  title_2: string;
  email: string;
  mail_text: React.JSX.Element;
  categorys: {
    id: string;
    title: string;
  }[];
}


const contact_content: DataType = {
  subtitle: "Contact Us",
  title_1: "Let’s Talk",
  title_2: "About your Project",
  email: siteConfig.email,
  mail_text: <>Tell us about your business, the service you need, and your goal. Use the form below or message us on WhatsApp to discuss the scope.</>,
  categorys: [
  {
    "id": "meta-ads",
    "title": "Meta Ads"
  },
  {
    "id": "google-ads",
    "title": "Google Ads"
  },
  {
    "id": "ad-creatives",
    "title": "Ad Creatives"
  },
  {
    "id": "ai-ugc-videos",
    "title": "AI UGC-Style Videos"
  },
  {
    "id": "seo-websites",
    "title": "Website Development"
  },
  {
    "id": "seo-local-seo",
    "title": "SEO & Local SEO"
  },
  {
    "id": "additional",
    "title": "Apps, MVPs & Automation"
  },
  {
    "id": "not_sure",
    "title": "Not sure yet"
  }
],
}

const {
  subtitle,
  title_1,
  title_2,
  email,
  mail_text,
  categorys,
} = contact_content


const ContactArea = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Function to toggle the selection of a category
  const toggleSelection = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const selectedCategoryTitles = selectedCategories
    .map((index) => categorys[index]?.title)
    .filter((value): value is string => Boolean(value));


  return (
    <>
      <div className="contact-inner__area contact-inner__ptb p-relative black-bg-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11 offset-xl-1">
              <div className="row align-items-center">
                <div className="col-xl-9 col-lg-10">
                  <div className="contact-inner__top-section-title-box mb-70">
                    <span className="contact-inner__subtitle">{subtitle}</span>
                    <h1 className="contact-inner__title tp-char-animation tp-hero-3__content">{title_1} {' '}
                      <span><Image src={contact_img} alt="Reddystack project inquiry" /></span> <br />
                      {title_2}
                    </h1>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 d-none d-sm-block text-end">
                  <div className="contact-inner__shape-1 text-center text-lg-end">
                    <Image className="flower-img" src={contact_flower_img_1} alt="" />
                    <Image className="flower-text" src={contact_flower_img_2} alt="" />
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
                  <h4 className="contact-inner__category-title">I&apos;m interested in...</h4>
                  <div className="contact-inner__category-wrapper">
                    {categorys.map((item, index) => (
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
            <ContactForm selectedCategories={selectedCategoryTitles} />
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactArea;
