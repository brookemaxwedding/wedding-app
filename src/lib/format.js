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

export const shortDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—'

// Whole days from now until the given date (0 if today, negative if past).
export function daysUntil(iso) {
  const target = new Date(iso)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate())
  return Math.round((startOfTarget - startOfToday) / 86_400_000)
}

// Break a day count into months + remaining days for a friendlier countdown.
export function countdownParts(iso) {
  const days = daysUntil(iso)
  const months = Math.floor(days / 30)
  const remDays = days % 30
  const weeks = Math.floor(days / 7)
  return { days, months, remDays, weeks }
}
