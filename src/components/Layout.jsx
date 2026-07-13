import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems, primaryMobile } from './nav.js'
import Icon from './Icon.jsx'
import { wedding } from '../data/weddingData.js'
import { daysUntil } from '../lib/format.js'

// Brand block reused in the desktop sidebar and mobile drawer.
function Brand() {
  return (
    <div className="flex items-center gap-3 px-2">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white">
        <Icon name="ring" className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <p className="font-serif text-lg font-semibold text-ink-900">{wedding.coupleNames}</p>
        <p className="text-xs text-ink-400">Wedding HQ</p>
      </div>
    </div>
  )
}

const linkBase =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors'
const linkClass = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? 'bg-brand-500 text-white shadow-sm'
      : 'text-ink-600 hover:bg-brand-50 hover:text-brand-700'
  }`

function NavList({ onNavigate }) {
  return (
    <nav className="mt-6 flex flex-1 flex-col gap-1">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass} onClick={onNavigate}>
          <Icon name={item.icon} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const days = daysUntil(wedding.date)

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setDrawerOpen(false), [location.pathname])

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink-100 bg-white p-4 lg:flex">
        <Brand />
        <NavList />
        <div className="rounded-xl bg-brand-50 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-brand-600">Countdown</p>
          <p className="font-serif text-2xl font-semibold text-brand-700">{days} days</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-2 text-ink-600 hover:bg-ink-100"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <Brand />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-2 text-ink-600 hover:bg-ink-100"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <NavList onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:pb-10">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-ink-100 bg-white/95 backdrop-blur lg:hidden">
        {navItems
          .filter((i) => primaryMobile.includes(i.to))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                  isActive ? 'text-brand-600' : 'text-ink-400'
                }`
              }
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-ink-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
            <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
          </svg>
          More
        </button>
      </nav>
    </div>
  )
}
