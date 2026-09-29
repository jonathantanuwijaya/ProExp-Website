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

const renderTimeline = (entries, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  const fragment = document.createDocumentFragment();

  entries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = index === 0 ? "timeline-card" : "timeline-card timeline-following";
    const hasDate = Boolean(entry.date && entry.date.trim());
    const hasSideNote = Boolean(entry.location && entry.location.trim());
    if (!hasDate) card.classList.add("no-date");
    if (!hasSideNote) card.classList.add("no-side-note");

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
    heading.textContent = entry.role || entry.title;
    const degree = document.createElement("p");
    degree.className = "degree";
    degree.textContent = entry.company || entry.degree;
    const description = document.createElement("p");
    description.textContent = entry.description;
    content.append(kicker, heading, degree, description);

    card.append(date, marker, content);
    if (hasSideNote) {
      const location = document.createElement("div");
      location.className = "timeline-side";
      location.textContent = entry.location;
      card.appendChild(location);
    }
    fragment.appendChild(card);
  });

  container.replaceChildren(fragment);
};

const renderContactLinks = (links) => {
  const container = document.getElementById("contact-links");
  if (!container) return;
  const fragment = document.createDocumentFragment();
  links.forEach((link) => {
    const item = document.createElement("a");
    item.href = link.href;
    item.textContent = link.text || link.label;
    item.setAttribute("aria-label", link.label);
    if (link.external) {
      item.target = "_blank";
      item.rel = "noopener noreferrer";
    }
    fragment.appendChild(item);
  });
  container.replaceChildren(fragment);
};

const renderProjectCards = (projects, detailsLabel) => {
  const container = document.getElementById("project-list");
  if (!container) return;
  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card research-card";

    const disclosure = document.createElement("details");
    disclosure.className = "project-disclosure";
    const summary = document.createElement("summary");
    summary.className = "project-summary";

    const icon = document.createElement("div");
    icon.className = "research-icon";
    icon.setAttribute("aria-hidden", "true");
    const symbol = document.createElement("span");
    symbol.textContent = "✳";
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    icon.append(symbol, number);

    const copy = document.createElement("div");
    copy.className = "research-copy";
    const label = document.createElement("p");
    label.className = "project-topline";
    label.textContent = project.label;
    const title = document.createElement("h3");
    title.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.description;
    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.tags.forEach((tagText) => {
      const tag = document.createElement("span");
      tag.textContent = tagText;
      tags.appendChild(tag);
    });
    const expandLabel = document.createElement("span");
    expandLabel.className = "project-expand-label";
    expandLabel.textContent = detailsLabel;
    copy.append(label, title, description, tags, expandLabel);
    summary.append(icon, copy);

    const detailPanel = document.createElement("div");
    detailPanel.className = "project-details";
    const detailText = document.createElement("p");
    detailText.textContent = project.details;
    detailPanel.appendChild(detailText);
    if (project.detailsNote) {
      const note = document.createElement("p");
      note.className = "project-details-note";
      note.textContent = project.detailsNote;
      detailPanel.appendChild(note);
    }
    disclosure.append(summary, detailPanel);
    card.appendChild(disclosure);

    const links = [];
    if (project.citationHref && project.citationText) {
      const citation = document.createElement("a");
      citation.className = "project-citation";
      citation.href = project.citationHref;
      citation.textContent = project.citationText;
      citation.target = "_blank";
      citation.rel = "noopener noreferrer";
      links.push(citation);
    }
    [project.storeLink, project.appStoreLink].filter((storeLink) => storeLink && storeLink.href && storeLink.text).forEach((storeLink) => {
      const storeAnchor = document.createElement("a");
      storeAnchor.className = "project-store-link";
      storeAnchor.href = storeLink.href;
      storeAnchor.textContent = storeLink.text;
      storeAnchor.target = "_blank";
      storeAnchor.rel = "noopener noreferrer";
      links.push(storeAnchor);
    });
    if (links.length) {
      const linkGroup = document.createElement("div");
      linkGroup.className = "project-links";
      linkGroup.append(...links);
      card.appendChild(linkGroup);
    }
    fragment.appendChild(card);
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
  document.getElementById("language-switch").setAttribute("aria-label", data.accessibility.languageSelector);
  document.getElementById("primary-nav").setAttribute("aria-label", data.accessibility.navigation);

  menuButton.setAttribute("aria-label", menuLabel(menuButton.getAttribute("aria-expanded") === "true"));

  setText("nav-about", data.nav.about);
  setText("nav-experience", data.nav.experience);
  setText("nav-projects", data.nav.projects);
  setText("nav-contact", data.nav.contact);

  document.getElementById("hero-art").setAttribute("aria-label", data.accessibility.heroArt);
  setText("hero-eyebrow", data.hero.eyebrow);
  setText("hero-greeting", data.hero.greeting);
  setText("hero-name", data.hero.name);
  setText("hero-mandarin-name", data.hero.mandarinName);
  setText("hero-summary", data.hero.summary);
  setText("hero-work-button", data.hero.workButton);
  setText("hero-about-button", data.hero.aboutButton);
  setText("meta-role-label", data.hero.meta.role.label);
  setText("meta-role-value", data.hero.meta.role.value);
  setText("meta-degree-label", data.hero.meta.degree.label);
  setText("meta-degree-value", data.hero.meta.degree.value);
  setText("meta-stack-label", data.hero.meta.stack.label);
  setText("meta-stack-value", data.hero.meta.stack.value);
  setText("art-ai", data.hero.art.aiBadge);
  setText("art-core-text", data.hero.art.core);
  setText("art-build", data.hero.art.build);
  setText("art-caption", data.hero.art.caption);
  setText("scroll-note-text", data.hero.art.scroll);

  setText("about-eyebrow", data.about.eyebrow);
  setText("about-title", data.about.title);
  setText("about-identity", data.about.identity);
  setText("about-lead", data.about.lead);
  setText("about-body", data.about.body);
  document.getElementById("interest-list").setAttribute("aria-label", data.accessibility.interests);
  appendChips("interest-list", data.about.interests);
  setText("student-id-label", data.about.studentId.label);
  setText("student-id-value", data.about.studentId.value);

  setText("experience-eyebrow", data.experience.eyebrow);
  setText("experience-title", data.experience.title);
  setText("education-eyebrow", data.education.eyebrow);
  setText("education-title", data.education.title);
  setText("experience-sub-eyebrow", data.experience.subsectionLabel);
  setText("experience-subtitle", data.experience.subsectionTitle);
  renderTimeline(data.education.entries, "education-entries");
  renderTimeline(data.experience.entries, "experience-entries");

  setText("projects-eyebrow", data.projects.eyebrow);
  setText("projects-title", data.projects.title);
  setText("projects-aside", data.projects.aside);
  renderProjectCards(data.projects.items, data.projects.detailsLabel);

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
