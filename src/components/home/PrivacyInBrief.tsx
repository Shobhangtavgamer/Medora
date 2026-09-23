import { ShieldCheck } from 'lucide-react'
import { privacyInBrief } from '@/data/content'
import { Reveal } from '@/components/shared/Reveal'

const visuals = [
  { entity: 'Dr. Rahul Mehta', org: 'XYZ Hospital', info: ['Relevant history', 'Medications'], purpose: 'Cardiology review', expiry: 'Expires 15 Oct 2026', status: 'Active', statusClass: 'bg-green-50 text-green-700 ring-green-200' },
  { entity: 'Priya Anand', org: 'XYZ Hospital · Care Coordination', info: ['Recent consultations', 'Allergies'], purpose: 'Visit coordination', expiry: 'Expires 22 Sep 2026', status: 'Expiring', statusClass: 'bg-amber-50 text-amber-700 ring-amber-200' },
]

export function PrivacyInBrief() {
  return (
    <section className="section-pad bg-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-200">
              <ShieldCheck className="size-3.5" />
              {privacyInBrief.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {privacyInBrief.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {privacyInBrief.description}
            </p>
            <ul className="mt-6 space-y-3">
              {privacyInBrief.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-100">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="space-y-3">
          {visuals.map((v, i) => (
            <Reveal key={v.entity} delay={i * 80}>
            <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{v.entity}</p>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ${v.statusClass}`}>
                  {v.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{v.org}</p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium text-slate-500">Purpose:</span> {v.purpose}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {v.info.map((i) => (
                  <span key={i} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                    {i}
                  </span>
                ))}
                <span className="text-[11px] text-amber-600">{v.expiry}</span>
              </div>
            </div>
            </Reveal>
          ))}
          <Reveal delay={160}>
          <p className="rounded-2xl bg-green-50 p-4 text-sm leading-relaxed text-green-800 ring-1 ring-green-100">
            Every access grant shows what, why, and until when — and can be revoked at any time. Provenance (organisation-generated
            or patient-provided) is visible on every record.
          </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}