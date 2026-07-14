// Helpers for coercing raw Sheet cell values (which arrive as strings,
// numbers, or booleans depending on the column) into predictable types.

// Parse a currency-ish cell into a number. "$1,200" -> 1200, "" -> 0.
export function num(v) {
  if (v == null || v === '') return 0
  if (typeof v === 'number') return v
  const n = Number(String(v).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

// Interpret a cell as a boolean. Handles true, "TRUE", "Yes", 1, "y", etc.
export function truthy(v) {
  if (v === true) return true
  if (v == null) return false
  const s = String(v).trim().toLowerCase()
  return s === 'true' || s === 'yes' || s === 'y' || s === '1' || s === 'x'
}

// Normalize a status string for comparison / styling lookups.
export const statusKey = (v) => String(v ?? '').trim().toLowerCase()

// Is a task considered complete, whatever wording the sheet uses?
export const isDone = (status) => ['done', 'complete', 'completed'].includes(statusKey(status))

// Is an RSVP a yes/no/pending, tolerant of casing and blanks.
export function rsvpState(v) {
  const s = statusKey(v)
  if (['yes', 'attending', 'accepted', 'y'].includes(s)) return 'yes'
  if (['no', 'declined', 'regrets', 'n'].includes(s)) return 'no'
  return 'pending'
}
