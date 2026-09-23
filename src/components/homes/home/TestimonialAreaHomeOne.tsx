'use client'
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
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
    initials: string;
    name: string;
    designation: string;
    company: string;
  }[];
}


const testimonial_content: DataType = {
  subtitle: "The ReddyStack Method",
  title: "Diagnose. Build. Prove. Scale.",
  info: "Four clear steps, from the first problem to the next decision.",
  testimonial_slider_data: [
    {
      id: 1,
      rating_text: "01 · Diagnose",
      description: 'Set a goal, review the current setup, and find the main bottleneck.',
    },
    {
      id: 2,
      rating_text: "02 · Build",
      description: 'Build only what is needed, with clear scope, costs, and responsibilities.',
    },
    {
      id: 3,
      rating_text: "03 · Prove",
      description: 'Measure the agreed work, share the evidence, and explain what it means.',
    },
    {
      id: 4,
      rating_text: "04 · Scale",
      description: 'Use the results to decide what to improve, grow, or stop.',
    },
  ],
  testimonial_nav_data: [
    {
      id: 1,
      initials: "01",
      name: "Diagnose",
      designation: "Problem and",
      company: "baseline",
    },
    {
      id: 2,
      initials: "02",
      name: "Build",
      designation: "Connected",
      company: "scope",
    },
    {
      id: 3,
      initials: "03",
      name: "Prove",
      designation: "Evidence and",
      company: "learning",
    },
    {
      id: 4,
      initials: "04",
      name: "Scale",
      designation: "Next",
      company: "decision",
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

  const bg_img = style ? undefined : 'url(/assets/img/bg/distort-bg.png)'

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
      <section id="method" ref={sectionRef} style={{ backgroundImage: bg_img }} className={`tp-testimonial-area ${style ? 'sv-inner__customize pb-160 black-bg-3' : 'theme-bg tp-bg-light pb-80'} pt-25`}>
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
                        <div className="tp-testimonial-item-top d-flex align-items-center">


                          <p>{item.rating_text}</p>
                        </div>
                        <div className="tp-testimonial-content">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>



                <div className="d-flex justify-content-center gap-3 mt-30">
                  <button type="button" className="tp-btn-border-sm" onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous delivery step">Previous</button>
                  <button type="button" className="tp-btn-border-sm" onClick={() => sliderRef.current?.slickNext()} aria-label="Next delivery step">Next</button>
                </div>
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
                          <div className="tp-testimonial-user-thumb d-flex align-items-center justify-content-center rounded-circle theme-bg-2" aria-hidden="true">
                            <span className="tp-testimonial-user-title mb-0">{item.initials}</span>
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
