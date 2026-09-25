import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

// Uses the installed agent-browser CLI; no browser dependency is added to the application.
const browser = process.env.AGENT_BROWSER_BIN || (process.platform === 'win32'
  ? join(process.env.APPDATA, 'npm/node_modules/agent-browser/bin/agent-browser-win32-x64.exe') : 'agent-browser');
const base = process.env.SEO_CHECK_BASE || 'http://localhost:3187';
const run = (...args) => {
  const result = JSON.parse(execFileSync(browser, ['--session', 'reddystack-regression', '--json', ...args], { encoding: 'utf8', timeout: 45000 }));
  assert.ok(result.success, result.error);
  return result.data;
};
const evaluate = (code) => run('eval', code).result;
const contrast = (fg, bg) => String.raw`(() => {
  const lum = (c) => c.match(/[\d.]+/g).slice(0, 3).map(Number).map((x) => x / 255).map((x) => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4).reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0);
  const a = lum(${fg}), b = lum(${bg});
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
})()`;
// Launch without captured pipes so detached Chrome cannot keep a Windows stdout pipe open.
execFileSync(browser, ['--session', 'reddystack-regression', 'open', base], { stdio: 'ignore', timeout: 45000 });
try {
  run('set', 'viewport', '1440', '1000');

  // Content must be readable before (or without) JavaScript: nothing hidden behind scripts.
  run('network', 'route', '**/_next/static/**/*.js', '--abort');
  for (const path of ['/', '/service/meta-ads', '/blog/meta-ads/facebook-ads-audit-checklist']) {
    run('open', `${base}${path}`);
    assert.ok(evaluate(`(() => {
      const els = [document.querySelector('h1'), document.querySelector('main a[href^="/contact"]') || document.querySelector('main a')];
      const hidden = [...document.querySelectorAll('[data-reveal], [data-split]')].filter((e) => getComputedStyle(e).opacity === '0');
      return els.every((e) => e && getComputedStyle(e).opacity === '1' && e.getBoundingClientRect().height > 0) && hidden.length === 0;
    })()`), `${path}: heading, a call to action and all reveal content must render without JavaScript`);
  }
  run('network', 'unroute', '**/_next/static/**/*.js');

  run('open', base);
  run('wait', '--load', 'networkidle');
  evaluate('window.regressionErrors=[]; window.addEventListener("error", e => window.regressionErrors.push(e.message))');
  assert.ok(!evaluate('Boolean(document.getElementById("loading"))'), 'No full-screen loader over server-rendered content');
  // Scroll scenes must never pin the hero's entrance at its first frame.
  run('wait', '--fn', `[...document.querySelectorAll('[data-chip], [data-flow]')].every((e) => getComputedStyle(e).opacity === '1')`);

  // Primary buttons stay readable at rest and on hover (the ivory sweep).
  const cta = 'main a[data-slot="button"][data-variant="default"]';
  assert.ok(evaluate(contrast(`getComputedStyle(document.querySelector('${cta}')).color`, `getComputedStyle(document.querySelector('${cta}')).backgroundColor`)) >= 4.5, 'Primary button text contrast');
  assert.ok(evaluate(contrast(`getComputedStyle(document.querySelector('${cta}')).color`, `'rgb(247, 244, 235)'`)) >= 4.5, 'Primary button hover contrast');
  run('hover', cta);
  assert.deepEqual(evaluate('window.regressionErrors'), [], 'Hover must not throw');

  // Diagnostic tabs follow the ARIA tabs keyboard pattern.
  assert.equal(evaluate('document.getElementById("hv3-tab-visibility").tabIndex'), 0, 'Initial tab must be reachable');
  run('focus', '#hv3-tab-visibility');
  run('press', 'ArrowRight');
  assert.equal(evaluate('document.activeElement.id'), 'hv3-tab-conversion');
  assert.equal(evaluate('document.getElementById("hv3-tab-conversion").getAttribute("aria-selected")'), 'true');
  run('press', 'Home');
  assert.equal(evaluate('document.activeElement.id'), 'hv3-tab-visibility');

  // FAQ answers stay in the page and expose their state.
  assert.ok(evaluate(`(() => { const d = document.querySelectorAll('#main details')[1]; d.querySelector('summary').click(); return d.open; })()`), 'FAQ items must open');

  // Repeated client-side navigation cleans up scroll scenes and listeners.
  // The header hides while scrolling down, as it does for visitors; return to the top first.
  evaluate('window.scrollTo(0, 0)');
  run('wait', '--fn', '!document.querySelector("header").hasAttribute("data-hidden")');
  for (let i = 0; i < 3; i++) {
    run('click', 'header a[href="/contact"]');
    run('wait', '--url', '**/contact');
    run('click', 'header a[aria-label="ReddyStack home"]');
    run('wait', '--url', `${base}/`);
    run('wait', '#hv3-title');
  }
  assert.deepEqual(evaluate('window.regressionErrors'), [], 'Client-side navigation must not throw');
  console.log('Verified no-JS content, button contrast, keyboard tabs, FAQ and repeated navigation.');

  // Mobile: no sideways scroll, menu is a dialog that Escape closes.
  run('set', 'viewport', '390', '844');
  run('open', base);
  assert.ok(evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile home must not overflow');
  run('find', 'role', 'button', 'click', '--name', 'Open menu');
  run('wait', '[role="dialog"]');
  run('press', 'Escape');
  run('wait', '--fn', '!document.querySelector("[role=dialog]")');

  // Contact form: focus and errors, and a failed send keeps the enquiry.
  run('open', `${base}/contact`);
  run('click', 'button[type="submit"]');
  run('wait', '--fn', 'document.activeElement && document.activeElement.id === "contact-name"');
  assert.equal(evaluate('["name","company","email","message"].filter(f => document.getElementById(`contact-${f}-error`).textContent).length'), 4);
  assert.ok(evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile contact must not overflow');
  // Stub the network boundary so checking a failed send cannot email anyone.
  run('network', 'route', '**/api/contact', '--abort');
  run('fill', '#contact-name', 'Browser check');
  run('fill', '#contact-company', 'Example');
  run('fill', '#contact-email', 'test@example.test');
  run('fill', '#contact-message', 'Keep this enquiry on a failed send.');
  run('focus', 'button[type="submit"]');
  run('press', 'Enter');
  run('wait', '--fn', 'Boolean(document.querySelector("form a[href^=mailto]"))');
  assert.equal(evaluate('document.getElementById("contact-message").value'), 'Keep this enquiry on a failed send.');
  run('network', 'unroute', '**/api/contact');

  // Service pages: a quote link is visible without scrolling on a small phone and carries context.
  run('set', 'viewport', '360', '800');
  run('open', `${base}/service/ai-ugc-videos`);
  const earlyCta = 'main a[href^="/contact?service="]';
  assert.ok(evaluate(`document.querySelector('${earlyCta}').getBoundingClientRect().bottom <= innerHeight`), 'Mobile quote link must be visible without scrolling');
  run('click', earlyCta);
  run('wait', '--fn', 'Boolean(document.querySelector("fieldset button[aria-pressed=true]"))');
  assert.equal(evaluate('document.querySelector("fieldset button[aria-pressed=true]").textContent'), 'AI-Assisted Video');
  run('click', 'fieldset button[aria-pressed=true]');
  assert.equal(evaluate('document.querySelectorAll("fieldset:first-of-type button[aria-pressed=true]").length'), 0, 'Preselected service remains editable');
  run('find', 'role', 'button', 'click', '--name', 'AI-Assisted Video', '--exact');
  run('find', 'role', 'button', 'click', '--name', 'GBP', '--exact');
  run('find', 'role', 'button', 'click', '--name', '£750–£2,000', '--exact');
  evaluate(`window.enquiryEvents=[]; window.gtag=(...args)=>window.enquiryEvents.push(args);
    window.fetch=async (url, options)=>{if(url!='/api/contact') throw new Error('Unexpected test fetch'); window.enquiryBody=JSON.parse(options.body); return new Response(JSON.stringify({success:true,requestId:'test-reference'}), {status:200,headers:{'Content-Type':'application/json'}});}`);
  run('fill', '#contact-name', 'Browser check');
  run('fill', '#contact-company', 'My project');
  run('fill', '#contact-email', 'test@example.test');
  run('fill', '#contact-message', 'Discuss the AI video scope.');
  run('focus', 'button[type="submit"]');
  run('press', 'Enter');
  run('wait', '--fn', 'window.enquiryEvents.some(e=>e[1]==="contact_form_submit")');
  assert.equal(evaluate('window.enquiryBody.sourcePage'), '/service/ai-ugc-videos');
  assert.deepEqual(evaluate('window.enquiryBody.services'), ['AI-Assisted Video']);
  assert.equal(evaluate('window.enquiryBody.budget'), '£750–£2,000', 'GBP budgets reach the API');
  const lead = evaluate('window.enquiryEvents.find(e=>e[1]==="contact_form_submit")[2]');
  assert.equal(lead.source_page, '/service/ai-ugc-videos');
  assert.equal(lead.lead_id, 'test-reference');
  assert.ok(!JSON.stringify(lead).includes('test@example.test'), 'Do not send enquiry PII to analytics');
  run('wait', '--fn', 'document.body.textContent.includes("Message sent.")');
  for (const [path, service] of [['/website-development', 'Website & Tracking Foundation'], ['/service/ai-automations', 'Automation or Product Build']]) {
    run('open', `${base}${path}`);
    run('click', earlyCta);
    run('wait', '--fn', 'Boolean(document.querySelector("fieldset button[aria-pressed=true]"))');
    assert.equal(evaluate('document.querySelector("fieldset button[aria-pressed=true]").textContent'), service);
  }
  run('open', `${base}/contact?service=unknown&source=https%3A%2F%2Fspam.example`);
  assert.equal(evaluate('document.querySelectorAll("fieldset:first-of-type button[aria-pressed=true]").length'), 0, 'Unknown service must not select a category');
  assert.equal(evaluate('document.querySelector("link[rel=canonical]").href'), 'https://www.reddystack.com/contact', 'Context must not create a separate canonical URL');
  console.log('Verified mobile menu and overflow, validation, failed-send recovery, early mobile CTA, service mapping, currency budgets and lead analytics. No email sent.');

  // Reduced motion: everything visible immediately, SVG animations paused, no smooth-scroll hijack.
  run('set', 'viewport', '1440', '1000');
  run('set', 'media', 'dark', 'reduced-motion');
  run('open', base);
  run('wait', '--load', 'networkidle');
  assert.ok(evaluate(`[...document.querySelectorAll('[data-reveal], [data-split]')].every((e) => getComputedStyle(e).opacity !== '0')`), 'Reduced motion must not hide content');
  assert.ok(evaluate(`!document.documentElement.classList.contains('lenis-smooth')`), 'Reduced motion must keep native scrolling');
  assert.ok(evaluate(`[...document.querySelectorAll('svg')].filter((s) => s.querySelector('animate, animateMotion')).every((s) => s.animationsPaused())`), 'Reduced motion must pause SVG animation');
  console.log('Verified reduced motion.');
} finally {
  run('close');
}
