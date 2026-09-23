import { useState } from 'react'
import { ClipboardList } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { orgRequests } from '@/data/org'
import { formatDate } from '@/lib/utils'

export default function Requests() {
  const [toast, setToast] = useState<string | null>(null)
  const [resolveId, setResolveId] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const pending = orgRequests.filter((r) => r.status === 'Pending')
  const target = orgRequests.find((r) => r.id === resolveId)

  return (
    <div className="space-y-6">
      <PageHeader title="Requests" description="Record reviews, association requests and corrections." />

      <Card>
        <CardHeader title="Pending" description="Awaiting your decision." icon={<ClipboardList className="size-5" />} />
        <CardContent className="space-y-3">
          {pending.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-200">No pending requests.</p>
          ) : (
            pending.map((r) => (
              <div key={r.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{r.type}</p>
                    <Badge tone="navy" className="text-[10px]">
                      {r.status}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{r.summary}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    {r.from} · <IdChip id={r.fromId} /> · {formatDate(r.date)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" onClick={() => setResolveId(r.id)}>
                    Resolve
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="History" description="Previously resolved requests." icon={<ClipboardList className="size-5" />} />
        <CardContent className="space-y-2">
          {orgRequests
            .filter((r) => r.status === 'Resolved')
            .map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 ring-1 ring-slate-100">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    {r.type} · {r.summary}
                  </p>
                  <p className="text-xs text-slate-400">{formatDate(r.date)}</p>
                </div>
                <Badge tone="green" className="shrink-0 text-[10px]">
                  {r.status}
                </Badge>
              </div>
            ))}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={Boolean(target)}
        title="Resolve this request?"
        description={`Mark "${target?.summary ?? ''}" as resolved. It moves to the request history.`}
        confirmLabel="Mark resolved"
        onConfirm={() => {
          setResolveId(null)
          showToast('Request marked as resolved.')
        }}
        onClose={() => setResolveId(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}