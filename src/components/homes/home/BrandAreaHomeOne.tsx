'use client';
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

const delivery_labels = [
  'Founder-Led',
  'Fast Delivery',
  'SEO-Ready',
  'AI-Assisted',
  'Launch Support',
  'Founder-Led',
  'Fast Delivery',
  'SEO-Ready',
  'AI-Assisted',
  'Launch Support',
];

const BrandAreaHomeOne = () => {
  return (
    <>
      <section className="tp-brand-area p-relative">
        <span className="tp-brand-border transition-3"></span>
        <div className="container container-large">
          <div className="tp-brand-inner p-relative">
            <span className="tp-brand-inner-border left tp-vertical-line"></span>
            <span className="tp-brand-inner-border right tp-vertical-line"></span>

            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-5">
                <h2 className="tp-brand-title">How Reddystack <br /> Delivers</h2>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-7">
                <div className="tp-brand-slider">
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    loop={false}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                      1200: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                      },
                    }}
                    className="tp-brand-slider-active swiper-container">
                    {delivery_labels.map((item, index) => (
                      <SwiperSlide key={index} className="swiper-wrapper align-items-center">
                        <div className="tp-brand-item swiper-slide text-end">
                          <span className="tp-brand-item-text">{item}</span>
                        </div>
                      </SwiperSlide>
                    ))}

                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandAreaHomeOne;
