import { NavLink, Outlet } from 'react-router-dom'
import { Activity, FlaskConical, Pill, ShieldAlert, Stethoscope } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'

const subNav = [
  { to: '/patient/my-health', label: 'Overview', icon: Activity, end: true },
  { to: '/patient/my-health/timeline', label: 'Timeline', icon: FlaskConical },
  { to: '/patient/my-health/conditions', label: 'Conditions', icon: Stethoscope },
  { to: '/patient/my-health/medications', label: 'Medications', icon: Pill },
  { to: '/patient/my-health/allergies', label: 'Allergies', icon: ShieldAlert },
]

export function MyHealthLayout() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Health"
        description="Your known health information, kept current across your care network."
      />
      <nav className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 ring-1 ring-slate-200" aria-label="My Health">
        {subNav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all',
                isActive
                  ? 'bg-white text-brand-700 shadow-soft ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-800',
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  )
}