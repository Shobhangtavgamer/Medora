import { useState } from 'react'
import { Award, KeyRound, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Checkbox } from '@/components/ui/Field'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { useAuth } from '@/context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const [personal, setPersonal] = useState({
    name: user?.name ?? '',
    title: user?.professionalProfile.title ?? '',
    email: user?.email ?? '',
    mobile: user?.mobile ?? '',
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your professional profile and practice settings." />

      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-navy-700 p-6 text-white shadow-soft">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold ring-1 ring-white/25">
          {user?.name.charAt(0)}
        </span>
        <div>
          <p className="text-lg font-bold">{user?.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/85">
            <IdChip id={user?.professionalProfile.id ?? ''} className="bg-white/15 text-white" />
            <VerifiedBadge verified />
            <span>{user?.professionalProfile.title} · {user?.professionalProfile.organisation}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Professional information" icon={<Award className="size-5" />} />
          <CardContent className="space-y-4">
            <Field label="Full name">
              <Input value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} />
            </Field>
            <Field label="Profession / specialism">
              <Input value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} />
            </Field>
            <Field label="Practice">
              <Input value={user?.professionalProfile.organisation ?? ''} disabled />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPersonal({ ...personal, name: user?.name ?? '', title: user?.professionalProfile.title ?? '' })}
              >
                Reset
              </Button>
              <Button size="sm" onClick={() => showToast('Professional information updated.')}>
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Account & security" icon={<KeyRound className="size-5" />} />
          <CardContent className="space-y-4">
            <Field label="Email address">
              <Input
                type="email"
                value={personal.email}
                onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
              />
            </Field>
            <Field label="Mobile number">
              <Input value={personal.mobile} onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })} />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => showToast('Password change link sent to your email.')}>
                Change password
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPersonal({ ...personal, email: user?.email ?? '', mobile: user?.mobile ?? '' })}
              >
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Professional preferences"
          description="How your work appears to patients and organisations."
          icon={<ShieldCheck className="size-5" />}
        />
        <CardContent className="space-y-4">
          <Checkbox label="Show AI Context summaries before opening a patient's full record" defaultChecked />
          <Checkbox label="Notify me when a patient updates their own health information" />
          <Checkbox label="Auto-request access renewal when an existing grant is about to expire" />
          <div className="flex justify-end pt-1">
            <Button size="sm" onClick={() => showToast('Professional preferences saved.')}>
              Save preferences
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