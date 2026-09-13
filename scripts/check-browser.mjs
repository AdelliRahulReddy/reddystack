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
// Launch without captured pipes so detached Chrome cannot keep a Windows stdout pipe open.
execFileSync(browser, ['--session', 'reddystack-regression', 'open', base], { stdio: 'ignore', timeout: 45000 });
try {
  run('set', 'viewport', '1440', '1000');
  run('open', base);
  run('wait', '--fn', 'document.querySelector(".tp-btn-bounce")?.style.opacity === "1"');
  evaluate('window.regressionErrors=[]; window.addEventListener("error", e => window.regressionErrors.push(e.message))');
  run('hover', '.tp-hover-btn-item');
  assert.deepEqual(evaluate('window.regressionErrors'), [], 'Hover must not throw');
  const colors = evaluate(String.raw`(() => {
    const text = getComputedStyle(document.querySelector('.tp-btn-circle-text')).color;
    const background = getComputedStyle(document.querySelector('.tp-btn-circle-dot')).backgroundColor;
    const luminance = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(x => x/255).map(x => x<=0.04045 ? x/12.92 : ((x+0.055)/1.055)**2.4).reduce((sum,x,i) => sum+x*[0.2126,0.7152,0.0722][i],0);
    const a=luminance(text), b=luminance(background);
    return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
  })()`);
  assert.ok(colors >= 4.5, `CTA hover contrast must be at least 4.5:1, got ${colors}`);
  run('click', 'label[for="header-one-theme-toggle-primary"]');
  const badgeContrast = evaluate(String.raw`(() => {
    const badge=document.querySelector('.tp-testimonial-user-thumb');
    const luminance = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>x/255).map(x=>x<=0.04045 ? x/12.92 : ((x+0.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[0.2126,0.7152,0.0722][i],0);
    const a=luminance(getComputedStyle(badge.firstElementChild).color), b=luminance(getComputedStyle(badge).backgroundColor);
    return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
  })()`);
  assert.ok(badgeContrast >= 4.5, 'Delivery badge needs readable contrast in light mode');
  const controlsReadable = String.raw`(() => {
    const controls=Array.from(document.querySelectorAll('.tp-testimonial-area .tp-btn-border-sm'));
    const luminance = color => color.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>x/255).map(x=>x<=0.04045 ? x/12.92 : ((x+0.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[0.2126,0.7152,0.0722][i],0);
    return controls.length === 2 && controls.every(e=>1.05/(luminance(getComputedStyle(e).color)+0.05)>=4.5);
  })()`;
  run('wait', '--fn', controlsReadable);
  assert.ok(evaluate(controlsReadable), 'Delivery controls must contrast with the light page');
  run('click', 'label[for="header-one-theme-toggle-primary"]');
  console.log('CTA hover is error-free and readable.');
  assert.equal(evaluate('document.getElementById("home-tab").tabIndex'), 0, 'Initial tab must be reachable');
  run('focus', '#home-tab');
  run('press', 'ArrowRight');
  assert.equal(evaluate('document.activeElement.id'), 'blog-tab');
  assert.equal(evaluate('document.querySelector(".tab-pane.active").id'), 'blog');
  run('press', 'Home');
  assert.equal(evaluate('document.activeElement.id'), 'home-tab');
  assert.equal(evaluate('document.querySelector(".tab-pane.active").id'), 'home');
  // Navigate using the real links to exercise cleanup during client-side route transitions.
  for (let i = 0; i < 3; i++) {
    run('focus', '.tp-hover-btn-item');
    run('press', 'Enter');
    run('wait', '--url', '**/contact');
    run('find', 'role', 'link', 'click', '--name', 'Reddystack home');
    run('wait', '--url', `${base}/`);
    run('hover', '.tp-hover-btn-item');
  }
  assert.deepEqual(evaluate('window.regressionErrors'), [], 'Client-side navigation must not throw');
  console.log('Keyboard tabs and repeated navigation passed.');
  run('set', 'viewport', '390', '844');
  assert.ok(evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile home must not overflow');
  run('click', '[aria-label="Open menu"]');
  assert.ok(evaluate('Boolean(document.querySelector("dialog[open]"))'));
  run('press', 'Escape');
  assert.ok(evaluate('!document.querySelector("dialog[open]")'));
  run('open', `${base}/contact`);
  run('click', 'button[type="submit"]');
  assert.equal(evaluate('document.activeElement.id'), 'contact-name', 'Focus first validation error');
  assert.equal(evaluate('Array.from(document.querySelectorAll(".form_error")).filter(x=>x.textContent).length'), 4);
  assert.ok(evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile contact must not overflow');
  // Stub the network boundary so checking a failed send cannot email anyone.
  run('network', 'route', '**/api/contact', '--abort');
  run('fill', '#contact-name', 'Browser check');
  run('fill', '#contact-company', 'Example');
  run('fill', '#contact-email', 'test@example.test');
  run('fill', '#contact-message', 'Keep this enquiry on a failed send.');
  run('click', 'button[type="submit"]');
  run('wait', '--fn', 'Boolean(document.querySelector("form a[href^=mailto]"))');
  assert.equal(evaluate('document.getElementById("contact-message").value'), 'Keep this enquiry on a failed send.');
  assert.ok(evaluate('Boolean(document.querySelector("form a[href^=mailto]"))'));
  console.log('Verified CTA hover, keyboard tabs, repeated navigation, mobile menu/overflow, validation and failed-send recovery. No email sent.');
} finally {
  run('close');
}
