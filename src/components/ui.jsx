// Reusable presentational building blocks used across every page.

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-600">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-ink-100 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function StatCard({ label, value, sub, accent = 'brand' }) {
  const accents = {
    brand: 'text-brand-600',
    sage: 'text-sage-600',
    ink: 'text-ink-900',
  }
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</p>
      <p className={`mt-2 font-serif text-3xl font-semibold ${accents[accent]}`}>{value}</p>
      {sub && <p className="mt-1 text-sm text-ink-600">{sub}</p>}
    </Card>
  )
}

const BADGE_STYLES = {
  // venue status
  confirmed: 'bg-sage-100 text-sage-600',
  visited: 'bg-brand-100 text-brand-700',
  shortlisted: 'bg-ink-100 text-ink-600',
  passed: 'bg-ink-100 text-ink-400 line-through',
  // rsvp
  yes: 'bg-sage-100 text-sage-600',
  no: 'bg-red-100 text-red-700',
  pending: 'bg-amber-100 text-amber-700',
  // contract
  signed: 'bg-sage-100 text-sage-600',
  proposal: 'bg-brand-100 text-brand-700',
  inquiry: 'bg-amber-100 text-amber-700',
  none: 'bg-ink-100 text-ink-400',
}

export function Badge({ status, children }) {
  const style = BADGE_STYLES[status] || 'bg-ink-100 text-ink-600'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}
    >
      {children || status}
    </span>
  )
}

// Horizontal progress bar (0–100).
export function ProgressBar({ value, className = '' }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-100 ${className}`}>
      <div
        className="h-full rounded-full bg-brand-500 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

// A wrapper that lets wide tables scroll horizontally on small screens
// instead of breaking the page layout.
export function TableWrap({ children }) {
  return <div className="-mx-5 overflow-x-auto sm:mx-0">{children}</div>
}
