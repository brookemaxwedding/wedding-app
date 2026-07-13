// Lightweight inline stroke icons (no icon library dependency). Each is a
// 24x24 path set drawn with currentColor so it inherits text color.
const PATHS = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  venue: <><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6" /></>,
  guests: <><circle cx="9" cy="8" r="3" /><path d="M15 8a3 3 0 1 0 0-.01" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M17 15c2.2.3 4 2 4 5" /></>,
  vendors: <><path d="M3 7h18v13H3z" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></>,
  budget: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M15 9.5c0-1.4-1.3-2-3-2s-3 .8-3 2 1.3 1.7 3 2 3 .9 3 2.2-1.5 2.3-3 2.3-3-.7-3-2.1" /></>,
  menu: <><path d="M4 3v18" /><path d="M4 8h4" /><path d="M8 3v18" /><path d="M15 3c-1.5 2-1.5 5 0 7v11" /><path d="M18 3c1.5 2 1.5 5 0 7" /></>,
  music: <><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /><path d="M9 18V5l12-2v13" /></>,
  timeline: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  tasks: <><path d="M9 11l3 3 8-8" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  ring: <><circle cx="12" cy="14" r="6" /><path d="M9 5l3-3 3 3" /><path d="M9 5l1.5 3.5M15 5l-1.5 3.5" /></>,
}

export default function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  )
}
