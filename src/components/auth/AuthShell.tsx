import { Link } from 'react-router-dom'
import { ShieldCheck, Star } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Reveal } from '@/components/shared/Reveal'

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 size-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 size-96 rounded-full bg-navy-500/30 blur-3xl" />
        </div>

        <div className="relative flex items-center">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <ShieldCheck className="size-5 text-white" />
          </span>
          <span className="ml-3 font-display text-sm font-bold uppercase tracking-widest text-brand-100">
            HIPAA-compliant & encrypted
          </span>
        </div>

        <div className="relative max-w-lg">
          <blockquote>
            <p className="font-display text-2xl font-semibold leading-snug text-white lg:text-3xl">
              “Medora genuinely changed how I manage my care. My whole family is on
              it now.”
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-sm font-bold text-white">
              MS
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                Maria Santos
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
              </p>
              <p className="text-xs text-brand-200">Patient for 3 years</p>
            </div>
          </figcaption>
        </div>

        <div className="relative flex items-center gap-8 text-brand-100">
          {['120k+ patients', '800+ doctors', '4.9/5 rating'].map((s) => (
            <span key={s} className="flex items-center gap-2 text-sm font-medium">
              <span className="size-1.5 rounded-full bg-amber-400" />
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col bg-slate-50">
        <div className="flex h-18 items-center border-b border-slate-200 bg-white/80 px-6 backdrop-blur lg:hidden">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
          <Reveal className="w-full max-w-md">
            <div className="hidden lg:mb-8 lg:block">
              <Logo />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 lg:mt-0">
              {title}
            </h1>
            <p className="mt-2 text-slate-600">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </Reveal>
        </div>

        <p className="py-6 text-center text-xs text-slate-400">
          <Link to="/" className="hover:text-brand-600">
            Back to Medora
          </Link>
        </p>
      </div>
    </div>
  )
}