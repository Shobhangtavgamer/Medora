import { ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { allergies } from '@/data/health'

export default function MyHealthAllergies() {
  return (
    <div className="space-y-5">
      <PageHeader title="Allergies" description="Allergen, reaction and source." />
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3.5">Allergen</th>
                <th className="px-5 py-3.5">Reaction</th>
                <th className="px-5 py-3.5">Severity</th>
                <th className="px-5 py-3.5">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allergies.map((a) => (
                <tr key={a.id}>
                  <td className="px-5 py-4 font-semibold text-slate-900">{a.allergen}</td>
                  <td className="px-5 py-4 text-slate-600">{a.reaction}</td>
                  <td className="px-5 py-4">
                    <Badge tone={a.severity === 'Severe' ? 'red' : a.severity === 'Moderate' ? 'amber' : 'slate'}>
                      {a.severity}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{a.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="flex items-center gap-2 text-sm text-slate-500">
        <ShieldAlert className="size-4 text-brand-600" />
        Showed to authorised professionals before any prescription or procedure.
      </p>
    </div>
  )
}