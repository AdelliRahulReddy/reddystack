'use client';

import { useRef, type ReactNode } from 'react';

import ExampleLabel from './ExampleLabel';
import s from './ExampleViewer.module.css';

/**
 * A compact example card that opens large on tap, in a native dialog (focus is
 * kept inside, Escape closes). The example itself, with its "Example" label,
 * is shown in both places.
 */
export default function ExampleViewer({ title, children }: { title: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Open example: ${title}`}
        className="group/ex block w-full rounded-[var(--radius-card)] bg-surface-2 p-3 text-left shadow-card transition-transform duration-200 active:scale-[0.99]"
      >
        <div className={s.preview}>{children}</div>
        <span className="mt-3 flex items-center justify-between gap-3 px-1 text-[15px] font-semibold text-text">
          <span className="flex items-center gap-2"><ExampleLabel /> {title}</span>
          <span className="flex-none text-[14px] text-action-text underline underline-offset-4">Open</span>
        </span>
      </button>

      <dialog ref={dialog} className={s.dialog} aria-label={title} onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}>
        <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-semibold text-text">{title}</p>
          <button type="button" onClick={() => dialog.current?.close()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-4 text-[15px] font-medium text-text shadow-card">
            Close
          </button>
        </div>
        {children}
        </div>
      </dialog>
    </>
  );
}
