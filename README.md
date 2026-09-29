# Personal Profile Website

Responsive personal portfolio draft for the Generative AI coursework assignment. The site is served by a small, zero-dependency Node.js HTTP server.

## Run locally

Requirements: Node.js 18 or newer. No npm install is needed.

```bash
node server.js
```

Open <http://127.0.0.1:3000/>. Set `PORT` to use a different port. The default listener is local-only (`127.0.0.1`).

## Project files

- `server.js` — built-in Node.js `http`, `fs`, `path`, and `url` modules; serves files from `public/`.
- `public/index.html` — semantic single-page portfolio.
- `public/styles.css` — base responsive layout and mobile navigation styling.
- `public/material.css` — Material Design 3-inspired color tokens, surfaces, cards, chips, buttons, and responsive overrides; no remote font or UI dependencies.
- `public/language.css` — compact Material-style language selector and Traditional Chinese typography/layout support.
- `public/content.json` — the page copy and section data in English (`en`) and Taiwanese Traditional Chinese (`zh-TW`).
- `public/main.js` — renders the JSON content, switches/persists the selected language, and handles mobile navigation.
- `.github/workflows/pages.yml` — publishes the static `public/` directory to GitHub Pages.

The language selector is in the top header. The selected language is stored in the browser; English is the default on first visit.

## GitHub Pages

The included workflow uploads `public/` and deploys it whenever code is pushed to `main`; it can also be started manually from the repository's **Actions** tab. Before the first deployment:

1. Push this project to a GitHub repository on the `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main` or run **Deploy static site to GitHub Pages** manually, then check the workflow run for the published URL.

The expected project-site URL is `https://<owner>.github.io/<repository>/`. If the repository's default branch is not `main`, change the workflow's push branch filter. GitHub Pages serves static files only: `server.js` remains for local development and is not deployed. The workflow publishes `public/`, and its relative asset paths support the repository subpath.

## Before submitting

The current local draft includes the user-confirmed 2018–2022 bachelor's study in Palembang and 2026-onward CGU Artificial Intelligence master's study, plus expanded CV-based project details. It contains the explicitly approved university email and verified LinkedIn/GitHub profiles, and the student ID is displayed in About with explicit user authorization. No phone number is displayed.

The skin-lesion project is titled “A Comparative Study of Adam and SGD Optimizers for InceptionV3-Based Skin Lesion Classification” and cites the HAM10000 dataset paper (Tschandl et al., 2018; DOI 10.1038/sdata.2018.161). The available manuscript is incomplete and the notebook does not document the optimizer comparison, so the portfolio makes no performance claim. The separate 2022 cataract-classifier project was removed; selected Andal and PLN projects from the CV were added with concise descriptions. Changes remain local and have not been pushed or deployed. The reflection PDF and submission ZIP have not been created, so this draft is not yet submission-ready.
