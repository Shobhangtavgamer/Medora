import { Sparkles } from 'lucide-react'
import { aiInBrief } from '@/data/content'
import { Reveal } from '@/components/shared/Reveal'

export function AIInBrief() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal>
        <div className="overflow-hidden rounded-3xl bg-navy-800 text-white shadow-lift">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-white/15">
                <Sparkles className="size-3.5" />
                {aiInBrief.eyebrow}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                {aiInBrief.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {aiInBrief.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {aiInBrief.points.map((point, i) => (
                <Reveal key={point} delay={i * 80}>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 ring-1 ring-white/10">
                    <Sparkles className="size-4 shrink-0 text-amber-300" />
                    <span className="text-sm font-semibold text-white">{point}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}