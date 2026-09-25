import { cn } from '@/lib/utils';

/** Mono uppercase label with the lime dot, e.g. "● START HERE". Scrambles in on first view. */
export default function Eyebrow({ children, className, dot = true }: { children: string; className?: string; dot?: boolean }) {
  return (
    <span className={cn('eyebrow inline-flex items-center', className)}>
      {dot && <b aria-hidden="true" className="mr-2.5 font-medium text-lime">●</b>}
      <span data-scramble>{children}</span>
    </span>
  );
}
