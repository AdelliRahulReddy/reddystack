'use client';

import Link from 'next/link';
import { useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

import MagneticButton from '@/components/blocks/MagneticButton';
import { Button, ButtonArrow } from '@/components/ui/button';
import { DiagnosticVisual } from './Illustrations';
import { problems, stackLayers } from './homeContent';
import s from './home-v3.module.scss';

/** "Where is growth stuck?" tabs: pick a symptom, see the first step and the layers involved. */
export default function DiagnosticTabs({ source }: { source: string }) {
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = problems[problemIndex];

  const onProblemKey = (e: ReactKeyboardEvent<HTMLButtonElement>, i: number) => {
    let j: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % problems.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + problems.length) % problems.length;
    if (e.key === 'Home') j = 0;
    if (e.key === 'End') j = problems.length - 1;
    if (j === null) return;
    e.preventDefault();
    setProblemIndex(j);
    document.getElementById(`hv3-tab-${problems[j].id}`)?.focus();
  };

  return (
          <div className={s.diag} data-reveal>
      <div className={s.choices} role="tablist" aria-label="Choose the main problem">
        {problems.map((p, i) => (
          <button key={p.id} id={`hv3-tab-${p.id}`} type="button" role="tab" className={s.choice} aria-selected={i === problemIndex} aria-controls="hv3-answer" tabIndex={i === problemIndex ? 0 : -1} onClick={() => setProblemIndex(i)} onKeyDown={(e) => onProblemKey(e, i)}>
            <span className={s.q}>{p.letter}</span>
            <span><strong>{p.title}</strong><small>{p.detail}</small></span>
            <span className={s.chev} aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div className={s.answer} id="hv3-answer" role="tabpanel" aria-labelledby={`hv3-tab-${problem.id}`}>
        <div className={s.answerTop}>
          <div key={problem.id} className={s.answerText}>
            <span className={s.label}>First step</span>
            <h3>{problem.firstStep}</h3>
          </div>
          <DiagnosticVisual id={problem.id} key={problem.id + '-viz'} />
        </div>
        <p className={s.lead} key={problem.id + '-body'}>{problem.body}</p>
        <ul className={s.layers} aria-label="Layers involved">
          {stackLayers.map((l) => <li key={l.key} data-on={problem.layers.includes(l.key) ? 'true' : 'false'}>{l.label}</li>)}
        </ul>
        <div className={s.answerRow}>
          <span>Usually starts as a <b>Proof Sprint</b></span>
          <MagneticButton>
            <Button asChild><Link href={`/contact?service=proof-sprint&source=${source}`}>Discuss this problem <ButtonArrow /></Link></Button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
