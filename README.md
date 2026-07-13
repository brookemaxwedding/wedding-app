# Max & Brooke — Wedding HQ 💍

A single-source-of-truth wedding planning dashboard. Static site, **free to
host on GitHub Pages**, with a **Google Sheet as the database** (read via
published CSV, written via a Google Apps Script Web App). No backend server, no
auth provider, no paid services, and **no API keys in the frontend**.

## Stack

- **Vite** + **React 19**
- **React Router 7** (HashRouter — required for GitHub Pages, no server rewrites)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs ./dist
npm run preview  # preview the production build
```

## Project layout

```
src/
  data/
    weddingData.js   # ← SINGLE SOURCE OF TRUTH (placeholder data today)
    README.md        # ← how to swap in the Google Sheet (CSV read + Apps Script write)
  lib/
    format.js        # currency / date / countdown helpers
    derive.js        # computed totals (budget, RSVP counts, upcoming tasks)
  components/
    Layout.jsx       # responsive sidebar (desktop) + drawer & bottom nav (mobile)
    ui.jsx           # Card, StatCard, Badge, ProgressBar, TableWrap, PageHeader
    Icon.jsx, nav.js
  pages/             # Overview, Venues, Guests, Vendors, Budget,
                     # Menu, Music, Timeline, Tasks
```

## Sections

Overview (countdown, budget, RSVPs, next tasks) · Venues · Guests · Vendors ·
Budget · Menu & Drinks · Music · Timeline · Tasks.

## Connecting the Google Sheet

See [`src/data/README.md`](src/data/README.md). Short version: publish each
Sheet tab as CSV for reads (no key), and deploy a Google Apps Script Web App
for writes (the endpoint URL isn't a secret). All page components already read
from the shapes in `weddingData.js`, so wiring live data is a localized change.

## Deploying to GitHub Pages

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and publishes on every push to `main`. One-time: in the repo, set
**Settings → Pages → Source → GitHub Actions**. `vite.config.js` uses
`base: './'` so it works regardless of the repo name.

## Mobile

Built mobile-first for Brooke's phone: bottom tab bar + slide-out drawer under
`lg`, full sidebar on desktop, horizontally scrollable tables, and iOS
safe-area padding.
