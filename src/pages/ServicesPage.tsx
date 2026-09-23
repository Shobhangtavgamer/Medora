import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Stethoscope } from 'lucide-react'
import { Services } from '@/components/home/Services'
import { ListDoctorPreview } from '@/components/dashboard/ListDoctorPreview'
import { doctors, specialties } from '@/data/doctors'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/shared/Reveal'

export default function ServicesPage() {
  const [popular, setPopular] = useState(specialties.slice(0, 9))

  const togglePopular = (term: string) => {
    setPopular((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term],
    )
  }

  const filtered = doctors.filter((d) => popular.includes(d.specialty))

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50 to-slate-50 pt-16 pb-10 sm:pt-20">
        <Reveal>
        <div className="container-site max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
            Services
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Care for every part of your life
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Choose a specialty or browse our full range of services — then find the right
            doctor for you.
          </p>
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search specialties, conditions, doctors…"
              className="h-14 w-full rounded-2xl bg-white pl-12 pr-4 text-sm text-slate-900 shadow-card ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          </div>
        </Reveal>
      </section>

      <Services />

      {/* Specialties + doctors */}
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
                Find a doctor
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Browse by specialty
              </h2>
            </div>
            <Link to="/register" className="inline-flex items-center gap-2 font-semibold text-brand-600 transition hover:text-brand-700">
              Book an appointment <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {specialties.map((term) => (
              <button
                key={term}
                onClick={() => togglePopular(term)}
                className={
                  popular.includes(term)
                    ? 'rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition'
                    : 'rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50'
                }
              >
                {term}
              </button>
            ))}
          </div>
          </Reveal>

          <Reveal delay={120}>
          {filtered.length > 0 ? (
            <ListDoctorPreview doctors={filtered.slice(0, 3)} />
          ) : (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center">
              <Stethoscope className="size-8 text-slate-300" />
              <p className="font-display font-semibold text-slate-900">No specialties selected</p>
              <p className="max-w-sm text-sm text-slate-500">
                Pick at least one specialty above to preview matching doctors.
              </p>
            </div>
          )}
          </Reveal>

          <Reveal delay={160}>
          <div className="mt-10 flex justify-center">
            <Link to="/register">
              <Button size="lg">
                Book a consultation
                <ArrowRight className="size-4.5" />
              </Button>
            </Link>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}