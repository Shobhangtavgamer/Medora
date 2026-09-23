import { useState } from 'react'
import { BadgeCheck, KeyRound, Palette, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Checkbox } from '@/components/ui/Field'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { useAuth } from '@/context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const [toast, setToast] = useState<string | null>(null)

  const [personal, setPersonal] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    mobile: user?.mobile ?? '',
    dob: user?.patientProfile.dob ?? '',
  })

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Your personal information and account settings." />

      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-navy-700 p-6 text-white shadow-soft">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold ring-1 ring-white/25">
          {user?.name.charAt(0)}
        </span>
        <div>
          <p className="text-lg font-bold">{user?.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/85">
            <IdChip id={user?.patientProfile.id ?? ''} className="bg-white/15 text-white" />
            <span className="inline-flex items-center gap-1">
              <BadgeCheck className="size-4 text-green-300" /> Identity verified
            </span>
            <span>Member since {user?.patientProfile.since}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Personal information" icon={<Palette className="size-5" />} />
          <CardContent className="space-y-4">
            <Field label="Full name">
              <Input value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} />
            </Field>
            <Field label="Date of birth">
              <Input
                type="date"
                value={personal.dob}
                onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
              />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => setPersonal({ ...personal, name: user?.name ?? '', dob: user?.patientProfile.dob ?? '' })}>
                Reset
              </Button>
              <Button size="sm" onClick={() => showToast('Personal information updated.')}>
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
              <Input
                value={personal.mobile}
                onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })}
              />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => showToast('Password change link sent to your email.')}
              >
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
          title="Privacy preferences"
          description="Control how your information is used across the platform."
          icon={<ShieldCheck className="size-5" />}
        />
        <CardContent className="space-y-4">
          <Checkbox label="Allow authorised professionals to see a compact health summary before interaction" defaultChecked />
          <Checkbox label="Use my health data to improve AI-assisted clinical summaries" defaultChecked />
          <Checkbox label="Notify me every time a professional views my record" />
          <div className="flex justify-end pt-1">
            <Button size="sm" onClick={() => showToast('Privacy preferences saved.')}>
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