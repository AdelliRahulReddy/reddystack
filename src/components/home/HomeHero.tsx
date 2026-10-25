import Image from 'next/image';

import portrait from '@/assets/img/hero/ab-hero-1.jpg';
import { offerHeadline, offerSentence } from '@/content/plainOffer';
import { ButtonLink } from '@/components/blocks/ButtonLink';
import HomeJourney from '@/components/hero/HomeJourney';

/**
 * Homepage first screen: it sells the outcome, not one plan, so there is no
 * price here. One plain headline, one sentence, one action, and the journey
 * the visitor can tap through. Server-rendered text, never faded in.
 */
export default function HomeHero() {
  return (
    <section className="pb-[clamp(48px,7vw,104px)] pt-[clamp(20px,4vw,64px)]">
      <div className="site-wrap grid items-center gap-[clamp(32px,5vw,72px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <h1 className="max-w-[14ch] text-display">{offerHeadline}</h1>
          <p className="mt-5 max-w-[44ch] text-[clamp(17px,1.35vw,20px)] text-muted">{offerSentence}</p>
          <div className="mt-7"><ButtonLink href="/contact?source=/">Get customer enquiries</ButtonLink></div>
          <div className="mt-6 flex items-center gap-3">
            <Image src={portrait} alt="" sizes="44px" className="size-11 rounded-full object-cover object-[center_25%] shadow-card" />
            <p className="text-small text-muted"><span className="font-semibold text-text">Rahul Reddy</span> answers every enquiry himself.</p>
          </div>
        </div>
        <HomeJourney />
      </div>
    </section>
  );
}
