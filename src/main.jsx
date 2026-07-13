import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// HashRouter (URLs like /#/guests) is used deliberately: GitHub Pages serves
// static files with no SPA fallback, so BrowserRouter would 404 on refresh or
// deep links. Hash routing needs no server config.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
