import { gsap } from "gsap";

// Keep the page's main heading visible from the server-rendered first paint.
const TITLE_SELECTOR = ".tp_title_anim:not(h1)";
const TEXT_SELECTOR = ".tp_text_anim p";
const SPLIT_TEXT_SELECTOR = ".tp-split-text";

function createScrollTrigger(element) {
  return {
    trigger: element,
    start: "top 90%",
    end: "bottom 60%",
    scrub: false,
    markers: false,
    toggleActions: "play none none none",
  };
}

function killAnimation(animation) {
  animation?.scrollTrigger?.kill();
  animation?.kill?.();
}

function createReveal(element, options = {}) {
  return gsap.from(element, {
    opacity: 0,
    x: options.fromX ?? 0,
    y: options.fromY ?? 30,
    duration: options.duration ?? 0.9,
    delay: options.delay ?? 0,
    ease: options.ease ?? "power3.out",
    force3D: true,
    scrollTrigger: createScrollTrigger(element),
  });
}

function createCharacterReveal(element) {
  const options = {
    fromX: 0,
    fromY: 50,
    duration: 0.8,
  };

  if (element.classList.contains("tp-split-in-right")) {
    options.fromX = 50;
    options.fromY = 0;
  }

  if (element.classList.contains("tp-split-in-left")) {
    options.fromX = -50;
    options.fromY = 0;
  }

  if (element.classList.contains("tp-split-in-up")) {
    options.fromY = 80;
  }

  if (element.classList.contains("tp-split-in-down")) {
    options.fromY = -80;
  }

  return createReveal(element, options);
}

const animationTitle = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const cleanups = [];

  document.querySelectorAll(TITLE_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement) || !node.isConnected) {
      return;
    }

    const animation = createReveal(node, { delay: 0.3 });
    cleanups.push(() => {
      killAnimation(animation);
    });
  });

  document.querySelectorAll(TEXT_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement) || !node.isConnected) {
      return;
    }

    const animation = createReveal(node, { delay: 0.7 });
    cleanups.push(() => {
      killAnimation(animation);
    });
  });

  const projectArea = document.querySelector(".tp-project-5-2-area");
  const projectTitle = document.querySelector(".tp-project-5-2-title");

  if (projectArea && projectTitle) {
    const projectAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: projectArea,
        start: "top center-=350",
        end: "bottom 150%",
        pin: ".tp-project-5-2-title",
        markers: false,
        pinSpacing: false,
        scrub: 1,
      },
    });

    projectAnimation
      .set(projectTitle, {
        scale: 0.6,
        duration: 2,
      })
      .to(projectTitle, {
        scale: 1,
        duration: 2,
      })
      .to(
        projectTitle,
        {
          scale: 1,
          duration: 2,
        },
        "+=2"
      );

    cleanups.push(() => {
      killAnimation(projectAnimation);
    });
  }

  document.querySelectorAll(SPLIT_TEXT_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement) || !node.isConnected) {
      return;
    }

    const animation = createCharacterReveal(node);
    cleanups.push(() => {
      killAnimation(animation);
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
};

export default animationTitle;
