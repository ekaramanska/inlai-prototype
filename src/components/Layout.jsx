import { Outlet, Link, useLocation } from 'react-router-dom'
import { Bot } from 'lucide-react'

export default function Layout() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-navy font-bold text-xl no-underline">
            <Bot className="w-7 h-7 text-orange" />
            INLAi
          </Link>
          {!isLanding && (
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-navy transition-colors no-underline"
            >
              Back to Home
            </Link>
          )}
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-navy text-white/70 text-sm py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-orange" />
            <span className="font-semibold text-white">INLAi</span>
            <span className="hidden sm:inline">- Your AI Compliance Assistant</span>
          </div>
          <p>&copy; {new Date().getFullYear()} INLAi. Prototype demo.</p>
        </div>
      </footer>
    </>
  )
}
