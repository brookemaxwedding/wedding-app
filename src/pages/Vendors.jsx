import { PageHeader, Card, Badge } from '../components/ui.jsx'
import { vendors } from '../data/weddingData.js'
import { currency } from '../lib/format.js'

export default function Vendors() {
  return (
    <>
      <PageHeader title="Vendors" subtitle="Contacts and contract status for our wedding team." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {vendors.map((v) => (
          <Card key={v.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{v.type}</p>
                <h2 className="mt-0.5 font-serif text-xl font-semibold text-ink-900">{v.name}</h2>
              </div>
              <Badge status={v.contract} />
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-ink-400">Contact</dt>
                <dd className="font-medium text-ink-900">{v.contact}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ink-400">Email</dt>
                <dd>
                  <a href={`mailto:${v.email}`} className="font-medium text-brand-600 hover:text-brand-700">
                    {v.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ink-400">Phone</dt>
                <dd>
                  <a href={`tel:${v.phone.replace(/[^\d+]/g, '')}`} className="font-medium text-brand-600 hover:text-brand-700">
                    {v.phone}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-ink-100 pt-2">
                <dt className="text-ink-400">Est. cost</dt>
                <dd className="font-medium text-ink-900">{currency(v.cost)}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </>
  )
}
