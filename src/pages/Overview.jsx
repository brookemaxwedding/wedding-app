import { Link } from 'react-router-dom'
import { PageHeader, StatCard, Card, ProgressBar, Badge } from '../components/ui.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { budgetTotals, rsvpCounts, upcomingTasks, taskProgress } from '../lib/derive.js'
import { currency, shortDate, countdownParts, coupleNames } from '../lib/format.js'

export default function Overview() {
  const { config, tab } = useWeddingData()
  const guests = tab('Guests')
  const tasks = tab('Tasks')

  const { days, months, remDays } = countdownParts(config.WeddingDate)
  const b = budgetTotals(tab('Budget'), config.TotalBudget)
  const r = rsvpCounts(guests)
  const next = upcomingTasks(tasks, 3)
  const tp = taskProgress(tasks)

  return (
    <>
      <PageHeader
        title={`Welcome back, ${coupleNames(config)}`}
        subtitle={[shortDate(config.WeddingDate), config.Venue, config.Location]
          .filter(Boolean)
          .join(' · ')}
      />

      {/* Hero countdown */}
      <Card className="mb-6 overflow-hidden bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <p className="text-sm uppercase tracking-widest text-brand-100">Counting down to</p>
        <p className="mt-1 font-serif text-5xl font-semibold sm:text-6xl">
          {config.WeddingDate ? `${days} days` : 'Set a date'}
        </p>
        {config.WeddingDate && (
          <p className="mt-2 text-brand-100">
            That's about {months} months and {remDays} days until you say “I do”.
          </p>
        )}
      </Card>

      {/* Key stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Budget" value={currency(b.actual)} sub={`of ${currency(b.cap)} · ${currency(b.remaining)} left`} />
        <StatCard label="RSVPs — Yes" value={r.yes} sub={`${r.pending} pending · ${r.attending} heads`} accent="sage" />
        <StatCard label="Guests invited" value={r.invited} sub={`${r.no} declined`} accent="ink" />
        <StatCard label="Tasks done" value={`${tp.done}/${tp.total}`} sub={`${tp.pct}% complete`} />
      </div>

      {/* Next tasks + progress */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-ink-900">Next 3 tasks</h2>
            <Link to="/tasks" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          {next.length === 0 ? (
            <p className="py-6 text-center text-ink-400">All caught up. 🎉</p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {next.map((t) => (
                <li key={t.ID} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-ink-900">{t.Task}</p>
                    <p className="text-sm text-ink-400">{t.Category}</p>
                  </div>
                  <span className="text-sm text-ink-600">Due {shortDate(t.DueDate)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">Planning progress</h2>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-ink-600">Checklist</span>
            <span className="font-medium text-ink-900">{tp.pct}%</span>
          </div>
          <ProgressBar value={tp.pct} />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-ink-600">Budget spent</span>
            <span className="font-medium text-ink-900">
              {b.cap ? Math.round((b.actual / b.cap) * 100) : 0}%
            </span>
          </div>
          <ProgressBar value={b.cap ? (b.actual / b.cap) * 100 : 0} className="mt-2" />
          <div className="mt-5">
            <p className="mb-2 text-sm text-ink-600">RSVP status</p>
            <div className="flex flex-wrap gap-2">
              <Badge status="yes">{r.yes} yes</Badge>
              <Badge status="pending">{r.pending} pending</Badge>
              <Badge status="no">{r.no} no</Badge>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
