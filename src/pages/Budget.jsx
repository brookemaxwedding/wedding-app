import { PageHeader, Card, StatCard, TableWrap, ProgressBar } from '../components/ui.jsx'
import { EditableText, EditableCheck } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { budgetTotals } from '../lib/derive.js'
import { currency } from '../lib/format.js'
import { num, truthy } from '../lib/values.js'

const th = 'px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400 whitespace-nowrap'
const thNum = th + ' text-right'
const td = 'px-3 py-2 text-sm text-ink-700 align-top'
const tdNum = 'px-3 py-2 text-sm text-ink-900 text-right whitespace-nowrap tabular-nums align-top'

export default function Budget() {
  const { tab, config, updateRow, appendRow } = useWeddingData()
  const rows = tab('Budget')
  const t = budgetTotals(rows, config.TotalBudget)
  const save = (id, field) => (value) => updateRow('Budget', id, { [field]: value })

  let running = 0

  return (
    <>
      <PageHeader
        title="Budget"
        subtitle={`Target ${currency(t.cap)} — estimated vs. actual by line item.`}
        action={
          <button
            type="button"
            onClick={() => appendRow('Budget', { Category: 'New item', Estimated: 0 })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add item
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Estimated" value={currency(t.estimated)} sub="sum of line items" accent="ink" />
        <StatCard label="Actual spent" value={currency(t.actual)} sub={`${t.cap ? Math.round((t.actual / t.cap) * 100) : 0}% of target`} />
        <StatCard label="Remaining" value={currency(t.remaining)} sub={`against ${currency(t.cap)} target`} accent="sage" />
      </div>

      <Card className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-600">Spent vs. target</span>
          <span className="font-medium text-ink-900">{currency(t.actual)} / {currency(t.cap)}</span>
        </div>
        <ProgressBar value={t.cap ? (t.actual / t.cap) * 100 : 0} />
      </Card>

      <Card>
        <TableWrap>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-ink-100">
                <th className={th}>Category</th>
                <th className={th}>Item</th>
                <th className={thNum}>Estimated</th>
                <th className={thNum}>Actual</th>
                <th className={thNum}>Running</th>
                <th className={th}>Paid</th>
                <th className={th}>Vendor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((item) => {
                running += num(item.Actual)
                return (
                  <tr key={item.ID} className="hover:bg-ink-50/60">
                    <td className={`${td} min-w-[9rem] font-medium text-ink-900`}>
                      <EditableText value={item.Category} onSave={save(item.ID, 'Category')} placeholder="Category" />
                    </td>
                    <td className={`${td} min-w-[9rem]`}>
                      <EditableText value={item.Item} onSave={save(item.ID, 'Item')} placeholder="—" />
                    </td>
                    <td className={tdNum}>
                      <EditableText type="number" value={item.Estimated} onSave={save(item.ID, 'Estimated')} prefix="$" placeholder="—" />
                    </td>
                    <td className={tdNum}>
                      <EditableText type="number" value={item.Actual} onSave={save(item.ID, 'Actual')} prefix="$" placeholder="—" />
                    </td>
                    <td className={`${tdNum} text-ink-500`}>{currency(running)}</td>
                    <td className={`${td} text-center`}>
                      <EditableCheck value={truthy(item.Paid)} onSave={save(item.ID, 'Paid')} />
                    </td>
                    <td className={`${td} min-w-[8rem] text-ink-500`}>
                      <EditableText value={item.Vendor} onSave={save(item.ID, 'Vendor')} placeholder="—" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink-200 font-semibold">
                <td className={`${td} text-ink-900`} colSpan={2}>Total</td>
                <td className={tdNum}>{currency(t.estimated)}</td>
                <td className={tdNum}>{currency(t.actual)}</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </TableWrap>
      </Card>
    </>
  )
}
