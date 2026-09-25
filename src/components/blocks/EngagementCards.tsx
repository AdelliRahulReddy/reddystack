import Link from 'next/link';

import { EngagementGlyph } from '@/components/home-v3/Illustrations';
import { engagements } from '@/components/home-v3/homeContent';
import { Button, ButtonArrow } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MagneticButton from './MagneticButton';

/** Proof Sprint / Stack Build / Operate & Improve. `source` is passed through to the contact form. */
export default function EngagementCards({ source = '/', className }: { source?: string; className?: string }) {
  return (
    <div className={cn('grid gap-[clamp(12px,1.6vw,20px)] min-[961px]:grid-cols-3', className)}>
      {engagements.map((e, i) => (
        <div
          key={e.id}
          data-reveal
          data-anim={e.featured ? '' : undefined}
          style={{ ['--reveal-delay' as string]: `${i * 0.08}s` }}
          className={cn(
            'relative flex flex-col gap-[18px] overflow-hidden rounded-[28px] border p-[clamp(24px,2.6vw,36px)] transition-[transform,border-color,opacity] duration-500 ease-studio hover:-translate-y-1.5',
            e.featured
              ? 'ring-sweep border-violet-soft/40 bg-[radial-gradient(100%_70%_at_0%_0%,rgb(118_84_232/0.55),transparent_65%),var(--color-raised)]'
              : 'border-line bg-graphite hover:border-line-strong',
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <EngagementGlyph id={e.id} />
            {e.featured && <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-lime-ink">Most start here</span>}
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-lime">{e.kind}</span>
          <h3 className="text-[clamp(28px,2.6vw,36px)]">{e.title}</h3>
          <p className="text-muted-foreground">{e.body}</p>
          <ul className="grid gap-2.5 text-[15.5px]">
            {e.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="mt-[0.65em] size-1.5 flex-none rotate-45 rounded-[2px] bg-violet-soft" />{pt}
              </li>
            ))}
          </ul>
          <MagneticButton className="mt-auto self-start">
            <Button asChild variant={e.featured ? 'default' : 'ghost'}>
              <Link href={e.href.replace('source=/', `source=${source}`)}>{e.cta} <ButtonArrow /></Link>
            </Button>
          </MagneticButton>
        </div>
      ))}
    </div>
  );
}
