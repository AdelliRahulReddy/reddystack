import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  kicker?: string;
  title: string;
  body: string;
  tags?: string[];
  className?: string;
};

/** Link card for a service page: what it is, one plain line, and the topics it covers. */
export default function ServiceCard({ href, kicker, title, body, tags, className }: Props) {
  return (
    <Link href={href} className={cn('group/svc flex flex-col gap-3 rounded-[var(--radius-card)] bg-surface p-6 transition-colors hover:bg-surface-2 sm:p-7', className)}>
      {kicker && <span className="text-small text-muted">{kicker}</span>}
      <h3 className="text-h3 font-semibold group-hover/svc:text-action">{title}</h3>
      <p className="text-muted">{body}</p>
      {tags && tags.length > 0 && (
        <p className="mt-auto pt-2 text-small text-muted">{tags.join(', ')}</p>
      )}
    </Link>
  );
}
