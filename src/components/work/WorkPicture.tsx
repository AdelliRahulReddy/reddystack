import Image from 'next/image';

import type { Work } from '@/types/database';

/**
 * The real picture for a work card (a screenshot or ad creative the owner adds
 * in Admin → Works). Until one is set, a clean titled slot stands in: never a
 * stock or invented image. Unoptimized so any https URL the owner pastes works
 * without a config change.
 */
export default function WorkPicture({ work }: { work: Work }) {
  if (!work.image_url || !/^(https:\/\/|\/)/.test(work.image_url)) {
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-[16px] bg-surface-2 p-6 text-center" aria-hidden="true">
        <span className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight tracking-[-0.02em] text-text/70">{work.title}</span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-surface-2">
      <Image
        src={work.image_url}
        alt={`${work.title}${work.client_name ? ` for ${work.client_name}` : ''}`}
        fill
        unoptimized
        loading="lazy"
        sizes="(max-width: 700px) 100vw, 33vw"
        className="object-cover object-top"
      />
    </div>
  );
}
