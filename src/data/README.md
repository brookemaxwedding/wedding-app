# Data layer (now live)

This app reads and writes a Google Sheet through a Google Apps Script Web App.
There is no placeholder data anymore.

## Where things live

- **`src/lib/api.js`** — low-level client for the `/exec` endpoint:
  - `fetchAll()` → `GET {URL}?token={TOKEN}` returns every tab as
    `{ Guests, Venues, Vendors, Budget, Menu, Music, Timeline, Tasks, Contacts, Config }`.
  - `updateRow(tab, id, fields)` / `appendRow(tab, fields)` → authenticated POSTs.
  - `lookupRsvp(code)` / `submitRsvp(...)` → **public**, token-free (guest RSVP).
- **`src/context/WeddingData.jsx`** — the single data layer / React context.
  Fetches everything once on load, caches it, exposes `loading` / `error` /
  `reload`, and provides `updateRow` / `appendRow` with **optimistic updates**
  (UI changes instantly; it rolls back and shows a toast if the Sheet rejects).
- **`src/lib/derive.js`** — computed rollups (budget totals, RSVP counts, task
  progress) as pure functions over the raw rows.
- **`src/lib/values.js`** — coercion helpers (`num`, `truthy`, `rsvpState`,
  `isDone`) because Sheet cells arrive as mixed strings/numbers/booleans.

## Config tab drives the app

`Config` is read as a `{ Key: Value }` map. These keys are used:

- `WeddingDate` → the countdown
- `TotalBudget` → the budget target / progress bar
- `AccentColor` → the entire theme (see `src/lib/theme.js`, which expands one
  hex into the full `--color-brand-*` scale at runtime)
- `PartnerOneName` / `PartnerTwoName` → couple name in the header & sidebar
- `Venue`, `Location` → shown on the Overview

## Column headers = field names

Components read raw Sheet columns directly (e.g. `guest.RSVP`, `venue.Status`),
and writes send `{ ColumnHeader: value }`. So the exact headers in each tab
matter — see the top-level README for the full list.

## ⚠️ Redeploy after editing the Apps Script

Any change to the Apps Script code only takes effect after you create a **new
deployment** (Deploy → Manage deployments → Edit → New version), or the app
will keep hitting the old code.
