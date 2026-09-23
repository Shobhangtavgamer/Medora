import { Link } from 'react-router-dom'
import {
  Award,
  BadgeCheck,
  Building2,
  HeartHandshake,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { partners } from '@/data/content'
import { Reveal } from '@/components/shared/Reveal'

const values = [
  {
    icon: HeartHandshake,
    title: 'Patient first',
    description:
      'Every product decision starts with “does this help the patient?” — not the other way around.',
  },
  {
    icon: ShieldCheck,
    title: 'Radical privacy',
    description:
      'Your health data is yours. We use end-to-end encryption and never sell or share your records.',
  },
  {
    icon: BadgeCheck,
    title: 'Clinical integrity',
    description:
      'We only work with credential-verified clinicians committed to evidence-based care.',
  },
]

const milestones = [
  { year: '2021', title: 'Founded in Mumbai', description: 'Started with 12 doctors and a single clinic partner.' },
  { year: '2023', title: '100k patients', description: 'Surpassed 100k active patients and 500 specialists.' },
  { year: '2024', title: 'Statewide rollout', description: 'Expanded telehealth to every county in Massachusetts.' },
  { year: '2026', title: 'Today & beyond', description: '120k+ patients and a mission to make care effortless.' },
]

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50 to-slate-50 py-16 sm:py-20">
        <Reveal>
        <div className="container-site max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
            About us
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We believe healthcare should feel <span className="text-gradient">human again</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Medora was built by clinicians and engineers who were tired of the same
            experience: long waits, scattered records, and phone tag. We set out to fix it.
          </p>
        </div>
        </Reveal>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-site grid grid-cols-2 gap-px overflow-hidden text-center lg:grid-cols-4">
          {[
            { value: '120k+', label: 'Patients served' },
            { value: '800+', label: 'Specialists' },
            { value: '98%', label: 'Would recommend' },
            { value: '4.9/5', label: 'Average rating' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="h-full">
            <div className="px-4 py-10">
              <p className="font-display text-3xl font-extrabold text-brand-600">{s.value}</p>
              <p className="mt-1.5 text-sm font-medium text-slate-500">{s.label}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Our mission
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Less admin. More healing.
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              On average, patients lose hours every year just orchestrating their own care —
              booking, chasing results, renewing prescriptions. Clinicians lose just as much
              to paperwork. Medora gives both sides that time back.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Average appointment booked in under 60 seconds',
                'Results delivered to your secure inbox before your doctor calls',
                'Refills handled with the tap of a button',
                'Full family care under one roof',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Award className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 80} className="h-full">
              <div
                className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-site">
          <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              Our journey
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From a clinic lobby to 120k patients
            </h2>
          </div>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 80} className="h-full">
              <div className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
                <span className="font-display text-2xl font-extrabold text-brand-600">{m.year}</span>
                <h3 className="mt-3 font-display text-base font-bold text-slate-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.description}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="section-pad">
        <Reveal>
        <div className="container-site rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-200 sm:p-12">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div className="max-w-md text-center lg:text-left">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 lg:mx-0">
                <Building2 className="size-6" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
                In-network with all major insurers
              </h2>
              <p className="mt-3 text-slate-600">
                Most plans are accepted. Check coverage when you book — we’ll show your
                estimated out-of-pocket cost before you commit.
              </p>
              <div className="mt-6">
                <Link to="/contact">
                  <Button variant="outline">Check your coverage</Button>
                </Link>
              </div>
            </div>
            <div className="flex max-w-md flex-wrap justify-center gap-3">
              {partners.map((p) => (
                <span
                  key={p}
                  className="rounded-xl bg-slate-50 px-5 py-3 font-display text-sm font-bold text-slate-500 ring-1 ring-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Join */}
      <section className="pb-16 sm:pb-20">
        <div className="container-site">
          <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-12 text-center text-white sm:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 size-72 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 size-72 rounded-full bg-navy-500/20 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-xl">
              <Users className="mx-auto size-10 text-brand-400" />
              <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                For clinicians
              </h2>
              <p className="mt-3 text-slate-300">
                Are you a physician? Join 800+ providers delivering care on Medora —
                with scheduling handled for you.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-slate-900 shadow-none hover:bg-brand-50 focus-visible:outline-white">
                    Become a provider
                  </Button>
                </Link>
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20">
                  <Lock className="size-4 text-brand-400" />
                  Credential verified
                </span>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}