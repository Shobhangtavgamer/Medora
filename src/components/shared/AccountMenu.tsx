import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, ShieldCheck, Stethoscope, User as UserIcon, Building2 } from 'lucide-react'
import { Dropdown } from '@/components/ui/Dropdown'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth, type Workspace } from '@/context/AuthContext'
import { IdChip } from '@/components/shared/IdentityBadges'
import { cn } from '@/lib/utils'

const workspaceIcon: Record<Workspace, typeof UserIcon> = {
  patient: UserIcon,
  professional: Stethoscope,
  organisation: Building2,
}

export function AccountMenu() {
  const { user, workspace, setWorkspace, signOut } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  const activeId =
    workspace === 'patient'
      ? user.patientProfile.id
      : workspace === 'professional'
        ? user.professionalProfile.id
        : user.organisationProfile.id

  const switchTo = (w: Workspace) => {
    setWorkspace(w)
    navigate(`/${w}`)
  }

  return (
    <Dropdown
      trigger={(toggle, open) => (
        <button
          onClick={toggle}
          className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-slate-100"
          aria-label="Account menu"
        >
          <Avatar name={user.name} size="sm" />
          <ChevronDown
            className={cn('size-4 text-slate-400 transition-transform', open && 'rotate-180')}
          />
        </button>
      )}
    >
      {(close) => (
        <div>
          <div className="px-3 pb-2 pt-2">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
            <div className="mt-2">
              <IdChip id={activeId} />
            </div>
          </div>

          <div className="my-1 border-t border-slate-100" />
          <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            Switch workspace
          </p>
          {user.availableWorkspaces.map((w) => {
            const Icon = workspaceIcon[w]
            const label =
              w === 'patient' ? 'Patient profile' : w === 'professional' ? 'Professional profile' : 'Organisation'
            const sub =
              w === 'patient'
                ? user.patientProfile.id
                : w === 'professional'
                  ? user.professionalProfile.id
                  : user.organisationProfile.name
            return (
              <button
                key={w}
                onClick={() => {
                  switchTo(w)
                  close()
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition',
                  workspace === w
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-lg ring-1',
                    workspace === w
                      ? 'bg-brand-100 text-brand-700 ring-brand-200'
                      : 'bg-slate-100 text-slate-500 ring-slate-200',
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{label}</span>
                  <span className="block truncate text-xs text-slate-400">{sub}</span>
                </span>
                {workspace === w ? <ShieldCheck className="size-4 text-brand-600" /> : null}
              </button>
            )
          })}

          <div className="my-1 border-t border-slate-100" />
          <button
            onClick={() => {
              signOut()
              navigate('/')
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      )}
    </Dropdown>
  )
}