import type { Work, WorkType } from '@/types/database';
import WorkImage from '@/components/blocks/WorkImage';
import SectionHead from '@/components/blocks/SectionHead';

const GROUP_LABELS: Record<WorkType, { label: string; title: string; note: string }> = {
  client: {
    label: 'Client work',
    title: 'Built for clients.',
    note: 'Paid work for real businesses.',
  },
  portfolio: {
    label: 'Portfolio',
    title: 'Our own projects.',
    note: 'Demo and personal work, labelled as such.',
  },
};

function WorkCard({ work }: { work: Work }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-line bg-graphite p-6 sm:p-8">
      <WorkImage work={work} />
      <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em]">{work.title}</h3>
      {work.client_name && <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-faint">{work.client_name}</p>}
      {work.description && <p className="mt-4 text-muted-foreground">{work.description}</p>}
      {work.link && (
        <a href={work.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-lime underline underline-offset-4 hover:text-ivory">
          See it <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

/**
 * Works page, split into the two labels that are never mixed: client work and
 * portfolio. Each group is clearly titled so a demo is never mistaken for a
 * client result.
 */
export default function WorksView({ client, portfolio }: { client: Work[]; portfolio: Work[] }) {
  return (
    <section className="site-wrap pb-[clamp(56px,8vw,120px)]">
      {(['client', 'portfolio'] as const).map((type) => {
        const works = type === 'client' ? client : portfolio;
        const meta = GROUP_LABELS[type];
        if (works.length === 0) return null;
        return (
          <div key={type} className="py-6 first:pt-0">
            <SectionHead label={meta.label} title={meta.title} intro={meta.note} />
            <div className="grid gap-5 md:grid-cols-2">
              {works.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
