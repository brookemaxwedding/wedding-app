import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// This is a GitHub Pages PROJECT site served from
//   https://brookemaxwedding.github.io/wedding-app/
// so the base path must be '/wedding-app/' — otherwise the built index.html
// requests its JS/CSS from the domain root and the page loads blank.
// Combined with HashRouter, refreshes and deep links work with no server
// rewrites. If you ever rename the repo, update this to match.
export default defineConfig({
  base: '/wedding-app/',
  plugins: [react(), tailwindcss()],
})
