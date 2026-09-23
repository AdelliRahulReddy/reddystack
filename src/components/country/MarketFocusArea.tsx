import type { MarketFocusContent } from "@/data/MarketPageData";

type MarketFocusAreaProps = {
  marketName: string;
  focus: MarketFocusContent;
};

export default function MarketFocusArea({ marketName, focus }: MarketFocusAreaProps) {
  return (
    <section className="tp-about-area tp-market-focus-area fix" aria-labelledby="market-focus-title">
      <div className="container container-large">
        <div className="tp-about-inner pt-110 pb-80 p-relative z-index-1">
          <span className="tp-about-inner-border transition-3" aria-hidden="true" />
          <div className="row justify-content-center mb-45">
            <div className="col-xl-9 col-lg-10">
              <div className="tp-section-title-wrapper p-relative text-center mb-25">
                <span className="tp-section-subtitle">{focus.eyebrow}</span>
                <h2 id="market-focus-title" className="tp-section-title tp-market-focus-title tp_title_anim">
                  {focus.title}
                </h2>
                <p className="tp-market-focus-intro mx-auto mb-0">{focus.intro}</p>
              </div>
            </div>
          </div>

          <div className="row">
            {focus.items.map((item, index) => (
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30" key={item.title}>
                <article className="tp-market-focus-card">
                  <div className="tp-market-focus-card-label">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{marketName}</span>
                  </div>
                  <h3 className="tp-market-focus-card-title">{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
