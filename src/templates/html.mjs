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

export function appStoreLink(ctx, app) {
  const label = `${app.name}: ${ctx.t.download} (${ctx.t.newTab})`;
  return `<a class="button primary download-button" data-app-store="${escape(app.slug)}" href="${escape(app.appStoreUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(label)}"><span>${ctx.t.download}</span><span aria-hidden="true">↗</span></a>`;
}

export function homePage(ctx, apps) {
  const { locale, t, link, asset } = ctx;
  const ko = locale === 'ko';
  const cards = apps.map(app => `<article class="app-card"><div class="card-top"><img src="${asset(app.icon)}" alt="" width="64" height="64"><span class="status is-released">${t.release}</span></div><h3>${escape(app.name)}</h3><p class="description">${escape(app[locale].description)}</p><p class="platform">${escape(app[locale].platform)}</p>${app[locale].availabilityNote ? `<p class="availability-note">${escape(app[locale].availabilityNote)}</p>` : ''}<div class="card-links">${appStoreLink(ctx, app)}<a class="button" href="${link(route(locale, `${app.slug}/support`))}">${t.support}<span aria-hidden="true">↗</span></a><a class="text-link" href="${link(route(locale, `${app.slug}/privacy`))}">${t.privacy}<span aria-hidden="true">↗</span></a></div></article>`).join('');
  const principles = ko ? [
    ['기기 안에서 완성하는 작업', '사진과 문서, 음악을 처리하는 앱 기능은 기기 안에서 실행됩니다. 개발자 서버에 작업 파일을 업로드하지 않습니다.'],
    ['앱마다 필요한 안내를 정확하게', '첫 사용 순서부터 저장과 백업까지. 앱별 사용 안내와 자주 묻는 질문을 확인하세요.'],
    ['자료를 보관하는 방법까지', '무엇을 기기에 저장하고 어떻게 지울 수 있는지, 각 앱의 개인정보처리방침에서 확인할 수 있습니다.'],
  ] : [
    ['Your work, on your device', 'App features process your photos, documents and media on the device. Working files are not uploaded to a developer server.'],
    ['Help for each app', 'From your first steps to exporting and backups. Find practical guides and answers for the app you use.'],
    ['Know how your data is kept', 'Each app’s privacy policy explains what is stored locally and how you can remove it.'],
  ];
  return layout(ctx, { title: ko ? '수련의 시간을 더 단단하게' : 'More room for what matters', description: t.websiteSummary, kind: 'home-page', body: `
  <section class="brand-hero" aria-labelledby="home-title"><div class="container"><div class="hero-kicker"><span>TOOLS MADE AT SEOLIN</span><span>TAEKWONDO, EVERY DAY.</span></div>
    <div class="vector-wordmark" aria-hidden="true"><span class="wordmark-fallback">SEOLIN</span><canvas id="wordmark-canvas"></canvas><span class="vector-caption">APPS & CREATIVE TOOLS</span></div>
    <div class="brand-hero-bottom"><div><h1 id="home-title">${ko ? '수련의 시간에,<br>더 집중할 수 있도록.' : 'More room<br>for what matters.'}</h1><p>${ko ? '사진 준비부터 콘텐츠 제작, 음악줄넘기 연습까지.<br>서린의 현장에서 만든 도구를 만나보세요.' : 'Photo preparation, creative covers and jump-rope practice.<br>Tools made from everyday life at SEOLIN.'}</p></div><a class="button hero-cta" href="#apps">${t.apps}<span aria-hidden="true">↓</span></a></div>
  </div></section>
  <section class="app-section" id="apps" aria-labelledby="apps-title"><div class="container"><div class="section-intro"><div><span class="eyebrow">OUR APPS</span><h2 id="apps-title">${ko ? '필요한 순간에, 서린 앱.' : 'A SEOLIN app for your next step.'}</h2></div><p>${ko ? '앱을 다운로드하고 사용 방법과 지원,<br>개인정보 안내를 확인하세요.' : 'Download an app and find getting-started guides,<br>support and privacy information.'}</p></div><div class="app-cards">${cards}</div></div></section>
  <section class="container principles" aria-labelledby="principles-title"><span class="eyebrow">THOUGHTFULLY MADE</span><h2 id="principles-title">${ko ? '익숙한 일상을, 조금 더 편하게.' : 'Make everyday tasks a little easier.'}</h2><div class="principle-grid">${principles.map(([title, text], i) => `<article><span aria-hidden="true">0${i + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>${contact(ctx)}
  <script src="${asset('wordmark.js')}" defer></script>` });
}

export function supportPage(ctx, app) {
  const { t, asset, link, locale } = ctx;
  const copy = app[locale];
  const features = copy.features.map(([title, text]) => `<li><h3>${escape(title)}</h3><p>${escape(text)}</p></li>`).join('');
  const steps = copy.steps.map(([title, text], i) => `<li><span class="step-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><h3>${escape(title)}</h3><p>${escape(text)}</p></div></li>`).join('');
  const faqs = copy.faq.map(([q, a]) => `<details><summary>${escape(q)}<span aria-hidden="true">+</span></summary><div><p>${escape(a)}</p></div></details>`).join('');
  return layout(ctx, { title: `${app.name} · ${t.support}`, description: copy.description, kind: 'support-page', body: `
    <section class="container page-hero"><a class="back-link" href="${link(route(locale))}">← ${t.back}</a><div class="app-heading"><img class="app-icon" src="${asset(app.icon)}" width="88" height="88" alt=""><div><span class="eyebrow">HELP & SUPPORT</span><h1>${escape(app.name)}</h1><p class="platform">${escape(copy.platform)}</p>${copy.availabilityNote ? `<p class="availability-note">${escape(copy.availabilityNote)}</p>` : ''}</div></div><p class="hero-description">${escape(copy.description)}</p><div class="support-actions">${appStoreLink(ctx, app)}<a class="text-link" href="${link(route(locale, `${app.slug}/privacy`))}">${t.privacy}<span aria-hidden="true">↗</span></a></div></section>
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
