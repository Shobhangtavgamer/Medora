import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { patientProfiles } from '@/data/patientProfiles'

const accessTone: Record<string, BadgeProps['tone']> = {
  Active: 'green',
  Pending: 'amber',
  Previous: 'slate',
}

export default function Patients() {
  const [query, setQuery] = useState('')
  const list = patientProfiles.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()),
  )

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <Card key={p.id}>
            <CardHeader
              title={p.name}
              description={`${p.dob} · ${p.gender}`}
              icon={<UserRound className="size-5" />}
              action={<Badge tone={accessTone[p.access.status]} dot>{p.access.status} access</Badge>}
            />
            <CardContent>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Patient ID</span>
                  <IdChip id={p.id} />
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Access expires</span>
                  <span className="font-medium text-slate-800">{p.access.expiresAt}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Last activity</span>
                  <span className="truncate pl-4 font-medium text-slate-800">{p.recentActivity}</span>
                </p>
              </div>
              <Link
                to={`/professional/patients/${p.id}`}
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