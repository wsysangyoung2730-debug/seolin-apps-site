import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { apps } from '../src/content/apps.mjs';
import { site } from '../src/content/site.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const failures = [];
let linkCount = 0;
async function files(dir) {
  return (await Promise.all((await fs.readdir(dir, { withFileTypes: true })).map(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const pages = (await files(root)).filter(file => file.endsWith('index.html'));
const expected = 2 + apps.length * 4 + 2;
if (pages.length !== expected) failures.push(`Expected ${expected} pages, got ${pages.length}`);
for (const file of pages) {
  const html = await fs.readFile(file, 'utf8');
  const name = path.relative(root, file);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) failures.push(`${name}: duplicate ids`);
  if ((html.match(/<h1\b/g) || []).length !== 1) failures.push(`${name}: expected one h1`);
  if (!/<html lang="(ko|en)">/.test(html)) failures.push(`${name}: missing language`);
  if (!html.includes('name="viewport"') || !html.includes('id="main"')) failures.push(`${name}: missing viewport or main landmark`);
  if (!html.includes(site.contact.email) || !html.includes(site.contact.name)) failures.push(`${name}: missing approved contact`);
  if (/sangyoung2730@|010-8807|\bTODO\b|\bTBD\b|준비 중입니다|localhost|127\.0\.0\.1/.test(html)) failures.push(`${name}: private contact or placeholder`);
  if (html.includes('<form') || html.includes('<iframe') || /<script[^>]+src="https?:/.test(html)) failures.push(`${name}: unexpected form, embed or external script`);
  const pageUrl = new URL(name.replace(/index\.html$/, ''), 'https://site.invalid/');
  for (const [, attribute, raw] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(raw)) continue;
    linkCount++;
    const url = new URL(raw.replaceAll('&amp;', '&'), pageUrl);
    const target = path.join(root, decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
    try { await fs.access(target); } catch { failures.push(`${name}: missing ${attribute} ${raw}`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const targetHTML = await fs.readFile(target, 'utf8');
      if (!targetHTML.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) failures.push(`${name}: missing fragment ${raw}`);
    }
  }
  if (name.includes('/privacy/')) {
    for (const value of [site.effectiveDate, 'v1.0', 'Vercel']) if (!html.includes(value)) failures.push(`${name}: missing policy field ${value}`);
    if ((html.match(/<section id="section-/g) || []).length < 7) failures.push(`${name}: incomplete policy`);
  }
}
const script = await fs.readFile(path.join(root, 'assets/wordmark.js'), 'utf8');
if (/\b(fetch|XMLHttpRequest|localStorage|sessionStorage|sendBeacon)\b/.test(script)) failures.push('Wordmark contains unexpected network or storage calls');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${pages.length} pages and ${linkCount} internal links: language, anchors, assets, policy fields, approved contact and static privacy checks passed.`);
