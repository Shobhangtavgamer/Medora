import {
  Building2,
  ClipboardPlus,
  FileHeart,
  Network,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '@/data/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared/Reveal'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  records: FileHeart,
  shield: ShieldCheck,
  network: Network,
  stethoscope: Stethoscope,
  building: Building2,
  sparkles: Sparkles,
}

const tones = [
  'from-brand-500 to-brand-700',
  'from-navy-500 to-navy-700',
  'from-violet-500 to-violet-700',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-sky-700',
  'from-green-500 to-green-700',
  'from-rose-500 to-rose-700',
  'from-indigo-500 to-indigo-700',
]

export function Services({ compact = false }: { compact?: boolean }) {
  const items = compact ? services.slice(0, 6) : services
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 lg:py-28">
      <div className="container-site">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Our services
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your care needs, in one place
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From routine checkups to complex care coordination, we cover the whole journey.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <Reveal key={service.title} delay={Math.min(i * 80, 240)} className="h-full">
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  className={cn(
                    'absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br opacity-10 blur-xl transition-opacity group-hover:opacity-25',
                    tones[i % tones.length],
                  )}
                />
                <div
                  className={cn(
                    'relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm',
                    tones[i % tones.length],
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
              </Reveal>
            )
          })}
        </div>

        {compact ? (
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-semibold text-brand-600 transition hover:text-brand-700"
            >
              <ClipboardPlus className="size-4.5" />
              View all services
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}