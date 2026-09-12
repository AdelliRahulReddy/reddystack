import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

(async () => {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const master = await fs.readFile(path.join(root, 'public/assets/img/logo/reddystack-symbol.svg'));
  const logo = await sharp(master).resize(512, 512).png().toBuffer();
  // Retain existing public URLs for previously shared or cached pages.
  for (const destination of ['public/assets/img/logo/reddystack-symbol.png', 'public/assets/img/logo/favicon.png', 'public/assets/img/logo/reddystack-monogram-transparent.png', 'src/app/icon.png']) {
    await fs.writeFile(path.join(root, destination), logo);
  }
  await sharp(master).resize(180, 180).flatten({ background: '#302F35' }).png().toFile(path.join(root, 'src/app/apple-icon.png'));

  const sizes = [16, 32, 48, 64];
  const frames = await Promise.all(sizes.map(size => sharp(master).resize(size, size).png().toBuffer()));
  const directory = Buffer.alloc(6 + frames.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(frames.length, 4);
  let offset = directory.length;
  frames.forEach((frame, index) => {
    const entry = 6 + index * 16;
    directory[entry] = sizes[index];
    directory[entry + 1] = sizes[index];
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(frame.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += frame.length;
  });
  await fs.writeFile(path.join(root, 'src/app/favicon.ico'), Buffer.concat([directory, ...frames]));

  const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#302F35"/>
    <g font-family="Arial, sans-serif" fill="#F7F4EB" font-weight="700">
      <text x="160" y="121" font-size="56">Reddystack</text>
      <text x="64" y="244" font-size="64">Ads, Creative &amp; Websites</text>
      <text x="64" y="319" font-size="64">That Grow Your Business.</text>
    </g>
    <text x="64" y="390" font-family="Arial, sans-serif" font-size="27" fill="#CBC9C3">Meta &amp; Google Ads, ad creatives, AI UGC-style videos, websites, and SEO.</text>
    <text x="64" y="561" font-family="Arial, sans-serif" font-size="27" fill="#D2ED7A">reddystack.com</text>
  </svg>`);
  const social = await sharp(card).composite([{ input: await sharp(master).resize(92, 92).png().toBuffer(), left: 54, top: 53 }]).png().toBuffer();
  for (const version of [1, 2, 3, 4]) await fs.writeFile(path.join(root, `public/assets/img/social/reddystack-share-v${version}.png`), social);

  const { data, info } = await sharp(logo).raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.channels, 4);
  assert.equal(data[3], 0, 'Logo background must be transparent');
  for (const [sx, sy, rgb] of [[350, 850, [112, 85, 232]], [550, 470, [205, 235, 118]], [950, 440, [255, 118, 94]]]) {
    const i = (Math.floor((sy - 125) * 512 / 1000) * 512 + Math.floor((sx - 125) * 512 / 1000)) * 4;
    assert.deepEqual([...data.subarray(i, i + 4)], [...rgb, 255]);
  }
  const ico = await fs.readFile(path.join(root, 'src/app/favicon.ico'));
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), sizes.length);
  for (let i = 0; i < sizes.length; i++) {
    const start = ico.readUInt32LE(6 + i * 16 + 12);
    const length = ico.readUInt32LE(6 + i * 16 + 8);
    const frame = await sharp(ico.subarray(start, start + length)).metadata();
    assert.equal(frame.width, sizes[i]);
    assert.equal(frame.height, sizes[i]);
    assert.equal(frame.hasAlpha, true);
  }
  const socialInfo = await sharp(social).metadata();
  assert.equal(socialInfo.width, 1200);
  assert.equal(socialInfo.height, 630);
  console.log('Verified logo palette/transparency, 4 favicon sizes and 1200 × 630 social cards.');
})().catch(error => { console.error(error); process.exitCode = 1; });
