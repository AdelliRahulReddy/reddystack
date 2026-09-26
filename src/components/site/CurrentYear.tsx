'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** The build-time year from the server, corrected in the browser, so a static page never shows a stale year. */
export default function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => new Date().getFullYear());
  return <span suppressHydrationWarning>{year}</span>;
}
