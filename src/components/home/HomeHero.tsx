import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

import portrait from '@/assets/img/hero/ab-hero-1.jpg';
import { offerHeadline, offerSentence } from '@/content/plainOffer';
import { formatInr } from '@/lib/money';
import type { Bundle } from '@/types/database';
import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';

/**
 * Homepage first screen: one plain headline, one sentence, the price, the
 * promise and one action, all inside a 390px phone screen. Server-rendered,
 * never faded in.
 */
export default function HomeHero({ bundle, guarantee }: { bundle: Bundle | null; guarantee: string }) {
  return (
    <section className="pb-[clamp(48px,7vw,104px)] pt-[clamp(20px,4vw,64px)]">
      <div className="site-wrap grid items-center gap-12 min-[961px]:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]">
        <div>
          <h1 className="max-w-[14ch] text-display">{offerHeadline}</h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(17px,1.35vw,20px)] text-muted">{offerSentence}</p>
          {bundle && (
            <p className="mt-5 text-[clamp(17px,1.35vw,20px)] text-text">
              <span className="font-semibold">{bundle.name}: {formatInr(bundle.fixed_price)} one-time.</span>{' '}
              <span className="text-muted">Ad spend is extra, paid directly to Meta.</span>
            </p>
          )}
          {guarantee && (
            <p className="mt-3 flex max-w-[48ch] gap-2.5 text-text">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 flex-none text-action-text" />
              <span>{guarantee}</span>
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={bundle ? `/calculator?pick=${bundle.slug}` : '/calculator'}>Get customer enquiries</ButtonLink>
            <TextLink href="#offer">See what&apos;s included</TextLink>
          </div>
        </div>
        <figure className="hidden min-[961px]:block">
          <Image
            src={portrait}
            alt="Rahul Reddy Adelli, founder of ReddyStack"
            sizes="(max-width: 960px) 1px, 420px"
            className="aspect-[5/6] w-full rounded-[var(--radius-panel)] shadow-card object-cover object-[center_25%]"
          />
          <figcaption className="mt-3 text-small text-muted">Rahul Reddy. You talk to him directly, from first message to report.</figcaption>
        </figure>
      </div>
    </section>
  );
}
