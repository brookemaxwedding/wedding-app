import { Routes, Route } from 'react-router-dom'
import { WeddingDataProvider, useWeddingData } from './context/WeddingData.jsx'
import Layout from './components/Layout.jsx'
import { LoadingState, ErrorState, Toast } from './components/StateScreens.jsx'
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
import Rsvp from './pages/Rsvp.jsx'

// The authenticated planning dashboard. Chrome (sidebar/nav) is always shown;
// the content area swaps between loading, error, and the routed page so the
// user never sees a blank screen.
function Dashboard() {
  const { loading, error, reload, notice } = useWeddingData()
  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : (
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
      )}
      <Toast notice={notice} />
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public, token-free page guests use to RSVP. Rendered standalone. */}
      <Route path="/rsvp" element={<Rsvp />} />
      {/* Everything else is the planning dashboard, behind the data layer. */}
      <Route
        path="/*"
        element={
          <WeddingDataProvider>
            <Dashboard />
          </WeddingDataProvider>
        }
      />
    </Routes>
  )
}
