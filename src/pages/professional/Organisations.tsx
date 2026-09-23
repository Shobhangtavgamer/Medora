import { useState } from 'react'
import { Building2, Link2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { organisations } from '@/data/organisations'
import { useAuth } from '@/context/AuthContext'

const associationTone: Record<string, BadgeProps['tone']> = {
  Active: 'green',
  Pending: 'amber',
  Inactive: 'red',
}

export default function Organisations() {
  const { user } = useAuth()
  const [toast, setToast] = useState<string | null>(null)
  const [linkOrg, setLinkOrg] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const affiliations: Record<string, string> = {
    [user?.professionalProfile.id ?? '']: 'Active',
    'ORG-77MB20': 'Pending',
    'ORG-88QL09': 'Inactive',
  }

  const statusFor = (id: string) => {
    if (id === 'ORG-62SK91') return 'Active' as const
    return (affiliations[id] ?? 'Inactive') as 'Active' | 'Pending' | 'Inactive'
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Organisations" description="Healthcare organisations you are associated with." />

      <div className="grid gap-4 md:grid-cols-2">
        {organisations.map((o) => {
          const association = statusFor(o.id)
          return (
            <Card key={o.id}>
              <CardHeader
                title={o.name}
                description={o.type}
                icon={<Building2 className="size-5" />}
                action={<VerifiedBadge verified={o.verified} />}
              />
              <CardContent>
                <div className="space-y-1.5 text-sm text-slate-600">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Organisation ID</span>
                    <IdChip id={o.id} />
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Since</span>
                    <span className="font-medium text-slate-800">{o.since}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-400">Association</span>
                    <Badge tone={associationTone[association]} dot>
                      {association}
                    </Badge>
                  </p>
                  <p className="pt-1 text-xs text-slate-400">{o.services.join(' · ')}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {association !== 'Active' ? (
                    <Button size="sm" variant="outline" onClick={() => setLinkOrg(o.id)}>
                      <Link2 className="size-4" />
                      Request association
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => showToast(`${o.name} records workflow opened.`)}>
                      Open organisation view
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <ConfirmDialog
        open={Boolean(linkOrg)}
        title="Request organisation association?"
        description="The organisation will verify your credentials before the association becomes active."
        confirmLabel="Send request"
        onConfirm={() => {
          setLinkOrg(null)
          showToast('Association request sent to the organisation.')
        }}
        onClose={() => setLinkOrg(null)}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}