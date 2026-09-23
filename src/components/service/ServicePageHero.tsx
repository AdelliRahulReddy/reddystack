import Link from 'next/link';

const capabilities = [
  ['01', 'Digital foundations', 'Websites, landing pages, products'],
  ['02', 'Search visibility', 'Technical, local and content SEO'],
  ['03', 'Paid acquisition', 'Campaigns built to test demand'],
  ['04', 'Creative testing', 'Useful messages, measured fairly'],
  ['05', 'Tracking & analytics', 'Know what is happening'],
  ['06', 'Automation & products', 'Connected tools and workflows'],
];

const ServicePageHero = () => (
  <section className="rs-page-hero rs-service-hero">
    <div className="container">
      <div className="rs-page-crumb"><Link href="/">Home</Link><span>/</span><span>Capabilities</span></div>
      <div className="rs-service-hero-grid">
        <div className="rs-service-hero-copy">
          <span className="rs-page-eyebrow">CONNECTED CAPABILITIES / ONE CLEAR GOAL</span>
          <h1>Build the stack<br /><i>the problem needs.</i></h1>
          <p>Start with one business problem. Connect only the digital capabilities needed to address it, then use evidence to choose the next step.</p>
          <div className="rs-page-actions">
            <Link className="rs-action-primary" href="/contact">Tell Rahul what is stuck <span aria-hidden="true">↗</span></Link>
            <Link className="rs-action-secondary" href="/pricing">See ways to work</Link>
          </div>
        </div>
        <div className="rs-capability-map" aria-label="ReddyStack capability overview">
          <div className="rs-capability-map-head"><span><i /> GROWTH STACK</span><span>01 — 06</span></div>
          <div className="rs-capability-list">
            {capabilities.map(([number, title, detail]) => (
              <div className="rs-capability-row" key={number}>
                <span className="rs-capability-number">{number}</span>
                <span className="rs-capability-copy"><strong>{title}</strong><small>{detail}</small></span>
                <span className="rs-capability-mark" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
          <div className="rs-capability-map-foot"><span>ONE ACCOUNTABLE LEAD</span><span>PROOF BEFORE SCALE</span></div>
        </div>
      </div>
    </div>
  </section>
);

export default ServicePageHero;
