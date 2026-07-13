import { PageHeader, Card, Badge } from '../components/ui.jsx'
import { venues } from '../data/weddingData.js'
import { currency } from '../lib/format.js'

export default function Venues() {
  return (
    <>
      <PageHeader title="Venues" subtitle="Comparing our options — shortlisted, visited, and confirmed." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {venues.map((v) => (
          <Card key={v.id} className={v.status === 'confirmed' ? 'ring-2 ring-sage-300' : ''}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-serif text-xl font-semibold text-ink-900">{v.name}</h2>
              <Badge status={v.status} />
            </div>
            <p className="mt-1 text-sm text-ink-400">{v.location}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-ink-400">Capacity</dt>
                <dd className="font-medium text-ink-900">{v.capacity} guests</dd>
              </div>
              <div>
                <dt className="text-ink-400">Est. price</dt>
                <dd className="font-medium text-ink-900">{currency(v.price)}</dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-ink-100 pt-3 text-sm text-ink-600">{v.notes}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
