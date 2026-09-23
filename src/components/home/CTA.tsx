import { Link } from 'react-router-dom'
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/shared/Reveal'

export function CTA() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-secondary-600 to-navy-800 px-6 py-14 text-center shadow-lift sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -right-8 size-80 rounded-full bg-amber-400/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
              <ShieldCheck className="size-3.5" />
              You decide who sees your health record
            </span>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Take control of your health information
            </h2>
            <p className="mt-4 text-lg text-brand-100">
              Join 120k+ people who keep their records connected — with provenance, consent,
              and clarity on their side.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-brand-700 shadow-none hover:bg-brand-50 focus-visible:outline-white">
                  Create account
                  <ArrowRight className="size-4.5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <LockKeyhole className="size-4.5" />
                  Sign in
                </Button>
              </Link>
            </div>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-brand-200">
              <ShieldCheck className="size-3.5" />
              Consent-first. No data shared without it.
            </p>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}