'use client';

import Image from 'next/image';
import Link from 'next/link';

import favicon from '@/assets/img/logo/favicon.png';

type BrandLockupProps = {
  className?: string;
  textColor: string;
};

const BrandLockup = ({ className, textColor }: BrandLockupProps) => {
  const boostContrast = textColor === "var(--tp-common-white)";

  return (
    <Link className={className} href="/">
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(6px, 2vw, 9px)',
          lineHeight: 1,
        }}
      >
        <Image
          src={favicon}
          alt="Reddystack logo"
          width={40}
          height={40}
          sizes="40px"
          style={{
            width: 'clamp(32px, 8.4vw, 40px)',
            height: 'auto',
            flexShrink: 0,
            filter: boostContrast ? 'brightness(1.08) contrast(1.12)' : 'none',
          }}
        />
        <span
          style={{
            color: textColor,
            fontFamily: 'var(--tp-ff-dmsans)',
            fontSize: 'clamp(18px, 4.8vw, 27px)',
            fontWeight: 700,
            fontStyle: 'normal',
            letterSpacing: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Reddystack
        </span>
      </span>
    </Link>
  );
};

export default BrandLockup;
