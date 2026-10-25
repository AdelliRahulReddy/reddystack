import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  intro?: ReactNode;
  id?: string;
  as?: 'h1' | 'h2';
  className?: string;
};

/** Section opener: one left-aligned heading and one plain sentence under it. */
export default function SectionHead({ title, intro, id, as: Tag = 'h2', className }: Props) {
  return (
    <div className={cn('mb-[clamp(32px,4vw,56px)] max-w-[46rem]', className)}>
      <Tag id={id} className="text-h2">{title}</Tag>
      {intro && <div className="mt-4 max-w-[56ch] text-muted">{intro}</div>}
    </div>
  );
}
