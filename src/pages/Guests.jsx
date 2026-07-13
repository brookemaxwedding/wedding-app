import { PageHeader, Card, Badge, TableWrap } from '../components/ui.jsx'
import { guests } from '../data/weddingData.js'
import { rsvpCounts } from '../lib/derive.js'

const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400'
const td = 'px-4 py-3 text-sm text-ink-700 whitespace-nowrap'

export default function Guests() {
  const r = rsvpCounts()
  return (
    <>
      <PageHeader
        title="Guests"
        subtitle={`${r.invited} invited · ${r.yes} attending · ${r.pending} awaiting reply`}
      />
      <Card>
        <TableWrap>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-ink-100">
                <th className={th}>Name</th>
                <th className={th}>Email</th>
                <th className={th}>Side</th>
                <th className={th}>Invited</th>
                <th className={th}>RSVP</th>
                <th className={th}>Meal</th>
                <th className={th}>+1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {guests.map((g) => (
                <tr key={g.id} className="hover:bg-ink-50">
                  <td className={`${td} font-medium text-ink-900`}>{g.name}</td>
                  <td className={td}>{g.email || <span className="text-ink-400">—</span>}</td>
                  <td className={td}>{g.side}</td>
                  <td className={td}>{g.invited ? 'Yes' : <span className="text-ink-400">No</span>}</td>
                  <td className={td}><Badge status={g.rsvp} /></td>
                  <td className={td}>{g.meal || <span className="text-ink-400">—</span>}</td>
                  <td className={td}>{g.plusOne ? 'Yes' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Card>
    </>
  )
}
