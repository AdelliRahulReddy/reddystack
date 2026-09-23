import Link from 'next/link';
import BrandLockup from '@/components/common/BrandLockup';
import CountryChoiceLinks from '@/components/country/CountryChoiceLinks';
import { siteConfig } from '@/data/siteConfig';

const exploreLinks = [
  { title: 'Capabilities', href: '/service' },
  { title: 'Work', href: '/portfolio' },
  { title: 'About Rahul', href: '/about/rahul-reddy-adelli' },
  { title: 'Insights', href: '/blog' },
  { title: 'Ways to work', href: '/pricing' },
];

const legalLinks = [
  { title: 'Privacy', href: '/privacy-policy' },
  { title: 'Terms', href: '/terms' },
  { title: 'Revision policy', href: '/revision-policy' },
];

const SiteFooter = () => (
  <footer className="rs-site-footer">
    <div className="container">
      <div className="rs-footer-top">
        <div className="rs-footer-prompt">
          <span className="rs-page-eyebrow">HAVE A GROWTH CHALLENGE?</span>
          <h2>Bring one problem.<br /><i>Build the proof.</i></h2>
          <Link href="/contact" className="rs-footer-cta">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="rs-footer-brand">
          <BrandLockup textColor="var(--rs-paper)" />
          <p>Founder-led digital growth, built around your business problem.</p>
          <a className="rs-footer-location" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">Based in {siteConfig.location} ↗</a>
          <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
          <a href={siteConfig.socialLinks.email}>Email Rahul <span aria-hidden="true">↗</span></a>
          <div className="rs-footer-socials">
            <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={siteConfig.socialLinks.x} target="_blank" rel="noreferrer">X</a>
            <a href={siteConfig.socialLinks.telegram} target="_blank" rel="noreferrer">Telegram</a>
          </div>
        </div>
        <nav className="rs-footer-links" aria-label="Footer navigation">
          <span className="rs-page-eyebrow">EXPLORE</span>
          {exploreLinks.map((item) => <Link key={item.href} href={item.href}>{item.title}</Link>)}
        </nav>
      </div>
      <div className="rs-footer-lower">
        <span>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</span>
        <nav aria-label="Legal links">
          {legalLinks.map((item) => <Link key={item.href} href={item.href}>{item.title}</Link>)}
        </nav>
      </div>
      <CountryChoiceLinks />
    </div>
  </footer>
);

export default SiteFooter;
