# Wiring up the Google Sheet (the plan)

Right now [`weddingData.js`](./weddingData.js) exports hardcoded placeholder
data. It's the **single source of truth** — every page imports from it. When
you're ready to connect the Sheet, this folder is the only place you touch.

## Read path — published CSV (no API key)

1. In Google Sheets: **File → Share → Publish to web**, publish each tab as CSV.
   You'll get URLs like:
   `https://docs.google.com/spreadsheets/d/e/<id>/pub?gid=<gid>&single=true&output=csv`
2. Add a tiny CSV fetch + parse helper (e.g. `papaparse`, or a ~20-line hand
   parser) and map each row into the exact shapes already exported here:
   `wedding`, `budget`, `venues`, `guests`, `vendors`, `menu`, `music`,
   `timeline`, `tasks`.
3. Swap the static exports for state loaded via `fetch`. A clean way: create a
   `WeddingDataContext` provider that fetches on mount and exposes the same
   objects, so pages keep importing the same shapes. Keep this file as the
   fallback / offline placeholder.

Because the CSV is *published*, it's world-readable and needs **no key** in the
frontend. Don't publish anything you wouldn't want public (this is fine for
placeholder-style planning data; avoid sensitive personal info).

## Write path — Google Apps Script Web App (no key in frontend)

1. In the Sheet: **Extensions → Apps Script**. Add a `doPost(e)` that appends /
   updates rows, and **Deploy → New deployment → Web app**, "Execute as me",
   "Who has access: Anyone".
2. You get a `https://script.google.com/macros/s/<deployment-id>/exec` URL.
   That URL is the endpoint — it's not a secret key, and the script runs under
   *your* Google account server-side, so no credentials live in the browser.
3. POST JSON to it from the app (use `mode: 'no-cors'` for fire-and-forget, or
   return JSON and read it back). Add a lightweight shared-secret string in the
   payload if you want basic write protection.

## Keep the shapes stable

As long as the objects exported from `weddingData.js` keep their current
fields, none of the page components need to change when you switch to live data.
