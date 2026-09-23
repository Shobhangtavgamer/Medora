import { useState } from 'react'
import { Building2, Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { GrantAccessModal } from '@/components/shared/GrantAccessModal'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { careProfessionals, careOrganisations } from '@/data/careNetwork'
import { professionalById } from '@/data/professionals'
import { organisationById } from '@/data/organisations'
import { AccessBadge } from '@/components/shared/IdentityBadges'

export default function CareNetwork() {
  const [toast, setToast] = useState<string | null>(null)
  const [manageOrg, setManageOrg] = useState<string | null>(null)
  const [grantFor, setGrantFor] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const grantTarget = professionalById(grantFor ?? undefined)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Care Network"
        description="Professionals and organisations you are connected to."
      />

      <Card>
        <CardHeader
          title="Professionals"
          description="People involved in your care."
          icon={<Stethoscope className="size-5" />}
        />
        <CardContent className="grid gap-4 md:grid-cols-2">
          {careProfessionals.map((c) => {
            const p = professionalById(c.professionalId)
            if (!p) return null
            return (
              <div key={c.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 font-bold text-brand-700 ring-1 ring-brand-100">
                      {p.name.replace('Dr. ', '').charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-sm text-slate-500">
                        {p.profession} · {p.specialty}
                      </p>
                    </div>
                  </div>
                  <VerifiedBadge verified={p.verified} />
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Organisation</span>
                    <span className="font-medium text-slate-800">{p.organisation}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Professional ID</span>
                    <IdChip id={p.id} />
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Relationship</span>
                    <span className="font-medium text-slate-800">{c.relationship}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Access</span>
                    <AccessBadge status={c.access} />
                  </p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Organisations"
          description="Clinics, hospitals and labs connected to your record."
          icon={<Building2 className="size-5" />}
        />
        <CardContent className="grid gap-4 md:grid-cols-2">
          {careOrganisations.map((c) => {
            const o = organisationById(c.organisationId)
            if (!o) return null
            return (
              <div key={c.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 font-bold text-navy-700 ring-1 ring-navy-100">
                      {o.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{o.name}</p>
                      <p className="text-sm text-slate-500">{o.type}</p>
                    </div>
                  </div>
                  <VerifiedBadge verified={o.verified} />
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Organisation ID</span>
                    <IdChip id={o.id} />
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Relationship</span>
                    <span className="font-medium text-slate-800">{c.relationship}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Access</span>
                    <AccessBadge status={c.access} />
                  </p>
                </div>
                <div className="mt-4 flex gap-2.5">
                  <Button size="sm" variant="outline" onClick={() => showToast(`${o.name} — records view`)}>
                    View
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setManageOrg(c.organisationId)}>
                    Manage Access
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <GrantAccessModal
        open={Boolean(grantFor)}
        onClose={() => setGrantFor(null)}
        granteeName={grantTarget?.name ?? ''}
        purpose="Care relationship"
        onGranted={(_info, duration) => {
          setGrantFor(null)
          showToast(`Access granted to ${grantTarget?.name ?? 'professional'} for ${duration}.`)
        }}
      />

      <ConfirmDialog
        open={Boolean(manageOrg)}
        title="Manage organisation access"
        description="You can limit what this organisation sees in your record."
        confirmLabel="Keep current access"
        onConfirm={() => {
          showToast('Organisation access unchanged.')
        }}
        onClose={() => setManageOrg(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}