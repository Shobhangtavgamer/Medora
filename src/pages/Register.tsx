import { useState, type ComponentType, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, BriefcaseMedical, Eye, EyeOff, HeartPulse } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Input } from '@/components/ui/Field'
import { useAuth, type Workspace } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

type IntendedRole = 'patient' | 'professional' | 'both'

const roleOptions: { value: IntendedRole; label: string; hint: string; icon: ComponentType<{ className?: string }>; workspace: Workspace }[] = [
  { value: 'patient', label: 'I am a patient', hint: 'Manage your own health record.', icon: HeartPulse, workspace: 'patient' },
  { value: 'professional', label: 'I am a healthcare professional', hint: 'Care for patients with verified access.', icon: BriefcaseMedical, workspace: 'professional' },
  { value: 'both', label: 'Both', hint: 'You can hold a personal record and a professional profile.', icon: UserCircleIcon, workspace: 'patient' },
]

function UserCircleIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [show, setShow] = useState(false)
  const [confirmShow, setConfirmShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [intended, setIntended] = useState<IntendedRole>('patient')

  const [baseRole, setBaseRole] = useState<Workspace>('patient')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const workspace: Workspace = intended === 'professional' ? 'professional' : intended === 'both' ? baseRole : 'patient'
      signIn({ email: 'ava.thompson@example.com' })
      navigate(workspace === 'professional' ? '/professional' : '/patient')
    }, 900)
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Your record, controlled by you — or your professional profile on top of it."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <Field label="Full name" required>
          <Input id="name" placeholder="Ava Thompson" autoComplete="name" required />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email address" required>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </Field>
          <Field label="Mobile number" required>
            <Input id="mobile" type="tel" placeholder="+91 XXXXX XXXXX" autoComplete="tel" required />
          </Field>
        </div>

        <Field label="How will you use the platform?" required>
          <div className="grid gap-3 sm:grid-cols-3">
            {roleOptions.map(({ value, label, hint, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setIntended(value)}
                className={cn(
                  'rounded-2xl p-4 text-left ring-1 transition',
                  intended === value
                    ? 'bg-brand-50 ring-2 ring-brand-500'
                    : 'bg-white ring-slate-200 hover:bg-slate-50',
                )}
              >
                <Icon className={cn('size-5', intended === value ? 'text-brand-600' : 'text-slate-400')} />
                <p className="mt-2 text-sm font-semibold text-slate-900">{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{hint}</p>
              </button>
            ))}
          </div>
        </Field>

        {intended === 'both' ? (
          <Field label="Where should you start?" hint="You can switch between both workspaces any time.">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBaseRole('patient')}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition',
                  baseRole === 'patient' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-slate-200',
                )}
              >
                Patient view
              </button>
              <button
                type="button"
                onClick={() => setBaseRole('professional')}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition',
                  baseRole === 'professional' ? 'bg-navy-600 text-white' : 'bg-white text-slate-600 ring-slate-200',
                )}
              >
                Professional view
              </button>
            </div>
          </Field>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Password" required hint="At least 8 characters with a number.">
            <div className="relative">
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:text-slate-700"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
          </Field>
          <Field label="Confirm password" required error={confirm && confirm !== password ? 'Passwords do not match.' : undefined}>
            <div className="relative">
              <Input
                id="confirm"
                type={confirmShow ? 'text' : 'password'}
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setConfirmShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:text-slate-700"
                aria-label={confirmShow ? 'Hide password' : 'Show password'}
              >
                {confirmShow ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
          </Field>
        </div>

        <Checkbox
          label={
            <>
              I agree to the{' '}
              <span className="font-semibold text-brand-600">Terms of Service</span> and{' '}
              <span className="font-semibold text-brand-600">Privacy Policy</span>.
            </>
          }
          required
        />

        <Button type="submit" size="lg" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <p className="mt-6">
        <Link to="/register/organisation" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
          <Building2 className="size-4" />
          Registering a healthcare organisation?
        </Link>
      </p>

      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}