'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import * as m from 'motion/react-m';

// Set after the first page mounts. Only client-side navigations animate, so the
// server-rendered first page is never hidden (protects LCP and no-JS rendering).
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => { hasNavigated = true; }, []);

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <m.div
        initial={animate ? { opacity: 0, y: 18 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </MotionConfig>
    </LazyMotion>
  );
}
