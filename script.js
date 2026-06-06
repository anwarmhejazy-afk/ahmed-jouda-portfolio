const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

let currentLang = localStorage.getItem("siteLang") || "ar";

if (year) {
  year.textContent = new Date().getFullYear();
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  document.documentElement.lang = lang;

  if (lang === "ar") {
    document.documentElement.dir = "rtl";
    document.body.classList.remove("en");
    if (langToggle) langToggle.textContent = "English";
  } else {
    document.documentElement.dir = "ltr";
    document.body.classList.add("en");
    if (langToggle) langToggle.textContent = "العربية";
  }

  document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
    element.textContent = element.dataset[lang];
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    setLanguage(currentLang === "ar" ? "en" : "ar");
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav) mainNav.classList.remove("open");
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const text = `Hello Dr. Ahmed,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/201158530730?text=${text}`, "_blank");
  });
}

/* Sanity connection for dynamic media uploads */
const SANITY_PROJECT_ID = "5ukublyt";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-06-06";

function sanityQueryUrl(query) {
  return `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
}

async function fetchSanity(query) {
  const response = await fetch(sanityQueryUrl(query));
  if (!response.ok) {
    throw new Error("Failed to fetch Sanity content");
  }

  const data = await response.json();
  return data.result || [];
}

function fallbackImage(label) {
  return `
    <div class="case-image dynamic-placeholder">
      ${label}
    </div>
  `;
}

function imageBlock(url, alt, label = "Image") {
  if (!url) return fallbackImage(label);

  return `
    <div class="dynamic-image-wrap">
      <img src="${url}" alt="${alt || label}" loading="lazy">
    </div>
  `;
}

function emptyMessage(arText, enText) {
  return `<p class="empty-message" data-ar="${arText}" data-en="${enText}">${currentLang === "ar" ? arText : enText}</p>`;
}

function renderClinicalWork(items) {
  const grid = document.getElementById("clinicalWorkGrid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لا توجد أعمال منشورة حالياً.", "No published clinical work yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="case-card dynamic-card">
      ${imageBlock(item.mainImage?.asset?.url || item.xrayImage?.asset?.url || item.beforeImage?.asset?.url, item.title, "Case")}
      <div>
        <span>${item.category || "Clinical Work"}</span>
        <h3>${item.title || "Clinical Work"}</h3>
        <p>${item.description || ""}</p>

        <div class="mini-image-row">
          ${item.beforeImage?.asset?.url ? `<a href="${item.beforeImage.asset.url}" target="_blank" rel="noopener">Before</a>` : ""}
          ${item.afterImage?.asset?.url ? `<a href="${item.afterImage.asset.url}" target="_blank" rel="noopener">After</a>` : ""}
          ${item.xrayImage?.asset?.url ? `<a href="${item.xrayImage.asset.url}" target="_blank" rel="noopener">X-Ray</a>` : ""}
        </div>

        ${item.videoUrl ? `<a class="text-link" href="${item.videoUrl}" target="_blank" rel="noopener">View Video</a>` : ""}
      </div>
    </article>
  `).join("");
}

function renderCertificates(items) {
  const grid = document.getElementById("certificatesGrid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لا توجد شهادات منشورة حالياً.", "No published certificates yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="case-card dynamic-card">
      ${imageBlock(item.certificateImage?.asset?.url, item.title, "Certificate")}
      <div>
        <span>${item.year || "Certificate"}</span>
        <h3>${item.title || "Certificate"}</h3>
        <p>${item.issuer || ""}</p>
        <p>${item.description || ""}</p>
      </div>
    </article>
  `).join("");
}

function renderVideos(items) {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لا توجد فيديوهات منشورة حالياً.", "No published videos yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="case-card dynamic-card">
      ${imageBlock(item.thumbnail?.asset?.url, item.title, "Video")}
      <div>
        <span>Video</span>
        <h3>${item.title || "Video"}</h3>
        <p>${item.description || ""}</p>
        <a class="text-link" href="${item.videoUrl}" target="_blank" rel="noopener">Open Video</a>
      </div>
    </article>
  `).join("");
}

function renderGallery(items) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لا توجد صور منشورة حالياً.", "No published images yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="case-card dynamic-card">
      ${imageBlock(item.image?.asset?.url, item.title, "Gallery")}
      <div>
        <span>${item.category || "Gallery"}</span>
        <h3>${item.title || "Gallery Image"}</h3>
        <p>${item.caption || ""}</p>
      </div>
    </article>
  `).join("");
}

async function loadCasesPageContent() {
  const clinicalWorkGrid = document.getElementById("clinicalWorkGrid");
  const certificatesGrid = document.getElementById("certificatesGrid");
  const videosGrid = document.getElementById("videosGrid");
  const galleryGrid = document.getElementById("galleryGrid");

  if (!clinicalWorkGrid && !certificatesGrid && !videosGrid && !galleryGrid) return;

  try {
    const clinicalWorkQuery = `*[_type == "clinicalWork" && approvedForWebsite == true && privacyChecked == true] | order(order asc) {
      title,
      category,
      description,
      videoUrl,
      mainImage{asset->{url}},
      beforeImage{asset->{url}},
      afterImage{asset->{url}},
      xrayImage{asset->{url}}
    }`;

    const certificatesQuery = `*[_type == "certificate" && showOnWebsite == true] | order(order asc) {
      title,
      issuer,
      year,
      description,
      certificateImage{asset->{url}}
    }`;

    const videosQuery = `*[_type == "video" && showOnWebsite == true] | order(order asc) {
      title,
      videoUrl,
      description,
      thumbnail{asset->{url}}
    }`;

    const galleryQuery = `*[_type == "galleryImage" && showOnWebsite == true] | order(order asc) {
      title,
      category,
      caption,
      image{asset->{url}}
    }`;

    const [clinicalWork, certificates, videos, gallery] = await Promise.all([
      fetchSanity(clinicalWorkQuery),
      fetchSanity(certificatesQuery),
      fetchSanity(videosQuery),
      fetchSanity(galleryQuery),
    ]);

    renderClinicalWork(clinicalWork);
    renderCertificates(certificates);
    renderVideos(videos);
    renderGallery(gallery);
    setLanguage(currentLang);
  } catch (error) {
    console.error(error);

    if (clinicalWorkGrid) clinicalWorkGrid.innerHTML = emptyMessage("تعذر تحميل الأعمال حالياً.", "Unable to load clinical work right now.");
    if (certificatesGrid) certificatesGrid.innerHTML = emptyMessage("تعذر تحميل الشهادات حالياً.", "Unable to load certificates right now.");
    if (videosGrid) videosGrid.innerHTML = emptyMessage("تعذر تحميل الفيديوهات حالياً.", "Unable to load videos right now.");
    if (galleryGrid) galleryGrid.innerHTML = emptyMessage("تعذر تحميل الصور حالياً.", "Unable to load images right now.");

    setLanguage(currentLang);
  }
}

setLanguage(currentLang);
loadCasesPageContent();


/* Back to top button */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
