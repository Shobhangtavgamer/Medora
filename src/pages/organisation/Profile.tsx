import { useState } from 'react'
import { Building2, KeyRound, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Checkbox } from '@/components/ui/Field'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { organisations } from '@/data/organisations'
import { useAuth } from '@/context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const org = organisations.find((o) => o.id === 'ORG-74PQ20')
  const [home, setHome] = useState({
    name: org?.name ?? '',
    email: org?.email ?? '',
    phone: org?.phone ?? '',
    address: org?.address ?? '',
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Organisation profile" description="Details for your healthcare organisation." />

      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-navy-700 to-brand-600 p-6 text-white shadow-soft">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold ring-1 ring-white/25">
          {org?.name.charAt(0)}
        </span>
        <div>
          <p className="text-lg font-bold">{org?.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/85">
            <IdChip id={user?.organisationProfile.id ?? 'ORG-74PQ20'} className="bg-white/15 text-white" />
            <VerifiedBadge verified />
            <span>{org?.type} · since {org?.since}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Organisation information" icon={<Building2 className="size-5" />} />
          <CardContent className="space-y-4">
            <Field label="Name">
              <Input value={home.name} onChange={(e) => setHome({ ...home, name: e.target.value })} />
            </Field>
            <Field label="Address">
              <Input value={home.address} onChange={(e) => setHome({ ...home, address: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={home.phone} onChange={(e) => setHome({ ...home, phone: e.target.value })} />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setHome({ name: org?.name ?? '', email: org?.email ?? '', phone: org?.phone ?? '', address: org?.address ?? '' })}
              >
                Reset
              </Button>
              <Button size="sm" onClick={() => showToast('Organisation information updated.')}>
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Account & security" icon={<KeyRound className="size-5" />} />
          <CardContent className="space-y-4">
            <Field label="Organisation email">
              <Input type="email" value={home.email} onChange={(e) => setHome({ ...home, email: e.target.value })} />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => showToast('Change password link sent to organisation email.')}>
                Change password
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setHome({ ...home, email: org?.email ?? '' })}>
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Organisation governance settings"
          description="Record workflow and verification preferences."
          icon={<ShieldCheck className="size-5" />}
        />
        <CardContent className="space-y-4">
          <Checkbox label="Require department-head review before publishing any record" defaultChecked />
          <Checkbox label="Notify the patient every time a record is published" defaultChecked />
          <Checkbox label="Automatically route correction requests to the metadata team" defaultChecked />
          <div className="flex justify-end pt-1">
            <Button size="sm" onClick={() => showToast('Organisation governance settings saved.')}>
              Save settings
            </Button>
          </div>
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