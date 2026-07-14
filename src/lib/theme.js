// Turn a single AccentColor hex (from the Config tab) into a full 50–900 scale
// and write it onto the Tailwind brand CSS variables at runtime. Because the
// Tailwind v4 utilities reference var(--color-brand-*), overriding these
// variables on <html> re-themes the entire app live.

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const toHex = ([r, g, b]) =>
  '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)

const WHITE = [255, 255, 255]
const BLACK = [0, 0, 0]

// How much to lighten (toward white) or darken (toward black) each stop.
const STOPS = {
  50: ['w', 0.9], 100: ['w', 0.8], 200: ['w', 0.6], 300: ['w', 0.4], 400: ['w', 0.18],
  500: ['-', 0], 600: ['b', 0.12], 700: ['b', 0.3], 800: ['b', 0.48], 900: ['b', 0.62],
}

export function applyAccent(hex) {
  if (!hex || typeof hex !== 'string' || !/^#?[0-9a-f]{3,6}$/i.test(hex.trim())) return
  let base
  try {
    base = hexToRgb(hex)
  } catch {
    return
  }
  const root = document.documentElement
  for (const [stop, [dir, t]] of Object.entries(STOPS)) {
    const color = dir === 'w' ? mix(base, WHITE, t) : dir === 'b' ? mix(base, BLACK, t) : base
    root.style.setProperty(`--color-brand-${stop}`, toHex(color))
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', toHex(base))
}
