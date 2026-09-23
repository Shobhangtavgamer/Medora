import { Link } from 'react-router-dom'
import { ChevronRight, FlaskConical, Pill, ShieldAlert, Stethoscope } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { conditions, medications, allergies } from '@/data/health'

export default function MyHealthOverview() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader
          title="Conditions"
          description="Diagnosed conditions with source and date."
          icon={<Stethoscope className="size-5" />}
          action={
            <Link to="/patient/my-health/conditions" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all
            </Link>
          }
        />
        <CardContent className="space-y-3">
          {conditions.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
              <div>
                <p className="font-medium text-slate-900">{c.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {c.diagnosedBy} · {c.source}
                </p>
              </div>
              <Badge tone={c.status === 'Managed' ? 'green' : c.status === 'Resolved' ? 'slate' : 'amber'}>
                {c.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Medications"
            description="Active prescriptions"
            icon={<Pill className="size-5" />}
            action={
              <Link to="/patient/my-health/medications" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                View all
              </Link>
            }
          />
          <CardContent className="space-y-3">
            {medications
              .filter((m) => m.status === 'Active')
              .map((m) => (
                <div key={m.id} className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 rounded-full bg-brand-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                    <p className="text-xs text-slate-500">
                      {m.dosage} · {m.frequency}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Allergies"
            icon={<ShieldAlert className="size-5" />}
            action={
              <Link to="/patient/my-health/allergies" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                View all
              </Link>
            }
          />
          <CardContent className="space-y-2">
            {allergies.map((a) => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800">{a.allergen}</span>
                <Badge tone={a.severity === 'Severe' ? 'red' : a.severity === 'Moderate' ? 'amber' : 'slate'} className="text-[10px]">
                  {a.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Health summary" description="As known to your care network" icon={<FlaskConical className="size-5" />} />
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>4 conditions, 3 active medications, 3 allergies recorded.</p>
            <Link to="/patient/my-health/timeline" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Open full timeline <ChevronRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}