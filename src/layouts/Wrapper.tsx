"use client";
import { type ReactNode, useEffect } from "react";
import { animationCreate } from "@/utils/utils";
import { throwableAnimation } from "@/utils/throwableAnimation";
import ScrollToTop from "@/components/common/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import animationTitle from "@/utils/animationTitle";
import animationTitleChar from "@/utils/animationTitleChar";
import servicesPanel from "@/utils/servicesPanel";
import PortfolioPanel from "@/utils/PortfolioPanel";
import blogAnimation from "@/utils/blogAnimation";
import linesAnimation from "@/utils/linesAnimation";
import { buttonAnimation } from "@/utils/buttonAnimation";
import { scrollTextAnimation } from "@/utils/scrollTextAnimation";
import textInvert from "@/utils/textInvert";
import ContextProvider from "@/context/app-context";

import { ScrollSmoother } from "@/plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    void import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    // animation
    let cleanup: (() => void) | undefined;
    const timer = setTimeout(() => {
      cleanup = animationCreate();
    }, 100);

    return () => { clearTimeout(timer); cleanup?.(); };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const mm = gsap.matchMedia();
      // Small screens already use native scrolling; skip the extra layout work.
      mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
        const smoother = ScrollSmoother.create({
          smooth: 1.35,
          effects: true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
        return () => smoother?.kill();
      });
      return () => mm.revert();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resetScrollPosition = () => {
      const smoother = ScrollSmoother.get();
      smoother?.scrollTo(0, false);
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    const frameId = window.requestAnimationFrame(resetScrollPosition);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    // sticky section
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1199px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ".tp-port-3-area",
          start: "top -60%",
          end: "bottom 120%",
          pin: ".tp-port-3-content-left",
          pinSpacing: false,
        });
      });

      return () => {
        mm.revert();
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let media: ReturnType<typeof gsap.matchMedia> | undefined;

    const frameId = window.requestAnimationFrame(() => {
      media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const throwableCleanup = throwableAnimation();
        servicesPanel();
        PortfolioPanel();
        blogAnimation();
        linesAnimation();
        const buttonCleanup = buttonAnimation();
        const scrollTextCleanup = scrollTextAnimation();
        const textInvertCleanup = textInvert();

        const titleCleanup = animationTitle();
        const charCleanup = animationTitleChar();

        const cleanups = [throwableCleanup, buttonCleanup, titleCleanup, charCleanup, textInvertCleanup, scrollTextCleanup].filter(
          (cleanup): cleanup is () => void => typeof cleanup === "function"
        );
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      media?.revert();
    };
  }, [pathname]);

  return (
    <ContextProvider>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {children}
      <ToastContainer position="top-right" />
      <ScrollToTop />
    </ContextProvider>
  );
};

export default Wrapper;
