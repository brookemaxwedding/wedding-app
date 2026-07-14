import { PageHeader, Card } from '../components/ui.jsx'
import { EditableText } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'

export default function Timeline() {
  const { tab, updateRow, appendRow } = useWeddingData()
  const slots = tab('Timeline')
  const save = (id, field) => (value) => updateRow('Timeline', id, { [field]: value })

  return (
    <>
      <PageHeader
        title="Timeline"
        subtitle="The day-of schedule, start to send-off."
        action={
          <button
            type="button"
            onClick={() => appendRow('Timeline', { Time: '', Event: 'New moment' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add moment
          </button>
        }
      />
      {slots.length === 0 ? (
        <Card><p className="py-6 text-center text-ink-400">No schedule yet.</p></Card>
      ) : (
        <Card>
          <ol className="relative ml-3 border-l-2 border-brand-100">
            {slots.map((slot) => (
              <li key={slot.ID} className="relative mb-6 pl-6 last:mb-0">
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-brand-500" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-serif text-lg font-semibold text-brand-700 tabular-nums">
                    <EditableText value={slot.Time} onSave={save(slot.ID, 'Time')} placeholder="Time" />
                  </span>
                  <span className="font-medium text-ink-900">
                    <EditableText value={slot.Event} onSave={save(slot.ID, 'Event')} placeholder="Event" />
                  </span>
                </div>
                <div className="text-sm text-ink-400">
                  <EditableText value={slot.Who} onSave={save(slot.ID, 'Who')} placeholder="Who's responsible" />
                  {slot.Location ? ` · ${slot.Location}` : ''}
                </div>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </>
  )
}
