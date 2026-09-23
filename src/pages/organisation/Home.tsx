import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, ClipboardList, FileText, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { StatCard } from '@/components/ui/StatCard'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { organisations } from '@/data/organisations'
import { orgRequests, orgStats, orgWorkflowRecords } from '@/data/org'
import { professionalsByOrganisation } from '@/data/professionals'

const requestTone: Record<string, BadgeProps['tone']> = {
  Pending: 'amber',
  Resolved: 'green',
}

export default function OrganisationHome() {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const org = organisations.find((o) => o.id === 'ORG-74PQ20')
  const pendingRequests = orgRequests.filter((r) => r.status === 'Pending')
  const inReview = orgWorkflowRecords.filter((r) => r.status === 'Pending' || r.status === 'Correction')

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${org?.name ?? 'XYZ Hospital'}`}
        description="Organisation record workflow and care operations."
      >
        <Link to="/organisation/records">
          <Button>
            <FileText className="size-4.5" />
            Record workflow
          </Button>
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard stat={{ label: 'Professionals', value: String(professionalsByOrganisation('ORG-74PQ20').length), icon: Users, tone: 'navy' }} />
        <StatCard stat={{ label: 'Active care relationships', value: String(orgStats.activeCareRelationships), icon: Building2 }} />
        <StatCard stat={{ label: 'Pending requests', value: String(pendingRequests.length), icon: ClipboardList, tone: 'amber' }} />
        <StatCard stat={{ label: 'Records this month', value: String(orgStats.recordsThisMonth), icon: FileText, tone: 'violet' }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900">Requests</h3>
                <p className="text-sm text-slate-500">Record reviews, associations and corrections.</p>
              </div>
              <Link to="/organisation/requests" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
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
                      <p className="text-sm font-medium text-slate-900">{r.summary}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {r.type} · {r.from} · {r.fromId} · {r.date}
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

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-slate-900">Records in review</h3>
                <p className="text-sm text-slate-500">Draft, pending and correction workflows.</p>
              </div>
              <Link to="/organisation/records" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                All records <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {inReview.map((r) => (
                <div key={r.id} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {r.type} · {r.patient}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {r.id} · {r.professional} · {r.date}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{r.note}</p>
                  </div>
                  <Badge
                    tone={r.status === 'Correction' ? 'red' : r.status === 'Draft' ? 'slate' : 'amber'}
                    className="shrink-0 text-[10px]"
                  >
                    {r.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100">
            <Building2 className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900">{org?.name}</p>
            <p className="text-sm text-slate-500">
              {org?.address} · {org?.phone} · Records published through the organisation workflow.
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => showToast('Organisation overview opened.')}>
            Organisation settings
          </Button>
        </CardContent>
      </Card>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}