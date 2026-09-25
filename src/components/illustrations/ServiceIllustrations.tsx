import type { ReactElement } from 'react';

import { capabilityIllustrations } from '@/components/home-v3/Illustrations';
import s from './illustrations.module.scss';

const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ');

/* ---------- Meta Ads ---------- */
function MetaIll() {
  const cards = [0, 1, 2, 3];
  return (
    <svg className={cx(s.ill, s.meta)} viewBox="0 0 320 200" aria-hidden="true">
      <defs><clipPath id="ill-meta-screen"><rect x="104" y="22" width="92" height="160" rx="10" /></clipPath></defs>
      <rect x="98" y="12" width="104" height="180" rx="18" fill="#1F1E24" stroke="rgba(247,244,235,.2)" />
      <rect className={s.s3} x="136" y="16" width="28" height="3" rx="1.5" />
      <g clipPath="url(#ill-meta-screen)">
        <g className={s.feed}>
          {cards.map((i) => (
            <g key={i} transform={`translate(0 ${i * 86})`}>
              <rect x="108" y="28" width="84" height="78" rx="8" className={s.sf} stroke="rgba(247,244,235,.16)" />
              <circle className={s.s3} cx="117" cy="37" r="4" />
              <rect className={s.s2} x="125" y="34" width="34" height="5" rx="2.5" />
              <rect className={i === 1 ? s.vi : s.s2} x="112" y="46" width="76" height="38" rx="5" />
              <rect className={s.s2} x="112" y="90" width="50" height="4" rx="2" />
            </g>
          ))}
          <g transform="translate(0 86)">
            <rect className={s.spon} x="108" y="28" width="84" height="78" rx="8" fill="none" strokeWidth="1.5" />
            <text x="160" y="38" style={{ fontSize: 6 }}>SPONSORED</text>
            <rect className={s.li} x="146" y="87" width="42" height="13" rx="6.5" />
            <text className={s.dk} x="151" y="96" style={{ fontSize: 6.5 }}>BOOK NOW</text>
            <path className={s.heart} d="M150 64 c-4-5-12-2-10 4 c1 3 6 7 10 10 c4-3 9-7 10-10 c2-6-6-9-10-4z" fill="#FF765E" />
          </g>
        </g>
      </g>
      {[{ x: 40, y: 52 }, { x: 56, y: 104 }, { x: 34, y: 150 }, { x: 70, y: 76 }].map((d, i) => (
        <g key={i}>
          <circle className={cx(s.aud, s.vs)} cx={d.x} cy={d.y} r="4" />
          <path className={s.st} strokeDasharray="2 4" d={`M${d.x + 6} ${d.y} Q 84 ${d.y} 98 100`} />
        </g>
      ))}
      <text x="22" y="186">AUDIENCE</text>
      <g transform="translate(222 44)">
        <rect width="80" height="112" rx="12" className={s.sf} stroke="rgba(247,244,235,.14)" />
        <text x="10" y="18">THIS WEEK</text>
        <text className={s.lt} x="10" y="40" style={{ fontSize: 13, fontFamily: 'inherit' }}>Enquiries</text>
        <rect className={s.s2} x="10" y="52" width="60" height="5" rx="2.5" />
        <rect className={s.li} x="10" y="52" width="38" height="5" rx="2.5" />
        <text x="10" y="76">SPEND CAP</text>
        <rect className={s.s2} x="10" y="84" width="60" height="5" rx="2.5" />
        <rect className={s.co} x="10" y="84" width="46" height="5" rx="2.5" />
      </g>
    </svg>
  );
}

/* ---------- Google Ads ---------- */
function GoogleIll() {
  return (
    <svg className={cx(s.ill, s.google)} viewBox="0 0 320 200" aria-hidden="true">
      <rect x="20" y="16" width="280" height="32" rx="16" fill="#1F1E24" stroke="rgba(247,244,235,.16)" />
      <circle cx="38" cy="32" r="6" className={s.st} />
      <line x1="42.5" y1="36.5" x2="47" y2="41" stroke="rgba(247,244,235,.4)" strokeWidth="1.5" />
      <text className={s.lt} x="56" y="36" style={{ fontSize: 11, letterSpacing: 0 }}>emergency plumber austin</text>
      <rect className={s.cover} x="54" y="22" width="206" height="20" fill="#1F1E24" />
      <rect className={cx(s.caret, s.li)} x="55" y="24" width="1.5" height="16" />
      <g className={s.ad}>
        <rect x="20" y="60" width="200" height="40" rx="9" fill="rgba(210,237,122,.1)" stroke="#D2ED7A" />
        <text className={s.lm} x="30" y="74" style={{ fontSize: 7 }}>SPONSORED · yourbusiness.com</text>
        <rect className={s.iv} x="30" y="80" width="130" height="6" rx="3" />
        <rect className={s.s3} x="30" y="90" width="160" height="4" rx="2" />
      </g>
      {[112, 144].map((y, i) => (
        <g key={y} className={s.res} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
          <rect x="20" y={y} width="200" height="26" rx="8" className={s.sf} />
          <rect className={s.s2} x="30" y={y + 7} width={110 - i * 20} height="5" rx="2.5" />
          <rect className={s.sf} x="30" y={y + 15} width="150" height="4" rx="2" />
        </g>
      ))}
      <g transform="translate(234 60)">
        <rect width="66" height="110" rx="12" className={s.sf} stroke="rgba(247,244,235,.14)" />
        <text x="9" y="18">DAILY</text>
        <text x="9" y="29">BUDGET</text>
        <rect className={s.s2} x="9" y="42" width="48" height="6" rx="3" />
        <rect className={cx(s.meter, s.li)} x="9" y="42" width="48" height="6" rx="3" />
        <text x="9" y="70">CLICK</text>
        <text x="9" y="81">→ CALL</text>
        <circle className={s.co} cx="46" cy="94" r="5" />
      </g>
      <g className={s.cur}><path d="M0 0 L0 15 L4 11 L7.5 18 L10 17 L6.8 10 L12 10 Z" fill="#F7F4EB" stroke="#141318" strokeWidth="1" /></g>
      <text x="20" y="190">KEYWORDS · SEARCH TERMS · CONVERSIONS</text>
    </svg>
  );
}

/* ---------- AI UGC-style video ---------- */
function UgcIll() {
  const bars = [0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.3, 0.7, 0.55, 0.95, 0.45];
  return (
    <svg className={cx(s.ill, s.ugc)} viewBox="0 0 320 200" aria-hidden="true">
      <defs>
        <linearGradient id="ill-ugc-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7654E8" stopOpacity=".55" /><stop offset="1" stopColor="#141318" /></linearGradient>
      </defs>
      <rect x="112" y="10" width="96" height="180" rx="14" fill="url(#ill-ugc-bg)" stroke="rgba(247,244,235,.2)" />
      <g className={s.head}>
        <circle cx="160" cy="70" r="20" fill="#F7F4EB" opacity=".9" />
        <path d="M124 136 C 128 104, 192 104, 196 136 L196 150 L124 150 Z" fill="#F7F4EB" opacity=".9" />
      </g>
      <rect x="120" y="18" width="46" height="13" rx="6.5" fill="rgba(20,19,24,.75)" stroke="#D2ED7A" strokeWidth=".8" />
      <text className={s.lm} x="126" y="27" style={{ fontSize: 6.5 }}>AI-MADE</text>
      <g transform="translate(0 0)">
        <text className={cx(s.lt, s.w1)} x="124" y="166" style={{ fontSize: 8 }}>Book</text>
        <text className={cx(s.lt, s.w2)} x="146" y="166" style={{ fontSize: 8 }}>a</text>
        <text className={cx(s.lt, s.w3)} x="154" y="166" style={{ fontSize: 8 }}>free</text>
        <text className={cx(s.lm, s.w4)} x="174" y="166" style={{ fontSize: 8 }}>check</text>
      </g>
      <g transform="translate(124 176)">
        {bars.map((h, i) => (
          <rect key={i} className={cx(s.bar, i % 3 === 0 ? s.li : s.s3)} x={i * 7} y={-8 * h} width="4" height={8 * h} rx="2" style={{ animationDelay: `${-i * 0.13}s` }} />
        ))}
      </g>
      <g transform="translate(40 58)">
        <circle className={cx(s.play)} cx="20" cy="20" r="18" fill="none" stroke="#D2ED7A" />
        <circle cx="20" cy="20" r="18" className={s.sf} stroke="rgba(247,244,235,.2)" />
        <path d="M15 12 L28 20 L15 28 Z" className={s.iv} />
        <text x="-4" y="60">SCRIPT</text>
        <text x="-4" y="72">→ VOICE</text>
        <text x="-4" y="84">→ EDIT</text>
      </g>
      <g transform="translate(228 54)">
        {['9:16', '1:1', '16:9'].map((r, i) => (
          <g key={r} transform={`translate(0 ${i * 30})`}>
            <rect width="54" height="22" rx="7" className={s.sf} stroke="rgba(247,244,235,.16)" />
            <text x="10" y="14" className={i === 0 ? s.lm : undefined}>{r}</text>
          </g>
        ))}
        <text x="0" y="112">EXPORTS</text>
      </g>
    </svg>
  );
}

/* ---------- SEO & Local SEO ---------- */
function LocalIll() {
  return (
    <svg className={cx(s.ill, s.local)} viewBox="0 0 320 200" aria-hidden="true">
      <g opacity=".9">
        <rect x="16" y="16" width="150" height="168" rx="12" fill="#1B1A20" stroke="rgba(247,244,235,.14)" />
        <path d="M16 70 H166 M16 128 H166 M58 16 V184 M120 16 V184" stroke="rgba(247,244,235,.08)" strokeWidth="6" />
        <path d="M16 100 C 60 96, 90 150, 166 140" stroke="rgba(118,84,232,.5)" strokeWidth="5" fill="none" />
        <rect x="68" y="28" width="40" height="30" rx="4" className={s.sf} />
        <rect x="128" y="80" width="30" height="38" rx="4" className={s.sf} />
        <rect x="24" y="136" width="26" height="40" rx="4" className={s.sf} />
        {[{ x: 40, y: 44 }, { x: 142, y: 160 }, { x: 36, y: 118 }].map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="4" className={s.s3} />)}
        <circle className={s.rip} cx="90" cy="98" r="6" />
        <g className={s.pin}>
          <path d="M90 100 C 80 86, 76 80, 76 74 A14 14 0 0 1 104 74 C 104 80, 100 86, 90 100 Z" fill="#D2ED7A" />
          <circle cx="90" cy="74" r="5" fill="#17170F" />
        </g>
      </g>
      <text x="180" y="26">LOCAL RESULTS</text>
      <g className={s.row}>
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(180 ${36 + i * 30})`}>
            <rect width="124" height="24" rx="7" className={s.sf} />
            <rect className={s.s2} x="8" y="6" width="60" height="4.5" rx="2.25" />
            <rect className={s.sf} x="8" y="14" width="90" height="4" rx="2" />
          </g>
        ))}
      </g>
      <g className={s.you} transform="translate(180 36)">
        <rect width="124" height="24" rx="7" fill="rgba(210,237,122,.12)" stroke="#D2ED7A" />
        <rect className={s.li} x="8" y="6" width="64" height="4.5" rx="2.25" />
        <text className={s.lm} x="8" y="18" style={{ fontSize: 6.5 }}>OPEN NOW · 1.2 MI</text>
      </g>
      <g transform="translate(180 132)">
        <rect width="124" height="52" rx="10" className={s.sf} stroke="rgba(247,244,235,.12)" />
        <text x="10" y="17">PROFILE CHECK</text>
        {['HOURS', 'CATEGORY', 'SERVICE AREA'].map((t, i) => (
          <g key={t} transform={`translate(10 ${26 + i * 9})`}>
            <circle className={s.li} cx="2" cy="-2" r="2" />
            <text x="8" y="0" style={{ fontSize: 6.5 }}>{t}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Applications ---------- */
function AppsIll() {
  return (
    <svg className={cx(s.ill, s.apps)} viewBox="0 0 320 200" aria-hidden="true">
      <rect x="20" y="24" width="190" height="130" rx="10" fill="#1F1E24" stroke="rgba(247,244,235,.18)" />
      <circle className={s.s3} cx="32" cy="35" r="2.5" /><circle className={s.s3} cx="41" cy="35" r="2.5" /><circle className={s.s3} cx="50" cy="35" r="2.5" />
      <line x1="20" y1="45" x2="210" y2="45" stroke="rgba(247,244,235,.1)" />
      <rect x="20" y="45" width="42" height="109" fill="rgba(247,244,235,.03)" />
      {[56, 70, 84, 98].map((y, i) => <rect key={y} className={i === 1 ? s.li : s.s2} x="28" y={y} width="26" height="5" rx="2.5" />)}
      <rect className={cx(s.blk, s.vi)} x="72" y="56" width="126" height="34" rx="6" />
      <rect className={cx(s.blk, s.s2)} x="72" y="98" width="60" height="46" rx="6" style={{ animationDelay: '.2s' }} />
      <rect className={cx(s.blk, s.s2)} x="138" y="98" width="60" height="46" rx="6" style={{ animationDelay: '.35s' }} />
      <text className={s.lt} x="80" y="76" style={{ fontSize: 8 }}>ORDERS TODAY</text>
      <g transform="translate(80 112)">
        <rect className={s.track} width="24" height="12" rx="6" />
        <circle className={cx(s.knob, s.iv)} cx="6" cy="6" r="4.5" />
        <text x="0" y="26" style={{ fontSize: 6.5 }}>NOTIFY</text>
      </g>
      <path className={s.st} d="M210 90 C 228 90, 226 110, 240 110" strokeDasharray="3 5" style={{ stroke: '#9C82F2' }} />
      <path className={cx(s.sync)} d="M210 90 C 228 90, 226 110, 240 110" stroke="#D2ED7A" fill="none" strokeWidth="1.5" />
      <rect x="240" y="40" width="62" height="120" rx="12" fill="#1F1E24" stroke="rgba(247,244,235,.18)" />
      <rect className={s.s3} x="262" y="45" width="18" height="3" rx="1.5" />
      <rect className={cx(s.blk, s.vi)} x="248" y="56" width="46" height="22" rx="5" style={{ animationDelay: '.1s' }} />
      {[86, 100, 114, 128].map((y, i) => <rect key={y} className={cx(s.blk, i === 2 ? s.li : s.s2)} x="248" y={y} width={46 - i * 6} height="8" rx="4" style={{ animationDelay: `${0.3 + i * 0.1}s` }} />)}
      <text x="20" y="178">ROLES · DATA · INTEGRATIONS · RELEASE</text>
    </svg>
  );
}

/* ---------- MVP builds ---------- */
function MvpIll() {
  const items = [
    { label: 'CORE WORKFLOW', keep: true, cls: s.t1 },
    { label: 'SIGN-IN', keep: true, cls: s.t2 },
    { label: 'EXPORT', keep: true, cls: s.t3 },
    { label: 'REFERRALS', keep: false },
    { label: 'DASHBOARD 2.0', keep: false },
  ];
  return (
    <svg className={cx(s.ill, s.mvp)} viewBox="0 0 320 200" aria-hidden="true">
      <text x="22" y="28">FIRST RELEASE SCOPE</text>
      {items.map((it, i) => (
        <g key={it.label} transform={`translate(22 ${40 + i * 26})`} className={it.keep ? undefined : s.cut}>
          <rect width="136" height="20" rx="6" className={s.sf} stroke="rgba(247,244,235,.12)" />
          {it.keep ? (
            <g className={cx(s.tick, it.cls)}>
              <circle cx="12" cy="10" r="6" className={s.li} />
              <path d="M9 10 L11.5 12.5 L15.5 8" fill="none" stroke="#17170F" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          ) : (
            <path d="M8 10 H16" stroke="#FF765E" strokeWidth="1.6" strokeLinecap="round" />
          )}
          <text x="26" y="13" className={it.keep ? s.lt : undefined} style={{ fontSize: 7.5 }}>{it.label}</text>
          {!it.keep && <line x1="26" y1="10.5" x2={26 + it.label.length * 5} y2="10.5" stroke="rgba(247,244,235,.35)" />}
        </g>
      ))}
      <g transform="translate(190 40)">
        <rect className={cx(s.blk, s.b3, s.li)} x="20" y="0" width="70" height="30" rx="8" />
        <rect className={cx(s.blk, s.b2, s.vs)} x="10" y="36" width="90" height="30" rx="8" />
        <rect className={cx(s.blk, s.vi)} x="0" y="72" width="110" height="30" rx="8" />
        <text className={s.dk} x="36" y="19" style={{ fontSize: 7.5 }}>WORKFLOW</text>
        <text className={s.lt} x="34" y="55" style={{ fontSize: 7.5 }}>ACCOUNTS</text>
        <text className={s.lt} x="38" y="91" style={{ fontSize: 7.5 }}>DATA</text>
        <g className={s.tag}>
          <rect x="18" y="116" width="74" height="22" rx="11" fill="rgba(210,237,122,.14)" stroke="#D2ED7A" />
          <text className={s.lm} x="30" y="130" style={{ fontSize: 7.5 }}>v0.1 RELEASED</text>
        </g>
      </g>
      <text x="22" y="186">LEARN FROM REAL USE BEFORE ADDING MORE</text>
    </svg>
  );
}

const web = capabilityIllustrations.web;
const creative = capabilityIllustrations.creative;
const automation = capabilityIllustrations.automation;
const search = capabilityIllustrations.search;
const tracking = capabilityIllustrations.tracking;

/** Illustration per service slug (and the related service of intent pages). */
export const serviceIllustrations: Record<string, () => ReactElement> = {
  'meta-ads': MetaIll,
  'google-ads': GoogleIll,
  'ad-creatives': creative,
  'ai-ugc-videos': UgcIll,
  'seo-websites': web,
  'seo-local-seo': LocalIll,
  applications: AppsIll,
  'mvp-builds': MvpIll,
  'ai-automations': automation,
  search,
  tracking,
};

export function ServiceIllustration({ slug, fallback = 'seo-websites' }: { slug: string; fallback?: string }) {
  const Ill = serviceIllustrations[slug] ?? serviceIllustrations[fallback];
  return <div className={s.pal}><Ill /></div>;
}

/** Hero-sized framed version with a caption row. */
export function IllustrationStage({ slug, caption, detail }: { slug: string; caption?: string; detail?: string }) {
  const Ill = serviceIllustrations[slug] ?? serviceIllustrations['seo-websites'];
  return (
    <div className={cx(s.pal, s.frame)}>
      <div className={s.frameGrid} aria-hidden="true" />
      <div className="relative"><Ill /></div>
      {(caption || detail) && (
        <div className={s.frameCap} aria-hidden="true"><span>{caption}</span><b>{detail}</b></div>
      )}
    </div>
  );
}
