import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardList } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { getProfessionalAccessRequests } from '@/lib/medoraServices'

const tone: Record<string, BadgeProps['tone']> = { pending: 'amber', approved: 'green', rejected: 'red', revoked: 'slate', expired: 'slate' }

type Request = { id: string; patient_id: string; purpose: string; scope: string[]; status: string; requested_at: string; patient?: { patient_id: string; profile: { name: string } } }

export default function Requests() {
  const [requests, setRequests] = useState<Request[]>([])
  useEffect(() => { void getProfessionalAccessRequests().then((rows) => setRequests(rows as Request[])).catch(() => setRequests([])) }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Requests" description="Live access requests and consent status from your professional profile." />
      <Card>
        <CardHeader title="Access requests" description="Patients approve or reject access. Records appear only after approval." icon={<ClipboardList className="size-5" />} />
        <CardContent className="space-y-3">
          {requests.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-200">No access requests yet. Open a patient and request access to begin.</p> : requests.map((request) => (
            <div key={request.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{request.purpose}</p><p className="mt-0.5 text-sm text-slate-600">{request.patient?.profile.name ?? 'Patient'} · <IdChip id={request.patient?.patient_id ?? request.patient_id} /></p><p className="mt-1 text-xs text-slate-400">{request.scope.join(', ')} · requested {request.requested_at}</p></div>
              <Badge tone={tone[request.status] ?? 'slate'}>{request.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <p className="text-sm text-slate-500">Need to request access for another patient? <Link to="/professional/patients" className="inline-flex items-center gap-1 font-semibold text-brand-600">Open patient search <ArrowRight className="size-4" /></Link></p>
    </div>
  )
}
