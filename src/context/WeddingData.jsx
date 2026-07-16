import { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as api from '../lib/api.js'

// ---------------------------------------------------------------------------
//  The single data layer. Fetches every tab once on load, caches it in state,
//  exposes loading/error, and provides updateRow/appendRow with OPTIMISTIC
//  updates (the UI changes instantly; we roll back if the Sheet rejects it).
// ---------------------------------------------------------------------------

const Ctx = createContext(null)

// Which key identifies a row within a tab (all tabs use "ID").
const idOf = (row) => row.ID ?? row.Id ?? row.id

export function WeddingDataProvider({ children }) {
  const [data, setData] = useState(null) // { Guests:[], Venues:[], ... }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null) // transient toast { type, message }
  const noticeTimer = useRef(null)

  const flash = useCallback((type, message) => {
    setNotice({ type, message })
    clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setNotice(null), 3000)
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await api.fetchAll())
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Config tab -> a plain { Key: Value } map.
  const config = useMemo(() => {
    const rows = data?.Config || []
    return Object.fromEntries(rows.map((r) => [r.Key, r.Value]))
  }, [data])

  // Theme is defined in code (src/index.css), not the Sheet — Config has no ID
  // column so the app can't manage AccentColor. The cell is simply ignored.

  // --- Optimistic write helpers -----------------------------------------

  const updateRow = useCallback(
    async (tab, id, fields) => {
      let snapshot
      setData((prev) => {
        snapshot = prev
        return {
          ...prev,
          [tab]: (prev[tab] || []).map((row) =>
            String(idOf(row)) === String(id) ? { ...row, ...fields } : row,
          ),
        }
      })
      try {
        await api.updateRow(tab, id, fields)
        flash('success', 'Saved')
      } catch (e) {
        setData(snapshot) // roll back
        flash('error', `Couldn't save — ${e.message}`)
        throw e
      }
    },
    [flash],
  )

  const appendRow = useCallback(
    async (tab, fields) => {
      const tempId = `temp-${Date.now()}`
      setData((prev) => ({ ...prev, [tab]: [...(prev[tab] || []), { ID: tempId, ...fields }] }))
      try {
        const result = await api.appendRow(tab, fields)
        const newId = result?.id ?? result?.ID ?? result?.row?.ID
        if (newId != null) {
          setData((prev) => ({
            ...prev,
            [tab]: prev[tab].map((row) => (row.ID === tempId ? { ...row, ID: newId } : row)),
          }))
        }
        flash('success', 'Added')
        return newId ?? tempId
      } catch (e) {
        setData((prev) => ({ ...prev, [tab]: prev[tab].filter((row) => row.ID !== tempId) }))
        flash('error', `Couldn't add — ${e.message}`)
        throw e
      }
    },
    [flash],
  )

  const value = useMemo(
    () => ({
      data,
      config,
      loading,
      error,
      notice,
      reload: load,
      updateRow,
      appendRow,
      // convenience accessors (always arrays, even before load)
      tab: (name) => data?.[name] || [],
    }),
    [data, config, loading, error, notice, load, updateRow, appendRow],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useWeddingData() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useWeddingData must be used inside <WeddingDataProvider>')
  return ctx
}
