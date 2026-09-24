import { useEffect, useState } from 'react'
import { ArrowDownLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TabBar } from '@/components/ui/TabBar'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { GrantAccessModal } from '@/components/shared/GrantAccessModal'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { approveAccessRequest, getPatientAccessRequests, rejectAccessRequest, type AccessRequestRow } from '@/lib/medoraServices'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

const statusTone: Record<string, 'amber' | 'green' | 'red' | 'navy'> = {
  Pending: 'amber',
  Granted: 'green',
  Accepted: 'green',
  Declined: 'red',
  Withdrawn: 'navy',
}

export default function Requests() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<AccessRequestRow[]>([])
  const [tab, setTab] = useState<'Incoming' | 'Sent'>('Incoming')
  const [acceptId, setAcceptId] = useState<string | null>(null)
  const [declineId, setDeclineId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const refresh = () => user?.patientProfile.id ? getPatientAccessRequests(user.patientProfile.id).then(setRequests) : Promise.resolve()
  useEffect(() => { void refresh() }, [user?.patientProfile.id])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const list = tab === 'Incoming' ? requests : []
  const target = requests.find((r) => r.id === acceptId)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Requests"
        description="Incoming access requests and requests you have sent."
      />
      <TabBar tabs={['Incoming', 'Sent'] as const} active={tab} onChange={setTab} className="w-fit" />

      <div className="space-y-3">
        {list.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-slate-500">No {tab.toLowerCase()} requests.</CardContent>
          </Card>
        ) : (
          list.map((r) => {
            const Icon = ArrowDownLeft
            return (
              <Card key={r.id}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{r.professional?.profile.name ?? 'Professional'}</p>
                      <IdChip id={r.professional?.professional_id ?? ''} />
                      <span className="text-sm text-slate-400">· Healthcare professional</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{r.purpose}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {r.scope.join(', ')} · {formatDate(r.requested_at)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      <Badge tone={statusTone[r.status === 'pending' ? 'Pending' : r.status === 'approved' ? 'Accepted' : r.status === 'rejected' ? 'Declined' : r.status]} dot>
                        {r.status}
                      </Badge>
                      {r.status === 'pending' ? (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setDeclineId(r.id)}>
                            Decline
                          </Button>
                          <Button size="sm" onClick={() => setAcceptId(r.id)}>
                            Grant access
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <GrantAccessModal
        open={Boolean(target)}
        onClose={() => setAcceptId(null)}
        granteeName={target?.professional?.profile.name ?? ''}
        purpose={target?.purpose ?? ''}
        onGranted={async (info, duration) => {
          if (target) await approveAccessRequest(target.id, info, Number.parseInt(duration, 10) || 30)
          await refresh()
          setAcceptId(null)
          showToast(`Access granted for ${duration}.`)
        }}
      />

      <ConfirmDialog
        open={Boolean(declineId)}
        title="Decline this request?"
        confirmLabel="Decline"
        danger
        onConfirm={async () => {
          if (declineId) await rejectAccessRequest(declineId)
          await refresh()
          setDeclineId(null)
          showToast('Request declined.')
        }}
        onClose={() => setDeclineId(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}