import { ButtonLink } from '@/components/blocks/ButtonLink';
import SectionHead from '@/components/blocks/SectionHead';
import EnquiryJourney from '@/components/explain/EnquiryJourney';
import ExampleReport from '@/components/explain/ExampleReport';
import ProcessSteps from '@/components/home/ProcessSteps';

/** How a project runs: the four steps, how updates work, and what the customer journey looks like. */
export default function ProcessView({ advancePercent }: { advancePercent: number }) {
  return (
    <>
      <section aria-labelledby="steps-title" className="section pt-0">
        <div className="site-wrap">
          <h2 id="steps-title" className="sr-only">The four steps</h2>
          <ProcessSteps advancePercent={advancePercent} />
        </div>
      </section>

      <section aria-labelledby="updates-title" className="section bg-surface">
        <div className="site-wrap grid gap-10 min-[961px]:grid-cols-2 min-[961px]:items-center">
          <div>
            <h2 id="updates-title" className="text-h2">Written updates, no daily calls</h2>
            <p className="mt-4 max-w-[46ch] text-muted">
              Everything is written down, so you can catch up in a few minutes whenever you have time. We agree the
              review points up front and keep every update in one place. Between updates, ask anything on WhatsApp or email.
            </p>
            <div className="mt-8"><ButtonLink href="/calculator">Work out my price</ButtonLink></div>
          </div>
          <ExampleReport />
        </div>
      </section>

      <section aria-labelledby="journey-title" className="section">
        <div className="site-wrap">
          <SectionHead id="journey-title" title="What we set up for you" intro="One clear route from your ad to your phone, whichever way your customers like to get in touch." />
          <EnquiryJourney />
        </div>
      </section>
    </>
  );
}
