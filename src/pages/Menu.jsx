import { PageHeader, Card } from '../components/ui.jsx'
import { EditableText } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'

export default function Menu() {
  const { tab, updateRow, appendRow } = useWeddingData()
  const items = tab('Menu')
  const save = (id, field) => (value) => updateRow('Menu', id, { [field]: value })

  // Group rows by their Course, preserving first-seen order.
  const courses = []
  const byCourse = {}
  for (const it of items) {
    const c = it.Course || 'Other'
    if (!byCourse[c]) {
      byCourse[c] = []
      courses.push(c)
    }
    byCourse[c].push(it)
  }

  return (
    <>
      <PageHeader
        title="Menu & Drinks"
        subtitle="Working draft of the food and bar."
        action={
          <button
            type="button"
            onClick={() => appendRow('Menu', { Course: 'Other', Item: 'New item' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add item
          </button>
        }
      />
      {items.length === 0 ? (
        <Card><p className="py-6 text-center text-ink-400">No menu items yet.</p></Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <Card key={course}>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-brand-600">{course}</p>
              <ul className="space-y-3">
                {byCourse[course].map((it) => (
                  <li key={it.ID} className="border-b border-ink-100 pb-3 last:border-0 last:pb-0">
                    <div className="font-medium text-ink-900">
                      <EditableText value={it.Item} onSave={save(it.ID, 'Item')} placeholder="Item" />
                    </div>
                    <div className="text-sm text-ink-500">
                      <EditableText value={it.Description} onSave={save(it.ID, 'Description')} placeholder="Description…" />
                    </div>
                    {(it.DietaryTags || '') !== '' && (
                      <span className="mt-1 inline-block rounded-full bg-sage-100 px-2 py-0.5 text-xs font-medium text-sage-600">
                        {it.DietaryTags}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
