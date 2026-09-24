import { useEffect, useState } from 'react'
import { Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { getPatientClinicalSummary } from '@/lib/medoraServices'
import { useAuth } from '@/context/AuthContext'

export default function MyHealthConditions() {
  const { user } = useAuth()
  const [conditions, setConditions] = useState<Awaited<ReturnType<typeof getPatientClinicalSummary>>['conditions']>([])
  useEffect(() => { if (user?.patientProfile.id) void getPatientClinicalSummary(user.patientProfile.id).then((summary) => setConditions(summary.conditions)) }, [user?.patientProfile.id])
  return (
    <div className="space-y-5">
      <PageHeader title="Conditions" description="Recorded conditions with source and date." />
      <div className="grid gap-4 md:grid-cols-2">
        {conditions.length === 0 ? <Card><CardContent className="py-12 text-center text-sm text-slate-500">No conditions recorded.</CardContent></Card> : conditions.map((c) => (
          <Card key={c.id}>
            <CardHeader
              title={c.name}
              description={`Diagnosed by ${c.diagnosedBy}`}
              icon={<Stethoscope className="size-5" />}
              action={
                <Badge tone={c.status === 'Managed' ? 'green' : c.status === 'Resolved' ? 'slate' : 'amber'}>
                  {c.status}
                </Badge>
              }
            />
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Date</dt>
                  <dd className="mt-0.5 font-medium text-slate-800">{c.date}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Source</dt>
                  <dd className="mt-0.5 font-medium text-slate-800">{c.source}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}