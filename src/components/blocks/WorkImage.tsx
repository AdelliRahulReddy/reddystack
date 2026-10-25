import Image from 'next/image';

import type { Work } from '@/types/database';

/**
 * The real picture for a work card (a screenshot or ad creative the owner adds
 * in Admin → Works). Renders nothing when no picture is set: never a stock or
 * stand-in image. Unoptimized so any https URL the owner pastes works without
 * a config change.
 */
export default function WorkImage({ work }: { work: Work }) {
  if (!work.image_url || !/^(https:\/\/|\/)/.test(work.image_url)) return null;
  return (
    <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden rounded-t-[inherit] bg-raised sm:-mx-8 sm:-mt-8">
      <Image
        src={work.image_url}
        alt={`${work.title}${work.client_name ? ` for ${work.client_name}` : ''}`}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top"
      />
    </div>
  );
}
