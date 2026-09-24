import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  Building2,
  ChevronRight,
  Network,
  Pill,
  ShieldAlert,
  Stethoscope,
  UserCheck,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { GrantAccessModal } from '@/components/shared/GrantAccessModal'
import { Timeline } from '@/components/shared/Timeline'
import { RecordDetailModal } from '@/components/shared/Record'
import { IdChip, VerifiedBadge } from '@/components/shared/IdentityBadges'
import { useAuth } from '@/context/AuthContext'
import { getPatientClinicalSummary, getPatientAccessRequests, getPatientRecords, getPatientTimeline, approveAccessRequest, rejectAccessRequest, type AccessRequestRow } from '@/lib/medoraServices'
import type { RecordItem } from '@/data/records'
import type { HealthEvent } from '@/data/health'

export default function PatientHome() {
  const { user } = useAuth()
  const [records, setRecords] = useState<RecordItem[]>([])
  const [timeline, setTimeline] = useState<HealthEvent[]>([])
  const [requests, setRequests] = useState<AccessRequestRow[]>([])
  const [clinical, setClinical] = useState<Awaited<ReturnType<typeof getPatientClinicalSummary>>>({ conditions: [], medications: [], allergies: [] })
  const [toast, setToast] = useState<string | null>(null)
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [reviewing, setReviewing] = useState<string | null>(null)
  const [declining, setDeclining] = useState<string | null>(null)
  const [granting, setGranting] = useState(false)

  const refresh = () => user?.patientProfile.id
    ? Promise.all([getPatientRecords(user.patientProfile.id), getPatientTimeline(user.patientProfile.id), getPatientAccessRequests(user.patientProfile.id), getPatientClinicalSummary(user.patientProfile.id)])
      .then(([loadedRecords, loadedTimeline, loadedRequests, loadedClinical]) => { setRecords(loadedRecords); setTimeline(loadedTimeline); setRequests(loadedRequests); setClinical(loadedClinical) })
    : Promise.resolve()
  useEffect(() => { void refresh() }, [user?.patientProfile.id])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const dashboardRequests = requests.map((r) => ({ ...r, requesterName: r.professional?.profile.name ?? 'Professional', requesterId: r.professional?.professional_id ?? '', organisation: 'Healthcare professional', information: r.scope, requestedDuration: '30 days', date: r.requested_at, status: r.status === 'pending' ? 'Pending' as const : r.status === 'approved' ? 'Granted' as const : 'Declined' as const }))
  const pending = dashboardRequests.filter((r) => r.status === 'Pending')
  const reviewTarget = dashboardRequests.find((r) => r.id === reviewing)
  const activeAccess = requests.filter((r) => r.status === 'approved')

  const connectedProfessionalCount = activeAccess.length
  const connectedOrganisationCount = new Set(records.filter((record) => record.source === 'Organisation').map((record) => record.organisation)).size

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name.split(' ')[0] ?? 'there'}`}
        description={
          <span className="flex flex-wrap items-center gap-2">
            <IdChip id={user?.patientProfile.id ?? 'PAT-21Q7M3'} />
            <span className="text-slate-500">Your personal healthcare dashboard.</span>
          </span>
        }
      />

      {/* Health overview + pending requests */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Health Overview"
            description="A compact summary of your current health information."
            icon={<Activity className="size-5" />}
            action={
              <Link to="/patient/my-health" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                Open My Health
              </Link>
            }
          />
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Stethoscope className="size-3.5" /> Conditions
              </p>
              <div className="mt-2 space-y-1.5">
                {clinical.conditions.slice(0, 3).map((c) => (
                  <p key={c.id} className="truncate text-sm font-medium text-slate-700">
                    {c.status === 'Managed' ? (
                      <span className="text-green-600">✓ </span>
                    ) : c.status === 'Active' ? (
                      <span className="text-amber-600">● </span>
                    ) : null}
                    {c.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Pill className="size-3.5" /> Medications
              </p>
              <div className="mt-2 space-y-1.5">
                {clinical.medications
                  .filter((m) => m.status === 'Active')
                  .slice(0, 3)
                  .map((m) => (
                    <p key={m.id} className="truncate text-sm font-medium text-slate-700">
                      {m.name} · {m.dosage}
                    </p>
                  ))}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <ShieldAlert className="size-3.5" /> Allergies
              </p>
              <div className="mt-2 space-y-1.5">
                {clinical.allergies.slice(0, 3).map((a) => (
                  <p key={a.id} className="truncate text-sm font-medium text-slate-700">
                    {a.allergen}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={pending.length > 0 ? 'ring-amber-200' : undefined}>
          <CardHeader
            title="Pending requests"
            description="Professionals requesting access to your information."
            icon={<UserCheck className="size-5" />}
          />
          <CardContent className="space-y-4">
            {pending.length === 0 ? (
              <p className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                No pending requests. You are in control.
              </p>
            ) : (
              pending.map((r) => {
                return (
                  <div key={r.id} className="rounded-2xl p-4 ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{r.requesterName}</p>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {r.organisation}
                        </p>
                      </div>
                      <VerifiedBadge verified />
                    </div>
                    <p className="mt-2 rounded-lg bg-brand-50/60 px-3 py-2 text-sm text-brand-800 ring-1 ring-brand-100">
                      {r.purpose}
                    </p>
                    <div className="mt-3 flex gap-2.5">
                      <Button size="sm" onClick={() => setReviewing(r.id)}>
                        Review
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDeclining(r.id)}>
                        Decline
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
            <Link
              to="/patient/requests"
              className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all requests <ChevronRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Care network + recent activity */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader
            title="Care Network"
            description="Currently connected professionals and organisations."
            icon={<Network className="size-5" />}
            action={
              <Link to="/patient/care-network" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                Manage
              </Link>
            }
          />
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
              <span className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <Users className="size-4.5 text-brand-600" /> Professionals
              </span>
              <span className="font-display text-lg font-bold text-slate-900">{connectedProfessionalCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
              <span className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <Building2 className="size-4.5 text-navy-600" /> Organisations
              </span>
              <span className="font-display text-lg font-bold text-slate-900">{connectedOrganisationCount}</span>
            </div>
            <ul className="space-y-1.5">
              {activeAccess.slice(0, 2).map((access) => (
                <li key={access.id} className="flex items-center justify-between text-sm">
                  <span className="truncate text-slate-600">Healthcare professional</span>
                  <Badge tone="green" className="text-[10px]">Active</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader
            title="Recent Activity"
            description="Chronological healthcare events."
            icon={<Activity className="size-5" />}
            action={
              <Link to="/patient/my-health/timeline" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                Full timeline
              </Link>
            }
          />
          <CardContent>
            <Timeline
              events={timeline.slice(0, 4)}
              onOpenRecord={(id) => setSelectedRecord(id)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Access summary strip */}
      <Card className="border-brand-100 bg-gradient-to-r from-brand-50 to-white">
        <CardContent className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
              <ShieldAlert className="size-6" />
            </span>
            <div>
              <p className="font-display font-bold text-slate-900">Access is visible — and yours to control</p>
              <p className="mt-0.5 text-sm text-slate-500">
                {`${activeAccess.length} professionals currently hold access you granted.`}
              </p>
            </div>
          </div>
          <Link to="/patient/access">
            <Button variant="secondary">Review access</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Review access request modal */}
      <Modal
        open={Boolean(reviewTarget)}
        onClose={() => setReviewing(null)}
        title="Access request"
        description={reviewTarget ? `${reviewTarget.requesterName} · ${reviewTarget.organisation}` : undefined}
      >
        {reviewTarget ? (
          <div className="space-y-4">
            <ReviewBlock label="Purpose" value={reviewTarget.purpose} />
            <div>
              <p className="text-sm font-semibold text-slate-900">Information requested</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {reviewTarget.information.map((i) => (
                  <Badge key={i} tone="slate">
                    {i}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ReviewBlock label="Requested duration" value={reviewTarget.requestedDuration} />
              <ReviewBlock label="Requested" value={reviewTarget.date} />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeclining(reviewTarget.id)}>
                Decline
              </Button>
              <Button onClick={() => setGranting(true)}>Grant access</Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <GrantAccessModal
        open={granting}
        onClose={() => setGranting(false)}
        granteeName={reviewTarget?.requesterName ?? ''}
        purpose={reviewTarget?.purpose ?? ''}
        onGranted={async (info, duration) => {
          if (reviewTarget) await approveAccessRequest(reviewTarget.id, info, Number.parseInt(duration, 10) || 30)
          await refresh()
          setReviewing(null)
          setGranting(false)
          showToast(`Access granted for ${duration}.`)
        }}
      />

      <ConfirmDialog
        open={Boolean(declining)}
        title="Decline this access request?"
        description="The requester will be notified and no access will be granted."
        confirmLabel="Decline request"
        danger
        onConfirm={async () => {
          if (declining) await rejectAccessRequest(declining)
          await refresh()
          showToast('Access request declined.')
          setReviewing(null)
          setDeclining(null)
        }}
        onClose={() => setDeclining(null)}
      />

      <RecordDetailModal record={selectedRecord ? records.find((item) => item.id === selectedRecord) ?? null : null} onClose={() => setSelectedRecord(null)} />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}

function ReviewBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
    </div>
  )
}