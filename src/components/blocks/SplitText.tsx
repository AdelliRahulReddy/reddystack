import { Fragment } from 'react';

/**
 * Splits text into word masks for the rise-in heading reveal. Put `data-split` and an
 * `aria-label` with the full text on the parent heading; the words themselves are hidden
 * from assistive tech so it is read once.
 */
export default function SplitText({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-w" aria-hidden="true" style={{ ['--i' as string]: i + offset }}><span>{w}</span></span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
