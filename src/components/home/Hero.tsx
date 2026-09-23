import { Link } from 'react-router-dom'
import { BadgeCheck, FileHeart, HeartPulse, Network, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IdChip } from '@/components/shared/IdentityBadges'

const floatingCards = [
  { icon: ShieldCheck, label: 'Access revoked', sub: 'in one tap', cls: 'left-[-1rem] top-40 bg-white' },
  { icon: BadgeCheck, label: 'Identity verified', sub: 'Dr. Rahul Mehta · HCP-92RV04', cls: 'right-[-0.5rem] top-8 bg-white' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-slate-50 to-slate-50" />
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-32 top-24 size-[26rem] rounded-full bg-navy-200/40 blur-3xl" />
      </div>

      <div className="container-site grid items-center gap-14 pb-16 sm:pb-20 lg:grid-cols-2 lg:pb-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-soft ring-1 ring-brand-200">
            <HeartPulse className="size-3.5 text-brand-600" />
            One record. Three workspaces. You in control.
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
            Your health record,{' '}
            <span className="text-gradient">connected</span> — and controlled by you.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            A patient-owned health record that follows you. Give professionals and organisations
            access with consent — and see exactly who can access what, why, and for how long.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/register">
              <Button size="lg">
                Create account
                <Sparkles className="size-4.5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                <ShieldCheck className="size-5 text-brand-600" />
                Sign in
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['MS', 'RM', 'SK', '+'].map((t, i) => (
                  <span
                    key={i}
                    className={
                      i < 3
                        ? 'flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ring-2 ring-white from-brand-400 to-brand-600'
                        : 'flex size-9 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white ring-2 ring-white'
                    }
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <p className="flex items-center gap-1 font-semibold text-slate-900">
                  120k+ <Star className="size-3.5 fill-amber-400 text-amber-400" /> 4.9
                </p>
                <p className="text-slate-500">People managing their care</p>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-slate-300 sm:block" />
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white shadow-soft ring-1 ring-slate-200">
                <FileHeart className="size-4.5 text-brand-600" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">Record ownership</p>
                <p className="text-slate-500">Provenance on every record</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative rounded-3xl border border-white/60 bg-gradient-to-b from-white to-brand-50/40 p-4 shadow-lift ring-1 ring-slate-900/5">
            <div className="mb-4 flex gap-1.5 px-1">
              <span className="size-3 rounded-full bg-red-300" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-green-300" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Good morning, Ava</p>
                <p className="font-display text-lg font-bold text-slate-900">
                  Health overview · PAT-21Q7M3
                </p>
              </div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <FileHeart className="size-5" />
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white shadow-lift">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Hypertension (Stage 1)</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold">
                  Managed
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-brand-100">
                <span>Metoprolol 25mg · 2× daily</span>
                <span>Riverside Family Medicine</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-3 shadow-soft ring-1 ring-slate-100">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <Network className="size-3.5 text-brand-600" /> Care network
                </p>
                <p className="mt-1.5 text-[11px] text-slate-500">4 professionals · 3 organisations</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-soft ring-1 ring-slate-100">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <ShieldCheck className="size-3.5 text-green-600" /> Active access
                </p>
                <p className="mt-1.5 text-[11px] text-slate-500">2 grants visible to you</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
              <span className="text-xs text-slate-500">Latest record</span>
              <span className="text-xs font-semibold text-slate-900">REC-91AB43 · Cardiology</span>
              <IdChip id="HCP-92RV04" />
            </div>
          </div>

          {floatingCards.map(({ icon: Icon, label, sub, cls }) => (
            <div
              key={label}
              className={`absolute hidden items-center gap-3 rounded-2xl p-3 shadow-lift ring-1 ring-slate-200 sm:flex ${cls}`}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Icon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">{label}</p>
                <p className="text-[10px] text-slate-500">{sub}</p>
              </div>
            </div>
          ))}

          <div className="absolute -bottom-8 -left-8 -z-10 size-40 rounded-full bg-amber-200/30 blur-2xl" />
        </div>
      </div>
    </section>
  )
}