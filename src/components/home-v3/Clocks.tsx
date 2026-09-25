'use client';

import { useEffect, useState } from 'react';
import s from './home-v3.module.scss';

const clockZones = [
  { city: 'Hyderabad', tz: 'Asia/Kolkata', home: true },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
];

export default function Clocks() {
  const [times, setTimes] = useState<string[]>(clockZones.map(() => '--:--'));
  useEffect(() => {
    const fmts = clockZones.map((z) => new Intl.DateTimeFormat('en-GB', { timeZone: z.tz, hour: '2-digit', minute: '2-digit' }));
    const tick = () => setTimes(fmts.map((f) => f.format(new Date())));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return (
    <div className={s.clocks} aria-label="Local times">
      {clockZones.map((z, i) => (
        <span key={z.city} className={z.home ? s.home : undefined}>
          {z.city} <b suppressHydrationWarning>{times[i]}</b>
          {z.home && <i className={s.secDot} aria-hidden="true" />}
        </span>
      ))}
    </div>
  );
}
