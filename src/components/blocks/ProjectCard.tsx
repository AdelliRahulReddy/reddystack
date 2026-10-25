import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { projectBadge } from './projectBadge';

export type ProjectCardData = {
  slug: string;
  path: string;
  title: string;
  category: string;
  year: number;
  client: string;
  role: string;
  summary: string;
  image: StaticImageData | { src: string; width: number; height: number };
};

/** Portfolio card: picture, badge saying whether it is personal/demo work, title and type of build. */
export default function ProjectCard({
  project,
  className,
  sizes = '(max-width: 860px) 100vw, 50vw',
  priority = false,
}: {
  project: ProjectCardData;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link href={project.path} className={cn('group/card block rounded-[var(--radius-card)] bg-surface p-4 transition-colors hover:bg-surface-2 sm:p-5', className)}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] bg-surface-2">
        <Image src={project.image} alt={`${project.title}: ${project.summary}`} fill sizes={sizes} priority={priority} className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-text px-2.5 py-0.5 text-[12.5px] font-semibold text-ground">{projectBadge(project)}</span>
      </div>
      <div className="px-1 pt-4">
        <h3 className="text-h3 font-semibold group-hover/card:text-action">{project.title}</h3>
        <p className="mt-1 text-muted">{project.category}</p>
      </div>
    </Link>
  );
}
