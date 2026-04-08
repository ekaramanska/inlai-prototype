import { Outlet, Link, useLocation } from 'react-router-dom'
import { Bot, LayoutDashboard, AlertCircle, Building2, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/updates', label: 'Policy Updates', icon: AlertCircle, badge: 2 },
  { to: '/profile', label: 'Company Profile', icon: Building2 },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-navy font-bold text-xl no-underline">
            <Bot className="w-7 h-7 text-orange" />
            INLAi
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                    active
                      ? 'bg-navy/5 text-navy'
                      : 'text-slate-500 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <div className="relative">
                <Menu className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium no-underline transition-colors ${
                    active
                      ? 'bg-navy/5 text-navy'
                      : 'text-slate-500 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        )}
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
