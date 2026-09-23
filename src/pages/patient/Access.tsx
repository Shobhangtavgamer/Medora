import { useState } from 'react'
import { ShieldCheck, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TabBar } from '@/components/ui/TabBar'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { GrantAccessModal } from '@/components/shared/GrantAccessModal'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { activeAccess, accessRequests, consentHistory } from '@/data/access'
import { formatDate } from '@/lib/utils'

type Tab = 'Active Access' | 'Requests' | 'History'

export default function Access() {
  const [tab, setTab] = useState<Tab>('Active Access')
  const [toast, setToast] = useState<string | null>(null)
  const [grantingId, setGrantingId] = useState<string | null>(null)
  const [decliningId, setDecliningId] = useState<string | null>(null)
  const [revokingId, setRevokingId] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const granting = accessRequests.find((r) => r.id === grantingId)
  const pending = accessRequests.filter((r) => r.status === 'Pending')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Access &amp; Consent"
        description="You decide who sees your information — what, why, and for how long."
      />

      <TabBar tabs={['Active Access', 'Requests', 'History'] as const} active={tab} onChange={setTab} className="w-fit" />

      {tab === 'Active Access' ? (
        <div className="space-y-4">
          {activeAccess.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-sm text-slate-500">
                No active access grants.
              </CardContent>
            </Card>
          ) : (
            activeAccess.map((a) => (
              <Card key={a.id} className={a.status === 'Expiring' ? 'ring-amber-200' : undefined}>
                <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">{a.granteeName}</p>
                        <IdChip id={a.granteeId} />
                        <Badge tone={a.status === 'Expiring' ? 'amber' : 'green'}>
                          {a.status === 'Expiring' ? 'Expiring soon' : 'Active'}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-slate-500">{a.organisation}</p>
                      <p className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">Purpose:</span> {a.purpose}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Information:
                        </span>
                        {a.information.map((i) => (
                          <Badge key={i} tone="slate" className="text-[10px]">
                            {i}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-1.5 text-sm lg:items-end">
                    <p className="text-slate-500">
                      Grants {formatDate(a.grantedAt)} ·{' '}
                      <span className="font-semibold text-slate-800">Expires {formatDate(a.expiresAt)}</span>
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRevokingId(a.id)}
                      className="text-red-600 ring-red-200 hover:bg-red-50 hover:ring-red-300"
                    >
                      Revoke
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : null}

      {tab === 'Requests' ? (
        <div className="space-y-4">
          {pending.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-sm text-slate-500">No pending access requests.</CardContent>
            </Card>
          ) : (
            pending.map((r) => (
              <Card key={r.id}>
                <CardHeader
                  title={`${r.requesterName} — ${r.organisation}`}
                  description={r.purpose}
                  icon={<UserCheck className="size-5" />}
                  action={<Badge tone="amber">Requested {formatDate(r.date)}</Badge>}
                />
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Information requested:
                    </span>
                    {r.information.map((i) => (
                      <Badge key={i} tone="slate" className="text-[10px]">
                        {i}
                      </Badge>
                    ))}
                    <Badge tone="navy" className="text-[10px]">
                      Duration: {r.requestedDuration}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" onClick={() => setGrantingId(r.id)}>
                      Grant Access
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setDecliningId(r.id)}>
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : null}

      {tab === 'History' ? (
        <div className="space-y-3">
          {consentHistory.map((h) => (
            <Card key={h.id}>
              <CardContent className="flex items-start justify-between gap-4 p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{h.entity}</p>
                    <Badge tone={h.action.startsWith('Access granted') || h.action.includes('shared') ? 'green' : 'red'}>
                      {h.action}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{h.details}</p>
                </div>
                <span className="shrink-0 text-sm text-slate-400">{formatDate(h.date)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <GrantAccessModal
        open={Boolean(granting)}
        onClose={() => setGrantingId(null)}
        granteeName={granting?.requesterName ?? ''}
        purpose={granting?.purpose ?? ''}
        onGranted={(_info, duration) => {
          setGrantingId(null)
          showToast(`Access granted to ${granting?.requesterName ?? 'requester'} for ${duration}.`)
        }}
      />

      <ConfirmDialog
        open={Boolean(decliningId)}
        title="Decline this access request?"
        confirmLabel="Decline request"
        danger
        onConfirm={() => showToast('Access request declined.')}
        onClose={() => setDecliningId(null)}
      />
      <ConfirmDialog
        open={Boolean(revokingId)}
        title="Revoke this access?"
        description="The professional will lose access to the granted information immediately."
        confirmLabel="Revoke access"
        danger
        onConfirm={() => showToast('Access revoked and recorded in history.')}
        onClose={() => setRevokingId(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}