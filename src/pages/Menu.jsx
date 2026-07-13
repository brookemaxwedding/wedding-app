import { PageHeader, Card, Badge } from '../components/ui.jsx'
import { menu } from '../data/weddingData.js'

export default function Menu() {
  return (
    <>
      <PageHeader title="Menu & Drinks" subtitle="Working draft of the dinner service and bar." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink-900">Dinner</h2>
          <div className="space-y-4">
            {menu.courses.map((c) => (
              <Card key={c.id}>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{c.course}</p>
                <ul className="mt-2 space-y-1.5">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-ink-700">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink-900">Bar</h2>
          <Card>
            <ul className="space-y-3">
              {menu.drinks.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-ink-700">{d.name}</span>
                  <Badge>{d.type}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
