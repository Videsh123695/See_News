const API_KEY = "a2f19ffd5e3d43cb8ecbf78fce0460ce";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})


// // ----- configuration -----
// const API_BASE = "https://newsapi.org/v2/everything?q=";
// const API_KEY = "a2f19ffd5e3d43cb8ecbf78fce0460ce"; // set safely for development; do not expose in production

// // ----- DOM references -----
// const cardsContainer = document.getElementById("cardscontainer");
// const template = document.getElementById("template-news-card");
// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// let curSelectedNav = null;

// // ----- helpers -----
// function safeText(str, maxLen = 0) {
//   if (!str) return "";
//   str = String(str).trim();
//   return maxLen > 0 && str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
// }

// function formatDate(isoString) {
//   if (!isoString) return "";
//   try {
//     return new Date(isoString).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
//   } catch (e) {
//     return isoString;
//   }
// }

// // ----- render functions -----
// function clearCards() {
//   cardsContainer.innerHTML = "";
// }

// function createCard(article) {
//   const clone = template.content.cloneNode(true);
//   const root = clone.querySelector(".news-card") || clone.firstElementChild;

//   // use class selectors inside template (safer than duplicate IDs)
//   const img = clone.querySelector(".news-img");
//   const title = clone.querySelector(".news-title");
//   const desc = clone.querySelector(".news-desc");
//   const source = clone.querySelector(".news-source");

//   if (img && article.urlToImage) img.src = article.urlToImage;
//   if (title) title.textContent = safeText(article.title, 60);
//   if (desc) desc.textContent = safeText(article.description, 150);
//   if (source) source.textContent = `${article.source?.name || ""} · ${formatDate(article.publishedAt)}`;

//   // open link on click; guard article.url
//   if (root && article.url) {
//     root.style.cursor = "pointer";
//     root.addEventListener("click", () => window.open(article.url, "_blank"));
//   }

//   return clone;
// }

// function bindData(articles = []) {
//   clearCards();
//   const frag = document.createDocumentFragment();

//   for (const article of articles) {
//     // skip if no required content (you can loosen this)
//     if (!article.urlToImage) continue;
//     frag.appendChild(createCard(article));
//   }

//   cardsContainer.appendChild(frag);
// }

// // ----- network -----
// async function fetchNews(query) {
//   if (!query) return;
//   const url = `${API_BASE}${encodeURIComponent(query)}&apiKey=${API_KEY}`;

//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const json = await res.json();
//     bindData(json.articles || []);
//   } catch (err) {
//     console.error("Failed to fetch news:", err);
//     clearCards();
//     // optionally show a user-visible error element
//   }
// }

// // ----- UI wiring -----
// window.addEventListener("load", () => fetchNews("Technology"));

// function onNavItemClick(id) {
//   fetchNews(id);
//   const navItem = document.getElementById(id);
//   curSelectedNav?.classList.remove("active");
//   curSelectedNav = navItem;
//   curSelectedNav?.classList.add("active");
// }

// searchButton.addEventListener("click", () => {
//   const q = searchText.value.trim();
//   if (!q) return;
//   fetchNews(q);
//   curSelectedNav?.classList.remove("active");
//   curSelectedNav = null;
// });
