import { journeySteps } from '@/content/plainOffer';
import { cn } from '@/lib/utils';
import ExampleLabel from '@/components/explain/ExampleLabel';
import HeroJourney from './HeroJourney';
import { journeyScreens } from './JourneyScreens';
import s from './HeroJourney.module.css';

/**
 * Homepage hero visual: the tap-through phone (browser code) and, for reduced
 * motion, the whole journey as a still picture (server-rendered; the stylesheet
 * shows one or the other).
 */
export default function HomeJourney() {
  const screens = journeyScreens.map((Screen, i) => <Screen key={i} />);
  return (
    <figure>
      <figcaption className="mb-4 flex items-center gap-3 text-small text-muted">
        <ExampleLabel /> How a customer becomes your enquiry, step by step.
      </figcaption>
      <HeroJourney steps={journeySteps} screens={screens} />
      <ol className={cn(s.still, 'gap-3 min-[700px]:grid-cols-3')}>
        {journeySteps.map((step, i) => (
          <li key={step.title} className="rounded-[var(--radius-card)] bg-surface-2 p-3 shadow-card">
            {screens[i]}
            <p className="mt-3 px-1 font-semibold text-text"><span className="text-action-text">{i + 1}.</span> {step.title}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
