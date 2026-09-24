import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, Navigate } from 'react-router-dom'
import { Bell, Menu, Search, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Avatar } from '@/components/ui/Avatar'
import { AccountMenu } from '@/components/shared/AccountMenu'
import { IdChip } from '@/components/shared/IdentityBadges'
import { useAuth, type Workspace } from '@/context/AuthContext'
import { navByRole, workspaceMeta } from '@/navigation'
import { getUnreadNotificationCount } from '@/lib/medoraServices'
import { cn } from '@/lib/utils'

export function WorkspaceLayout({ role }: { role: Workspace }) {
  const { user, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const meta = workspaceMeta[role]
  const nav = navByRole[role]
  useEffect(() => { void getUnreadNotificationCount().then(setUnread).catch(() => setUnread(0)) }, [role])

  if (loading) return <div className="min-h-screen bg-slate-50" />
  if (!user) return <Navigate to="/login" replace />
  if (!user.availableWorkspaces.includes(role)) return <Navigate to={`/${user.role}`} replace />

  const activeCaption = user
    ? role === 'patient'
      ? user.patientProfile.id
      : role === 'professional'
        ? user.professionalProfile.id
        : user.organisationProfile.id
    : ''

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex h-full flex-col">
      <div className="flex h-18 items-center px-5">
        <Logo />
      </div>
      <div className="mx-3 mb-1 flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
          {role === 'patient' ? 'P' : role === 'professional' ? 'H' : 'O'}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{meta.label}</p>
          <IdChip id={activeCaption} />
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3 scrollbar-thin" aria-label={meta.label}>
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Workspace</p>
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-brand-50 to-brand-100/60 text-brand-700 ring-1 ring-inset ring-brand-100'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'size-5 shrink-0 transition',
                    isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600',
                  )}
                />
                {label}
                {to.endsWith('/notifications') && unread > 0 ? (
                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <div className="mx-1.5 mb-3 flex items-center gap-3">
          <Avatar name={user?.name ?? ''} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{activeCaption}</p>
          </div>
        </div>
        <p className="mx-2 text-[11px] text-slate-400">Use the account menu (top right) to switch workspace.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <SidebarContent />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-slate-950/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 animate-slide-in bg-white shadow-lift">
            <button
              className="absolute right-3 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-18 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="hidden items-center gap-2 rounded-xl bg-slate-100/60 px-3 py-1.5 ring-1 ring-inset ring-transparent focus-within:bg-white focus-within:ring-brand-500 sm:flex lg:max-w-md">
            <Search className="size-4 text-slate-400" />
            <input
              placeholder={meta.placeholder}
              className="h-8 w-full min-w-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <Link
              to={`/${role}/notifications`}
              className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {unread > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {unread}
                </span>
              ) : null}
            </Link>
            <AccountMenu />
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}