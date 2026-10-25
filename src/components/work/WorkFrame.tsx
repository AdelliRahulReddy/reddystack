import type { Work } from '@/types/database';

const isAd = (work: Work) => /\b(ad|ads|campaign)\b/i.test(`${work.title} ${work.description}`);

const hostOf = (link: string) => {
  try { return new URL(link).host.replace(/^www\./, ''); } catch { return ''; }
};

function Kind({ work }: { work: Work }) {
  return (
    <span className="inline-flex justify-self-start rounded-full bg-surface-2 px-2.5 py-0.5 text-[12.5px] font-semibold text-text">
      {work.work_type === 'client' ? 'Client work' : 'Our own project'}
    </span>
  );
}

/**
 * Illustrated frame shown on a work card until the owner adds a real picture
 * in Admin → Works: a browser frame for sites and platforms, a phone frame for
 * ads. It names the project and what it is; it never imitates a screenshot.
 */
export default function WorkFrame({ work }: { work: Work }) {
  const summary = work.client_name || (work.work_type === 'client' ? 'Built for a client' : 'Built by ReddyStack');

  if (isAd(work)) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-[16px] bg-text p-4" aria-hidden="true">
        <div className="h-full w-[44%] min-w-[150px] rounded-[22px] bg-ground p-2 shadow-[0_12px_28px_-12px_rgb(0_0_0/0.5)]">
          <div className="grid h-full content-center gap-2 rounded-[16px] bg-surface p-3">
            <p className="text-[11.5px] font-medium text-muted">Sponsored · Instagram</p>
            <p className="font-display text-[15px] font-semibold leading-tight text-text">{work.title}</p>
            <span className="rounded-full bg-action py-1 text-center text-[12px] font-semibold text-action-ink">Learn more</span>
            <Kind work={work} />
          </div>
        </div>
      </div>
    );
  }

  const host = work.link ? hostOf(work.link) : '';
  return (
    <div className="flex aspect-[16/10] flex-col rounded-[16px] bg-text p-2" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-2 pb-2 pt-1">
        <span className="size-2 rounded-full bg-ground/35" />
        <span className="size-2 rounded-full bg-ground/35" />
        <span className="size-2 rounded-full bg-ground/35" />
        <span className="ml-2 truncate rounded-full bg-ground/15 px-3 py-0.5 text-[11.5px] text-ground/90">{host || summary}</span>
      </div>
      <div className="grid flex-1 content-center gap-2 rounded-[12px] bg-surface px-5">
        <Kind work={work} />
        <p className="font-display text-[clamp(20px,2vw,26px)] font-semibold leading-tight tracking-[-0.02em] text-text">{work.title}</p>
        <p className="text-[14px] text-muted">{summary}</p>
      </div>
    </div>
  );
}
