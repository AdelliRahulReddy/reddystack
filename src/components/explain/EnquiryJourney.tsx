import { MessageCircle, Phone, ClipboardList, Bell } from 'lucide-react';

import { journeySteps } from '@/content/plainOffer';
import { cn } from '@/lib/utils';
import ExampleLabel from './ExampleLabel';
import s from './EnquiryJourney.module.css';

function AdStage() {
  return (
    <div className={s.card} aria-hidden="true">
      <p className="text-[12.5px] text-muted">Your business · Sponsored</p>
      <div className={s.adImage}>Free check-up this week</div>
      <span className={s.adButton}>
        Send message
        <span className={s.tap} />
      </span>
    </div>
  );
}

function ReplyStage() {
  return (
    <div aria-hidden="true">
      <div className={cn(s.row, s.r1)}><span className={s.dot}><MessageCircle className="size-4" /></span>“Hi, is this available tomorrow?”</div>
      <div className={cn(s.row, s.r2)}><span className={s.dot}><Phone className="size-4" /></span>Calling your number…</div>
      <div className={cn(s.row, s.r3)}><span className={s.dot}><ClipboardList className="size-4" /></span>Form sent: name and phone</div>
    </div>
  );
}

function EnquiryStage() {
  return (
    <div className={s.notice} aria-hidden="true">
      <p className="flex items-center gap-2 text-[13px] font-semibold"><Bell className="size-4" /> New enquiry</p>
      <p className="mt-1 text-[14px]">WhatsApp message from your Instagram ad, 2 minutes ago.</p>
      <span className={s.reply}>Reply</span>
    </div>
  );
}

const stages = [AdStage, ReplyStage, EnquiryStage];
const panelClass = [s.p1, s.p2, s.p3];

/**
 * How an enquiry reaches the business, shown as three labelled example screens
 * that light up in order. The step text is real HTML; the screens are decoration.
 */
export default function EnquiryJourney({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <figcaption className="mb-5 flex flex-wrap items-center gap-3 text-small text-muted">
        <ExampleLabel /> How a customer becomes an enquiry
      </figcaption>
      <ol className="grid gap-4 min-[760px]:grid-cols-3">
        {journeySteps.map((step, i) => {
          const Stage = stages[i];
          return (
            <li key={step.title} className={cn(s.panel, panelClass[i])}>
              <div className={s.stage}><Stage /></div>
              <h3 className="mt-4 text-h3 font-semibold">
                <span className="text-action-text">{i + 1}.</span> {step.title}
              </h3>
              <p className="mt-1 text-muted">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
