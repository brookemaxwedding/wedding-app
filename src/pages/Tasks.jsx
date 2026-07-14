import { PageHeader, Card, Badge, ProgressBar } from '../components/ui.jsx'
import { EditableText, EditableSelect } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { taskProgress } from '../lib/derive.js'
import { shortDate, daysUntil } from '../lib/format.js'
import { isDone } from '../lib/values.js'

const PRIORITY = ['Low', 'Medium', 'High']
const STATUS = ['To Do', 'In Progress', 'Done']

export default function Tasks() {
  const { tab, updateRow, appendRow } = useWeddingData()
  const tasks = tab('Tasks')
  const save = (id, field) => (value) => updateRow('Tasks', id, { [field]: value })
  const tp = taskProgress(tasks)

  const sorted = [...tasks].sort(
    (a, b) => new Date(a.DueDate || '9999') - new Date(b.DueDate || '9999'),
  )

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle={`${tp.done} of ${tp.total} complete`}
        action={
          <button
            type="button"
            onClick={() => appendRow('Tasks', { Task: 'New task', Status: 'To Do', Priority: 'Medium' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add task
          </button>
        }
      />

      <Card className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-ink-600">Checklist progress</span>
          <span className="font-medium text-ink-900">{tp.pct}%</span>
        </div>
        <ProgressBar value={tp.pct} />
      </Card>

      <Card>
        <ul className="divide-y divide-ink-100">
          {sorted.map((t) => {
            const done = isDone(t.Status)
            const days = daysUntil(t.DueDate)
            const overdue = !done && t.DueDate && days < 0
            const soon = !done && t.DueDate && days >= 0 && days <= 30
            return (
              <li key={t.ID} className="flex flex-wrap items-center gap-3 py-3">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={(e) => save(t.ID, 'Status')(e.target.checked ? 'Done' : 'To Do')}
                  className="h-5 w-5 flex-none cursor-pointer rounded border-ink-200 accent-brand-500"
                />
                <div className="min-w-[12rem] flex-1">
                  <div className={`font-medium ${done ? 'text-ink-400 line-through' : 'text-ink-900'}`}>
                    <EditableText value={t.Task} onSave={save(t.ID, 'Task')} placeholder="Task" />
                  </div>
                  <div className="text-sm text-ink-400">
                    <EditableText value={t.Category} onSave={save(t.ID, 'Category')} placeholder="Category" />
                  </div>
                </div>
                <EditableSelect value={t.Priority} options={PRIORITY} onSave={save(t.ID, 'Priority')} />
                <div className="flex flex-none flex-col items-end gap-1">
                  <span className={`text-sm ${overdue ? 'font-medium text-red-600' : 'text-ink-600'}`}>
                    {t.DueDate ? shortDate(t.DueDate) : '—'}
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
