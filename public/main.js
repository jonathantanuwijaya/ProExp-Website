const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
let translations = null;
let activeLanguage = "en";

const menuLabel = (isOpen) => {
  const data = translations && translations[activeLanguage];
  if (data) return isOpen ? data.accessibility.menuClose : data.accessibility.menuOpen;
  return isOpen ? "Close navigation" : "Open navigation";
};

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", menuLabel(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", menuLabel(false));
      navigation.classList.remove("is-open");
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

const appendChips = (id, items) => {
  const container = document.getElementById(id);
  if (!container) return;
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    fragment.appendChild(chip);
  });
  container.replaceChildren(fragment);
};

const renderEducation = (entries) => {
  const container = document.getElementById("education-entries");
  if (!container) return;
  const fragment = document.createDocumentFragment();

  entries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = index === 0 ? "timeline-card" : "timeline-card sample-experience";

    const date = document.createElement("div");
    date.className = "timeline-date";
    date.textContent = entry.date;

    const marker = document.createElement("div");
    marker.className = "timeline-marker";
    marker.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    content.className = "timeline-content";
    const kicker = document.createElement("p");
    kicker.className = "card-kicker";
    kicker.textContent = entry.kicker;
    const heading = document.createElement("h3");
    heading.textContent = entry.title;
    const degree = document.createElement("p");
    degree.className = "degree";
    degree.textContent = entry.degree;
    const description = document.createElement("p");
    description.textContent = entry.description;
    content.append(kicker, heading, degree, description);

    const location = document.createElement("div");
    location.className = "timeline-side";
    location.textContent = entry.location;

    card.append(date, marker, content, location);
    fragment.appendChild(card);
  });

  container.replaceChildren(fragment);
};

const renderContactLinks = (links) => {
  const container = document.getElementById("contact-links");
  if (!container) return;
  const fragment = document.createDocumentFragment();
  links.forEach((link) => {
    const item = document.createElement("span");
    item.textContent = `${link.label} · ${link.value}`;
    fragment.appendChild(item);
  });
  container.replaceChildren(fragment);
};

const applyLanguage = (language) => {
  if (!translations) return;
  activeLanguage = translations[language] ? language : "en";
  const data = translations[activeLanguage];
  document.documentElement.lang = data.htmlLang;
  document.title = data.pageTitle;
  document.getElementById("meta-description").content = data.metaDescription;

  setText("skip-link", data.accessibility.skipLink);
  document.querySelector(".wordmark").setAttribute("aria-label", data.accessibility.brand);
  setText("brand-name", data.brandName);
  setText("brand-separator", " · ");
  setText("brand-suffix", data.brandSuffix);
  document.getElementById("language-switch").setAttribute("aria-label", data.accessibility.languageSelector);
  document.getElementById("primary-nav").setAttribute("aria-label", data.accessibility.navigation);
  document.getElementById("sample-banner").setAttribute("aria-label", data.accessibility.sampleNotice);
  menuButton.setAttribute("aria-label", menuLabel(menuButton.getAttribute("aria-expanded") === "true"));

  setText("nav-about", data.nav.about);
  setText("nav-education", data.nav.education);
  setText("nav-projects", data.nav.projects);
  setText("nav-contact", data.nav.contact);
  setText("sample-notice", data.sampleNotice);
  document.getElementById("hero-art").setAttribute("aria-label", data.accessibility.heroArt);
  setText("hero-eyebrow", data.hero.eyebrow);
  setText("hero-greeting", data.hero.greeting);
  setText("hero-name", data.hero.name);
  setText("hero-summary", data.hero.summary);
  setText("hero-work-button", data.hero.workButton);
  setText("hero-about-button", data.hero.aboutButton);
  setText("meta-english-label", data.hero.meta.englishName.label);
  setText("meta-english-value", data.hero.meta.englishName.value);
  setText("meta-chinese-label", data.hero.meta.chineseName.label);
  setText("meta-chinese-value", data.hero.meta.chineseName.value);
  setText("meta-id-label", data.hero.meta.studentId.label);
  setText("meta-id-value", data.hero.meta.studentId.value);
  setText("art-ai", data.hero.art.aiBadge);
  setText("art-core-text", data.hero.art.core);
  setText("art-build", data.hero.art.build);
  setText("art-caption", data.hero.art.caption);
  setText("scroll-note-text", data.hero.art.scroll);

  setText("about-eyebrow", data.about.eyebrow);
  setText("about-title", data.about.title);
  setText("about-lead", data.about.lead);
  setText("about-body", data.about.body);
  document.getElementById("interest-list").setAttribute("aria-label", data.accessibility.interests);
  appendChips("interest-list", data.about.interests);
  setText("about-note", data.about.note);

  setText("education-eyebrow", data.education.eyebrow);
  setText("education-title", data.education.title);
  renderEducation(data.education.entries);
  setText("education-footnote", data.education.footnote);

  setText("projects-eyebrow", data.projects.eyebrow);
  setText("projects-title", data.projects.title);
  setText("projects-aside", data.projects.aside);
  setText("course-visual-caption", data.projects.course.visualCaption);
  setText("course-label", data.projects.course.label);
  setText("course-year", data.projects.course.year);
  setText("course-title", data.projects.course.title);
  setText("course-description", data.projects.course.description);
  appendChips("course-tags", data.projects.course.tags);
  setText("course-note", data.projects.course.note);
  setText("research-label", data.projects.research.label);
  setText("research-title", data.projects.research.title);
  setText("research-description", data.projects.research.description);
  appendChips("research-tags", data.projects.research.tags);
  setText("projects-notice-label", data.projects.noticeLabel);
  setText("projects-notice", data.projects.notice);

  setText("contact-eyebrow", data.contact.eyebrow);
  setText("contact-title", data.contact.title);
  setText("contact-description", data.contact.description);
  setText("contact-notice", data.contact.notice);
  renderContactLinks(data.contact.links);
  setText("footer-brand", data.footer.brand);
  setText("back-to-top", data.footer.backToTop);

  document.getElementById("language-en").setAttribute("aria-pressed", String(activeLanguage === "en"));
  document.getElementById("language-zh").setAttribute("aria-pressed", String(activeLanguage === "zh-TW"));
  document.getElementById("language-en").classList.toggle("is-active", activeLanguage === "en");
  document.getElementById("language-zh").classList.toggle("is-active", activeLanguage === "zh-TW");
  try {
    localStorage.setItem("portfolio-language", activeLanguage);
  } catch {
    // Language switching still works if storage is unavailable.
  }
};

document.getElementById("language-en").addEventListener("click", () => applyLanguage("en"));
document.getElementById("language-zh").addEventListener("click", () => applyLanguage("zh-TW"));

fetch("content.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load content.json (${response.status})`);
    return response.json();
  })
  .then((data) => {
    translations = data;
    let preferredLanguage = "en";
    try {
      preferredLanguage = localStorage.getItem("portfolio-language") || "en";
    } catch {
      // English is the default when storage is unavailable.
    }
    applyLanguage(preferredLanguage);
  })
  .catch((error) => console.error("Portfolio content failed to load:", error));
