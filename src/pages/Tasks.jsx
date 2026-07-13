import { useState } from 'react'
import { PageHeader, Card, Badge, ProgressBar } from '../components/ui.jsx'
import { tasks as initialTasks } from '../data/weddingData.js'
import { shortDate, daysUntil } from '../lib/format.js'

export default function Tasks() {
  // Local, in-memory toggle so the checklist feels live in the shell.
  // NOTE: this does not persist yet — writing back will go through the
  // Google Apps Script endpoint once the Sheet is wired up.
  const [tasks, setTasks] = useState(initialTasks)

  const toggle = (id) =>
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const sorted = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  const done = tasks.filter((t) => t.done).length
  const pct = Math.round((done / tasks.length) * 100)

  return (
    <>
      <PageHeader title="Tasks" subtitle={`${done} of ${tasks.length} complete`} />

      <Card className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-600">Checklist progress</span>
          <span className="font-medium text-ink-900">{pct}%</span>
        </div>
        <ProgressBar value={pct} />
      </Card>

      <Card>
        <ul className="divide-y divide-ink-100">
          {sorted.map((t) => {
            const days = daysUntil(t.dueDate)
            const overdue = !t.done && days < 0
            const soon = !t.done && days >= 0 && days <= 30
            return (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  className="h-5 w-5 flex-none cursor-pointer rounded border-ink-200 text-brand-500 accent-brand-500"
                />
                <div className="min-w-0 flex-1">
                  <p className={`font-medium ${t.done ? 'text-ink-400 line-through' : 'text-ink-900'}`}>
                    {t.title}
                  </p>
                  <p className="text-sm text-ink-400">{t.category}</p>
                </div>
                <div className="flex flex-none flex-col items-end gap-1">
                  <span className={`text-sm ${overdue ? 'font-medium text-red-600' : 'text-ink-600'}`}>
                    {shortDate(t.dueDate)}
                  </span>
                  {overdue && <Badge status="no">Overdue</Badge>}
                  {soon && <Badge status="pending">Due soon</Badge>}
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    </>
  )
}
