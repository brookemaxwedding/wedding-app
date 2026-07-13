import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" subtitle="That page doesn't exist yet." />
      <Link to="/" className="font-medium text-brand-600 hover:text-brand-700">
        ← Back to Overview
      </Link>
    </>
  )
}
