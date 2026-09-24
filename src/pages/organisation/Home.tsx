import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, FileText, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { useAuth } from '@/context/AuthContext'
import { getOrganisationRecords } from '@/lib/medoraServices'
import type { OrgWorkflowRecord } from '@/data/org'

export default function OrganisationHome() {
  const { user } = useAuth()
  const [records, setRecords] = useState<OrgWorkflowRecord[]>([])
  useEffect(() => { if (user?.organisationProfile.id) void getOrganisationRecords(user.organisationProfile.id).then(setRecords).catch(() => setRecords([])) }, [user?.organisationProfile.id])
  const review = records.filter((record) => record.status === 'Pending' || record.status === 'Draft')
  const published = records.filter((record) => record.status === 'Published')

  return (
    <div className="space-y-6">
      <PageHeader title={user?.organisationProfile.name || 'Organisation'} description="Live organisation record workflow and care operations."><Link to="/organisation/records"><Button><FileText className="size-4.5" />Record workflow</Button></Link></PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard stat={{ label: 'Professionals', value: '0', icon: Users, tone: 'navy' }} />
        <StatCard stat={{ label: 'Records in review', value: String(review.length), icon: Building2, tone: 'amber' }} />
        <StatCard stat={{ label: 'Published records', value: String(published.length), icon: FileText }} />
        <StatCard stat={{ label: 'Records this month', value: String(records.length), icon: FileText, tone: 'violet' }} />
      </div>
      <Card><CardContent className="p-6"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-display text-base font-semibold text-slate-900">Records in workflow</h3><p className="text-sm text-slate-500">Only records owned by this organisation.</p></div><Link to="/organisation/records" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">All records <ArrowRight className="size-4" /></Link></div><div className="space-y-3">{records.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-200">No organisation records.</p> : records.slice(0, 8).map((record) => <div key={record.id} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"><div className="min-w-0 flex-1"><p className="text-sm font-medium text-slate-900">{record.type}</p><p className="mt-0.5 text-xs text-slate-500">{record.patient} · {record.patientId} · {record.date}</p></div><Badge tone={record.status === 'Published' ? 'green' : 'amber'}>{record.status}</Badge></div>)}</div></CardContent></Card>
    </div>
  )
}
