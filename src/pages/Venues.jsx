import { PageHeader, Card } from '../components/ui.jsx'
import { EditableText, EditableSelect } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { currency } from '../lib/format.js'
import { statusKey } from '../lib/values.js'

const STATUS = ['Shortlisted', 'Visited', 'Confirmed', 'Passed']

// Tint the status pill by its (normalized) value.
const statusTint = (v) =>
  ({
    confirmed: 'text-sage-600 border-sage-200 bg-sage-50',
    visited: 'text-brand-700 border-brand-200 bg-brand-50',
    passed: 'text-ink-400 border-ink-200',
  })[statusKey(v)] || 'text-ink-600 border-ink-200'

export default function Venues() {
  const { tab, updateRow, appendRow } = useWeddingData()
  const venues = tab('Venues')
  const save = (id, field) => (value) => updateRow('Venues', id, { [field]: value })

  return (
    <>
      <PageHeader
        title="Venues"
        subtitle="Comparing our options — shortlisted, visited, and confirmed."
        action={
          <button
            type="button"
            onClick={() => appendRow('Venues', { Name: 'New venue', Status: 'Shortlisted' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add venue
          </button>
        }
      />
      {venues.length === 0 ? (
        <Card><p className="py-6 text-center text-ink-400">No venues yet — add your first option.</p></Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {venues.map((v) => (
            <Card key={v.ID} className={statusKey(v.Status) === 'confirmed' ? 'ring-2 ring-sage-300' : ''}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xl font-semibold text-ink-900">
                    <EditableText value={v.Name} onSave={save(v.ID, 'Name')} placeholder="Venue name" />
                  </div>
                  <div className="mt-0.5 text-sm text-ink-400">
                    <EditableText value={v.Address} onSave={save(v.ID, 'Address')} placeholder="Address" />
                  </div>
                </div>
                <EditableSelect value={v.Status} options={STATUS} onSave={save(v.ID, 'Status')} className={statusTint(v.Status)} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-ink-400">Capacity</dt>
                  <dd className="font-medium text-ink-900">
                    <EditableText type="number" value={v.Capacity} onSave={save(v.ID, 'Capacity')} placeholder="—" />
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-400">Est. cost</dt>
                  <dd className="font-medium text-ink-900">
                    <EditableText type="number" value={v.Cost} onSave={save(v.ID, 'Cost')} prefix="$" placeholder="—" />
                  </dd>
                </div>
              </dl>

              <div className="mt-4 border-t border-ink-100 pt-3 text-sm text-ink-600">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-400">Notes</p>
                <EditableText value={v.Notes} onSave={save(v.ID, 'Notes')} placeholder="Add notes…" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
