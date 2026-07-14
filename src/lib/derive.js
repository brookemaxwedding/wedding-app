// Pure derivations over live Sheet rows. Each takes the raw arrays so it can be
// used from any component that has the data from context.
import { num, truthy, isDone, rsvpState } from './values.js'

export function budgetTotals(budgetRows = [], totalBudget = 0) {
  const estimated = budgetRows.reduce((s, r) => s + num(r.Estimated), 0)
  const actual = budgetRows.reduce((s, r) => s + num(r.Actual), 0)
  const cap = num(totalBudget) || estimated
  return { estimated, actual, cap, remaining: cap - actual }
}

export function rsvpCounts(guestRows = []) {
  const invited = guestRows.filter((g) => truthy(g.Invited))
  const yes = invited.filter((g) => rsvpState(g.RSVP) === 'yes')
  const no = invited.filter((g) => rsvpState(g.RSVP) === 'no').length
  const pending = invited.filter((g) => rsvpState(g.RSVP) === 'pending').length
  // Each attending guest counts as one head, plus one more if they've named a +1.
  const attending = yes.length + yes.filter((g) => String(g.PlusOneName || '').trim()).length
  return { invited: invited.length, yes: yes.length, no, pending, attending }
}

export function upcomingTasks(taskRows = [], n = 3) {
  return [...taskRows]
    .filter((t) => !isDone(t.Status))
    .sort((a, b) => new Date(a.DueDate || '9999') - new Date(b.DueDate || '9999'))
    .slice(0, n)
}

export function taskProgress(taskRows = []) {
  const total = taskRows.length
  const done = taskRows.filter((t) => isDone(t.Status)).length
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}
