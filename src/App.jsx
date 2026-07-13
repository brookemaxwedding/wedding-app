import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Overview from './pages/Overview.jsx'
import Venues from './pages/Venues.jsx'
import Guests from './pages/Guests.jsx'
import Vendors from './pages/Vendors.jsx'
import Budget from './pages/Budget.jsx'
import Menu from './pages/Menu.jsx'
import Music from './pages/Music.jsx'
import Timeline from './pages/Timeline.jsx'
import Tasks from './pages/Tasks.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/music" element={<Music />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
