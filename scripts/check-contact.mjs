import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

// Run the real route with only the external email boundary replaced: never send test enquiries.
const require = createRequire(import.meta.url);
const source = await readFile(new URL('../src/app/api/contact/route.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
let sent = [], logs = [], providerError = null, providerThrows = false, now = Date.now();
const env = { RESEND_API_KEY: 'test-only', VERCEL: '1' };
const context = vm.createContext({
  exports: {}, process: { env }, Request, Response, URL, TextDecoder, Uint8Array,
  Date: class extends Date { static now() { return now; } },
  console: { error: (...args) => logs.push(args) },
  require: (name) => name === 'resend' ? { Resend: class {
    emails = { send: async (message) => { sent.push(message); if (providerThrows) throw new Error('private provider detail'); return { error: providerError }; } };
  } } : name === '@/data/siteConfig' ? { siteConfig: { email: 'hello@example.test' } }
    : name === '@/data/contactOptions' ? {
      contactBudgetTitles: ['Under $1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000–$10,000', '$10,000+', 'Under £750', '£750–£2,000', '£2,000–£4,000', '£4,000–£8,000', '£8,000+', 'Under ₹25k', '₹25k–₹50k', '₹50k–₹1L', '₹1L–₹2.5L', '₹2.5L+'],
      contactCategoryTitles: ['Proof Sprint', 'Paid Acquisition — Meta', 'Paid Acquisition — Google', 'Creative & Conversion', 'AI-Assisted Video', 'Website & Tracking Foundation', 'Search Visibility', 'Automation or Product Build', 'Start With the Bottleneck'],
    }
    : require(name),
});
vm.runInContext(code, context);
const valid = { name: 'Test <person>', email: 'test@example.test', company: 'Example', message: 'Please discuss a website.', budget: '₹25k–₹50k', services: ['Website & Tracking Foundation'] };
const post = (body, headers = {}) => context.exports.POST(new Request('https://www.reddystack.com/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://www.reddystack.com', 'x-vercel-forwarded-for': '192.0.2.1', ...headers },
  body: typeof body === 'string' ? body : JSON.stringify(body),
}));

assert.equal((await post({ ...valid, message: 'x'.repeat(4001) })).status, 400, 'Reject overlong fields before email');
assert.equal((await post('{')).status, 400, 'Malformed JSON is a client error');
assert.equal((await post(valid, { origin: 'https://spam.example' })).status, 403, 'Reject foreign browser origins');
assert.equal((await post(valid, { 'content-type': 'text/plain' })).status, 415, 'Require JSON');
assert.equal((await post({ ...valid, services: ['invented service'] })).status, 400, 'Validate service choices');
assert.equal((await post({ ...valid, budget: '€1,000–€2,000' })).status, 400, 'Validate budget choices');
for (const sourcePage of ['https://spam.example', '//spam.example', '/contact?email=private@example.test', '/service/../contact', '/service\nInjected: value', '/service\n', `/${'a'.repeat(180)}!`]) {
  assert.equal((await post({ ...valid, sourcePage })).status, 400, 'Reject external URLs, query data and malformed source paths');
}
assert.equal((await post({ ...valid, website: 'spam.example' })).status, 400, 'Reject filled honeypot');
assert.equal((await post({ ...valid, padding: 'x'.repeat(25000) })).status, 413, 'Bound actual body bytes, even without Content-Length');
assert.equal(sent.length, 0, 'Invalid requests must never send email');
now += 600001;
const accepted = await post({ ...valid, sourcePage: '/service/seo-websites' });
assert.equal(accepted.status, 200);
const receipt = await accepted.json();
assert.match(receipt.requestId, /^[a-f0-9-]{36}$/, 'Return an enquiry reference after provider acceptance');
assert.ok(sent[0].text.includes(receipt.requestId), 'Use the same reference in the enquiry email');
assert.match(sent[0].text, /Source page: \/service\/seo-websites/);
assert.match(sent[0].html, /Test &lt;person&gt;/, 'Escape email HTML');
providerError = { name: 'validation_error', message: 'private email detail', statusCode: 422 };
assert.equal((await post(valid)).status, 502, 'Report provider failure');
assert.ok(logs.some((entry) => JSON.stringify(entry).includes('validation_error')), 'Log provider failure type');
assert.ok(!JSON.stringify(logs).includes('private email detail'), 'Do not log provider messages or enquiry content');
providerError = null;
providerThrows = true;
assert.equal((await post(valid)).status, 502, 'Handle transport failure');
assert.ok(!JSON.stringify(logs).includes('private provider detail'));
providerThrows = false;
const throttled = await post(valid);
assert.equal(throttled.status, 429, 'Fourth attempt in the window must be throttled');
assert.ok(Number(throttled.headers.get('retry-after')) > 0);
now += 600001;
assert.equal((await post(valid)).status, 200, 'Allow requests after the window expires');
now += 600001;
for (let i = 0; i < 20; i++) {
  assert.equal((await post(valid, { 'x-vercel-forwarded-for': `192.0.2.${i + 10}` })).status, 200);
}
assert.equal((await post(valid, { 'x-vercel-forwarded-for': '192.0.2.99' })).status, 429, 'Bound the instance-wide send volume');
now += 600001;
env.VERCEL = '';
for (let i = 0; i < 3; i++) assert.equal((await post(valid, { 'x-forwarded-for': `192.0.2.${i}` })).status, 200);
assert.equal((await post(valid, { 'x-forwarded-for': '192.0.2.200' })).status, 429, 'Do not trust spoofable client headers on other hosts');
env.RESEND_API_KEY = '';
assert.equal((await post(valid)).status, 503, 'Report unavailable email configuration');
assert.ok(logs.some((entry) => JSON.stringify(entry).includes('not_configured')));
console.log('Verified contact validation, body limits, origin, honeypot, escaping, throttling and safe failure logs; no email sent.');
