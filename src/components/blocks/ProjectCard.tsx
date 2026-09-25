'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { cn } from '@/lib/utils';

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

/** Personal/demo work must always say so. */
export const projectBadge = (p: Pick<ProjectCardData, 'client' | 'year'>) =>
  `${p.client.toLowerCase().includes('personal') ? 'Personal / demo' : 'Build'} · ${p.year}`;

/** Work card: tilts toward the pointer, image drifts on scroll and unmasks on first view. */
export default function ProjectCard({
  project,
  className,
  sizes = '(max-width: 860px) 100vw, 58vw',
  priority = false,
}: {
  project: ProjectCardData;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const inner = card.querySelector('[data-media-inner]');
      const media = card.querySelector('[data-media]');
      if (inner) gsap.fromTo(inner, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      if (media && card.getBoundingClientRect().top > window.innerHeight) {
        gsap.from(media, { clipPath: 'inset(18% 10% 18% 10% round 27px)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
      }
    }, card);

    const cleanups: (() => void)[] = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(1200px) rotateY(${(x - 0.5) * 7}deg) rotateX(${(0.5 - y) * 6}deg)`;
        card.style.setProperty('--gx', x * 100 + '%');
        card.style.setProperty('--gy', y * 100 + '%');
      };
      const leave = () => { card.style.transform = ''; };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); });
    }
    return () => { ctx.revert(); cleanups.forEach((fn) => fn()); };
  }, []);

  const roles = project.role.split(',').slice(0, 2).map((r) => r.trim()).join(' · ');

  return (
    <Link
      ref={ref}
      href={project.path}
      data-view
      data-reveal
      className={cn(
        'group/card relative block rounded-[28px] border border-line bg-graphite transition-[transform,border-color,opacity] duration-700 ease-studio [transform-style:preserve-3d] hover:border-line-strong',
        className,
      )}
    >
      <span className="absolute left-4 top-4 z-[2] rounded-full border border-line bg-ink/70 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ivory backdrop-blur-sm">
        {projectBadge(project)}
      </span>
      <div
        data-media
        className="relative aspect-[3/2] overflow-hidden rounded-t-[27px] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(420px_circle_at_var(--gx,50%)_var(--gy,0%),rgb(255_255_255/0.18),transparent_45%)] after:opacity-0 after:transition-opacity after:duration-400 group-hover/card:after:opacity-100"
      >
        <div data-media-inner className="absolute inset-x-0 top-0 -bottom-[12%]">
          <Image
            src={project.image}
            alt={`${project.title}: ${project.summary}`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-1100 ease-studio group-hover/card:scale-105"
          />
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 px-6 pb-6 pt-[22px] max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-2.5">
        <div>
          <h3 className="text-[clamp(24px,2.4vw,32px)]">{project.title}</h3>
          <p className="mt-1 text-[15px] text-muted-foreground">{project.category}</p>
        </div>
        <p className="max-w-[22ch] text-right font-mono text-[11.5px] uppercase leading-[1.7] tracking-[0.1em] text-faint max-[560px]:max-w-none max-[560px]:text-left">
          {roles}
        </p>
      </div>
    </Link>
  );
}
