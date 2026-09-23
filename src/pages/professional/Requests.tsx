import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardList } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { professionalRequests } from '@/data/professionalRequests'
import { formatDate } from '@/lib/utils'

const requestTone: Record<string, BadgeProps['tone']> = {
  'Waiting on patient': 'amber',
  Pending: 'navy',
  Accepted: 'green',
  Declined: 'red',
  Completed: 'brand',
}

export default function Requests() {
  const [toast, setToast] = useState<string | null>(null)
  const [actionTarget, setActionTarget] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const pendings = professionalRequests.filter((r) => ['Waiting on patient', 'Pending'].includes(r.status))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Requests"
        description="Access approvals, referral updates and record contributions."
      />

      {pendings.length > 0 ? (
        <Card>
          <CardHeader
            title="Needs attention"
            description="Act on these or follow up with the patient."
            icon={<ClipboardList className="size-5" />}
          />
          <CardContent className="space-y-3">
            {pendings.map((r) => (
              <div key={r.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{r.title}</p>
                    <Badge tone="navy" className="text-[10px]">
                      {r.kind}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{r.detail}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {r.patient} · <IdChip id={r.patientId} /> · {formatDate(r.date)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge tone={requestTone[r.status]}>{r.status}</Badge>
                  <Button size="sm" variant="outline" onClick={() => setActionTarget(r.id)}>
                    Update status
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader title="Request history" description="All access, referral and record requests." icon={<ClipboardList className="size-5" />} />
        <CardContent className="space-y-2">
          {professionalRequests.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 ring-1 ring-slate-100">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800">
                  {r.title} <span className="text-slate-400">· {r.patient}</span>
                </p>
                <p className="text-xs text-slate-400">{formatDate(r.date)}</p>
              </div>
              <Badge tone={requestTone[r.status]} className="shrink-0 text-[10px]">
                {r.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-sm text-slate-500">
        Need a patient to review an access request?{' '}
        <Link to="/professional/patients" className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700">
          Open a patient view <ArrowRight className="size-4" />
        </Link>
      </p>

      <ConfirmDialog
        open={Boolean(actionTarget)}
        title="Update request status?"
        description="Mark this request as handled. The patient record and activity log will reflect the change."
        confirmLabel="Mark handled"
        onConfirm={() => {
          setActionTarget(null)
          showToast('Request marked as handled.')
        }}
        onClose={() => setActionTarget(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}