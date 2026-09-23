import { Activity, BadgeCheck, FileText, HeartPulse } from 'lucide-react'
import { features } from '@/data/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared/Reveal'

const icons = [Activity, BadgeCheck, FileText, HeartPulse]

const tones = [
  'bg-brand-50 text-brand-600 ring-brand-100',
  'bg-navy-50 text-navy-600 ring-navy-100',
  'bg-violet-50 text-violet-600 ring-violet-100',
  'bg-amber-50 text-amber-600 ring-amber-100',
]

export function Features() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Why Medora
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Healthcare that removes the friction
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We built the patient experience we always wanted — organized, transparent, and
              genuinely caring.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={feature.title} delay={i * 80} className="h-full">
              <div
                className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div
                  className={cn(
                    'flex size-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110',
                    tones[i],
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}