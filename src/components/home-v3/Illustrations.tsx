import type { ReactElement } from 'react';
import type { LayerKey, Problem } from './homeContent';
import s from './home-v3.module.scss';

const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ');
const MONO = 'var(--font-jetbrains), ui-monospace, monospace';

export { BrandSymbol, brandPaths } from '@/components/site/BrandSymbol';

/* ---------------- hero signal flow ---------------- */
const flows = [
  { id: 'hv3-f1', d: 'M40 70 C 150 70, 220 200, 300 300' },
  { id: 'hv3-f2', d: 'M560 110 C 470 140, 380 200, 300 300' },
  { id: 'hv3-f3', d: 'M40 420 C 130 400, 220 360, 300 300' },
  { id: 'hv3-f4', d: 'M560 480 C 480 470, 380 380, 300 300' },
  { id: 'hv3-f5', d: 'M150 585 C 190 500, 250 380, 300 300' },
];
const packets = [
  { f: 0, r: 4, c: '#D2ED7A', dur: '3.2s', begin: '0s' },
  { f: 0, r: 3, c: '#D2ED7A', dur: '3.2s', begin: '1.6s' },
  { f: 1, r: 4, c: '#9C82F2', dur: '2.8s', begin: '.4s' },
  { f: 1, r: 3, c: '#9C82F2', dur: '2.8s', begin: '1.8s' },
  { f: 2, r: 4, c: '#FF765E', dur: '3.6s', begin: '.9s' },
  { f: 3, r: 4, c: '#F7F4EB', dur: '3s', begin: '.2s' },
  { f: 3, r: 3, c: '#F7F4EB', dur: '3s', begin: '1.7s' },
  { f: 4, r: 4, c: '#D2ED7A', dur: '3.4s', begin: '1.1s' },
];

export function SignalFlow() {
  return (
    <svg className={s.flow} viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true" data-flow>
      <defs>
        <filter id="hv3-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="hv3-core"><stop offset="0" stopColor="#D2ED7A" stopOpacity=".55" /><stop offset="1" stopColor="#D2ED7A" stopOpacity="0" /></radialGradient>
      </defs>
      {flows.map((f) => <path key={f.id} id={f.id} className={s.wire} d={f.d} />)}
      <circle cx="300" cy="300" r="10" fill="url(#hv3-core)">
        <animate attributeName="r" values="10;90" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".9;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <g filter="url(#hv3-glow)">
        {packets.map((p, i) => (
          <circle key={i} r={p.r} fill={p.c}>
            <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite"><mpath href={'#' + flows[p.f].id} /></animateMotion>
          </circle>
        ))}
      </g>
    </svg>
  );
}

/* ---------------- diagnostic visuals ---------------- */
export function DiagnosticVisual({ id }: { id: Problem['id'] }) {
  return (
    <svg className={s.dviz} viewBox="0 0 180 180" aria-hidden="true">
      <defs><linearGradient id="hv3-sw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D2ED7A" stopOpacity=".6" /><stop offset="1" stopColor="#D2ED7A" stopOpacity="0" /></linearGradient></defs>
      {id === 'visibility' && (
        <g>
          <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(247,244,235,.16)" />
          <circle cx="90" cy="90" r="48" fill="none" stroke="rgba(247,244,235,.12)" />
          <circle cx="90" cy="90" r="24" fill="none" stroke="rgba(247,244,235,.1)" />
          <path d="M90 90 L90 18 A72 72 0 0 1 152 54 Z" fill="url(#hv3-sw)">
            <animateTransform attributeName="transform" type="rotate" from="0 90 90" to="360 90 90" dur="3.2s" repeatCount="indefinite" />
          </path>
          <circle cx="128" cy="62" r="4" fill="#D2ED7A"><animate attributeName="opacity" values="0;1;0" dur="3.2s" begin=".3s" repeatCount="indefinite" /></circle>
          <circle cx="60" cy="122" r="3" fill="#9C82F2"><animate attributeName="opacity" values="0;1;0" dur="3.2s" begin="1.9s" repeatCount="indefinite" /></circle>
          <circle cx="118" cy="132" r="3" fill="#F7F4EB"><animate attributeName="opacity" values="0;1;0" dur="3.2s" begin="1.2s" repeatCount="indefinite" /></circle>
          <circle cx="90" cy="90" r="4" fill="#F7F4EB" />
        </g>
      )}
      {id === 'conversion' && (
        <g>
          <path d="M14 78 H166 M14 102 H56 M70 102 H106 M120 102 H166" stroke="rgba(247,244,235,.3)" strokeWidth="1.5" fill="none" />
          <circle r="4" fill="#F7F4EB"><animateMotion dur="2.4s" repeatCount="indefinite" path="M14 90 H166" /></circle>
          <circle r="4" fill="#FF765E"><animateMotion dur="2.4s" begin=".5s" repeatCount="indefinite" path="M14 90 H63 Q66 90 63 130 T 60 176" /></circle>
          <circle r="4" fill="#FF765E"><animateMotion dur="2.4s" begin="1.1s" repeatCount="indefinite" path="M14 90 H113 Q116 90 113 130 T 110 176" /></circle>
          <circle r="4" fill="#D2ED7A"><animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite" path="M14 90 H166" /></circle>
          <text x="14" y="66" fontFamily={MONO} fontSize="10" fill="#A8A5B3">CLICK</text>
          <text x="166" y="66" textAnchor="end" fontFamily={MONO} fontSize="10" fill="#A8A5B3">FORM</text>
          <text x="63" y="170" textAnchor="middle" fontFamily={MONO} fontSize="9" fill="#FF765E">LEAK</text>
          <text x="113" y="170" textAnchor="middle" fontFamily={MONO} fontSize="9" fill="#FF765E">LEAK</text>
        </g>
      )}
      {id === 'measurement' && (
        <g>
          <path fill="none" stroke="#9C82F2" strokeWidth="2.5" strokeLinecap="round" d="M20 90 C 80 10, 30 170, 90 90 S 120 10, 160 90">
            <animate attributeName="d" dur="4s" repeatCount="indefinite" keyTimes="0;.35;.65;1" values="M20 90 C 80 10, 30 170, 90 90 S 120 10, 160 90;M20 90 C 50 90, 60 90, 90 90 S 130 90, 160 90;M20 90 C 50 90, 60 90, 90 90 S 130 90, 160 90;M20 90 C 80 10, 30 170, 90 90 S 120 10, 160 90" />
            <animate attributeName="stroke" dur="4s" repeatCount="indefinite" keyTimes="0;.35;.65;1" values="#9C82F2;#D2ED7A;#D2ED7A;#9C82F2" />
          </path>
          <circle cx="20" cy="90" r="6" fill="#F7F4EB" />
          <circle cx="160" cy="90" r="6" fill="#D2ED7A" />
          <text x="20" y="124" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#A8A5B3">SPEND</text>
          <text x="160" y="124" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#A8A5B3">ENQUIRY</text>
        </g>
      )}
    </svg>
  );
}

/* ---------------- capability illustrations ---------------- */
function WebIll() {
  return (
    <svg className={cx(s.ill, s.illWeb)} viewBox="0 0 320 200" aria-hidden="true">
      <rect className={s.fr} x="20" y="16" width="280" height="168" rx="12" />
      <circle className={s.s3} cx="36" cy="30" r="3" /><circle className={s.s3} cx="46" cy="30" r="3" /><circle className={s.s3} cx="56" cy="30" r="3" />
      <rect className={s.sf} x="72" y="25" width="150" height="10" rx="5" />
      <text x="80" y="33" style={{ fontSize: 7 }}>yourbusiness.com</text>
      <line x1="20" y1="44" x2="300" y2="44" stroke="rgba(247,244,235,.1)" />
      <rect className={cx(s.b, s.iv)} x="36" y="58" width="150" height="14" rx="4" />
      <rect className={cx(s.b, s.iv)} x="36" y="76" width="112" height="14" rx="4" style={{ animationDelay: '.12s' }} />
      <rect className={cx(s.b, s.s2)} x="36" y="100" width="164" height="6" rx="3" style={{ animationDelay: '.24s' }} />
      <rect className={cx(s.b, s.s2)} x="36" y="112" width="136" height="6" rx="3" style={{ animationDelay: '.32s' }} />
      <rect className={cx(s.b, s.s2)} x="36" y="124" width="150" height="6" rx="3" style={{ animationDelay: '.4s' }} />
      <rect className={cx(s.b, s.ctaBtn)} x="36" y="144" width="70" height="22" rx="11" style={{ animationDelay: '.5s' }} />
      <text className={s.dk} x="47" y="158" style={{ fontSize: 8 }}>GET A QUOTE</text>
      <g className={s.img} style={{ animationDelay: '.2s' }}>
        <rect className={s.vi} x="212" y="58" width="72" height="108" rx="10" />
        <circle cx="248" cy="96" r="14" fill="rgba(255,255,255,.25)" />
        <path d="M222 156 L244 128 L258 144 L268 134 L278 156 Z" fill="rgba(255,255,255,.3)" />
      </g>
      <circle className={s.rip} cx="70" cy="155" r="4" />
      <g className={s.ptr}><path d="M0 0 L0 15 L4 11 L7.5 18 L10 17 L6.8 10 L12 10 Z" fill="#F7F4EB" stroke="#141318" strokeWidth="1" /></g>
    </svg>
  );
}

function SearchRow({ y, w1, w2, delay }: { y: number; w1: number; w2: number; delay: string }) {
  return (
    <g className={s.down}>
      <g className={s.rw} style={{ animationDelay: delay }}>
        <rect className={s.sf} x="20" y={y} width="280" height="26" rx="8" />
        <circle className={s.s3} cx="34" cy={y + 13} r="5" />
        <rect className={s.s2} x="46" y={y + 8} width={w1} height="5" rx="2.5" />
        <rect className={s.sf} x="46" y={y + 16} width={w2} height="4" rx="2" />
      </g>
    </g>
  );
}

function SearchIll() {
  return (
    <svg className={cx(s.ill, s.illSearch)} viewBox="0 0 320 200" aria-hidden="true">
      <rect x="20" y="16" width="280" height="32" rx="16" fill="#1F1E24" stroke="rgba(247,244,235,.16)" />
      <circle cx="38" cy="32" r="6" className={s.st} />
      <line x1="42.5" y1="36.5" x2="47" y2="41" stroke="rgba(247,244,235,.4)" strokeWidth="1.5" />
      <text x="56" y="36" style={{ fontSize: 11, fill: '#F7F4EB', letterSpacing: 0 }}>plumber near austin</text>
      <rect className={s.cover} x="54" y="22" width="190" height="20" fill="#1F1E24" />
      <rect className={cx(s.caret, s.li)} x="55" y="24" width="1.5" height="16" />
      <SearchRow y={92} w1={120} w2={180} delay="0s" />
      <SearchRow y={124} w1={100} w2={160} delay=".1s" />
      <SearchRow y={156} w1={130} w2={150} delay=".2s" />
      <g className={s.you}>
        <rect x="20" y="60" width="280" height="26" rx="8" fill="rgba(210,237,122,.12)" stroke="#D2ED7A" />
        <circle className={s.li} cx="34" cy="73" r="5" />
        <rect className={s.li} x="46" y="68" width="110" height="5" rx="2.5" />
        <rect className={s.s2} x="46" y="76" width="170" height="4" rx="2" />
        <text x="292" y="76" textAnchor="end" style={{ fill: '#D2ED7A', fontSize: 8 }}>YOUR SITE</text>
      </g>
    </svg>
  );
}

function PaidIll() {
  const bars = [-0.2, -1.1, -2.1, -0.7, -3, -1.8, -2.6, -0.4];
  return (
    <svg className={cx(s.ill, s.illPaid)} viewBox="0 0 320 200" aria-hidden="true">
      <line x1="30" y1="172" x2="300" y2="172" stroke="rgba(247,244,235,.2)" />
      <line className={s.capLine} x1="30" y1="52" x2="300" y2="52" />
      <text x="300" y="44" textAnchor="end" style={{ fill: '#FF765E' }}>BUDGET CAP</text>
      {bars.map((d, i) => (
        <rect key={i} className={cx(s.bar, i % 2 ? s.s3 : s.vi)} x={44 + i * 32} y="72" width="16" height="100" rx="3" style={{ animationDelay: d + 's' }} />
      ))}
      <path className={cx(s.stl, s.trend)} pathLength={1} d="M40 78 C 90 82, 120 112, 160 116 S 240 150, 292 152" />
      <text x="36" y="190">META</text>
      <text x="84" y="190" style={{ fill: '#8F8C99' }}>GOOGLE</text>
      <text x="292" y="190" textAnchor="end" style={{ fill: '#D2ED7A' }}>COST PER ENQUIRY ↓</text>
    </svg>
  );
}

function CreativeCard({ cls, head, label, stroke, bg, play }: { cls: string; head: string; label: string; stroke: string; bg: string; play?: boolean }) {
  return (
    <g className={cx(s.cd, cls)}>
      <rect x="125" y="46" width="70" height="112" rx="10" fill={bg} stroke={stroke} />
      <rect className={head} x="131" y="52" width="58" height="52" rx="6" />
      {play && <path d="M152 70 L170 78 L152 86 Z" fill="#17170F" />}
      <rect className={s.s2} x="131" y="112" width="44" height="5" rx="2.5" />
      <rect className={s.sf} x="131" y="122" width="54" height="4" rx="2" />
      <text x="131" y="148" style={play ? { fill: '#D2ED7A' } : undefined}>{label}</text>
    </g>
  );
}

function CreativeIll() {
  return (
    <svg className={cx(s.ill, s.illCre)} viewBox="0 0 320 200" aria-hidden="true">
      <CreativeCard cls={s.cA} head={s.vi} label="A" stroke="rgba(247,244,235,.2)" bg="#25242B" />
      <CreativeCard cls={s.cC} head={s.co} label="C" stroke="rgba(247,244,235,.2)" bg="#25242B" />
      <CreativeCard cls={s.cB} head={s.li} label="B · VIDEO" stroke="#D2ED7A" bg="#2B2A31" play />
      <g className={s.win}>
        <circle className={s.li} cx="196" cy="46" r="11" />
        <path d="M190 46 L194.5 50.5 L202 42" fill="none" stroke="#17170F" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <text x="160" y="186" textAnchor="middle">TEST ONE MESSAGE AGAINST ANOTHER</text>
    </svg>
  );
}

const trackDots = [
  { path: 'M90 4 L150 104 L158 150 L160 172', pass: true, begin: '0s' },
  { path: 'M230 4 L220 50 Q 250 70 318 76', pass: false, begin: '.5s' },
  { path: 'M160 4 L162 104 L160 150 L160 172', pass: true, begin: '1s' },
  { path: 'M100 4 L110 50 Q 70 80 2 86', pass: false, begin: '1.5s' },
  { path: 'M200 4 L170 104 L162 150 L160 172', pass: true, begin: '2s' },
  { path: 'M250 4 L240 40 Q 280 50 318 40', pass: false, begin: '2.5s' },
];

function TrackingIll() {
  return (
    <svg className={cx(s.ill, s.illTrack)} viewBox="0 0 320 200" aria-hidden="true">
      <path className={s.st} d="M50 30 H270 L200 110 V150 H120 V110 Z" style={{ fill: 'rgba(247,244,235,.04)' }} />
      <line x1="120" y1="110" x2="200" y2="110" stroke="rgba(247,244,235,.12)" strokeDasharray="3 4" />
      <text x="50" y="22">VISITS</text>
      <text x="270" y="22" textAnchor="end" style={{ fill: '#FF765E' }}>DROP-OFF</text>
      {trackDots.map((d, i) => (
        <circle key={i} r="3.5" fill="#F7F4EB">
          <animateMotion dur="3s" begin={d.begin} repeatCount="indefinite" path={d.path} />
          {d.pass
            ? <animate attributeName="fill" values="#F7F4EB;#F7F4EB;#D2ED7A" keyTimes="0;.7;1" dur="3s" begin={d.begin} repeatCount="indefinite" />
            : <animate attributeName="fill" values="#F7F4EB;#FF765E" dur="3s" begin={d.begin} repeatCount="indefinite" />}
        </circle>
      ))}
      <rect className={s.tick} x="110" y="168" width="100" height="24" rx="12" />
      <text x="160" y="184" textAnchor="middle" style={{ fill: '#F7F4EB' }}>ENQUIRY LOGGED</text>
    </svg>
  );
}

function AutomationIll() {
  const nodes = [
    { x: 26, y: 87, w: 60, label: 'FORM', dl: '0s' },
    { x: 112, y: 43, w: 56, label: 'AI', dl: '1s' },
    { x: 186, y: 87, w: 56, label: 'CRM', dl: '2s' },
    { x: 236, y: 133, w: 72, label: 'REPLY', dl: '3.1s', end: true },
  ];
  return (
    <svg className={cx(s.ill, s.illAuto)} viewBox="0 0 320 200" aria-hidden="true">
      <path id="hv3-auto" className={s.st} d="M56 100 C 86 56, 110 56, 140 56 C 172 56, 190 100, 214 100 C 240 100, 252 146, 272 146" />
      {nodes.map((n) => (
        <g key={n.label}>
          <rect className={cx(s.nd, n.end && s.ndEnd)} x={n.x} y={n.y} width={n.w} height="26" rx="13" strokeWidth="1" style={{ animationDelay: n.dl }} />
          <text x={n.x + n.w / 2} y={n.y + 16} textAnchor="middle" style={{ fill: '#F7F4EB' }}>{n.label}</text>
        </g>
      ))}
      <circle r="5" fill="#D2ED7A" style={{ filter: 'drop-shadow(0 0 6px #D2ED7A)' }}>
        <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear"><mpath href="#hv3-auto" /></animateMotion>
      </circle>
      <text x="26" y="186">NEW LEAD → ROUTED → ANSWERED</text>
    </svg>
  );
}

export const capabilityIllustrations: Record<LayerKey, () => ReactElement> = {
  web: WebIll,
  search: SearchIll,
  paid: PaidIll,
  creative: CreativeIll,
  tracking: TrackingIll,
  automation: AutomationIll,
};

/* ---------------- engagement glyphs ---------------- */
export function EngagementGlyph({ id }: { id: 'sprint' | 'build' | 'operate' }) {
  if (id === 'sprint') {
    return (
      <svg className={s.glyph} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(247,244,235,.25)" />
        <circle cx="32" cy="32" r="17" fill="none" stroke="rgba(247,244,235,.25)" />
        <circle cx="32" cy="32" r="6" fill="#D2ED7A" />
        <line className={s.sweep} x1="32" y1="32" x2="32" y2="4" stroke="#D2ED7A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'build') {
    return (
      <svg className={cx(s.glyph, s.gBuild)} viewBox="0 0 64 64" aria-hidden="true">
        <rect x="10" y="42" width="44" height="10" rx="4" fill="#7654E8" />
        <rect x="14" y="29" width="36" height="10" rx="4" fill="#9C82F2" style={{ animationDelay: '.3s' }} />
        <rect x="18" y="16" width="28" height="10" rx="4" fill="#D2ED7A" style={{ animationDelay: '.6s' }} />
      </svg>
    );
  }
  return (
    <svg className={s.glyph} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(247,244,235,.25)" strokeDasharray="4 5" />
      <path d="M32 18 A14 14 0 1 1 18.5 28" fill="none" stroke="#9C82F2" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 24 L18.5 28.5 L23 24" fill="none" stroke="#9C82F2" strokeWidth="2" strokeLinecap="round" />
      <g className={s.orb}><circle cx="32" cy="10" r="4" fill="#FF765E" /></g>
    </svg>
  );
}

/* ---------------- process wave ---------------- */
const WAVE = 'M28 28 C 130 -8, 232 64, 334 28 S 538 -8, 640 28 S 844 64, 946 28 S 1150 -8, 1208 28';
export function ProcessWave() {
  return (
    <svg className={s.wave} viewBox="0 0 1208 56" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="hv3-wg" x1="0" x2="1"><stop offset="0" stopColor="#7654E8" /><stop offset="1" stopColor="#D2ED7A" /></linearGradient></defs>
      <path className={s.waveBase} vectorEffect="non-scaling-stroke" d={WAVE} />
      <path className={s.waveFill} data-wave-fill pathLength={1} vectorEffect="non-scaling-stroke" d={WAVE} />
      <path className={s.comet} pathLength={1} vectorEffect="non-scaling-stroke" d={WAVE} />
    </svg>
  );
}

export function OrbitText() {
  return (
    <svg className={s.orbit} viewBox="0 0 300 300" aria-hidden="true">
      <defs><path id="hv3-orb" d="M150 150 m-128 0 a128 128 0 1 1 256 0 a128 128 0 1 1 -256 0" /></defs>
      <text><textPath href="#hv3-orb">FOUNDER-LED · HYDERABAD · REMOTE · US &amp; UK · ONE PROBLEM AT A TIME · </textPath></text>
    </svg>
  );
}
