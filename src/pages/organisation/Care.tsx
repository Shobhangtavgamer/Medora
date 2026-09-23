import { UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { orgCare } from '@/data/org'

const careTone: Record<string, BadgeProps['tone']> = {
  Active: 'green',
  Inactive: 'slate',
}

export default function Care() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients / Care"
        description="Care within your organisation — operational view, not the patient's full personal record."
      />

      <Card className="bg-navy-50 ring-navy-100">
        <CardContent className="p-5 text-sm leading-relaxed text-navy-800">
          This view shows care <strong>provided by your professionals</strong>. Full personal health records are owned by
          the patient and accessed through explicit consent grants.
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {orgCare.map((c) => (
          <Card key={c.id}>
            <CardHeader
              title={c.patient}
              description={c.latestActivity}
              icon={<UserRound className="size-5" />}
              action={<Badge tone={careTone[c.careStatus]} dot>{c.careStatus}</Badge>}
            />
            <CardContent className="space-y-1.5 text-sm text-slate-600">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Patient ID</span>
                <IdChip id={c.patientId} />
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Responsible professional</span>
                <span className="font-medium text-slate-800">{c.professional}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}