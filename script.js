const SITE_TITLE = "Rhea is the best 🌻🌻🌻";
const URL_HASH = "#rhea-is-the-best";

function setUrlAndTitle() {
  document.title = SITE_TITLE;
  const heading = document.getElementById("title");
  if (heading) heading.textContent = SITE_TITLE;

  try {
    if (location.protocol === "http:" || location.protocol === "https:") {
      if (location.hash !== URL_HASH) {
        history.replaceState(null, "", `${location.pathname}${location.search}${URL_HASH}`);
      }
    }
  } catch {
    // Ignore if history APIs are blocked (e.g. some file:// contexts)
  }
}

function canLoad(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function findAssetImages() {
  const exts = ["jpeg", "jpg", "png", "webp", "gif"];
  const images = [];

  for (let n = 1; n <= 25; n += 1) {
    for (const ext of exts) {
      const src = `assets/${n}.${ext}`;
      // eslint-disable-next-line no-await-in-loop
      if (await canLoad(src)) {
        images.push(src);
        break;
      }
    }
  }

  return images;
}

function showLoader() {
  if (document.getElementById("rhea-loader")) return;
  const overlay = document.createElement("div");
  overlay.id = "rhea-loader";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "radial-gradient(circle at 50% 0%, rgba(225, 175, 107, 0.25), transparent 60%), rgba(5, 4, 4, 0.92)";
  overlay.style.zIndex = "9999";

  const text = document.createElement("div");
  text.style.padding = "18px 22px";
  text.style.borderRadius = "999px";
  text.style.border = "1px solid rgba(244, 224, 195, 0.4)";
  text.style.background = "rgba(22, 17, 17, 0.95)";
  text.style.color = "#f4e0c3";
  text.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  text.style.fontSize = "0.95rem";
  text.style.letterSpacing = "0.08em";
  text.style.textTransform = "uppercase";
  text.textContent = "Loading our memories 🌻";

  overlay.appendChild(text);
  document.body.appendChild(overlay);
}

function hideLoader() {
  const overlay = document.getElementById("rhea-loader");
  if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

function buildCarousel(images) {
  const carousel = document.getElementById("rheaCarousel");
  if (!carousel) return;

  const indicators = carousel.querySelector(".carousel-indicators");
  const inner = carousel.querySelector(".carousel-inner");
  if (!indicators || !inner) return;

  indicators.innerHTML = "";
  inner.innerHTML = "";

  images.forEach((src, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-target", "#rheaCarousel");
    li.setAttribute("data-slide-to", String(index));
    if (index === 0) li.classList.add("active");
    indicators.appendChild(li);

    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    const img = document.createElement("img");
    img.className = "d-block w-100";
    img.src = src;
    img.alt = `Rhea photo ${index + 1}`;

    item.appendChild(img);
    inner.appendChild(item);
  });
}

async function start() {
  setUrlAndTitle();
  showLoader();
  const images = await findAssetImages();
  hideLoader();
  if (!images.length) return;
  buildCarousel(images);
}

start();
