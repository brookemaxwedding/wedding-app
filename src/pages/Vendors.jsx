import { PageHeader, Card } from '../components/ui.jsx'
import { EditableText, EditableSelect, EditableCheck } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { currency } from '../lib/format.js'
import { truthy } from '../lib/values.js'

const CONTRACT = ['Not Started', 'Inquiry', 'Proposal', 'Signed']

export default function Vendors() {
  const { tab, updateRow, appendRow } = useWeddingData()
  const vendors = tab('Vendors')
  const save = (id, field) => (value) => updateRow('Vendors', id, { [field]: value })

  return (
    <>
      <PageHeader
        title="Vendors"
        subtitle="Contacts and contract status for our wedding team."
        action={
          <button
            type="button"
            onClick={() => appendRow('Vendors', { Name: 'New vendor', ContractStatus: 'Inquiry' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add vendor
          </button>
        }
      />
      {vendors.length === 0 ? (
        <Card><p className="py-6 text-center text-ink-400">No vendors yet.</p></Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {vendors.map((v) => (
            <Card key={v.ID}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium uppercase tracking-wide text-brand-600">
                    <EditableText value={v.Category} onSave={save(v.ID, 'Category')} placeholder="Category" />
                  </div>
                  <div className="mt-0.5 font-serif text-xl font-semibold text-ink-900">
                    <EditableText value={v.Name} onSave={save(v.ID, 'Name')} placeholder="Vendor name" />
                  </div>
                </div>
                <EditableSelect value={v.ContractStatus} options={CONTRACT} onSave={save(v.ID, 'ContractStatus')} />
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Contact">
                  <EditableText value={v.ContactName} onSave={save(v.ID, 'ContactName')} placeholder="—" />
                </Row>
                <Row label="Email">
                  {v.Email ? (
                    <a href={`mailto:${v.Email}`} className="font-medium text-brand-600 hover:text-brand-700">{v.Email}</a>
                  ) : (
                    <EditableText value={v.Email} onSave={save(v.ID, 'Email')} placeholder="email" />
                  )}
                </Row>
                <Row label="Phone">
                  {v.Phone ? (
                    <a href={`tel:${String(v.Phone).replace(/[^\d+]/g, '')}`} className="font-medium text-brand-600 hover:text-brand-700">{v.Phone}</a>
                  ) : (
                    <EditableText value={v.Phone} onSave={save(v.ID, 'Phone')} placeholder="phone" />
                  )}
                </Row>
                <Row label="Quote">
                  <EditableText type="number" value={v.Quote} onSave={save(v.ID, 'Quote')} prefix="$" placeholder="—" />
                </Row>
                <div className="flex items-center justify-between gap-2 border-t border-ink-100 pt-2">
                  <dt className="text-ink-400">Deposit paid</dt>
                  <dd><EditableCheck value={truthy(v.DepositPaid)} onSave={save(v.ID, 'DepositPaid')} /></dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-ink-400">{label}</dt>
      <dd className="min-w-0 max-w-[60%] text-right font-medium text-ink-900">{children}</dd>
    </div>
  )
}
