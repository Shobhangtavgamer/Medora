import { FilePlus, ShieldCheck, UserRound } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'

const steps = [
  {
    icon: UserRound,
    step: '01',
    title: 'Create your record',
    description:
      'Register as a patient, professional, or organisation. Your identity and credentials are verified, and IDs are issued for every profile.',
  },
  {
    icon: FilePlus,
    step: '02',
    title: 'Add your health history',
    description:
      'Import records from anywhere — AI extracts the information and you review it before it lands in your timeline.',
  },
  {
    icon: ShieldCheck,
    step: '03',
    title: 'Share with consent',
    description:
      'Grant professionals and organisations access to exactly what they need, for a defined purpose and duration — revoke anytime.',
  },
]

export function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">
              How it works
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your record, your rules
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-3">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />
          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <Reveal key={step} delay={i * 100} className="h-full">
              <div className="relative h-full text-center">
              <div className="relative mx-auto flex size-18 items-center justify-center rounded-3xl bg-white shadow-card ring-1 ring-slate-200">
                <Icon className="size-7 text-brand-600" />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-brand-600 font-display text-xs font-bold text-white ring-4 ring-slate-50">
                  {step}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-slate-900">{title}</h3>
              <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}