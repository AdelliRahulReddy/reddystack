import Image from 'next/image';

import { ButtonLink, TextLink } from '@/components/blocks/ButtonLink';
import EnquiryStep from '@/components/blocks/EnquiryStep';
import PageHero from '@/components/blocks/PageHero';
import portrait from '@/assets/img/hero/ab-hero-1.jpg';

const capabilities = ['Landing pages', 'Websites', 'Admin panels', 'Facebook & Instagram ads', 'Ad images', 'Enquiry tracking', 'Google profile and search'];

const principles = [
  ['Enquiries, not activity', 'The work is judged by whether customers can reach you on WhatsApp, by phone, on Instagram or through a form, not by hours spent.'],
  ['Prices in public', 'Every service has a fixed public price. One-time and monthly are always labelled, and ad spend is paid directly to Meta.'],
  ['Open about AI', 'AI can help with research and drafts. Rahul stays responsible for every decision, the quality of the work, and every reply.'],
  ['Yours to keep', "Your domain, hosting, ad accounts, tracking and business assets stay in your name."],
] as const;

// Owner decision pending on whether to keep the employer history (see the design report). Unchanged here.
const background = [
  ['2022 – 2025', 'Analyst', 'HCLTech · Olin project'],
  ['2025 – Present', 'Senior Analyst', 'HCLTech · Verizon project'],
  ['Apr 2026 – Present', 'Founder', 'ReddyStack'],
] as const;

/** About: who Rahul is, how he works, his background, and an enquiry step. */
export default function AboutView() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'About' }]}
        title="Built and run by Rahul Reddy."
        intro="ReddyStack gets Indian businesses more customer enquiries: a page, Facebook & Instagram ads, and every enquiry tracked, at public prices. Based in Hyderabad, working India-wide."
        actions={
          <>
            <ButtonLink href="/contact?source=/about">Talk to Rahul</ButtonLink>
            <TextLink href="/about/rahul-reddy-adelli">Full founder profile</TextLink>
          </>
        }
        aside={
          <figure>
            <Image src={portrait} alt="Rahul Reddy Adelli, founder of ReddyStack" priority sizes="(max-width: 960px) 92vw, 520px" className="aspect-[7/6] w-full rounded-[var(--radius-panel)] shadow-card object-cover object-[center_25%]" />
            <figcaption className="mt-3 text-small text-muted">Rahul Reddy Adelli, Hyderabad.</figcaption>
          </figure>
        }
      />

      <section aria-labelledby="how-title" className="section bg-surface">
        <div className="site-wrap grid gap-[clamp(32px,5vw,80px)] min-[961px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 id="how-title" className="text-h2">How I work</h2>
            <div className="mt-5 grid gap-4 text-muted">
              <p>I start with your business, your customers and how they like to get in touch: WhatsApp, calls, Instagram messages or forms. Most businesses start with the main offer; some need only one service from the price list.</p>
              <p>Before work starts, we agree what you get, what it costs, what is not included, and when you review it. Updates are written, so you can catch up in a few minutes. Beyond the written promise on the main offer, no lead count, revenue or ranking is promised.</p>
              <p>Our own projects are always labelled as personal or demo work. Client results are published only when they are real and the client agrees.</p>
            </div>
            <p className="mt-6 text-small text-muted">What I do: {capabilities.join(', ')}.</p>
          </div>
          <ul className="grid gap-3 content-start">
            {principles.map(([title, body]) => (
              <li key={title} className="rounded-[var(--radius-card)] shadow-card bg-ground p-6">
                <h3 className="text-h3 font-semibold">{title}</h3>
                <p className="mt-2 text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="background-title" className="section">
        <div className="site-wrap grid gap-10 min-[761px]:grid-cols-2">
          <div>
            <h2 id="background-title" className="text-h2">Background</h2>
            <ol className="mt-6 grid gap-3">
              {background.map(([time, role, where]) => (
                <li key={time} className="rounded-[var(--radius-card)] shadow-card bg-surface p-5">
                  <p className="text-small text-muted">{time}</p>
                  <p className="mt-1 font-semibold text-text">{role}</p>
                  <p className="text-[15px] text-muted">{where}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-h2">Education</h2>
            <div className="mt-6 rounded-[var(--radius-card)] shadow-card bg-surface p-5">
              <p className="text-small text-muted">2022 – Present</p>
              <p className="mt-1 font-semibold text-text">B.Sc. Design &amp; Computing (WILP)</p>
              <p className="text-[15px] text-muted">BITS Pilani</p>
            </div>
          </div>
        </div>
      </section>

      <EnquiryStep href="/contact?source=/about" />
    </>
  );
}
