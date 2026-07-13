// Derived / computed values. Pages import these instead of recomputing totals
// so the numbers stay consistent. All pure functions of the data module.
import { budget, guests, tasks } from '../data/weddingData.js'

export function budgetTotals() {
  const estimated = budget.lineItems.reduce((sum, i) => sum + (i.estimated || 0), 0)
  const actual = budget.lineItems.reduce((sum, i) => sum + (i.actual || 0), 0)
  return { estimated, actual, remaining: budget.total - actual, cap: budget.total }
}

export function rsvpCounts() {
  const invited = guests.filter((g) => g.invited)
  const yes = invited.filter((g) => g.rsvp === 'yes')
  const no = invited.filter((g) => g.rsvp === 'no').length
  const pending = invited.filter((g) => g.rsvp === 'pending').length
  // Each "yes" with a +1 adds a head. Group entries (families) count as one
  // record here — good enough for the shell; refine when the Sheet is wired.
  const attending = yes.length + yes.filter((g) => g.plusOne).length
  return { invited: invited.length, yes: yes.length, no, pending, attending }
}

// Next N incomplete tasks, soonest due first.
export function upcomingTasks(n = 3) {
  return [...tasks]
    .filter((t) => !t.done)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, n)
}

export function taskProgress() {
  const done = tasks.filter((t) => t.done).length
  return { done, total: tasks.length, pct: Math.round((done / tasks.length) * 100) }
}
