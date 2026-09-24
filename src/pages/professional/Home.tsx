import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Inbox, Rocket, UserRound } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { useAuth } from '@/context/AuthContext'
import { getProfessionalAccessRequests, searchPatients } from '@/lib/medoraServices'

const requestTone: Record<string, BadgeProps['tone']> = { pending: 'amber', approved: 'green', rejected: 'red', revoked: 'slate' }

type PatientSearchResult = { patient_id: string; profile: { name: string } }
type ProfessionalRequest = { id: string; patient_id: string; purpose: string; status: string; requested_at: string }

export default function ProfessionalHome() {
  const { user } = useAuth()
  const [patients, setPatients] = useState<PatientSearchResult[]>([])
  const [requests, setRequests] = useState<ProfessionalRequest[]>([])

  useEffect(() => {
    void Promise.all([searchPatients(''), getProfessionalAccessRequests()])
      .then(([loadedPatients, loadedRequests]) => {
        setPatients(loadedPatients)
        setRequests(loadedRequests as ProfessionalRequest[])
      })
      .catch(() => {
        setPatients([])
        setRequests([])
      })
  }, [])

  const pendingRequests = requests.filter((request) => request.status === 'pending')
  const activePatients = requests.filter((request) => request.status === 'approved')

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name.split(' ')[0] ?? 'there'}`}
        description="Live activity from your professional profile."
      >
        <Link to="/professional/patients">
          <Button><UserRound className="size-4.5" />View patients</Button>
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard stat={{ label: 'Authorised patients', value: String(activePatients.length), icon: UserRound }} />
        <StatCard stat={{ label: 'Pending requests', value: String(pendingRequests.length), icon: Inbox, tone: 'amber' }} />
        <StatCard stat={{ label: 'Active referrals', value: '0', icon: Rocket, tone: 'violet' }} />
        <StatCard stat={{ label: 'Organisation links', value: '0', icon: Clock, tone: 'navy' }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div><h3 className="font-display text-base font-semibold text-slate-900">Patient directory</h3><p className="text-sm text-slate-500">Basic identity only until consent is approved.</p></div>
              <Link to="/professional/patients" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">All patients <ArrowRight className="size-4" /></Link>
            </div>
            <div className="space-y-3">
              {patients.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-200">No patients found.</p> : patients.map((patient) => (
                <Link key={patient.patient_id} to={`/professional/patients/${patient.patient_id}`} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{patient.profile.name.charAt(0)}</span>
                  <span className="min-w-0 flex-1"><span className="block font-medium text-slate-900">{patient.profile.name}</span><span className="text-xs text-slate-500">Patient identity</span></span>
                  <IdChip id={patient.patient_id} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between"><div><h3 className="font-display text-base font-semibold text-slate-900">Access requests</h3><p className="text-sm text-slate-500">Requests and consent status from the database.</p></div><Link to="/professional/requests" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">All requests <ArrowRight className="size-4" /></Link></div>
            <div className="space-y-3">
              {requests.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-200">No access requests.</p> : requests.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"><div className="min-w-0 flex-1"><p className="text-sm font-medium text-slate-900">{request.purpose}</p><p className="mt-0.5 text-xs text-slate-500">{request.patient_id} · {request.requested_at}</p></div><Badge tone={requestTone[request.status] ?? 'slate'} className="shrink-0 text-[10px]">{request.status}</Badge></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
