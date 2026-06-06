const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

let currentLang = localStorage.getItem("siteLang") || "ar";
let allClinicalWorkItems = [];
let allGalleryItems = [];

if (year) {
  year.textContent = new Date().getFullYear();
}

function updateLanguageButton(lang) {
  if (!langToggle) return;

  if (lang === "ar") {
    langToggle.textContent = "EN";
    langToggle.setAttribute("aria-label", "Switch to English");
  } else {
    langToggle.textContent = "AR";
    langToggle.setAttribute("aria-label", "Switch to Arabic");
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("en", lang === "en");

  document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
    element.textContent = element.dataset[lang];
  });

  updateLanguageButton(lang);
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    setLanguage(currentLang === "ar" ? "en" : "ar");
  });
}

function closeMobileMenu() {
  if (!mainNav || !menuToggle) return;

  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}

function openMobileMenu() {
  if (!mainNav || !menuToggle) return;

  mainNav.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.textContent = "×";
}

if (menuToggle && mainNav) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (mainNav.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mainNav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      closeMobileMenu();

      if (href) {
        window.location.href = href;
      }
    });
  });

  document.addEventListener("click", () => {
    if (mainNav.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeCaseModal();
    }
  });
}

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

/* Sanity connection */
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

function imageBlock(url, alt, label = "Image") {
  if (!url) {
    return `<div class="media-placeholder">${label}</div>`;
  }

  return `
    <div class="media-image">
      <img src="${url}" alt="${alt || label}" loading="lazy">
    </div>
  `;
}

function emptyMessage(arText, enText) {
  return `<div class="empty-state" data-ar="${arText}" data-en="${enText}">${currentLang === "ar" ? arText : enText}</div>`;
}

function renderClinicalWork(items) {
  const grid = document.getElementById("clinicalWorkGrid");
  if (!grid) return;

  allClinicalWorkItems = items;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لم يتم نشر أي حالات سريرية حتى الآن.", "No clinical work has been published yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item, index) => `
    <article class="media-card compact-case-card">
      ${imageBlock(item.mainImage?.asset?.url || item.xrayImage?.asset?.url || item.beforeImage?.asset?.url, item.title, "Case")}
      <div class="media-content">
        <span class="media-tag">${item.category || "Clinical Work"}</span>
        <h3>${item.title || "Clinical Work"}</h3>
        <p>${item.description || ""}</p>
        <button class="view-details-btn" type="button" data-case-index="${index}" data-ar="عرض التفاصيل" data-en="View Details">
          ${currentLang === "ar" ? "عرض التفاصيل" : "View Details"}
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-case-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.caseIndex);
      openCaseModal(allClinicalWorkItems[index]);
    });
  });
}

function renderCertificates(items) {
  const grid = document.getElementById("certificatesGrid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لم يتم نشر أي شهادات حتى الآن.", "No certificates have been published yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="media-card">
      ${imageBlock(item.certificateImage?.asset?.url, item.title, "Certificate")}
      <div class="media-content">
        <span class="media-tag">${item.year || "Certificate"}</span>
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
    grid.innerHTML = emptyMessage("لم يتم نشر أي فيديوهات حتى الآن.", "No videos have been published yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="media-card">
      ${imageBlock(item.thumbnail?.asset?.url, item.title, "Video")}
      <div class="media-content">
        <span class="media-tag">Video</span>
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

  allGalleryItems = items;

  if (!items.length) {
    grid.innerHTML = emptyMessage("لم يتم نشر أي صور حتى الآن.", "No images have been published yet.");
    setLanguage(currentLang);
    return;
  }

  grid.innerHTML = items.map((item, index) => `
    <article class="media-card compact-gallery-card">
      ${imageBlock(item.image?.asset?.url, item.title, "Gallery")}
      <div class="media-content">
        <span class="media-tag">${item.category || "Gallery"}</span>
        <h3>${item.title || "Gallery Image"}</h3>
        <button class="view-details-btn" type="button" data-gallery-index="${index}" data-ar="عرض الصورة" data-en="View Image">
          ${currentLang === "ar" ? "عرض الصورة" : "View Image"}
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.galleryIndex);
      openGalleryModal(allGalleryItems[index]);
    });
  });
}

function buildCaseModalImage(url, label) {
  if (!url) return "";

  return `
    <a class="modal-media-item" href="${url}" target="_blank" rel="noopener">
      <img src="${url}" alt="${label}" loading="lazy">
      <span>${label}</span>
    </a>
  `;
}

function openGalleryModal(item) {
  const modal = document.getElementById("caseModal");
  const body = document.getElementById("caseModalBody");

  if (!modal || !body || !item) return;

  const imageUrl = item.image?.asset?.url;

  body.innerHTML = `
    <span class="media-tag">${item.category || "Gallery"}</span>
    <h2>${item.title || "Gallery Image"}</h2>
    <p>${item.caption || ""}</p>

    ${imageUrl ? `
      <div class="single-modal-image">
        <img src="${imageUrl}" alt="${item.title || "Gallery Image"}">
      </div>
    ` : ""}
  `;

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function openCaseModal(item) {
  const modal = document.getElementById("caseModal");
  const body = document.getElementById("caseModalBody");

  if (!modal || !body || !item) return;

  const images = [
    buildCaseModalImage(item.mainImage?.asset?.url, "Main"),
    buildCaseModalImage(item.beforeImage?.asset?.url, "Before"),
    buildCaseModalImage(item.afterImage?.asset?.url, "After"),
    buildCaseModalImage(item.xrayImage?.asset?.url, "X-Ray"),
    ...(item.extraImages || []).map((image, index) => buildCaseModalImage(image?.asset?.url, `Image ${index + 1}`)),
  ].join("");

  body.innerHTML = `
    <span class="media-tag">${item.category || "Clinical Work"}</span>
    <h2>${item.title || "Clinical Work"}</h2>
    <p>${item.description || ""}</p>

    ${images ? `<div class="modal-media-grid">${images}</div>` : ""}

    ${item.videoUrl ? `<a class="btn btn-primary modal-video-link" href="${item.videoUrl}" target="_blank" rel="noopener">Open Video</a>` : ""}
  `;

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCaseModal() {
  const modal = document.getElementById("caseModal");

  if (!modal) return;

  modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeCaseModal();
  }
});

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
      xrayImage{asset->{url}},
      extraImages[]{asset->{url}}
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

    if (clinicalWorkGrid) clinicalWorkGrid.innerHTML = emptyMessage("تعذر تحميل الحالات حالياً.", "Unable to load clinical work right now.");
    if (certificatesGrid) certificatesGrid.innerHTML = emptyMessage("تعذر تحميل الشهادات حالياً.", "Unable to load certificates right now.");
    if (videosGrid) videosGrid.innerHTML = emptyMessage("تعذر تحميل الفيديوهات حالياً.", "Unable to load videos right now.");
    if (galleryGrid) galleryGrid.innerHTML = emptyMessage("تعذر تحميل الصور حالياً.", "Unable to load images right now.");

    setLanguage(currentLang);
  }
}

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 450);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

setLanguage(currentLang);
loadCasesPageContent();
