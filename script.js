/* ===================================================
   THE DAILY DISPATCH — script.js
=================================================== */

const btn             = document.querySelector("#getnews");
const countrySelector = document.querySelector("#country");
const newslist        = document.querySelector("#newslist");
const splash          = document.querySelector("#splash");
const skeleton        = document.querySelector("#skeleton");
const tickerWrap      = document.querySelector("#ticker-wrap");
const tickerTrack     = document.querySelector("#ticker-track");
const locationEl      = document.querySelector("#user-location");
const footerLocation  = document.querySelector("#footer-location");

const API_KEY = "dc95b543f86c4736863d16c7b4236534";

// ── Date ─────────────────────────────────────────
const dateEl = document.querySelector("#today-date");
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString("en-US", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });
}

// ── Country data ──────────────────────────────────
const countryNames = {
  all:"Worldwide", us:"USA", in:"India", gb:"United Kingdom",
  au:"Australia", ca:"Canada", fr:"France", de:"Germany",
  it:"Italy", es:"Spain", jp:"Japan", kr:"South Korea",
  cn:"China", ru:"Russia", br:"Brazil", mx:"Mexico",
  za:"South Africa", ae:"UAE", sa:"Saudi Arabia", ng:"Nigeria",
  sg:"Singapore", id:"Indonesia"
};

const TOP_HEADLINE_COUNTRIES = new Set([
  "us","gb","au","ca","in","de","fr","it","es","ru","br","mx","za","ae","sg","ng","id","jp","kr","cn"
]);

// SVG icons (24x24, inline) — no emojis
const ICONS = {
  globe:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  geo:      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  chart:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  cpu:      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  trophy:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4h10l1 7a5 5 0 0 1-12 0z"/><path d="M5 4H3v3a3 3 0 0 0 4 2.8"/><path d="M19 4h2v3a3 3 0 0 1-4 2.8"/></svg>`,
  film:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  leaf:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M3.82 22C3.82 22 10 20 17 8"/><path d="M17 8c0 0 3 5 1 14"/><path d="M3.82 22C6 17 8 12 17 8"/></svg>`,
  shield:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  briefcase:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  heart:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  bitcoin:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  rocket:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  landmark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
  pin:      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
};

// Sections with icon keys
const SECTIONS = [
  { key:"geopolitical", label:"Geopolitical",          icon:"geo",       q:'geopolitics OR diplomacy OR "foreign policy" OR sanctions OR war OR "international relations"' },
  { key:"economy",      label:"Economy & Markets",     icon:"chart",     q:'economy OR inflation OR GDP OR "stock market" OR trade OR recession OR "central bank"' },
  { key:"technology",   label:"Technology & AI",       icon:"cpu",       q:'"artificial intelligence" OR "machine learning" OR technology OR software OR "tech industry"' },
  { key:"sports",       label:"Sports",                icon:"trophy",    q:'sports OR football OR cricket OR basketball OR tennis OR Olympics OR "Premier League" OR tournament OR "World Cup"' },
  { key:"entertainment",label:"Entertainment",         icon:"film",      q:'entertainment OR movies OR film OR music OR celebrity OR "box office" OR Netflix OR Hollywood' },
  { key:"climate",      label:"Climate & Environment", icon:"leaf",      q:'"climate change" OR emissions OR "renewable energy" OR environment OR "global warming" OR sustainability' },
  { key:"defense",      label:"Defense & Security",    icon:"shield",    q:'military OR defense OR "national security" OR army OR navy OR "air force" OR weapons OR NATO' },
  { key:"business",     label:"Business & Startups",   icon:"briefcase", q:'startup OR "venture capital" OR "IPO" OR acquisition OR merger OR CEO OR earnings OR "business news"' },
  { key:"health",       label:"Health & Science",      icon:"heart",     q:'health OR medicine OR research OR hospital OR "public health" OR disease OR vaccine OR science' },
  { key:"crypto",       label:"Crypto & Finance",      icon:"bitcoin",   q:'cryptocurrency OR bitcoin OR blockchain OR fintech OR "digital currency" OR ethereum OR "crypto market"' },
  { key:"space",        label:"Space & Exploration",   icon:"rocket",    q:'space OR NASA OR SpaceX OR rocket OR satellite OR astronaut OR "space exploration" OR Mars OR Moon' },
  { key:"politics",     label:"Politics & Society",    icon:"landmark",  q:'politics OR government OR election OR parliament OR "political party" OR president OR minister OR policy' },
];

// Global dedup
let shownUrls = new Set();

// ── Ticker ────────────────────────────────────────
let tickerAnimFrame = null;
let tickerPos = 0;

function buildTicker(articles) {
  if (tickerAnimFrame) { cancelAnimationFrame(tickerAnimFrame); tickerAnimFrame = null; }
  const titles = articles.slice(0, 12).map(a => escHtml(a.title));
  tickerTrack.innerHTML = "";
  const inner = document.createElement("div");
  inner.className = "ticker-inner";
  const doubled = [...titles, ...titles];
  inner.innerHTML = doubled.map(t => `<span class="tick-item">${t}</span><span class="tick-sep"> ● </span>`).join("");
  tickerTrack.appendChild(inner);
  tickerWrap.style.display = "flex";
  tickerPos = 0;
  inner.style.transform = "translateX(0px)";
  requestAnimationFrame(() => {
    const half = inner.scrollWidth / 2;
    function tick() {
      tickerPos -= 0.55;
      if (Math.abs(tickerPos) >= half) tickerPos = 0;
      inner.style.transform = `translateX(${tickerPos}px)`;
      tickerAnimFrame = requestAnimationFrame(tick);
    }
    tickerAnimFrame = requestAnimationFrame(tick);
  });
}

// ── Geo-detect ────────────────────────────────────
let detectedCountry = null;

async function detectLocation() {
  try {
    const res  = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const code = data.country_code ? data.country_code.toLowerCase() : null;
    const city = data.city || "";
    const name = data.country_name || "";
    if (code && countryNames[code]) {
      detectedCountry = code;
      const label = city ? `${city}, ${name}` : name;
      locationEl.textContent     = `📍 ${label}`;
      footerLocation.textContent = label;
      const opt = countrySelector.querySelector(`option[value="${code}"]`);
      if (opt) opt.selected = true;
    } else {
      locationEl.textContent = "Worldwide";
      detectedCountry = "all";
    }
  } catch {
    locationEl.textContent = "Worldwide";
    detectedCountry = "all";
  }
  loadNews();
}

// ── Fetch helpers ─────────────────────────────────
function filterArticles(articles) {
  return (articles || []).filter(
    a => a.urlToImage && a.title && !a.title.includes("[Removed]") && a.description && a.url
  );
}

async function safeGet(url) {
  try {
    const r = await fetch(url);
    const d = await r.json();
    if (!r.ok) return [];
    return filterArticles(d.articles);
  } catch { return []; }
}

async function fetchTopHeadlines(country, pageSize = 12) {
  const base  = "https://newsapi.org/v2";
  const cname = countryNames[country] || country;
  if (country === "all") {
    return safeGet(`${base}/everything?q=world+news&sortBy=publishedAt&pageSize=${pageSize}&language=en&apiKey=${API_KEY}`);
  }
  if (TOP_HEADLINE_COUNTRIES.has(country)) {
    const primary = await safeGet(`${base}/top-headlines?country=${country}&pageSize=${pageSize}&apiKey=${API_KEY}`);
    if (primary.length >= 4) return primary;
  }
  return safeGet(`${base}/everything?q=${encodeURIComponent('"' + cname + '" news')}&sortBy=publishedAt&pageSize=${pageSize}&language=en&apiKey=${API_KEY}`);
}

// Fetch section — two passes: with country scoping, then without if too few results
async function fetchSection(country, sectionQ, pageSize = 20) {
  const base  = "https://newsapi.org/v2";
  const cname = country !== "all" ? countryNames[country] || "" : "";

  // Pass 1: country-scoped
  if (cname) {
    const scopedQ = `(${sectionQ}) "${cname}"`;
    const results = await safeGet(`${base}/everything?q=${encodeURIComponent(scopedQ)}&sortBy=publishedAt&pageSize=${pageSize}&language=en&apiKey=${API_KEY}`);
    if (results.length >= 4) return results;
  }

  // Pass 2: global (no country restriction) — always has plenty
  return safeGet(`${base}/everything?q=${encodeURIComponent(sectionQ)}&sortBy=publishedAt&pageSize=${pageSize}&language=en&apiKey=${API_KEY}`);
}

// ── HTML helpers ──────────────────────────────────
function escHtml(s) {
  return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}

function iconSvg(key) {
  return `<span class="sec-icon">${ICONS[key] || ICONS.globe}</span>`;
}

// Hero: 1 large left + 2×2 right grid
function buildHeroGrid(articles) {
  const main  = articles[0];
  const sides = articles.slice(1, 5); // exactly 4 side cards

  const mainHtml = `
    <article class="hero-main">
      <img src="${escHtml(main.urlToImage)}" class="art-img" alt="" loading="lazy">
      <p class="art-kicker">${escHtml(main.source?.name||"")}</p>
      <h2 class="art-headline"><a href="${escHtml(main.url)}" target="_blank" rel="noopener">${escHtml(main.title)}</a></h2>
      <p class="art-byline">${formatDate(main.publishedAt)}</p>
      <p class="art-snippet">${escHtml(main.description||"")}</p>
      <a class="art-readmore" href="${escHtml(main.url)}" target="_blank" rel="noopener">Continue Reading →</a>
    </article>`;

  const sidesHtml = sides.map(a => `
    <article class="hero-side">
      <img src="${escHtml(a.urlToImage)}" class="art-img" alt="" loading="lazy">
      <p class="art-kicker">${escHtml(a.source?.name||"")}</p>
      <h3 class="art-headline"><a href="${escHtml(a.url)}" target="_blank" rel="noopener">${escHtml(a.title)}</a></h3>
      <p class="art-byline">${formatDate(a.publishedAt)}</p>
      <a class="art-readmore" href="${escHtml(a.url)}" target="_blank" rel="noopener">Read →</a>
    </article>`).join("");

  return `
    <div class="hero-grid">
      ${mainHtml}
      <div class="hero-right">${sidesHtml}</div>
    </div>`;
}

function gridCard(a) {
  return `
    <article class="grid-article">
      <img src="${escHtml(a.urlToImage)}" class="art-img" alt="" loading="lazy">
      <p class="art-kicker">${escHtml(a.source?.name||"")}</p>
      <h3 class="art-headline"><a href="${escHtml(a.url)}" target="_blank" rel="noopener">${escHtml(a.title)}</a></h3>
      <p class="art-byline">${formatDate(a.publishedAt)}</p>
      <p class="art-snippet">${escHtml(a.description||"")}</p>
      <a class="art-readmore" href="${escHtml(a.url)}" target="_blank" rel="noopener">Read →</a>
    </article>`;
}

function renderSectionBlock(sectionKey, label, iconKey, articles) {
  if (!articles.length) return "";
  const visible  = articles.slice(0, 4);
  const hidden   = articles.slice(4);
  const hiddenId = `more-${sectionKey}`;

  return `
    <div class="section-header">
      <h2>${iconSvg(iconKey)}${label}</h2>
      <span class="section-count">${articles.length} stories</span>
    </div>
    <div class="article-grid" id="grid-${sectionKey}">
      ${visible.map(a => gridCard(a)).join("")}
    </div>
    ${hidden.length ? `
      <div class="hidden-articles" id="${hiddenId}" style="display:none">
        <div class="article-grid article-grid--more">
          ${hidden.map(a => gridCard(a)).join("")}
        </div>
      </div>
      <div class="section-more-bar">
        <button class="more-btn" data-target="${hiddenId}" onclick="toggleMore(this)">
          View ${hidden.length} More Stories ↓
        </button>
      </div>` : ""}`;
}

window.toggleMore = function(btn) {
  const target   = document.getElementById(btn.dataset.target);
  const expanded = target.style.display !== "none";
  target.style.display = expanded ? "none" : "block";
  btn.textContent = expanded ? `View More Stories ↓` : "Show Less ↑";
  if (!expanded) target.scrollIntoView({ behavior:"smooth", block:"start" });
};

// ── Main render ───────────────────────────────────
async function renderAll(country) {
  splash.style.display     = "none";
  newslist.innerHTML       = "";
  skeleton.style.display   = "grid";
  tickerWrap.style.display = "none";
  shownUrls                = new Set();
  if (tickerAnimFrame) { cancelAnimationFrame(tickerAnimFrame); tickerAnimFrame = null; }

  try {
    const headlines = await fetchTopHeadlines(country, 12);
    skeleton.style.display = "none";

    if (!headlines.length) {
      newslist.innerHTML = `<div class="paper-notice"><strong>No Headlines Found</strong>Try a different region.</div>`;
      return;
    }

    headlines.forEach(a => shownUrls.add(a.url));
    buildTicker(headlines);

    const cLabel = country === "all" ? "Worldwide" : (countryNames[country] || country.toUpperCase());

    newslist.innerHTML = `
      <div class="section-header">
        ${iconSvg("globe")}<h2>Top Stories — ${cLabel}</h2>
        <span class="section-count">${headlines.length} stories</span>
      </div>
      ${buildHeroGrid(headlines)}`;

    // Fetch all 12 sections in parallel — each does its own country-scoped + global fallback
    const results = await Promise.all(
      SECTIONS.map(s => fetchSection(country, s.q, 20).then(arts => ({ ...s, arts })))
    );

    results.forEach(({ key, label, icon, arts }) => {
      const fresh  = arts.filter(a => !shownUrls.has(a.url));
      fresh.forEach(a => shownUrls.add(a.url));
      newslist.innerHTML += renderSectionBlock(key, label, icon, fresh.slice(0, 10));
    });

  } catch (err) {
    skeleton.style.display = "none";
    newslist.innerHTML = `<div class="paper-notice"><strong>Edition Unavailable</strong>${escHtml(err.message)}</div>`;
  }
}

function loadNews() {
  let country = countrySelector.value;
  if (country === "auto") country = detectedCountry || "all";
  renderAll(country);
}

btn.addEventListener("click", loadNews);
countrySelector.addEventListener("change", () => {
  const v = countrySelector.value;
  if (v !== "auto") detectedCountry = v;
});

detectLocation();