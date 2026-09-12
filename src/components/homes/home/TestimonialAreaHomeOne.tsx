'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';
import quote from "@/assets/img/testimonial/quote.svg";

import user_avatar_1 from "@/assets/img/users/user-1.jpg";
import user_avatar_2 from "@/assets/img/users/avata-1.png";
import user_avatar_3 from "@/assets/img/users/avata-2.png";
import user_avatar_4 from "@/assets/img/users/avata-3.png";

import StartIcon from '@/svg/icons/StartIcon';
import { gsap } from 'gsap';



interface DataType {
  subtitle: string;
  title: string;
  info: string;
  testimonial_slider_data: {
    id: number;
    rating_text: string;
    description: string;
  }[];
  testimonial_nav_data: {
    id: number;
    img: StaticImageData;
    name: string;
    designation: string;
    company: string;
  }[];
}


const testimonial_content: DataType = {
  subtitle: "Testimonials",
  title: "What my clients say",
  info: "Real feedback from people I've worked with.",
  testimonial_slider_data: [
    {
      id: 1,
      rating_text: "5.0 Rating",
      description: `"Reddystack built our entire website using AI tools without writing a single line of traditional code. The site is fast, SEO-optimized, and exactly what we envisioned."`,
    },
    {
      id: 2,
      rating_text: "5.0 Rating",
      description: `"We needed an MVP fast. Reddystack delivered a working prototype in under 2 weeks using an AI-powered approach. The execution speed and clarity were next level."`,
    },
    {
      id: 3,
      rating_text: "5.0 Rating",
      description: `"The workflow automations Reddystack set up saved us 10+ hours weekly. The team clearly understands how to leverage AI for real business impact."`,
    },
    {
      id: 4,
      rating_text: "5.0 Rating",
      description: `"Reddystack's prompt engineering and SEO strategy helped us rank on page one within months. It's not just a build service — it's thoughtful digital strategy."`,
    },
  ],
  testimonial_nav_data: [
    {
      id: 1,
      img: user_avatar_1,
      name: "Sarah Jenkins",
      designation: "Founder at",
      company: "GreenPulse",
    },
    {
      id: 2,
      img: user_avatar_2,
      name: "Mark Lewis",
      designation: "Product Lead at",
      company: "SkyFlow",
    },
    {
      id: 3,
      img: user_avatar_3,
      name: "Priya Kumar",
      designation: "Operations Manager at",
      company: "BrightOps",
    },
    {
      id: 4,
      img: user_avatar_4,
      name: "Dave Roberts",
      designation: "Marketing Director at",
      company: "TechEdge",
    },
  ]
}

const { subtitle, title, info, testimonial_slider_data, testimonial_nav_data } = testimonial_content


// slider a
const slider_a = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};
// slider b
const slider_b = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  centerMode: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "42px",
      },
    },
  ],
};


type TestimonialAreaHomeOneProps = {
  style?: boolean;
};

const TestimonialAreaHomeOne = ({ style }: TestimonialAreaHomeOneProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const bg_img = style ? null : "/assets/img/bg/distort-bg.png"

  useEffect(() => {
    const testimonialSection = sectionRef.current;
    if (!testimonialSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lineAnimations = Array.from(
      testimonialSection.querySelectorAll<HTMLElement>('.tp-testimonial-user-border')
    ).map((line) => {
      gsap.set(line, {
        width: 0
      });
      return gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          end: "bottom 80%",
          markers: false,
        },
        width: "100%"
      });
    });

    return () => {
      lineAnimations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [])


  const [slider1, setSlider1] = useState<Slider | null>(null);
  const [slider2, setSlider2] = useState<Slider | null>(null);
  const sliderRef = useRef<Slider | null>(null);


  return (
    <>
      <section ref={sectionRef} style={{ backgroundImage: `url(${bg_img})` }} className={`tp-testimonial-area ${style ? 'sv-inner__customize pb-160 black-bg-3' : 'theme-bg tp-bg-light pb-80'} pt-25`}>
        <div className="container">
          {style ? null :
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-testimonial-section-title">
                  <div className="tp-section-title-wrapper tp_text_anim mb-50 text-center">
                    <div className="tp-section-title-inner tp_title_anim p-relative">
                      <span className="tp-section-subtitle">{subtitle}</span>
                      <h3 className="tp-section-title">{title}</h3>
                    </div>
                    <p>{info}</p>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="row">
            <div className="col-xl-12">
              <div className="tp-testimonial-slider ml-70 mr-70">

                <Slider
                  {...slider_a}
                  asNavFor={slider2 as Slider}
                  ref={(slider) => {
                    setSlider1(slider);
                    sliderRef.current = slider;
                  }}
                  className="tp-testimonial-slider-active swiper-container"
                >
                  {testimonial_slider_data.map((item, i) => (
                    <div key={i} className="swiper-slide">
                      <div className="tp-testimonial-item theme-bg-2"
                        style={{ backgroundImage: 'url(/assets/img/testimonial/bg-distort.png)' }}>
                        <div className="tp-testimonial-quote">
                          <Image src={quote} alt="" />
                        </div>
                        <div className="tp-testimonial-item-top d-flex align-items-center">

                          <div className="tp-testimonial-rating">
                            <StartIcon />{' '}
                            <StartIcon />{' '}
                            <StartIcon />{' '}
                            <StartIcon />{' '}
                            <StartIcon />{' '}
                          </div>

                          <p>{item.rating_text}</p>
                        </div>
                        <div className="tp-testimonial-content">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>



                <div className="tp-testimonial-thumb-slider">

                  <Slider
                    {...slider_b}
                    asNavFor={slider1 as Slider}
                    ref={slider => {
                      setSlider2(slider);
                    }}
                    className="tp-testimonial-nav swiper-container"
                  >
                    {testimonial_nav_data.map((item, index) => (
                      <div key={index} className="swiper-slide">
                        <div
                          className="tp-testimonial-user-item d-flex justify-content-center align-items-center">
                          <div className="tp-testimonial-user-thumb">
                            <Image src={item.img} alt={`${item.name} testimonial`} />
                          </div>
                          <div className="tp-testimonial-user-content">
                            <h3 className="tp-testimonial-user-title">{item.name}</h3>
                            <span className="tp-testimonial-user-designation">{item.designation} <span>{item.company}</span></span>
                          </div>
                          <span className="tp-testimonial-user-border"></span>
                        </div>
                      </div>
                    ))}
                  </Slider>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialAreaHomeOne;
