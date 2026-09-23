
import React from 'react';
import Image from 'next/image';
import Shape from "@/assets/img/offcanvas/bg-shape-2.png"
import MobileMenus from '@/layouts/headers/menu/mobile-menus';
import { siteConfig } from '@/data/siteConfig';
import BrandLockup from './BrandLockup';
import useMenuDialog from '@/hooks/useMenuDialog';
import CountryChoiceLinks from '@/components/country/CountryChoiceLinks';

type OffcanvasProps = {
  showCanvas: boolean;
  setShowCanvas: (showCanvas: boolean) => void;
  style_bg?: boolean;
  style_bg2?: boolean;
};

const Offcanvas = ({ showCanvas, setShowCanvas, style_bg, style_bg2 }: OffcanvasProps) => {
  const dialogRef = useMenuDialog(showCanvas);
  return (
    <>
      <dialog ref={dialogRef} id="site-menu" aria-label="Site menu" tabIndex={-1}
        onCancel={(event) => { event.preventDefault(); setShowCanvas(false); }}
        onClickCapture={(event) => { if ((event.target as Element).closest('a[href]')) setShowCanvas(false); }}
        className={`tp-offcanvas-area ${showCanvas ? 'opened' : ''} ${style_bg ? 'tp-offcanvas-update-bg' : ''} ${style_bg2 ? 'tp-offcanvas-update-bg-2' : ''}`}>
        <div className="tp-offcanvas-bg is-left"></div>
        <div className="tp-offcanvas-bg is-right d-none d-md-block">
          <div className="tp-offcanvas-shape">
            <Image className="tp-offcanvas-shape-1" src={Shape} alt="" />
          </div>
        </div>
        <div className="tp-offcanvas-wrapper-2">

          <div className="tp-offcanvas-left">
            <div className="tp-offcanvas-left-wrap d-flex justify-content-between align-items-center">

              <div className="tpoffcanvas__logo">
                {style_bg ?
                  <BrandLockup className="logo-white" textColor="var(--tp-common-white)" />
                  :
                  <>
                    <BrandLockup className="logo-white" textColor="var(--tp-common-white)" />
                    <BrandLockup className="logo-black" textColor="var(--tp-common-black-5)" />
                  </>

                }
              </div>
              <div className="tp-offcanvas-close d-md-none text-end">

                <button type="button" aria-label="Close menu" className="tp-offcanvas-close-btn tp-offcanvas-close-btn" onClick={() => setShowCanvas(false)}>
                  <span className="text">
                    <span>close</span>
                  </span>
                  <span className="d-inline-block">
                    <span>
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.80859 9.80762L28.1934 28.1924" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.80859 28.1924L28.1934 9.80761" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </button>

              </div>
            </div>
            <div className="tp-main-menu-mobile menu-hover-active counter-row">
              <nav>
                <MobileMenus />
              </nav>
            </div>
            <CountryChoiceLinks className="mt-30" collapsible />
          </div>

          <div className="tp-offcanvas-right d-none d-md-block">
            <div className="tp-offcanvas-close text-end">
              <button type="button" aria-label="Close menu" className="tp-offcanvas-close-btn tp-offcanvas-close-btn" onClick={() => setShowCanvas(false)}>
                <span className="text">
                  <span>close</span>
                </span>

                <span className="d-inline-block">
                  <span>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.80859 9.80762L28.1934 28.1924" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.80859 28.1924L28.1934 9.80761" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>

              </button>
            </div>
            <div className="tp-offcanvas-right-inner d-flex flex-column justify-content-between h-100">

              <div className="tpoffcanvas__right-info">
                <div className="tpoffcanvas__tel">
                  <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a>
                </div>
                <div className="tpoffcanvas__mail">
                  <a href={siteConfig.socialLinks.email}>
                    {siteConfig.email}</a>
                </div>
                <div className="tpoffcanvas__text">
                  <p>Bring one problem. Start with evidence.</p>
                </div>
              </div>

              <div className="tpoffcanvas__social-link">
                <ul>
                  <li><a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
                  <li><a href={siteConfig.socialLinks.x} target="_blank" rel="noreferrer">X</a></li>
                  <li><a href={siteConfig.socialLinks.telegram} target="_blank" rel="noreferrer">Telegram</a></li>
                  <li><a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noreferrer">Linkedin</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </dialog>
    </>
  );
};

export default Offcanvas;
