import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const destination = path.join(
  root,
  "public/assets/img/social/reddystack-proof-first.png",
);
const logoPath = path.join(
  root,
  "public/assets/img/logo/reddystack-symbol.svg",
);

const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F7F4EB"/>
  <circle cx="1125" cy="55" r="185" fill="#E8E1FF" opacity="0.72"/>
  <circle cx="1085" cy="600" r="165" fill="#E9F7B8" opacity="0.72"/>

  <g font-family="Arial, Helvetica, sans-serif" fill="#302F35">
    <text x="148" y="102" font-size="40" font-weight="800" letter-spacing="-1">ReddyStack</text>
    <text x="148" y="132" font-size="15" font-weight="700" letter-spacing="2.2">PROOF-FIRST DIGITAL GROWTH STUDIO</text>

    <text x="70" y="262" font-size="70" font-weight="800" letter-spacing="-3">One Problem.</text>
    <text x="70" y="335" font-size="70" font-weight="800" letter-spacing="-3">One Connected Stack.</text>
    <text x="70" y="398" font-size="34" font-weight="800" fill="#7654E8">Proof Before Scale.</text>

    <text x="70" y="558" font-size="21" font-weight="700">Built by Rahul Reddy</text>
    <text x="285" y="558" font-size="21" fill="#8D8992">•</text>
    <text x="310" y="558" font-size="21">Hyderabad · Worldwide</text>
    <text x="70" y="590" font-size="18" fill="#7654E8">reddystack.com</text>
  </g>

  <g font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" letter-spacing="1.8">
    <rect x="872" y="128" width="252" height="78" rx="22" fill="#302F35"/>
    <text x="902" y="177" fill="#FFFFFF">DIAGNOSE</text>

    <rect x="846" y="222" width="278" height="78" rx="22" fill="#7654E8"/>
    <text x="876" y="271" fill="#FFFFFF">BUILD</text>

    <rect x="820" y="316" width="304" height="78" rx="22" fill="#D2ED7A"/>
    <text x="850" y="365" fill="#302F35">PROVE</text>

    <rect x="794" y="410" width="330" height="78" rx="22" fill="#FF8068"/>
    <text x="824" y="459" fill="#302F35">SCALE</text>
  </g>
</svg>`);

const logo = await sharp(logoPath).resize(60, 60).png().toBuffer();
await sharp(card)
  .composite([{ input: logo, left: 70, top: 58 }])
  .png()
  .toFile(destination);

const metadata = await sharp(destination).metadata();
assert.equal(metadata.width, 1200);
assert.equal(metadata.height, 630);
assert.equal(metadata.format, "png");
console.log("Built and verified the 1200 × 630 proof-first social card.");
