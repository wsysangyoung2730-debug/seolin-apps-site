import path from 'node:path';
import { site, ui } from '../content/site.mjs';

export const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const route = (locale, slug = '') => [locale === 'en' ? 'en' : '', slug].filter(Boolean).join('/');

export function context(locale, slug = '') {
  const current = route(locale, slug);
  const link = (target = '') => {
    const relative = path.posix.relative(current || '.', target || '.');
    return (relative || '.') + '/';
  };
  return { locale, slug, current, t: ui[locale], link, asset: name => link('assets') + name };
}

export function contact(ctx, appName = site.name) {
  const { t } = ctx;
  const subject = `${appName} ${ctx.locale === 'ko' ? '문의' : 'support'}`;
  return `<section class="contact-panel" id="contact" aria-labelledby="contact-title">
    <div><span class="eyebrow">SUPPORT</span><h2 id="contact-title">${t.contactTitle}</h2><p>${t.contactText}</p><p class="small">${t.contactNote}</p></div>
    <div class="contact-details"><p class="small">${t.manager}</p><p class="contact-name">${escape(site.contact.name)}</p><a class="email" href="mailto:${site.contact.email}">${site.contact.email}</a><a class="button primary" href="mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}">${t.mail}<span aria-hidden="true">↗</span></a></div>
  </section>`;
}

export function layout(ctx, { title, description, body, kind = '', noindex = false }) {
  const { t, link, locale, slug, asset } = ctx;
  const altLocale = locale === 'ko' ? 'en' : 'ko';
  const canonical = `${site.url}/${ctx.current}${ctx.current ? '/' : ''}`;
  const languageLink = lang => link(route(lang, slug));
  const home = link(route(locale));
  return `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light">
<title>${escape(title)} | SEOLIN Apps</title><meta name="description" content="${escape(description)}">${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="ko" href="${site.url}/${route('ko', slug)}${slug ? '/' : ''}"><link rel="alternate" hreflang="en" href="${site.url}/${route('en', slug)}/"><link rel="alternate" hreflang="x-default" href="${site.url}/${route('ko', slug)}${slug ? '/' : ''}">
<meta property="og:type" content="website"><meta property="og:title" content="${escape(title)} · SEOLIN Apps"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta name="theme-color" content="#1d2b70">
<link rel="icon" href="${asset('seolin-mark.svg')}" type="image/svg+xml"><link rel="stylesheet" href="${asset('site.css')}"></head>
<body id="top" class="${kind}"><a class="skip-link" href="#main">${t.skip}</a>
<header class="site-header"><div class="header-inner"><a class="wordmark" href="${home}" aria-label="SEOLIN Apps · ${t.home}"><span class="brand-mark" aria-hidden="true">S<span>·</span></span><span>SEOLIN <b>Apps</b></span></a>
<nav aria-label="${locale === 'ko' ? '주 메뉴' : 'Main navigation'}"><a href="${home}#apps">${t.apps}</a><a href="#contact">${t.contact}</a></nav>
<div class="language" aria-label="${t.language}"><a href="${languageLink('ko')}" lang="ko" hreflang="ko"${locale === 'ko' ? ' aria-current="page"' : ''}>한국어</a><span aria-hidden="true">/</span><a href="${languageLink('en')}" lang="en" hreflang="en"${locale === 'en' ? ' aria-current="page"' : ''}>EN</a></div></div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="footer-inner"><div class="footer-brand"><img src="${asset('seolin-logo.png')}" width="76" height="69" alt="서린태권도 SEOLIN TAEKWONDO" loading="lazy"><div><strong>SEOLIN Apps</strong><p>${t.by}</p></div></div><div class="footer-links"><a href="${link(route(locale, 'privacy'))}">${t.sitePrivacy}</a><a href="#top">${t.top} ↑</a><span>© 2026 SEOLIN</span></div></div></footer>
</body></html>`;
}

export function homePage(ctx, apps) {
  return layout(ctx, { title: 'SEOLIN Apps', description: ctx.t.websiteSummary, body: `<section class="container page-hero" id="apps"><span class="eyebrow">SEOLIN APPS</span><h1>SEOLIN Apps</h1><p>${ctx.t.websiteSummary}</p></section>${contact(ctx)}` });
}

export function supportPage(ctx, app) {
  const { t, asset, link, locale } = ctx;
  const copy = app[locale];
  const features = copy.features.map(([title, text]) => `<li><h3>${escape(title)}</h3><p>${escape(text)}</p></li>`).join('');
  const steps = copy.steps.map(([title, text], i) => `<li><span class="step-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><h3>${escape(title)}</h3><p>${escape(text)}</p></div></li>`).join('');
  const faqs = copy.faq.map(([q, a]) => `<details><summary>${escape(q)}<span aria-hidden="true">+</span></summary><div><p>${escape(a)}</p></div></details>`).join('');
  return layout(ctx, { title: `${app.name} · ${t.support}`, description: copy.description, kind: 'support-page', body: `
    <section class="container page-hero"><a class="back-link" href="${link(route(locale))}">← ${t.back}</a><div class="app-heading"><img class="app-icon" src="${asset(app.icon)}" width="88" height="88" alt=""><div><span class="eyebrow">HELP & SUPPORT</span><h1>${escape(app.name)}</h1><p class="platform">${escape(copy.platform)}</p></div></div><p class="hero-description">${escape(copy.description)}</p><a class="text-link" href="${link(route(locale, `${app.slug}/privacy`))}">${t.privacy}<span aria-hidden="true">↗</span></a></section>
    <div class="container support-content"><ul class="feature-grid">${features}</ul><section class="section-block" aria-labelledby="steps-title"><div class="section-heading"><span class="eyebrow">QUICK START</span><h2 id="steps-title">${t.steps}</h2></div><ol class="steps">${steps}</ol></section>
    <aside class="note"><h2>${t.tips}</h2><p>${escape(copy.note)}</p></aside><section class="section-block" aria-labelledby="faq-title"><div class="section-heading"><span class="eyebrow">FAQ</span><h2 id="faq-title">${t.faq}</h2></div><div class="faq-list">${faqs}</div></section></div>${contact(ctx, app.name)}` });
}

export function policyPage(ctx, policy, app) {
  const { t, locale, asset, link } = ctx;
  const name = app?.name ?? site.name;
  const sections = policy.sections.map((section, i) => `<section id="section-${i + 1}" aria-labelledby="section-title-${i + 1}"><h2 id="section-title-${i + 1}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(section.title)}</h2>${section.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}${section.items ? `<ul>${section.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}${section.links ? `<ul class="policy-links">${section.links.map(([label, url]) => `<li><a href="${escape(url)}">${escape(label)} ↗</a></li>`).join('')}</ul>` : ''}</section>`).join('');
  const toc = policy.sections.map((s, i) => `<li><a href="#section-${i + 1}">${escape(s.title)}</a></li>`).join('');
  return layout(ctx, { title: `${name} · ${app ? t.privacy : t.sitePrivacy}`, description: policy.summary, kind: 'privacy-page', body: `<section class="container page-hero policy-hero"><a class="back-link" href="${link(app ? route(locale, `${app.slug}/support`) : route(locale))}">← ${app ? t.support : t.back}</a><div class="policy-app">${app ? `<img src="${asset(app.icon)}" width="48" height="48" alt="">` : ''}<span>${escape(name)}</span></div><span class="eyebrow">PRIVACY POLICY</span><h1>${app ? t.privacy : t.sitePrivacy}</h1><p class="hero-description">${escape(policy.summary)}</p><p class="updated">${t.updated} <time datetime="${site.effectiveDate}">${site.effectiveDate}</time> · v1.0</p></section><div class="container policy-grid"><nav class="toc" aria-label="${t.toc}"><strong>${t.toc}</strong><ol>${toc}</ol></nav><article class="policy-body" aria-label="${escape(name)} ${t.privacy}">${sections}</article></div>${contact(ctx, name)}` });
}
