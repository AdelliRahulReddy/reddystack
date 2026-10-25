import { cn } from '@/lib/utils';

/** Visible tag on every mock or sample, so nothing is ever mistaken for a real client result. */
export default function ExampleLabel({ children = 'Example', className }: { children?: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full bg-text px-2.5 py-0.5 text-[12.5px] font-semibold text-ground', className)}>
      {children}
    </span>
  );
}
