import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/content/site.mjs';
import { apps } from '../src/content/apps.mjs';
import { policies, websitePolicy } from '../src/content/privacy.mjs';
import { context, route, layout, homePage, supportPage, policyPage, contact } from '../src/templates/html.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
await fs.cp(path.join(root, 'public'), out, { recursive: true });
const routes = [];
async function write(slug, html) {
  const destination = path.join(out, slug, 'index.html');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, html);
  routes.push(slug);
}
for (const locale of ['ko', 'en']) {
  await write(route(locale), homePage(context(locale), apps));
  for (const app of apps) {
    if (app[locale]?.steps) await write(route(locale, `${app.slug}/support`), supportPage(context(locale, `${app.slug}/support`), app));
    if (policies[app.slug]?.[locale]) await write(route(locale, `${app.slug}/privacy`), policyPage(context(locale, `${app.slug}/privacy`), policies[app.slug][locale], app));
  }
  if (websitePolicy[locale]) await write(route(locale, 'privacy'), policyPage(context(locale, 'privacy'), websitePolicy[locale]));
}
const ctx = context('ko');
const notFoundHTML = layout(ctx, { title: ctx.t.notFound, description: ctx.t.notFoundText, noindex: true, body: `<section class="container page-hero"><span class="eyebrow">404</span><h1>${ctx.t.notFound}</h1><p>${ctx.t.notFoundText}</p><a class="button primary" href="${site.url}/">${ctx.t.home}</a></section>${contact(ctx)}` });
await fs.writeFile(path.join(out, '404.html'), notFoundHTML.replace(/\b(href|src)="([^"]+)"/g, (match, attr, value) => /^(https?:|mailto:|data:|#)/.test(value) ? match : `${attr}="${new URL(value, site.url + '/').href}"`));
await fs.writeFile(path.join(out, '.nojekyll'), '');
await fs.writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
await fs.writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(slug => `<url><loc>${site.url}/${slug}${slug ? '/' : ''}</loc><lastmod>${site.effectiveDate}</lastmod></url>`).join('')}</urlset>\n`);
console.log(`Built ${routes.length} pages + 404 → dist/`);
