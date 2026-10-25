import LineIcon from '@/components/blocks/LineIcon';

/*
 * The three example phone screens of an enquiry's journey. Plain markup, no
 * motion of their own: the hero decides which one is showing.
 */

const row = 'flex items-center gap-2.5 rounded-xl bg-surface px-3 py-2.5 text-[13.5px] text-text shadow-[0_0_0_1px_var(--color-edge)]';
const dot = 'grid size-7 flex-none place-items-center rounded-full bg-surface-2';

export function AdScreen() {
  return (
    <div className="rounded-2xl bg-surface p-3 shadow-[0_0_0_1px_var(--color-edge)]">
      <p className="text-[12.5px] font-medium text-muted">Your business · Sponsored</p>
      <div className="mt-2.5 grid h-24 place-items-center rounded-xl bg-action text-center text-[15px] font-semibold text-action-ink">
        Free check-up this week
      </div>
      <p className="mt-2.5 text-[13px] text-text">Same-day visits near you.</p>
      <span className="mt-2.5 block rounded-full bg-surface-2 py-2 text-center text-[13.5px] font-semibold text-text">Send message</span>
    </div>
  );
}

export function ReplyScreen() {
  return (
    <div className="grid gap-2">
      <p className="px-1 text-[12.5px] font-medium text-muted">The customer picks a way:</p>
      <div className={row}><span className={dot}><LineIcon name="message" className="size-4" /></span>WhatsApp message</div>
      <div className={row}><span className={dot}><LineIcon name="phone" className="size-4" /></span>A phone call</div>
      <div className={row}><span className={dot}><LineIcon name="form" className="size-4" /></span>A short form</div>
    </div>
  );
}

export function EnquiryScreen() {
  return (
    <div className="rounded-2xl bg-surface p-3.5 text-text shadow-[0_0_0_1px_var(--color-edge),0_10px_24px_-14px_rgb(28_25_21/0.35)]">
      <p className="flex items-center gap-2 text-[13px] font-semibold"><LineIcon name="bell" className="size-4" /> New enquiry</p>
      <p className="mt-1.5 text-[14px]">WhatsApp message, from your Instagram ad.</p>
      <p className="mt-1 text-[12.5px] text-muted">Name and phone number included.</p>
      <span className="mt-3 inline-block rounded-full bg-action px-4 py-1.5 text-[13px] font-semibold text-action-ink">Reply</span>
    </div>
  );
}

export const journeyScreens = [AdScreen, ReplyScreen, EnquiryScreen];
