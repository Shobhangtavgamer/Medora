import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Input } from '@/components/ui/Field'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = new FormData(e.currentTarget)
    try {
      const role = await signIn({ email: String(form.get('identifier')), password: String(form.get('password')) })
      navigate(`/${role}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your records and care network."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <Field label="Email or mobile number" required hint="The identifier you used to register.">
          <Input
            id="identifier"
            name="identifier"
            defaultValue="ava.thompson@example.com"
            placeholder="you@example.com or +91 XXXXX XXXXX"
            autoComplete="username"
            required
          />
        </Field>

        <Field label="Password" required>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              required
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

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" defaultChecked />
          <Link to="/register" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Forgot password?
          </Link>
        </div>

        {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}

        <Button type="submit" size="lg" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>

      <div className="mt-6 rounded-xl bg-brand-50/70 p-4 text-sm text-brand-800 ring-1 ring-brand-100">
        <p className="flex items-center gap-2 font-semibold">
          <KeyRound className="size-4" />
          Demo account
        </p>
        <p className="mt-1">
          Use an email and password for a Supabase account configured in the Medora project.
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        New to Medora?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}