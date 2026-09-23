import { partners } from '@/data/content'
import { Reveal } from '@/components/shared/Reveal'

export function TrustBar() {
  const row = [...partners, ...partners]
  return (
    <Reveal>
      <section className="border-y border-slate-200 bg-white/60 py-8" aria-label="Insurance partners">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
        Accepted by leading insurance providers
      </p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-16 px-8">
          {row.map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="whitespace-nowrap font-display text-lg font-bold text-slate-300 transition hover:text-slate-500"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  )
}