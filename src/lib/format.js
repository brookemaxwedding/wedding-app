// Small pure helpers shared across pages. Keeping formatting here means the
// look of money/dates is consistent everywhere and easy to change once.

export const currency = (n, code = 'USD') =>
  n == null
    ? '—'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code,
        maximumFractionDigits: 0,
      }).format(n)

// Parse a Sheet date value into a Date. A bare "YYYY-MM-DD" is parsed as LOCAL
// midnight (not UTC), so it doesn't render as the previous day in western time
// zones. Other formats fall back to the native parser.
function toDate(value) {
  if (value instanceof Date) return value
  const s = String(value ?? '')
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return new Date(s)
}

export const shortDate = (iso) =>
  iso
    ? toDate(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—'

// Whole days from now until the given date (0 if today, negative if past).
export function daysUntil(iso) {
  const target = toDate(iso)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate())
  return Math.round((startOfTarget - startOfToday) / 86_400_000)
}

// "Partner One & Partner Two" from the Config tab, with a friendly fallback.
export function coupleNames(config = {}) {
  const a = config.PartnerOneName
  const b = config.PartnerTwoName
  if (a && b) return `${a} & ${b}`
  return a || b || 'Our Wedding'
}

// Break a day count into months + remaining days for a friendlier countdown.
export function countdownParts(iso) {
  const days = daysUntil(iso)
  const months = Math.floor(days / 30)
  const remDays = days % 30
  const weeks = Math.floor(days / 7)
  return { days, months, remDays, weeks }
}
