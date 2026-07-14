// ---------------------------------------------------------------------------
//  Low-level Google Apps Script client.
//  Everything here talks to the /exec Web App. Values come from .env
//  (VITE_SHEET_URL, VITE_SHEET_TOKEN) and are inlined at build time by Vite.
// ---------------------------------------------------------------------------

const URL = import.meta.env.VITE_SHEET_URL
const TOKEN = import.meta.env.VITE_SHEET_TOKEN

// True once the .env placeholders have been replaced with real values.
export function isConfigured() {
  return Boolean(URL && TOKEN && !/PASTE_|XXXX/.test(URL) && !/PASTE_/.test(TOKEN))
}

// Thrown when .env hasn't been filled in yet, so the UI can show a setup hint
// instead of a generic network error.
export class ConfigError extends Error {
  constructor() {
    super('The app is not connected to your Google Sheet yet.')
    this.name = 'ConfigError'
    this.isConfigError = true
  }
}

async function readJson(res) {
  // Apps Script sometimes returns HTML on errors; guard the JSON parse.
  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Unexpected response from the Sheet (HTTP ${res.status}).`)
  }
  if (json && json.error) throw new Error(json.error)
  return json
}

// --- Reads ---------------------------------------------------------------

export async function fetchAll() {
  if (!isConfigured()) throw new ConfigError()
  const res = await fetch(`${URL}?token=${encodeURIComponent(TOKEN)}`)
  if (!res.ok) throw new Error(`The Sheet responded with HTTP ${res.status}.`)
  return readJson(res)
}

// --- Writes --------------------------------------------------------------
//
// IMPORTANT: we send Content-Type "text/plain" on purpose. A JSON content-type
// makes the browser fire a CORS *preflight* (OPTIONS) that Apps Script can't
// answer, so the whole request fails. "text/plain" is a CORS "simple" request
// (no preflight); Apps Script still parses the JSON body just fine.
async function post(payload) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`The Sheet responded with HTTP ${res.status}.`)
  return readJson(res)
}

export function updateRow(tab, id, fields) {
  if (!isConfigured()) throw new ConfigError()
  return post({ action: 'update', token: TOKEN, tab, id, fields })
}

export function appendRow(tab, fields) {
  if (!isConfigured()) throw new ConfigError()
  return post({ action: 'append', token: TOKEN, tab, fields })
}

// --- Public RSVP (NO token — this is what wedding guests use) -------------

export async function lookupRsvp(code) {
  if (!URL) throw new ConfigError()
  const res = await fetch(`${URL}?action=lookup&code=${encodeURIComponent(code)}`)
  if (!res.ok) throw new Error(`Lookup failed (HTTP ${res.status}).`)
  return readJson(res)
}

export function submitRsvp({ code, guestId, attending, meal, dietary, plusOneName, note }) {
  if (!URL) throw new ConfigError()
  return post({ action: 'rsvp', code, guestId, attending, meal, dietary, plusOneName, note })
}
