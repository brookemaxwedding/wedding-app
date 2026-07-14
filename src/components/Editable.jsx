import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
//  Inline editors. Each takes the current value and an async onSave(newValue).
//  Because writes are optimistic in the data layer, edits feel instant.
// ---------------------------------------------------------------------------

const cellBtn =
  'w-full rounded-md px-2 py-1 text-left text-sm hover:bg-brand-50 focus:bg-brand-50 focus:outline-none focus:ring-1 focus:ring-brand-300'
const cellInput =
  'w-full rounded-md border border-brand-300 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-400'

// Click-to-edit text / number cell.
export function EditableText({ value, onSave, type = 'text', placeholder = '—', prefix = '' }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value ?? '')
  const ref = useRef(null)

  useEffect(() => setVal(value ?? ''), [value])
  useEffect(() => {
    if (editing) ref.current?.focus()
  }, [editing])

  const commit = () => {
    setEditing(false)
    if (String(val) === String(value ?? '')) return
    onSave(type === 'number' ? (val === '' ? '' : Number(val)) : val)
  }

  if (!editing) {
    const empty = value == null || value === ''
    return (
      <button type="button" className={cellBtn} onClick={() => setEditing(true)} title="Click to edit">
        {empty ? (
          <span className="text-ink-200">{placeholder}</span>
        ) : (
          <span>{prefix}{value}</span>
        )}
      </button>
    )
  }

  return (
    <input
      ref={ref}
      type={type}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') {
          setVal(value ?? '')
          setEditing(false)
        }
      }}
      className={cellInput}
    />
  )
}

// Always-rendered dropdown. Adds the current value to the option list if it's
// not one of the presets, so odd sheet values are never lost.
export function EditableSelect({ value, options, onSave, className = '' }) {
  const opts = options.includes(value) || value == null || value === '' ? options : [value, ...options]
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onSave(e.target.value)}
      className={`rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium capitalize focus:outline-none focus:ring-1 focus:ring-brand-400 ${className}`}
    >
      <option value="">—</option>
      {opts.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

// Checkbox that commits a boolean immediately.
export function EditableCheck({ value, onSave, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onSave(e.target.checked)}
        className="h-4 w-4 rounded border-ink-200 accent-brand-500"
      />
      {label && <span className="text-sm text-ink-600">{label}</span>}
    </label>
  )
}
