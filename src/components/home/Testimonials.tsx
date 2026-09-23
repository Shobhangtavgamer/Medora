import { Quote, Star } from 'lucide-react'
import { testimonials } from '@/data/content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared/Reveal'

export function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-brand-50/60 py-16 sm:py-20 lg:py-28">
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Patient stories
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by patients across the region
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i * 80, 240)} className="h-full">
            <figure
              className="relative flex h-full flex-col rounded-2xl bg-white p-7 shadow-soft ring-1 ring-slate-200 transition hover:shadow-card"
            >
              <Quote className="absolute right-6 top-6 size-8 text-brand-100" aria-hidden />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white',
                    t.color,
                  )}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}