import ExampleLabel from './ExampleLabel';

/** A frameless mock of the kind of enquiry page a client gets. Labelled as an example. */
export default function ExampleEnquiryPage() {
  return (
    <figure>
      <div className="rounded-[var(--radius-card)] shadow-card bg-surface p-5 text-text sm:p-6" aria-hidden="true">
        <p className="text-[13px] font-medium text-muted">yourbusiness.in</p>
        <p className="mt-3 font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">
          Same-day AC repair in your area
        </p>
        <p className="mt-2 text-[14px] text-muted">Trained technicians, fixed visit charge, open 9 am to 9 pm.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[14px] font-semibold">
          <span className="rounded-full bg-action px-3 py-2 text-center text-action-ink">WhatsApp us</span>
          <span className="rounded-full bg-surface-2 px-3 py-2 text-center">Call now</span>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-small text-muted">
        <ExampleLabel /> An enquiry page: one offer, one tap to reach you.
      </figcaption>
    </figure>
  );
}
