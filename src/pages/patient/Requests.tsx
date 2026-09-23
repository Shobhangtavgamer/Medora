import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TabBar } from '@/components/ui/TabBar'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { GrantAccessModal } from '@/components/shared/GrantAccessModal'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { patientRequests } from '@/data/requests'
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
  const [tab, setTab] = useState<'Incoming' | 'Sent'>('Incoming')
  const [acceptId, setAcceptId] = useState<string | null>(null)
  const [declineId, setDeclineId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const list = patientRequests.filter((r) => (tab === 'Incoming' ? r.direction === 'incoming' : r.direction === 'sent'))
  const target = patientRequests.find((r) => r.id === acceptId)

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
            const Icon = r.direction === 'incoming' ? ArrowDownLeft : ArrowUpRight
            return (
              <Card key={r.id}>
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{r.person}</p>
                      <IdChip id={r.personId} />
                      <span className="text-sm text-slate-400">· {r.organisation}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{r.purpose}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {r.information} · {formatDate(r.date)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      <Badge tone={statusTone[r.status]} dot>
                        {r.status}
                      </Badge>
                      {r.status === 'Pending' && r.direction === 'incoming' ? (
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
        granteeName={target?.person ?? ''}
        purpose={target?.purpose ?? ''}
        onGranted={(_info, duration) => {
          setAcceptId(null)
          showToast(`Access granted to ${target?.person ?? 'requester'} for ${duration}.`)
        }}
      />

      <ConfirmDialog
        open={Boolean(declineId)}
        title="Decline this request?"
        confirmLabel="Decline"
        danger
        onConfirm={() => showToast('Request declined.')}
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