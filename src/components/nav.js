// One list drives both the desktop sidebar and the mobile bottom bar.
export const navItems = [
  { to: '/',          label: 'Overview', icon: 'overview' },
  { to: '/venues',    label: 'Venues',   icon: 'venue' },
  { to: '/guests',    label: 'Guests',   icon: 'guests' },
  { to: '/vendors',   label: 'Vendors',  icon: 'vendors' },
  { to: '/budget',    label: 'Budget',   icon: 'budget' },
  { to: '/menu',      label: 'Menu',     icon: 'menu' },
  { to: '/music',     label: 'Music',    icon: 'music' },
  { to: '/timeline',  label: 'Timeline', icon: 'timeline' },
  { to: '/tasks',     label: 'Tasks',    icon: 'tasks' },
]

// Which items show in the compact mobile bottom bar (rest live in "More"→sidebar).
export const primaryMobile = ['/', '/guests', '/budget', '/tasks']
