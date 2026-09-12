"use client"
import UseSticky from "@/hooks/UseSticky";
import React from "react"; 

type style_type = {
  style?: boolean
}
const ScrollToTop = ({style}: style_type) => {
  const { sticky }: { sticky: boolean } = UseSticky();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <>

    <div className={`back-to-top-wrapper${style? "back_to_top-2" : ""} ${sticky && "back-to-top-btn-show" }`}>
      <button onClick={scrollTop} id="back_to_top" type="button" aria-label="Back to top" className="back-to-top-btn">
         <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6L6 1L1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
               strokeLinejoin="round" />
         </svg>
      </button>
   </div> 
    </>
  );
};

export default ScrollToTop;
