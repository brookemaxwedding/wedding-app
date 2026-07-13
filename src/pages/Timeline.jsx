import { PageHeader, Card } from '../components/ui.jsx'
import { timeline } from '../data/weddingData.js'

export default function Timeline() {
  return (
    <>
      <PageHeader title="Timeline" subtitle="The day-of schedule, start to send-off." />
      <Card>
        <ol className="relative ml-3 border-l-2 border-brand-100">
          {timeline.map((slot) => (
            <li key={slot.id} className="relative mb-6 pl-6 last:mb-0">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-brand-500" />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-serif text-lg font-semibold text-brand-700 tabular-nums">{slot.time}</span>
                <span className="font-medium text-ink-900">{slot.event}</span>
              </div>
              <p className="text-sm text-ink-400">{slot.owner}</p>
            </li>
          ))}
        </ol>
      </Card>
    </>
  )
}
