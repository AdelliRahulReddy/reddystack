'use client';

import Image from 'next/image';
import Link from 'next/link';

import brandLogo from '@/assets/img/logo/reddystack-symbol.svg';

type BrandLockupProps = {
  className?: string;
  textColor: string;
};

const BrandLockup = ({ className, textColor }: BrandLockupProps) => {
  return (
    <Link className={className} href="/" aria-label="Reddystack home">
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(9px, 2vw, 13px)',
          lineHeight: 1,
        }}
      >
        <Image
          src={brandLogo}
          alt=""
          width={40}
          height={40}
          sizes="40px"
          style={{
            width: 'clamp(32px, 8.4vw, 40px)',
            height: 'auto',
            flexShrink: 0,
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
