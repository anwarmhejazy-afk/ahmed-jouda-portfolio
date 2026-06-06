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

setLanguage(currentLang);
