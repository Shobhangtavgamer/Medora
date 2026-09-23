import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  FileText,
  Hash,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeProps } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Input, Textarea } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { TabBar } from '@/components/ui/TabBar'
import { Toast } from '@/components/ui/Feedback'
import { Timeline } from '@/components/shared/Timeline'
import { RecordCard, RecordDetailModal } from '@/components/shared/Record'
import { IdChip, AccessBadge } from '@/components/shared/IdentityBadges'
import { patientById, type PatientProfile } from '@/data/patientProfiles'
import { professionalById } from '@/data/professionals'
import { formatDate } from '@/lib/utils'

const tabs = ['Overview', 'AI Context', 'Timeline', 'Records', 'Care Network', 'Access'] as const
type Tab = (typeof tabs)[number]

function ProfileHeader({ p, onSubmit }: { p: PatientProfile; onSubmit: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-navy-700 p-6 text-white shadow-soft">
      <span className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white ${p.avatarColor}`}>
        {p.name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold">{p.name}</p>
        <p className="text-sm text-white/80">
          {p.dob} · {p.gender} · {p.phone}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
          <IdChip id={p.id} className="bg-white/15 text-white" />
          <Badge tone="green" dot>Identity verified</Badge>
          <span className="text-white/80">{p.recentActivity}</span>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        className="bg-white text-brand-700 hover:bg-brand-50"
      >
        <Send className="size-4.5" />
        Submit to organisation
      </Button>
    </div>
  )
}

function OverviewTab({ p }: { p: PatientProfile }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader title="Conditions & medications" description="From the patient's current health record." icon={<Stethoscope className="size-5" />} />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {p.conditions.map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                <p className="text-sm font-medium text-slate-800">{c.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{c.source}</span>
                  <Badge tone={c.status === 'Managed' ? 'green' : c.status === 'Resolved' ? 'slate' : 'amber'} className="text-[10px]">
                    {c.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {p.medications.map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
                <p className="text-sm font-medium text-slate-800">{m.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{m.dosage}</span>
                  <Badge tone={m.status === 'Active' ? 'green' : 'slate'} className="text-[10px]">
                    {m.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {p.allergies.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-2.5 ring-1 ring-amber-200">
                <p className="text-sm font-medium text-amber-900">{a.allergen}</p>
                <span className="text-xs text-amber-700">{a.reaction}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader title="Access" icon={<ShieldCheck className="size-5" />} />
          <CardContent className="space-y-1.5 text-sm text-slate-600">
            <p className="flex items-center justify-between">
              <span className="text-slate-400">Status</span>
              <AccessBadge status={p.access.status} />
            </p>
            <p className="flex items-center justify-between">
              <span className="text-slate-400">Granted</span>
              <span className="font-medium text-slate-800">{p.access.grantedAt ? formatDate(p.access.grantedAt) : '—'}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-slate-400">Expires</span>
              <span className="font-medium text-slate-800">{p.access.expiresAt}</span>
            </p>
            <p className="pt-2 text-xs text-slate-500">{p.access.purpose}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Quick summary" description="At a glance for a consultation." icon={<FileText className="size-5" />} />
          <CardContent className="space-y-2 text-sm text-slate-600">
            {[...p.conditions.map((c) => c.name), ...p.medications.map((m) => m.name), ...p.allergies.map((a) => a.allergen)]
              .slice(0, 5)
              .map((name, i) => (
                <p key={i} className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
                  {name}
                </p>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const aiSections: { key: keyof PatientProfile['aiContext']; title: string; tone: BadgeProps['tone'] }[] = [
  { key: 'relevantHistory', title: 'Relevant history', tone: 'navy' },
  { key: 'currentInformation', title: 'Current information', tone: 'green' },
  { key: 'recentRelevantRecords', title: 'Recent relevant records', tone: 'violet' },
  { key: 'openInformation', title: 'Open / unresolved', tone: 'amber' },
  { key: 'conflictingInformation', title: 'Conflicting information', tone: 'red' },
]

function AIContextTab({ p, onOpenRecord }: { p: PatientProfile; onOpenRecord: (recordId: string | undefined) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-2xl bg-navy-700 p-5 text-white shadow-soft">
        <Sparkles className="size-5 shrink-0 text-amber-300" />
        <p className="text-sm leading-relaxed">
          Facts are assembled from the patient's records and every claim cites its source. Review each item and verify
          against the underlying record before acting.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {aiSections.map(({ key, title, tone }) => {
          const items = p.aiContext[key]
          if (items.length === 0) return null
          return (
            <Card key={key}>
              <CardHeader
                title={title}
                icon={<Sparkles className="size-5" />}
                action={
                  <Badge tone={tone} className="text-[10px]">
                    {items.length}
                  </Badge>
                }
              />
              <CardContent className="space-y-3">
                {items.map((f, i) => (
                  <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                    <p className="text-sm leading-relaxed text-slate-700">{f.text}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400">{f.sourceLabel}</span>
                      {f.sourceRecordId ? (
                        <button
                          onClick={() => onOpenRecord(f.sourceRecordId)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                        >
                          <Hash className="size-3" />
                          {f.sourceRecordId}
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function PatientView() {
  const { patientId } = useParams<{ patientId: string }>()
  const patient = patientById(patientId ?? '') ?? patientById('PAT-8F42K7')!
  const [tab, setTab] = useState<Tab>('Overview')
  const [record, setRecord] = useState<string | null>(null)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const linkedRecord = (id: string | undefined) => patient.records.find((r) => r.id === id) ?? null

  const careTeam = Array.from(
    new Map(
      patient.timeline
        .filter((e) => e.professionalId)
        .map((e) => [e.professionalId, e]),
    ).values(),
  )

  const organisationsOnRecord = Array.from(
    new Map(patient.timeline.map((e) => [e.organisation, e.organisation])).values(),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/professional/patients"
          className="inline-flex size-9 items-center justify-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <ArrowLeft className="size-4.5" />
        </Link>
        <p className="text-sm text-slate-500">Patients / Patient view</p>
      </div>

      <ProfileHeader p={patient} onSubmit={() => setSubmitOpen(true)} />

      <TabBar tabs={tabs} active={tab} onChange={setTab} className="w-fit" />

      {tab === 'Overview' ? <OverviewTab p={patient} /> : null}
      {tab === 'AI Context' ? <AIContextTab p={patient} onOpenRecord={(id) => setRecord(id ?? null)} /> : null}
      {tab === 'Timeline' ? (
        <Timeline events={patient.timeline} onOpenRecord={(id) => setRecord(id)} />
      ) : null}
      {tab === 'Records' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patient.records.map((r) => (
            <RecordCard key={r.id} record={r} onOpen={() => setRecord(r.id)} />
          ))}
        </div>
      ) : null}
      {tab === 'Care Network' ? (
        <div className="grid gap-4 md:grid-cols-2">
          {careTeam.map((e) => {
            const pro = professionalById(e.professionalId)
            if (!pro) return null
            return (
              <Card key={e.professionalId}>
                <CardContent className="flex items-start gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-bold text-brand-700 ring-1 ring-brand-100">
                    {pro.name.replace('Dr. ', '').charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{pro.name}</p>
                    <p className="text-sm text-slate-500">
                      {pro.specialty} · {pro.organisation}
                    </p>
                    <div className="mt-1.5">
                      <IdChip id={pro.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {organisationsOnRecord.map((org) => (
            <Card key={org}>
              <CardContent className="flex items-start gap-4 p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100">
                  <Building2 className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{org}</p>
                  <p className="text-sm text-slate-500">Organisation involved in care</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
      {tab === 'Access' ? (
        <Card>
          <CardHeader title="Access to this patient" icon={<ShieldCheck className="size-5" />} />
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 text-sm text-slate-600">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Your access</span>
                <AccessBadge status={patient.access.status} />
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Granted</span>
                <span className="font-medium text-slate-800">{patient.access.grantedAt ? formatDate(patient.access.grantedAt) : '—'}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Expires</span>
                <span className="font-medium text-slate-800">{patient.access.expiresAt}</span>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Information available</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {patient.access.information.map((i) => (
                  <Badge key={i} tone="slate" className="text-[10px]">
                    {i}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{patient.access.purpose}</p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <RecordDetailModal record={record ? linkedRecord(record) : null} onClose={() => setRecord(null)} />

      <Modal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        title="Submit clinical information"
        description="Send to your organisation for review and inclusion in the record workflow."
        size="lg"
      >
        <div className="space-y-4">
          <Field label="Title" hint="Short description of what is being submitted.">
            <Input placeholder="e.g. Blood pressure readings – 4 weeks" />
          </Field>
          <Field label="Notes" hint="Add clinical context and observations.">
            <Textarea placeholder="Clinical notes the organisation should review…" />
          </Field>
          <div className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 ring-1 ring-brand-100">
            <UserRound className="size-5 shrink-0 text-brand-600" />
            <p className="text-sm text-brand-800">
              This submission will appear in the <strong>organisation's Records</strong> as a contribution, visible with provenance.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => setSubmitOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setSubmitOpen(false)
                showToast('Clinical information submitted to your organisation for review.')
              }}
            >
              <Send className="size-4.5" />
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}