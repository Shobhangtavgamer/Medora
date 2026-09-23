import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Inbox, Rocket, UserRound } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { patientProfiles } from '@/data/patientProfiles'
import { professionalRequests } from '@/data/professionalRequests'
import { referrals } from '@/data/referrals'
import { professionalsByOrganisation } from '@/data/professionals'
import { organisations } from '@/data/organisations'
import { formatDate } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const requestTone: Record<string, BadgeProps['tone']> = {
  'Waiting on patient': 'amber',
  Pending: 'navy',
  Accepted: 'green',
  Declined: 'red',
  Completed: 'brand',
}

export default function ProfessionalHome() {
  const { user } = useAuth()
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const consulting = user?.professionalProfile.organisation ?? 'Sharma Medical Clinic'
  const practiceOrg = organisations.find((o) => o.id === 'ORG-62SK91')

  const pendingRequests = professionalRequests.filter((r) => r.status === 'Waiting on patient' || r.status === 'Pending')
  const activeReferrals = referrals.filter((r) => r.status === 'Sent' || r.status === 'Accepted')
  const activePatients = patientProfiles.filter((p) => p.access.status === 'Active')

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name.split(' ')[0] ?? 'Ava'}`}
        description="Here is what is happening across your practice today."
      >
        <Link to="/professional/patients">
          <Button>
            <UserRound className="size-4.5" />
            View patients
          </Button>
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard stat={{ label: 'Active patients', value: String(activePatients.length), icon: UserRound }} />
        <StatCard stat={{ label: 'Pending requests', value: String(pendingRequests.length), icon: Inbox, tone: 'amber' }} />
        <StatCard stat={{ label: 'Active referrals', value: String(activeReferrals.length), icon: Rocket, tone: 'violet' }} />
        <StatCard
          stat={{
            label: 'Practice colleagues',
            value: String(professionalsByOrganisation('ORG-62SK91').length),
            icon: Clock,
            tone: 'navy',
          }}
        />
        <p className="text-sm text-slate-400 sm:col-span-2 xl:col-span-4">{consulting} · your current practice</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900">Patient activity</h3>
                <p className="text-sm text-slate-500">Recent touchpoints across your patients.</p>
              </div>
              <Link to="/professional/patients" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                All patients <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {patientProfiles.map((p) => (
                <Link
                  key={p.id}
                  to={`/professional/patients/${p.id}`}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:ring-brand-200"
                >
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${p.avatarColor}`}>
                    {p.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{p.name}</p>
                    <p className="truncate text-xs text-slate-500">{p.recentActivity}</p>
                  </div>
                  <IdChip id={p.id} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900">Requests awaiting review</h3>
                <p className="text-sm text-slate-500">Access, referral, and record actions.</p>
              </div>
              <Link to="/professional/requests" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                All requests <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {pendingRequests.length === 0 ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-200">No pending requests.</p>
              ) : (
                pendingRequests.map((r) => (
                  <div key={r.id} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900">{r.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {r.patient} · {r.patientId} · {formatDate(r.date)}
                      </p>
                    </div>
                    <Badge tone={requestTone[r.status]} className="shrink-0 text-[10px]">
                      {r.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {practiceOrg ? (
        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 font-bold text-navy-700 ring-1 ring-navy-100">
              {practiceOrg.name.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">{practiceOrg.name}</p>
              <p className="text-sm text-slate-500">
                Your associated practice · {practiceOrg.services.join(', ')}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => showToast('Practice details opened.')}>
              Manage practice
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}