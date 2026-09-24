import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { searchPatients } from '@/lib/medoraServices'

export default function Patients() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<{ patient_id: string; date_of_birth: string | null; profile: { name: string } }[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void searchPatients(query).then(setList).catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unable to search patients.'))
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <div className="space-y-6">
      <PageHeader title="Patients" description="People you care for, with their access status.">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or ID…"
          className="h-10 w-56 rounded-xl bg-white px-3.5 text-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
        />
      </PageHeader>

      {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Card key={p.patient_id}>
            <CardHeader
              title={p.profile.name}
              description={p.date_of_birth ?? 'Date of birth not provided'}
              icon={<UserRound className="size-5" />}
              action={<Badge tone="amber" dot>Consent required</Badge>}
            />
            <CardContent>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Patient ID</span>
                  <IdChip id={p.patient_id} />
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Access expires</span>
                  <span className="font-medium text-slate-800">Consent required</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Last activity</span>
                  <span className="truncate pl-4 font-medium text-slate-800">Search result</span>
                </p>
              </div>
              <Link
                to={`/professional/patients/${p.patient_id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Open patient view <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}