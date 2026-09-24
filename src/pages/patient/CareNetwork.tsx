import { useEffect, useState } from 'react'
import { Building2, Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { useAuth } from '@/context/AuthContext'
import { getPatientAccessRequests, getPatientRecords, type AccessRequestRow } from '@/lib/medoraServices'

export default function CareNetwork() {
  const { user } = useAuth()
  const [access, setAccess] = useState<AccessRequestRow[]>([])
  const [organisations, setOrganisations] = useState<string[]>([])
  useEffect(() => {
    if (!user?.patientProfile.id) return
    void Promise.all([getPatientAccessRequests(user.patientProfile.id), getPatientRecords(user.patientProfile.id)]).then(([requests, records]) => { setAccess(requests); setOrganisations([...new Set(records.filter((record) => record.source === 'Organisation').map((record) => record.organisation))]) }).catch(() => { setAccess([]); setOrganisations([]) })
  }, [user?.patientProfile.id])
  const professionals = access.filter((item) => item.status === 'approved' || item.status === 'pending')

  return (
    <div className="space-y-6">
      <PageHeader title="Care Network" description="Professionals and organisations connected through your records and consent." />
      <Card><CardHeader title="Professionals" description="Access is controlled by your consent." icon={<Stethoscope className="size-5" />} /><CardContent className="grid gap-4 md:grid-cols-2">{professionals.length === 0 ? <p className="text-sm text-slate-500">No professional relationships recorded.</p> : professionals.map((item) => <div key={item.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900">{item.professional?.profile.name ?? 'Professional'}</p><p className="text-sm text-slate-500">Healthcare professional</p></div><VerifiedBadge verified /></div><div className="mt-4 flex items-center justify-between text-sm"><IdChip id={item.professional?.professional_id ?? ''} /><Badge tone={item.status === 'approved' ? 'green' : 'amber'}>{item.status}</Badge></div></div>)}</CardContent></Card>
      <Card><CardHeader title="Organisations" description="Organisations represented by your published records." icon={<Building2 className="size-5" />} /><CardContent className="grid gap-4 md:grid-cols-2">{organisations.length === 0 ? <p className="text-sm text-slate-500">No organisation relationships recorded.</p> : organisations.map((organisation) => <div key={organisation} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><p className="font-semibold text-slate-900">{organisation}</p><p className="mt-1 text-sm text-slate-500">Organisation record source</p></div>)}</CardContent></Card>
    </div>
  )
}
