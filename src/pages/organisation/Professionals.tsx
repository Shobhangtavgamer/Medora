import { useState } from 'react'
import { Stethoscope, UserPlus } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { professionalsByOrganisation } from '@/data/professionals'

const associationTone: Record<string, BadgeProps['tone']> = {
  Active: 'green',
  Pending: 'amber',
  Inactive: 'red',
}

export default function Professionals() {
  const [toast, setToast] = useState<string | null>(null)
  const [approveId, setApproveId] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const list = professionalsByOrganisation('ORG-74PQ20').sort((a, b) => a.association.localeCompare(b.association))
  const pending = list.filter((p) => p.association === 'Pending')
  const pendingTarget = list.find((p) => p.id === approveId)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Professionals"
        description="Associated professionals at XYZ Hospital."
      />

      {pending.length > 0 ? (
        <Card>
          <CardHeader
            title="Association requests"
            description="Professionals awaiting verification and approval."
            icon={<UserPlus className="size-5" />}
          />
          <CardContent className="space-y-3">
            {pending.map((p) => (
              <div key={p.id} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-bold text-brand-700 ring-1 ring-brand-100">
                  {p.name.replace('Dr. ', '').charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{p.name}</p>
                  <p className="text-sm text-slate-500">
                    {p.specialty} · {p.role}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <IdChip id={p.id} />
                    <VerifiedBadge verified={p.verified} />
                  </div>
                </div>
                <Button size="sm" onClick={() => setApproveId(p.id)}>
                  Approve association
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <Card key={p.id}>
            <CardHeader
              title={p.name}
              description={`${p.specialty} · ${p.role}`}
              icon={<Stethoscope className="size-5" />}
              action={
                <Badge tone={associationTone[p.association]} dot>
                  {p.association}
                </Badge>
              }
            />
            <CardContent className="space-y-1.5 text-sm text-slate-600">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Professional ID</span>
                <IdChip id={p.id} />
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Organisation</span>
                <span className="font-medium text-slate-800">{p.organisation}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Verification</span>
                <VerifiedBadge verified={p.verified} />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(pendingTarget)}
        title={`Approve ${pendingTarget?.name ?? 'this professional'}?`}
        description="Their credentials are verified. The association will become active immediately and they will appear in the workspace."
        confirmLabel="Approve"
        onConfirm={() => {
          setApproveId(null)
          showToast(`${pendingTarget?.name ?? 'Professional'} association approved.`)
        }}
        onClose={() => setApproveId(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}