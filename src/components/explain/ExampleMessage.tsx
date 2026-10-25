import ExampleLabel from './ExampleLabel';

/** What an enquiry looks like when it arrives. Labelled as an example. */
export default function ExampleMessage() {
  return (
    <figure>
      <div className="grid gap-2 rounded-[var(--radius-card)] shadow-card bg-surface-2 p-5 text-[15px]" aria-hidden="true">
        <p className="text-[13px] text-muted">From your Facebook ad · WhatsApp</p>
        <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface px-4 py-2.5 shadow-[0_0_0_1px_var(--color-edge)]">
          Hello, I saw your ad. What is the price for a visit on Saturday?
        </p>
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-action px-4 py-2.5 text-action-ink">
          Hi! Saturday is open. Can I book you for 11 am?
        </p>
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-small text-muted">
        <ExampleLabel /> An enquiry, arriving on your phone.
      </figcaption>
    </figure>
  );
}
