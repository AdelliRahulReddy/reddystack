
import React from 'react';
import Image from 'next/image';
import MobileMenus from '@/layouts/headers/menu/mobile-menus';
import BrandLockup from '@/components/common/BrandLockup';
import InstagramIcon from '@/svg/icons/InstagramIcon';
import Linkedin from '@/svg/icons/Linkedin';
import TelegramIcon from '@/svg/icons/TelegramIcon';
import XIcon from '@/svg/icons/XIcon';

import bg_shape from "@/assets/img/offcanvas/bg-shape-3.png";
import { siteConfig } from '@/data/siteConfig';
import useMenuDialog from '@/hooks/useMenuDialog';

type Offcanvas2Props = {
  showCanvas: boolean;
  setShowCanvas: (showCanvas: boolean) => void;
};

const Offcanvas2 = ({ showCanvas, setShowCanvas }: Offcanvas2Props) => {
  const dialogRef = useMenuDialog(showCanvas);
  return (
    <>
      <dialog ref={dialogRef} id="site-menu" aria-label="Site menu" tabIndex={-1}
        onCancel={(event) => { event.preventDefault(); setShowCanvas(false); }}
        onClickCapture={(event) => { if ((event.target as Element).closest('a[href]')) setShowCanvas(false); }}
        className={`tp-offcanvas-area-2 tp-menu-2 ${showCanvas ? 'opened' : ''}`}>
        <div className="tp-offcanvas-shape">
          <Image className="tp-offcanvas-shape-2" src={bg_shape} alt="" />
        </div>
        <div className="tp-offcanvas-circle-1">
          <span></span>
        </div>
        <div className="tp-offcanvas-circle-2">
          <span></span>
        </div>
        <div className="tp-offcanvas-wrapper">
          <div className="tp-offcanvas-top-2 d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo-2">
              <BrandLockup className="logo-white" textColor="var(--tp-common-white)" />
              <BrandLockup className="logo-black" textColor="var(--tp-common-black-5)" />
            </div>
            <div className="tp-offcanvas-close-2">
              <button type="button" aria-label="Close menu" className="tp-offcanvas-close-btn-2 tp-offcanvas-open-btn-2" onClick={() => setShowCanvas(false)}>
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="tp-offcanvas-main-2">
            <div className="tp-offcanvas-content-2">
              <h3 className="tp-offcanvas-content-title-2">Let&apos;s Grow Your Business.</h3>
              <p>ReddyStack helps small businesses and growing brands attract customers through ads, creative content, websites, and SEO.</p>
            </div>
            <div className="tp-main-menu-mobile d-xl-none">
              <nav>
                <MobileMenus />
              </nav>
            </div>
            <div className="tp-offcanvas-contact-2">
              <h3 className="tp-offcanvas-contact-title-2">Information</h3>

              <ul>
                <li><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a></li>
                <li><a href={siteConfig.socialLinks.email}>{siteConfig.email}</a></li>
                <li><a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">{siteConfig.location}</a></li>
              </ul>
            </div>
            <div className="tp-offcanvas-social-2">
              <h3 className="tp-offcanvas-contact-title-2">Follow Us</h3>
              <ul>
                <li>
                  <a href={siteConfig.socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a href={siteConfig.socialLinks.x} aria-label="X" target="_blank" rel="noreferrer">
                    <XIcon />
                  </a>
                </li>
                <li>
                  <a href={siteConfig.socialLinks.telegram} aria-label="Telegram" target="_blank" rel="noreferrer">
                    <TelegramIcon />
                  </a>
                </li>
                <li>
                  <a href={siteConfig.socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <Linkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Offcanvas2;
