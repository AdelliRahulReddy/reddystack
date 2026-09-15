"use client";
import { type ReactNode, useEffect, useRef } from "react";
import { animationCreate } from "@/utils/utils";
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
import { scrollTextAnimation } from "@/utils/scrollTextAnimation";
import textInvert from "@/utils/textInvert";
import ContextProvider from "@/context/app-context";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const smootherRef = useRef<{ kill: () => void; scrollTo: (position: number, smooth: boolean) => void } | null>(null);

  useEffect(() => {
    void import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mm = gsap.matchMedia();
      // Small screens already use native scrolling; skip the extra layout work.
      mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
        let disposed = false;
        let smoother: typeof smootherRef.current = null;
        import("@/plugins").then(({ ScrollSmoother }) => {
          if (disposed) return;
          gsap.registerPlugin(ScrollSmoother);
          smoother = ScrollSmoother.create({
            smooth: 1.35,
            effects: true,
            smoothTouch: false,
            normalizeScroll: false,
            ignoreMobileResize: true,
          });
          smootherRef.current = smoother;
        }).catch(error => {
          if (!disposed) console.error('Could not load smooth scrolling', error);
        });
        return () => { disposed = true; smoother?.kill(); smootherRef.current = null; };
      });
      return () => mm.revert();
    }
  }, [pathname]);

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
      smootherRef.current?.scrollTo(0, false);
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
      media.add('(prefers-reduced-motion: no-preference)', (context) => {
        const wowCleanup = animationCreate();
        let disposed = false;
        const throwableCleanups: (() => void)[] = [];
        const observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            import('@/utils/throwableAnimation').then(({ throwableAnimation }) => {
              if (disposed || !entry.target.isConnected) return;
              context.add(() => {
                const cleanup = throwableAnimation(entry.target);
                if (cleanup) throwableCleanups.push(cleanup);
              });
            }).catch(error => {
              if (!disposed) console.error('Could not load the capsule animation', error);
            });
          }
        }, { rootMargin: '50px' });
        document.querySelectorAll('[data-tp-throwable-scene]').forEach(scene => observer.observe(scene));
        servicesPanel();
        PortfolioPanel();
        blogAnimation();
        linesAnimation();
        const scrollTextCleanup = scrollTextAnimation();
        const textInvertCleanup = textInvert();

        const titleCleanup = animationTitle();
        const charCleanup = animationTitleChar();

        const cleanups = [wowCleanup, titleCleanup, charCleanup, textInvertCleanup, scrollTextCleanup].filter(
          (cleanup): cleanup is () => void => typeof cleanup === "function"
        );
        return () => {
          disposed = true;
          observer.disconnect();
          throwableCleanups.forEach(cleanup => cleanup());
          cleanups.forEach(cleanup => cleanup());
        };
      });
      media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', context => {
        let disposed = false;
        let cleanup: (() => void) | undefined;
        import('@/utils/buttonAnimation').then(({ buttonAnimation }) => {
          if (!disposed) context.add(() => { cleanup = buttonAnimation(); });
        }).catch(error => {
          if (!disposed) console.error('Could not load button effects', error);
        });
        return () => { disposed = true; cleanup?.(); };
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
