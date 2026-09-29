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

Every profile field currently uses clearly labeled fictional sample data (Alex Chen, 林安, DEMO-0001, Example University, sample experience/projects, and example contact handles). Replace these with accurate details before submission. The sample research project is fictional and must not be presented as actual research.

The assignment requires a public live URL and a ZIP named `hw1_studentID.zip`; this local project has not been published or zipped.
