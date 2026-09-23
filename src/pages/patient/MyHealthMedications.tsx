import { Pill } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { medications } from '@/data/health'

export default function MyHealthMedications() {
  return (
    <div className="space-y-5">
      <PageHeader title="Medications" description="Medicine, dosage, frequency, status and source." />
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3.5">Medicine</th>
                <th className="px-5 py-3.5">Dosage</th>
                <th className="px-5 py-3.5">Frequency</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {medications.map((m) => (
                <tr key={m.id}>
                  <td className="px-5 py-4 font-semibold text-slate-900">{m.name}</td>
                  <td className="px-5 py-4 text-slate-600">{m.dosage}</td>
                  <td className="px-5 py-4 text-slate-600">{m.frequency}</td>
                  <td className="px-5 py-4">
                    <Badge tone={m.status === 'Active' ? 'green' : m.status === 'Complete' ? 'brand' : 'red'}>
                      {m.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{m.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="flex items-center gap-2 text-sm text-slate-500">
        <Pill className="size-4 text-brand-600" />
        Prescriptions shown here reflect your records — only ever written by authorised professionals.
      </p>
    </div>
  )
}