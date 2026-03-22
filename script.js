const btn = document.querySelector("#getnews");
const countryEl = document.querySelector("#country");
const newslist = document.querySelector("#newslist");
const splash = document.querySelector("#splash");
const skeleton = document.querySelector("#skeleton");
const tickerWrap = document.querySelector("#ticker-wrap");
const tickerTrack = document.querySelector("#ticker-track");
const locationEl = document.querySelector("#user-location");
const footerLoc = document.querySelector("#footer-location");

const dateEl = document.querySelector("#today-date");
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

const ICONS = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  geo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4h10l1 7a5 5 0 0 1-12 0z"/><path d="M5 4H3v3a3 3 0 0 0 4 2.8"/><path d="M19 4h2v3a3 3 0 0 1-4 2.8"/></svg>`,
  film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M17 8c0 0 3 5 1 14"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  bitcoin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  landmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
};

const SECTIONS = [
  { key: "geopolitical", label: "Geopolitical", icon: "geo", category: "politics" },
  { key: "economy", label: "Economy & Markets", icon: "chart", category: "business" },
  { key: "technology", label: "Technology & AI", icon: "cpu", category: "technology" },
  { key: "sports", label: "Sports", icon: "trophy", category: "sports" },
  { key: "entertainment", label: "Entertainment", icon: "film", category: "entertainment" },
  { key: "climate", label: "Climate & Environment", icon: "leaf", category: "environment" },
  { key: "defense", label: "Defense & Security", icon: "shield", category: "politics" },
  { key: "business", label: "Business & Startups", icon: "briefcase", category: "business" },
  { key: "health", label: "Health & Science", icon: "heart", category: "health" },
  { key: "crypto", label: "Crypto & Finance", icon: "bitcoin", category: "business" },
  { key: "space", label: "Space & Exploration", icon: "rocket", category: "science" },
  { key: "politics", label: "Politics & Society", icon: "landmark", category: "politics" },
];

const NEWSDATA_API_KEY = "pub_e844ae4705e546f9936be12ba2a4c885";
const NEWSDATA_BASE = "https://newsdata.io/api/1";

const UNSPLASH_ACCESS_KEY = "w-XgS8tTqmJ_e6TkukS5t3GJH7aSyBVMtWTVfuYWir0";
const imageCache = new Map();

const COUNTRY_CODES = {
  "USA": "us",
  "India": "in",
  "UK": "gb",
  "Australia": "au",
  "Canada": "ca",
  "France": "fr",
  "Germany": "de",
  "Japan": "jp",
  "China": "cn",
  "Russia": "ru",
  "Brazil": "br",
  "South Africa": "za",
  "UAE": "ae",
  "Singapore": "sg",
  "world": null
};

async function fetchFallbackImage(title, category = "news") {
  const keywords = title
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(" ")
    .filter(w => w.length > 3 && !["that", "this", "with", "from", "have", "will", "been"].includes(w))
    .slice(0, 3)
    .join(" ");

  const query = keywords || category;
  if (imageCache.has(query)) {
    return imageCache.get(query);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.urls?.regular || data.urls?.small || "";
      imageCache.set(query, imageUrl);
      return imageUrl;
    }
  } catch (err) {
    console.error("Unsplash fetch error:", err);
  }

  return "";
}

async function formatNewsArticle(article, category = "news") {
  let image = article.image_url || "";
  if (!image && article.title) {
    image = await fetchFallbackImage(article.title, category);
  }

  return {
    title: article.title || "Untitled",
    description: article.description || article.content?.substring(0, 200) || "No description available",
    source: article.source_id || "Unknown Source",
    url: article.link || "#",
    image: image,
    date: article.pubDate ? new Date(article.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"
  };
}

let detectedCountry = "world";

async function detectLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const name = data.country_name || "";
    const city = data.city || "";
    if (name) {
      detectedCountry = name;
      const label = city ? `${city}, ${name}` : name;
      locationEl.textContent = `📍 ${label}`;
      footerLoc.textContent = label;
      const opts = [...countryEl.options];
      const match = opts.find(o => o.value.toLowerCase() === name.toLowerCase());
      if (match) match.selected = true;
    } else {
      locationEl.textContent = "Worldwide";
    }
  } catch {
    locationEl.textContent = "Worldwide";
  }
  loadNews();
}

let tickerAnimFrame = null;
let tickerPos = 0;

function buildTicker(headlines) {
  if (tickerAnimFrame) { cancelAnimationFrame(tickerAnimFrame); tickerAnimFrame = null; }
  tickerTrack.innerHTML = "";
  const inner = document.createElement("div");
  inner.className = "ticker-inner";
  const doubled = [...headlines, ...headlines];
  inner.innerHTML = doubled.map(t => `<span class="tick-item">${escHtml(t)}</span><span class="tick-sep"> ● </span>`).join("");
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

async function fetchTopHeadlines(country) {
  const countryCode = COUNTRY_CODES[country];

  let url = `${NEWSDATA_BASE}/latest?apikey=${NEWSDATA_API_KEY}&language=en`;

  if (countryCode) {
    url += `&country=${countryCode}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(data.results?.message || "Failed to fetch news");
  }

  const articles = data.results || [];
  const formattedArticles = await Promise.all(
    articles.slice(0, 8).map(article => formatNewsArticle(article, "breaking-news"))
  );

  return formattedArticles;
}

async function fetchSectionNews(country, category) {
  const countryCode = COUNTRY_CODES[country];

  let url = `${NEWSDATA_BASE}/latest?apikey=${NEWSDATA_API_KEY}&language=en&category=${category}`;

  if (countryCode) {
    url += `&country=${countryCode}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "success") {
    console.error("Section fetch error:", data.results?.message);
    return [];
  }

  const articles = data.results || [];
  const formattedArticles = await Promise.all(
    articles.slice(0, 8).map(article => formatNewsArticle(article, category))
  );

  return formattedArticles;
}

function escHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function iconSvg(key) {
  return `<span class="sec-icon">${ICONS[key] || ""}</span>`;
}

function heroMainCard(a) {
  const imgHtml = a.image
    ? `<img src="${escHtml(a.image)}" class="art-img" alt="" loading="lazy" onerror="this.style.display='none'">`
    : `<div class="art-img-placeholder"></div>`;
  return `
    <article class="hero-main">
      ${imgHtml}
      <p class="art-kicker">${escHtml(a.source)}</p>
      <h2 class="art-headline"><a href="${escHtml(a.url)}" target="_blank" rel="noopener">${escHtml(a.title)}</a></h2>
      <p class="art-byline">${escHtml(a.date)}</p>
      <p class="art-snippet">${escHtml(a.description)}</p>
      <a class="art-readmore" href="${escHtml(a.url)}" target="_blank" rel="noopener">Read Full Story →</a>
    </article>`;
}

function heroSideCard(a) {
  const imgHtml = a.image
    ? `<img src="${escHtml(a.image)}" class="art-img" alt="" loading="lazy" onerror="this.style.display='none'">`
    : `<div class="art-img-placeholder"></div>`;
  return `
    <article class="hero-side">
      ${imgHtml}
      <p class="art-kicker">${escHtml(a.source)}</p>
      <h3 class="art-headline"><a href="${escHtml(a.url)}" target="_blank" rel="noopener">${escHtml(a.title)}</a></h3>
      <p class="art-byline">${escHtml(a.date)}</p>
      <a class="art-readmore" href="${escHtml(a.url)}" target="_blank" rel="noopener">Read →</a>
    </article>`;
}

function gridCard(a) {
  const imgHtml = a.image
    ? `<img src="${escHtml(a.image)}" class="art-img" alt="" loading="lazy" onerror="this.style.display='none'">`
    : `<div class="art-img-placeholder"></div>`;
  return `
    <article class="grid-article">
      ${imgHtml}
      <p class="art-kicker">${escHtml(a.source)}</p>
      <h3 class="art-headline"><a href="${escHtml(a.url)}" target="_blank" rel="noopener">${escHtml(a.title)}</a></h3>
      <p class="art-byline">${escHtml(a.date)}</p>
      <p class="art-snippet">${escHtml(a.description)}</p>
      <a class="art-readmore" href="${escHtml(a.url)}" target="_blank" rel="noopener">Read →</a>
    </article>`;
}

function sectionLoadingBlock(key, label, iconKey) {
  return `
    <div class="section-header" id="hdr-${key}">
      <h2>${iconSvg(iconKey)}${label}</h2>
      <span class="section-count section-loading">Fetching…</span>
    </div>
    <div class="article-grid" id="grid-${key}">
      ${[1, 2, 3, 4].map(() => `<div class="grid-article"><div class="skel" style="height:200px;width:100%"></div></div>`).join("")}
    </div>`;
}

function renderSectionContent(key, articles) {
  const grid = document.getElementById(`grid-${key}`);
  const hdr = document.getElementById(`hdr-${key}`);
  if (!grid || !hdr) return;

  if (!articles || !articles.length) {
    hdr.querySelector(".section-count").textContent = "0 stories";
    grid.innerHTML = `<div style="padding:1rem;color:#888;font-style:italic;width:100%">No articles found for this section.</div>`;
    return;
  }

  hdr.querySelector(".section-count").textContent = `${Math.min(articles.length, 8)} stories`;

  const visible = articles.slice(0, 4);
  const hidden = articles.slice(4, 8);
  const hiddenId = `more-${key}`;

  grid.innerHTML = visible.map(a => gridCard(a)).join("");

  if (hidden.length) {
    const moreDiv = document.createElement("div");
    moreDiv.className = "hidden-articles";
    moreDiv.id = hiddenId;
    moreDiv.style.display = "none";
    moreDiv.innerHTML = `<div class="article-grid article-grid--more">${hidden.map(a => gridCard(a)).join("")}</div>`;
    grid.insertAdjacentElement("afterend", moreDiv);

    const barDiv = document.createElement("div");
    barDiv.className = "section-more-bar";
    barDiv.innerHTML = `<button class="more-btn" data-target="${hiddenId}" onclick="toggleMore(this)">View ${hidden.length} More Stories ↓</button>`;
    moreDiv.insertAdjacentElement("afterend", barDiv);
  }
}

window.toggleMore = function (btn) {
  const target = document.getElementById(btn.dataset.target);
  const expanded = target.style.display !== "none";
  target.style.display = expanded ? "none" : "block";
  btn.textContent = expanded ? "View More Stories ↓" : "Show Less ↑";
  if (!expanded) target.scrollIntoView({ behavior: "smooth", block: "start" });
};

async function loadNews() {
  btn.disabled = true;
  btn.textContent = "Loading…";

  let country = countryEl.value;
  if (country === "auto") country = detectedCountry || "world";

  splash.style.display = "none";
  newslist.innerHTML = "";
  skeleton.style.display = "grid";
  tickerWrap.style.display = "none";
  if (tickerAnimFrame) { cancelAnimationFrame(tickerAnimFrame); tickerAnimFrame = null; }

  try {
    const headlines = await fetchTopHeadlines(country);
    skeleton.style.display = "none";

    if (!headlines || !headlines.length) {
      newslist.innerHTML = `<div class="paper-notice"><strong>No Headlines Found</strong>Try again in a moment.</div>`;
      btn.disabled = false; btn.textContent = "Load Headlines";
      return;
    }

    buildTicker(headlines.map(a => a.title));

    const cLabel = country === "world" ? "Worldwide" : country;
    const main = headlines[0];
    const sides = headlines.slice(1, 5);

    newslist.innerHTML = `
      <div class="section-header">
        <h2>${iconSvg("globe")}Top Stories — ${escHtml(cLabel)}</h2>
        <span class="section-count">${headlines.length} stories</span>
      </div>
      <div class="hero-grid">
        ${heroMainCard(main)}
        <div class="hero-right">
          ${sides.map(a => heroSideCard(a)).join("")}
        </div>
      </div>`;

    SECTIONS.forEach(s => {
      newslist.innerHTML += sectionLoadingBlock(s.key, s.label, s.icon);
    });

    for (const s of SECTIONS) {
      try {
        const arts = await fetchSectionNews(country, s.category);
        renderSectionContent(s.key, arts);
      } catch {
        renderSectionContent(s.key, []);
      }
      await new Promise(r => setTimeout(r, 500));
    }

  } catch (err) {
    skeleton.style.display = "none";
    newslist.innerHTML = `<div class="paper-notice"><strong>Edition Unavailable</strong>${escHtml(err.message)}</div>`;
  }

  btn.disabled = false;
  btn.textContent = "Load Headlines";
}

btn.addEventListener("click", loadNews);
countryEl.addEventListener("change", () => {
  const v = countryEl.value;
  if (v !== "auto") detectedCountry = v;
});

detectLocation();