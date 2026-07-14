import { isConfigured } from '../lib/api.js'

// Full-content loading state (chrome stays visible; content area shows this).
export function LoadingState() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
      <p className="font-serif text-lg text-ink-600">Pulling the latest from your Sheet…</p>
    </div>
  )
}

// Error state — never a blank screen. Distinguishes "not configured yet" from
// a genuine fetch failure, and always offers a retry.
export function ErrorState({ error, onRetry }) {
  const notConfigured = error?.isConfigError || !isConfigured()

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-3xl">
        {notConfigured ? '🔌' : '💔'}
      </div>
      {notConfigured ? (
        <>
          <h2 className="font-serif text-2xl font-semibold text-ink-900">Almost there — let's connect the Sheet</h2>
          <p className="text-ink-600">
            Open <code className="rounded bg-ink-100 px-1.5 py-0.5 text-sm">.env</code> in the project root and paste your
            Apps Script <code className="rounded bg-ink-100 px-1.5 py-0.5 text-sm">/exec</code> URL and token into{' '}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-sm">VITE_SHEET_URL</code> and{' '}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-sm">VITE_SHEET_TOKEN</code>, then restart{' '}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-sm">npm run dev</code>.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-serif text-2xl font-semibold text-ink-900">We couldn't reach your Sheet</h2>
          <p className="text-ink-600">
            The wedding data didn't load. This is usually a connection hiccup or the Apps Script needing a redeploy.
          </p>
          <p className="text-sm text-ink-400">{error?.message}</p>
        </>
      )}
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 rounded-xl bg-brand-500 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-brand-600"
      >
        Try again
      </button>
    </div>
  )
}

// Small transient toast for write success/failure.
export function Toast({ notice }) {
  if (!notice) return null
  const styles =
    notice.type === 'error'
      ? 'bg-red-600 text-white'
      : 'bg-sage-600 text-white'
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 lg:bottom-6">
      <div className={`rounded-full px-4 py-2 text-sm font-medium shadow-lg ${styles}`}>
        {notice.type === 'error' ? '⚠ ' : '✓ '}
        {notice.message}
      </div>
    </div>
  )
}
