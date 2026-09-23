import { Building2, Check, HeartPulse, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import { roleSections } from '@/data/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared/Reveal'

const iconMap = {
  heart: HeartPulse,
  stethoscope: Stethoscope,
  building: Building2,
} as const

const tones = [
  {
    bg: 'bg-gradient-to-br from-brand-500 to-brand-700',
    eyebrow: 'text-brand-600',
    ring: 'group-hover:ring-brand-200',
  },
  {
    bg: 'bg-gradient-to-br from-navy-500 to-navy-700',
    eyebrow: 'text-navy-600',
    ring: 'group-hover:ring-navy-200',
  },
  {
    bg: 'bg-gradient-to-br from-violet-500 to-violet-700',
    eyebrow: 'text-violet-600',
    ring: 'group-hover:ring-violet-200',
  },
]

const links = {
  patients: { label: 'Explore the patient workspace', to: '/register' },
  professionals: { label: 'See the professional workspace', to: '/register' },
  organisations: { label: 'Register your organisation', to: '/register/organisation' },
} as const

export function RoleSections() {
  return (
    <section className="section-pad bg-gradient-to-b from-slate-50 to-white">
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Built for everyone in care
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three workspaces, one shared design system
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Patients, professionals, and organisations each get the view — and the limits — that fit their role.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {roleSections.map((section, i) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap]
            const tone = tones[i]
            const link = links[section.key as keyof typeof links]
            return (
              <Reveal key={section.key} delay={i * 100} className="h-full">
              <div
                className="group relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  className={cn(
                    'flex size-14 items-center justify-center rounded-2xl text-white shadow-sm',
                    tone.bg,
                  )}
                >
                  <Icon className="size-7" />
                </div>
                <p className={cn('mt-6 text-sm font-bold uppercase tracking-widest', tone.eyebrow)}>
                  {section.eyebrow}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {section.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-100">
                        <Check className="size-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to={link.to}
                  className={cn(
                    'mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition',
                    tone.eyebrow,
                  )}
                >
                  {link.label}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}