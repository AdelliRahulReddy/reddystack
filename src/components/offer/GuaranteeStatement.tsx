import { ButtonLink } from '@/components/blocks/ButtonLink';

/** The guarantee as one large plain statement, read verbatim from settings. */
export default function GuaranteeStatement({ text, href }: { text: string; href: string }) {
  return (
    <section aria-labelledby="guarantee-title" className="bg-action text-action-ink">
      <div className="site-wrap py-[clamp(56px,7vw,112px)]">
        <h2 id="guarantee-title" className="text-small font-sans font-semibold tracking-normal text-action-ink">Our promise</h2>
        <p className="mt-4 max-w-[30ch] font-display text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">{text}</p>
        <p className="mt-5 max-w-[52ch] text-action-ink/80">The window is agreed with you before work starts. Ad spend and third-party costs stay separate, and your accounts stay in your name.</p>
        <ButtonLink href={href} className="mt-8 bg-action-ink text-action hover:bg-ground hover:text-text">Get customer enquiries</ButtonLink>
      </div>
    </section>
  );
}
