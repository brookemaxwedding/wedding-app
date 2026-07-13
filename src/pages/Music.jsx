import { PageHeader, Card } from '../components/ui.jsx'
import { music } from '../data/weddingData.js'

const sections = [
  { key: 'ceremony', label: 'Ceremony', hint: 'Processional to recessional' },
  { key: 'cocktail', label: 'Cocktail Hour', hint: 'Golden-hour vibes' },
  { key: 'reception', label: 'Reception', hint: 'First dance to last call' },
]

export default function Music() {
  return (
    <>
      <PageHeader title="Music" subtitle="Playlists for each part of the day." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {sections.map((s) => (
          <Card key={s.key}>
            <h2 className="font-serif text-xl font-semibold text-ink-900">{s.label}</h2>
            <p className="mb-4 text-sm text-ink-400">{s.hint}</p>
            <ol className="space-y-3">
              {music[s.key].map((track, i) => (
                <li key={track.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink-900">{track.title}</p>
                    <p className="text-sm text-ink-400">{track.artist}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
    </>
  )
}
