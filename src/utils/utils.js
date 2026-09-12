

export const animationCreate = () => {
    if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        import("wowjs").then((module) => {
            const WOW = module.default;
            new WOW.WOW({ live: false }).init()
        });
    }
};

