import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
      <div className="glass mx-auto max-w-7xl overflow-hidden rounded-[22px] border border-white/60 shadow-soft ring-1 ring-slate-900/5">
        <div className="flex h-16 items-center justify-between px-4 sm:px-5">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-base font-semibold transition',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login">
              <Button variant="ghost" size="md">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="md">Get started</Button>
            </Link>
          </div>

          <button
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {open ? (
          <nav
            className="animate-slide-in border-t border-slate-200/70 bg-white/70 px-4 pb-5 pt-2 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
cn(
                    'rounded-full px-4 py-3 text-base font-semibold transition',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100',
                  )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2.5 border-t border-slate-100 pt-4">
                <Link to="/login">
                  <Button variant="outline" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button fullWidth>Get started</Button>
                </Link>
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}