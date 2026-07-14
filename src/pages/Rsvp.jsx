import { useState } from 'react'
import { lookupRsvp, submitRsvp } from '../lib/api.js'
import { truthy, rsvpState } from '../lib/values.js'

// ---------------------------------------------------------------------------
//  PUBLIC page — the only screen wedding guests ever see. No token required:
//  it uses the public ?action=lookup and action=rsvp endpoints. Rendered
//  standalone (no sidebar / data context).
// ---------------------------------------------------------------------------

// The lookup response shape isn't fixed, so pull the party out defensively.
function extractParty(res) {
  if (Array.isArray(res)) return res
  if (!res || typeof res !== 'object') return []
  if (Array.isArray(res.party)) return res.party
  if (Array.isArray(res.guests)) return res.guests
  if (Array.isArray(res.Guests)) return res.Guests
  if (res.guest) return [res.guest]
  return []
}

const shell =
  'min-h-screen bg-ink-50 flex flex-col items-center px-4 py-10 sm:py-16'
const card = 'w-full max-w-lg rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:p-8'

export default function Rsvp() {
  const [step, setStep] = useState('code') // code | party | done
  const [code, setCode] = useState('')
  const [party, setParty] = useState([]) // [{ guest, attending, meal, dietary, plusOneName, note }]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleLookup(e) {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await lookupRsvp(code.trim())
      const guests = extractParty(res)
      if (guests.length === 0) {
        setError("We couldn't find that invite code. Double-check the letters on your invitation.")
        return
      }
      setParty(
        guests.map((guest) => ({
          guest,
          attending: rsvpState(guest.RSVP) === 'pending' ? '' : rsvpState(guest.RSVP),
          meal: guest.Meal || '',
          dietary: guest.Dietary || '',
          plusOneName: guest.PlusOneName || '',
          note: '',
        })),
      )
      setStep('party')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const setField = (i, field, value) =>
    setParty((p) => p.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)))

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      for (const row of party) {
        await submitRsvp({
          code: code.trim(),
          guestId: row.guest.ID,
          attending: row.attending === 'yes',
          meal: row.attending === 'yes' ? row.meal : '',
          dietary: row.attending === 'yes' ? row.dietary : '',
          plusOneName: row.attending === 'yes' ? row.plusOneName : '',
          note: row.note,
        })
      }
      setStep('done')
    } catch (err) {
      setError(err.message || "We couldn't submit your reply. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={shell}>
      <div className="mb-8 text-center">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
            <circle cx="12" cy="14" r="6" /><path d="M9 5l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="font-serif text-4xl font-semibold text-ink-900">You're Invited</h1>
        <p className="mt-1 text-ink-600">We'd be so happy to celebrate with you.</p>
      </div>

      {step === 'code' && (
        <form className={card} onSubmit={handleLookup}>
          <label className="block text-sm font-medium text-ink-700">Enter your invite code</label>
          <p className="mb-3 text-sm text-ink-400">You'll find it on your invitation.</p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. ABCD"
            autoCapitalize="characters"
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-center text-lg font-semibold tracking-widest uppercase focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-brand-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? 'Looking you up…' : 'Find my invitation'}
          </button>
        </form>
      )}

      {step === 'party' && (
        <form className={card} onSubmit={handleSubmit}>
          <p className="mb-4 text-ink-600">
            Found your party! Please reply for {party.length === 1 ? 'yourself' : 'each guest'} below.
          </p>
          <div className="space-y-6">
            {party.map((row, i) => (
              <div key={row.guest.ID} className="rounded-2xl border border-ink-100 p-4">
                <p className="font-serif text-xl font-semibold text-ink-900">{row.guest.Name}</p>

                <div className="mt-3 flex gap-2">
                  {['yes', 'no'].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setField(i, 'attending', val)}
                      className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                        row.attending === val
                          ? val === 'yes'
                            ? 'border-sage-400 bg-sage-50 text-sage-600'
                            : 'border-red-300 bg-red-50 text-red-600'
                          : 'border-ink-200 text-ink-600 hover:bg-ink-50'
                      }`}
                    >
                      {val === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}
                    </button>
                  ))}
                </div>

                {row.attending === 'yes' && (
                  <div className="mt-4 space-y-3">
                    <Field label="Meal preference">
                      <input
                        value={row.meal}
                        onChange={(e) => setField(i, 'meal', e.target.value)}
                        placeholder="e.g. Chicken, Vegetarian…"
                        className="input"
                      />
                    </Field>
                    <Field label="Dietary needs or allergies">
                      <input
                        value={row.dietary}
                        onChange={(e) => setField(i, 'dietary', e.target.value)}
                        placeholder="Optional"
                        className="input"
                      />
                    </Field>
                    {truthy(row.guest.PlusOneAllowed) && (
                      <Field label="Plus-one name">
                        <input
                          value={row.plusOneName}
                          onChange={(e) => setField(i, 'plusOneName', e.target.value)}
                          placeholder="Leave blank if none"
                          className="input"
                        />
                      </Field>
                    )}
                  </div>
                )}

                <Field label="A note for the couple (optional)" className="mt-3">
                  <input
                    value={row.note}
                    onChange={(e) => setField(i, 'note', e.target.value)}
                    placeholder="Can't wait!"
                    className="input"
                  />
                </Field>
              </div>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || party.some((r) => r.attending === '')}
            className="mt-5 w-full rounded-xl bg-brand-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send RSVP'}
          </button>
          <button type="button" onClick={() => setStep('code')} className="mt-3 w-full text-sm text-ink-400 hover:text-ink-600">
            ← Use a different code
          </button>
          <style>{`.input{width:100%;border-radius:0.75rem;border:1px solid var(--color-ink-200);padding:0.5rem 0.75rem;font-size:0.875rem}
          .input:focus{outline:none;border-color:var(--color-brand-400);box-shadow:0 0 0 1px var(--color-brand-400)}`}</style>
        </form>
      )}

      {step === 'done' && (
        <div className={`${card} text-center`}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-3xl">💛</div>
          <h2 className="font-serif text-2xl font-semibold text-ink-900">Thank you!</h2>
          <p className="mt-2 text-ink-600">
            Your reply has been sent. We can't wait to celebrate with you.
          </p>
          <button
            type="button"
            onClick={() => {
              setStep('code')
              setCode('')
              setParty([])
            }}
            className="mt-5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Submit another code
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-ink-400">With love — thank you for being part of our day.</p>
    </div>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-ink-700">{label}</span>
      {children}
    </label>
  )
}
