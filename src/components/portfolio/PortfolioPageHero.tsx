import Link from 'next/link';
import { portfolioProjects } from '@/data/PortfolioProjectsData';

const PortfolioPageHero = () => (
  <section className="rs-page-hero rs-portfolio-hero">
    <div className="container">
      <div className="rs-page-crumb"><Link href="/">Home</Link><span>/</span><span>Work</span></div>
      <div className="rs-portfolio-hero-grid">
        <div>
          <span className="rs-page-eyebrow">SELECTED BUILDS / TRANSPARENT PROOF</span>
          <h1>Work you can<br /><i>inspect clearly.</i></h1>
          <p>See what was built, the decisions behind it, and what has—and has not—been measured. These projects are personal and demo builds, not invented client case studies.</p>
          <div className="rs-page-actions">
            <a className="rs-action-primary" href="#portfolio-projects">Explore the builds <span aria-hidden="true">↓</span></a>
            <Link className="rs-action-secondary" href="/contact">Discuss your project</Link>
          </div>
        </div>
        <div className="rs-proof-card">
          <div className="rs-proof-card-top"><span>WORK INDEX</span><span>2026 / LIVE</span></div>
          <strong>{String(portfolioProjects.length).padStart(2, '0')}</strong>
          <span>PERSONAL & DEMO BUILDS</span>
          <div className="rs-proof-rule"><i /></div>
          <p>Real outputs. Clear roles. Honest limits.</p>
          <small>CLIENT RESULTS ARE SHARED ONLY WHEN VERIFIED AND APPROVED.</small>
        </div>
      </div>
    </div>
  </section>
);

export default PortfolioPageHero;
