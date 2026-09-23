import { stats } from '@/data/content'
import { Reveal } from '@/components/shared/Reveal'

export function Stats() {
  return (
    <section className="section-pad">
      <div className="container-site grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map(({ value, label }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div className="h-full rounded-2xl bg-gradient-to-b from-white to-brand-50/50 p-6 text-center ring-1 ring-slate-200">
              <p className="font-display text-3xl font-extrabold tracking-tight text-brand-600 sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}