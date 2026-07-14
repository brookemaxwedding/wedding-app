import { PageHeader, Card } from '../components/ui.jsx'
import { EditableText } from '../components/Editable.jsx'
import { useWeddingData } from '../context/WeddingData.jsx'
import { truthy } from '../lib/values.js'

export default function Music() {
  const { tab, updateRow, appendRow } = useWeddingData()
  const rows = tab('Music')
  const save = (id, field) => (value) => updateRow('Music', id, { [field]: value })

  // Group by Segment (Ceremony / Cocktail / Reception / …).
  const segments = []
  const bySegment = {}
  for (const r of rows) {
    const s = r.Segment || 'Other'
    if (!bySegment[s]) {
      bySegment[s] = []
      segments.push(s)
    }
    bySegment[s].push(r)
  }

  return (
    <>
      <PageHeader
        title="Music"
        subtitle="Playlists for each part of the day."
        action={
          <button
            type="button"
            onClick={() => appendRow('Music', { Segment: 'Reception', Song: 'New song' })}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600"
          >
            + Add song
          </button>
        }
      />
      {rows.length === 0 ? (
        <Card><p className="py-6 text-center text-ink-400">No songs yet.</p></Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {segments.map((segment) => (
            <Card key={segment}>
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">{segment}</h2>
              <ol className="space-y-3">
                {bySegment[segment].map((track, i) => {
                  const dnp = truthy(track.DoNotPlay)
                  return (
                    <li key={track.ID} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-semibold ${dnp ? 'bg-red-100 text-red-600' : 'bg-brand-50 text-brand-600'}`}>
                        {dnp ? '✕' : i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className={`text-sm font-medium ${dnp ? 'text-ink-400 line-through' : 'text-ink-900'}`}>
                          <EditableText value={track.Song} onSave={save(track.ID, 'Song')} placeholder="Song" />
                        </div>
                        <div className="text-sm text-ink-400">
                          <EditableText value={track.Artist} onSave={save(track.ID, 'Artist')} placeholder="Artist" />
                        </div>
                        {track.SpotifyLink && (
                          <a href={track.SpotifyLink} target="_blank" rel="noreferrer" className="text-xs font-medium text-sage-600 hover:underline">
                            Open in Spotify ↗
                          </a>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
