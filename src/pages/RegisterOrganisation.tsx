import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, MapPin, ShieldCheck } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Input, Select } from '@/components/ui/Field'
import { useAuth } from '@/context/AuthContext'

export default function RegisterOrganisation() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      signIn({ email: 'records@xyzhospital.org', workspace: 'organisation' })
      navigate('/organisation')
    }, 900)
  }

  return (
    <AuthShell
      title="Register your organisation"
      subtitle="Hospitals, clinics, and diagnostics labs publish records with full provenance."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <Field label="Organisation name" required>
          <Input id="orgName" placeholder="XYZ Hospital" autoComplete="organization" required />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Organisation type" required>
            <Select id="orgType" defaultValue="Hospital">
              <option>Hospital</option>
              <option>Clinic</option>
              <option>Independent Practice</option>
              <option>Medical Centre</option>
              <option>Diagnostics Lab</option>
            </Select>
          </Field>
          <Field label="Year established" required>
            <Input id="since" type="number" min="1900" max="2026" placeholder="2009" required />
          </Field>
        </div>

        <Field label="Registered address" required>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
            <Input id="address" className="pl-10" placeholder="12/E1, Next Galla Lane, Andheri East, Mumbai 400069" required />
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Work email" required>
            <Input id="email" type="email" placeholder="records@organisation.org" autoComplete="email" required />
          </Field>
          <Field label="Phone" required>
            <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" autoComplete="tel" required />
          </Field>
        </div>

        <Field label="Organisation authorisation" required hint="Verifies that you have the authority to register this organisation.">
          <div className="relative">
            <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
            <Input id="auth" className="pl-10" placeholder="e.g. Registration / licence number" required />
          </div>
        </Field>

        <Field label="Password" required hint="At least 8 characters with a number.">
          <Input id="password" type="password" placeholder="Create a strong password" autoComplete="new-password" required />
        </Field>

        <Checkbox
          label={
            <>
              I confirm this organisation is verified to publish healthcare records, and I agree to the{' '}
              <span className="font-semibold text-brand-600">Terms of Service</span>.
            </>
          }
          required
        />

        <Button type="submit" size="lg" fullWidth loading={loading}>
          <Building2 className="size-4.5" />
          Register organisation
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Creating a personal or professional account?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Go back
        </Link>
      </p>
    </AuthShell>
  )
}