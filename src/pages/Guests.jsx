import { PageHeader, Card, TableWrap } from '../components/ui.jsx'
import { EditableText, EditableSelect, EditableCheck } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { rsvpCounts } from '../lib/derive.js'
import { truthy } from '../lib/values.js'

const th = 'px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400 whitespace-nowrap'
const td = 'px-3 py-2 text-sm text-ink-700 align-top'

export default function Guests() {
  const { tab, config, updateRow, appendRow } = useWeddingData()
  const guests = tab('Guests')
  const r = rsvpCounts(guests)
  const save = (id, field) => (value) => updateRow('Guests', id, { [field]: value })

  const sideOptions = [config.PartnerOneName, config.PartnerTwoName, 'Both'].filter(Boolean)

  return (
    <>
      <PageHeader
        title="Guests"
        subtitle={`${r.invited} invited · ${r.yes} attending · ${r.pending} awaiting reply`}
        action={
          <button
            type="button"
            onClick={() => appendRow('Guests', { Name: 'New guest', Invited: true, RSVP: 'Pending' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add guest
          </button>
        }
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
                <th className={th}>Dietary</th>
                <th className={th}>+1</th>
                <th className={th}>Table</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {guests.map((g) => (
                <tr key={g.ID} className="hover:bg-ink-50/60">
                  <td className={`${td} min-w-[10rem] font-medium text-ink-900`}>
                    <EditableText value={g.Name} onSave={save(g.ID, 'Name')} placeholder="Name" />
                  </td>
                  <td className={`${td} min-w-[12rem]`}>
                    <EditableText value={g.Email} onSave={save(g.ID, 'Email')} placeholder="email" />
                  </td>
                  <td className={td}>
                    <EditableSelect value={g.Side} options={sideOptions} onSave={save(g.ID, 'Side')} />
                  </td>
                  <td className={`${td} text-center`}>
                    <EditableCheck value={truthy(g.Invited)} onSave={save(g.ID, 'Invited')} />
                  </td>
                  <td className={td}>
                    <EditableSelect value={g.RSVP} options={['Pending', 'Yes', 'No']} onSave={save(g.ID, 'RSVP')} />
                  </td>
                  <td className={`${td} min-w-[8rem]`}>
                    <EditableText value={g.Meal} onSave={save(g.ID, 'Meal')} placeholder="—" />
                  </td>
                  <td className={`${td} min-w-[8rem]`}>
                    <EditableText value={g.Dietary} onSave={save(g.ID, 'Dietary')} placeholder="—" />
                  </td>
                  <td className={`${td} min-w-[9rem]`}>
                    {truthy(g.PlusOneAllowed) ? (
                      <EditableText value={g.PlusOneName} onSave={save(g.ID, 'PlusOneName')} placeholder="+1 name" />
                    ) : (
                      <span className="px-2 text-ink-300">not allowed</span>
                    )}
                  </td>
                  <td className={`${td} w-16`}>
                    <EditableText value={g.Table} onSave={save(g.ID, 'Table')} placeholder="—" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Card>
      <p className="mt-3 px-1 text-xs text-ink-400">Tip: click any cell to edit — changes save to your Sheet instantly.</p>
    </>
  )
}
