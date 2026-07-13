import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base ('./') keeps asset paths working on GitHub Pages
// project sites (served from https://<user>.github.io/<repo>/) without
// hardcoding the repo name. Combined with HashRouter, refreshes and deep
// links work with no server-side rewrites.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
