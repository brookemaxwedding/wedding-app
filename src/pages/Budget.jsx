import { PageHeader, Card, StatCard, TableWrap, ProgressBar } from '../components/ui.jsx'
import { budget } from '../data/weddingData.js'
import { budgetTotals } from '../lib/derive.js'
import { currency } from '../lib/format.js'

const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400'
const thNum = 'px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-400'
const td = 'px-4 py-3 text-sm text-ink-700'
const tdNum = 'px-4 py-3 text-sm text-ink-900 text-right whitespace-nowrap tabular-nums'

export default function Budget() {
  const t = budgetTotals()

  // Running total of actual spend as we go down the list.
  let running = 0

  return (
    <>
      <PageHeader title="Budget" subtitle={`Target ${currency(t.cap)} — estimated vs. actual by category.`} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Estimated" value={currency(t.estimated)} sub="sum of line items" accent="ink" />
        <StatCard label="Actual spent" value={currency(t.actual)} sub={`${Math.round((t.actual / t.cap) * 100)}% of target`} />
        <StatCard label="Remaining" value={currency(t.remaining)} sub={`against ${currency(t.cap)} target`} accent="sage" />
      </div>

      <Card className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-600">Spent vs. target</span>
          <span className="font-medium text-ink-900">
            {currency(t.actual)} / {currency(t.cap)}
          </span>
        </div>
        <ProgressBar value={(t.actual / t.cap) * 100} />
      </Card>

      <Card>
        <TableWrap>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-ink-100">
                <th className={th}>Category</th>
                <th className={thNum}>Estimated</th>
                <th className={thNum}>Actual</th>
                <th className={thNum}>Running actual</th>
                <th className={th}>Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {budget.lineItems.map((item) => {
                running += item.actual || 0
                return (
                  <tr key={item.id} className="hover:bg-ink-50">
                    <td className={`${td} font-medium text-ink-900`}>{item.category}</td>
                    <td className={tdNum}>{currency(item.estimated)}</td>
                    <td className={tdNum}>{currency(item.actual)}</td>
                    <td className={`${tdNum} text-ink-600`}>{currency(running)}</td>
                    <td className={`${td} text-ink-400`}>{item.notes || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-200 font-semibold">
                <td className={`${td} text-ink-900`}>Total</td>
                <td className={tdNum}>{currency(t.estimated)}</td>
                <td className={tdNum}>{currency(t.actual)}</td>
                <td className={tdNum}></td>
                <td className={td}></td>
              </tr>
            </tfoot>
          </table>
        </TableWrap>
      </Card>
    </>
  )
}
