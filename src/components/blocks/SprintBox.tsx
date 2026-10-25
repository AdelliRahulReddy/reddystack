import Link from 'next/link';

import type { AppSettings, Bundle } from '@/types/database';
import { formatInr } from '@/lib/money';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import Eyebrow from './Eyebrow';
import { Button, ButtonArrow } from '@/components/ui/button';

/**
 * The lead offer box: bundle name, description, fixed price and guarantee,
 * all read from the bundles table. Shared by the homepage and pricing page so
 * the two stay identical.
 */
export default function SprintBox({ bundle, settings, id = 'sprint' }: { bundle: Bundle; settings: AppSettings; id?: string }) {
  const whatsapp = buildWhatsAppLink(settings.whatsapp_number, `Hi, I want to know more about the ${bundle.name}.`);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-h)+16px)] pb-[clamp(48px,7vw,96px)]">
      <div className="site-wrap">
        <div className="rounded-[40px] border border-lime/30 bg-[radial-gradient(80%_100%_at_100%_0%,rgb(210_237_122/0.12),transparent_55%),var(--color-raised)] p-[clamp(24px,4vw,56px)]">
          <Eyebrow>Lead offer</Eyebrow>
          <div className="mt-5 grid gap-8 min-[961px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <h2 id={`${id}-title`} className="text-[clamp(32px,4.6vw,64px)]">{bundle.name}</h2>
              <p className="mt-4 max-w-[52ch] text-[17px] text-muted-foreground">{bundle.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Button asChild size="lg"><Link href="/calculator">Build your quote <ButtonArrow /></Link></Button>
                <a href={whatsapp} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-lime underline underline-offset-4 hover:text-ivory">
                  Ask on WhatsApp
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-[28px] border border-line bg-graphite p-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-faint">One-time</p>
                <p className="mt-2 font-display text-[clamp(40px,5vw,72px)] leading-none">{formatInr(bundle.fixed_price)}</p>
              </div>
              {bundle.guarantee_text && (
                <p className="border-t border-line pt-5 text-[15px] text-ivory">
                  <strong className="text-lime">Guarantee:</strong> {bundle.guarantee_text}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
