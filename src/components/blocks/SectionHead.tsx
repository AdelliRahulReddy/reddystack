import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Eyebrow from './Eyebrow';
import SplitText from './SplitText';

type Props = {
  label: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  as?: 'h1' | 'h2';
  className?: string;
};

/** Section opener: eyebrow + split heading on the left, intro paragraph bottom-right. */
export default function SectionHead({ label, title, intro, id, as: Tag = 'h2', className }: Props) {
  return (
    <div className={cn('mb-[clamp(40px,5vw,72px)] grid items-end gap-x-16 gap-y-6 min-[861px]:grid-cols-2', className)}>
      <div>
        <Eyebrow>{label}</Eyebrow>
        <Tag id={id} aria-label={title} data-split className="mt-[18px] text-[clamp(36px,5vw,72px)]">
          <SplitText text={title} />
        </Tag>
      </div>
      {intro && <div data-reveal className="max-w-[46ch] text-muted-foreground min-[861px]:justify-self-end">{intro}</div>}
    </div>
  );
}
