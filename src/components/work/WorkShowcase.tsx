import type { Work } from '@/types/database';
import type { WorkGroups } from '@/lib/works';
import WorkPicture from './WorkPicture';

const GROUPS = {
  client: { title: 'Client work', note: 'Paid work for real businesses.' },
  portfolio: { title: 'Our own projects', note: 'Demos and personal work, labelled as such. Never shown as client results.' },
} as const;

function WorkCard({ work, level }: { work: Work; level: 2 | 3 }) {
  const Title = level === 2 ? 'h3' : 'h4';
  return (
    <article className="rounded-[var(--radius-card)] bg-surface p-4 sm:p-5">
      <WorkPicture work={work} />
      <div className="px-1 pt-4">
        <Title className="text-h3 font-semibold">{work.title}</Title>
        {work.client_name && <p className="mt-0.5 text-small text-muted">{work.client_name}</p>}
        {work.description && <p className="mt-2 text-muted">{work.description}</p>}
        {work.link && (
          <a href={work.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-[15px] font-semibold text-action underline underline-offset-4">
            Visit the live site
          </a>
        )}
      </div>
    </article>
  );
}

/** Client work first, then our own projects: two clearly titled groups that are never mixed. */
export default function WorkShowcase({ works, headingLevel = 3 }: { works: WorkGroups; headingLevel?: 2 | 3 }) {
  const Group = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className="grid gap-[clamp(40px,5vw,64px)]">
      {(['client', 'portfolio'] as const).map((type) => {
        const list = works[type];
        if (list.length === 0) return null;
        return (
          <div key={type}>
            <Group className={headingLevel === 2 ? 'text-h2' : 'text-h3 font-semibold'}>{GROUPS[type].title}</Group>
            <p className="mt-1 text-muted">{GROUPS[type].note}</p>
            <div className="mt-5 grid gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
              {list.map((work) => <WorkCard key={work.id} work={work} level={headingLevel} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
