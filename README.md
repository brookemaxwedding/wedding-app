# Max & Brooke — Wedding HQ 💍

A single-source-of-truth wedding planning dashboard. Static site, **free to
host on GitHub Pages**, backed by a **Google Sheet** through a **Google Apps
Script Web App** (JSON reads + writes). No backend server, no auth provider, no
paid services.

## Stack

- **Vite** + **React 19**
- **React Router 7** (HashRouter — required for GitHub Pages, no server rewrites)
- **Tailwind CSS v4** (via `@tailwindcss/vite`), themed live from the Sheet

## 1. Connect your Sheet (required)

The app reads its `/exec` URL and token from a **gitignored** `.env` file.

1. Open `.env` in the project root (a template is in `.env.example`).
2. Paste your values:
   ```
   VITE_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
   VITE_SHEET_TOKEN=your-secret-token
   ```
3. Restart `npm run dev` — Vite only reads env at startup.

`.env` is in `.gitignore` and must **never** be committed. Until it's filled in,
the app shows a friendly "let's connect the Sheet" screen instead of crashing.

> **Heads up on the token:** because this is a static site, whatever you put in
> `VITE_SHEET_TOKEN` is bundled into the built JavaScript and is therefore
> visible to anyone who views the deployed site's source. Treat it as a
> low-stakes shared secret gating a personal planning sheet, not a real
> credential — and keep genuinely sensitive data out of the Sheet.

## 2. Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs ./dist
npm run preview  # preview the production build
```

## How the data layer works

Everything flows through one context, [`src/context/WeddingData.jsx`](src/context/WeddingData.jsx):

- Fetches **all tabs once on load**, caches them, exposes `loading` / `error` /
  `reload`.
- `updateRow(tab, id, fields)` and `appendRow(tab, fields)` apply **optimistic
  updates** — the UI changes instantly and rolls back with a toast if the Sheet
  rejects the write, so edits feel immediate.
- The `Config` tab drives the **countdown** (`WeddingDate`), **budget bar**
  (`TotalBudget`), **theme** (`AccentColor` → full color scale at runtime), and
  couple names (`PartnerOneName` / `PartnerTwoName`).

See [`src/data/README.md`](src/data/README.md) for the full map.

### Apps Script API contract

- **Read all:** `GET {URL}?token={TOKEN}` → `{ Guests, Venues, Vendors, Budget, Menu, Music, Timeline, Tasks, Contacts, Config }`
- **Update:** `POST { action:"update", token, tab, id, fields }`
- **Append:** `POST { action:"append", token, tab, fields }`
- **Public RSVP lookup:** `GET {URL}?action=lookup&code=XXX`
- **Public RSVP submit:** `POST { action:"rsvp", code, guestId, attending, meal, dietary, plusOneName, note }`

> **CORS gotcha (handled):** all POSTs are sent with
> `Content-Type: text/plain` on purpose. A JSON content-type triggers a CORS
> preflight that Apps Script can't answer, so writes would silently fail.
> Apps Script still parses the JSON body correctly. See `src/lib/api.js`.

> **⚠️ Redeploy after any script edit:** Apps Script changes only take effect
> once you publish a **new deployment version** (Deploy → Manage deployments →
> Edit → New version). Otherwise the app keeps hitting the old code.

### Expected tab columns

```
Guests:   ID, Name, Email, Phone, Side, Group, InviteCode, PlusOneAllowed,
          PlusOneName, Invited, RSVP, Meal, Dietary, Table, Note, RSVPDate, ThankYouSent
Venues:   ID, Name, Type, Address, Capacity, Cost, Status, Pros, Cons,
          ContactName, ContactEmail, ContactPhone, VisitDate, Notes
Vendors:  ID, Category, Name, ContactName, Email, Phone, Website, Quote,
          DepositPaid, BalanceDue, BalanceDueDate, ContractStatus, Notes
Budget:   ID, Category, Item, Estimated, Actual, Paid, DueDate, Vendor, Notes
Menu:     ID, Course, Item, Description, DietaryTags, Notes
Music:    ID, Segment, Song, Artist, SpotifyLink, DoNotPlay, Notes
Timeline: ID, Time, Event, Location, Who, Duration, Notes
Tasks:    ID, Task, Category, DueDate, Owner, Priority, Status, Notes
Contacts: ID, Name, Role, Email, Phone, Notes
Config:   Key, Value  (WeddingDate, Venue, TotalBudget, PartnerOneName,
          PartnerTwoName, AccentColor)
```

## Pages

- **Dashboard** (behind the token): Overview · Venues · Guests · Vendors ·
  Budget · Menu & Drinks · Music · Timeline · Tasks. Every list is live and
  editable inline — click a cell to edit; it saves to the Sheet instantly.
- **`/rsvp`** — a **public**, token-free page. Guests enter their invite code,
  see their party, and submit attending / meal / dietary / plus-one. This is the
  only page guests ever see. Link:
  `https://brookemaxwedding.github.io/wedding-app/#/rsvp`.

## Deploying to GitHub Pages

Live site: **https://brookemaxwedding.github.io/wedding-app/**

The workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and publishes on every push to `main`.

1. Repo **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Repo **Settings → Secrets and variables → Actions → New repository secret** →
   add `VITE_SHEET_URL` and `VITE_SHEET_TOKEN` (the workflow injects them at
   build time; GitHub Pages can't read your local `.env`).

`vite.config.js` sets `base: '/wedding-app/'` to match the project-site path.
Routing uses HashRouter, and [`public/404.html`](public/404.html) bounces any
path-style deep link (e.g. `/wedding-app/rsvp`) to its hash route so refreshes
never 404.

## Mobile

Built mobile-first for Brooke's phone: bottom tab bar + slide-out drawer under
`lg`, full sidebar on desktop, horizontally scrollable tables, and iOS
safe-area padding.
