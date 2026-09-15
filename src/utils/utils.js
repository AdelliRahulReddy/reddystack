

export const animationCreate = () => {
    let disposed = false;
    let animation;
    if (typeof window !== "undefined" && document.querySelector('.wow') && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        import("wowjs").then((module) => {
            if (disposed) return;
            const WOW = module.default;
            animation = new WOW.WOW({ live: false });
            animation.init();
        });
    }
    return () => { disposed = true; animation?.stop(); };
};

