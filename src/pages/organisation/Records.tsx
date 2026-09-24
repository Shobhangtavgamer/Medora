import { useEffect, useState } from 'react'
import { CheckCircle2, FileText, PencilRuler, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Feedback'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { orgWorkflowTone, type OrgWorkflowRecord } from '@/data/org'
import { formatDate } from '@/lib/utils'
import { createOrganisationRecord, getOrganisationRecords, publishOrganisationRecord } from '@/lib/medoraServices'
import { useAuth } from '@/context/AuthContext'

const statusFilter = ['All', 'Draft', 'Pending', 'Published', 'Correction'] as const

function RecordActions({ r, onPublish, onRequestCorrection }: { r: OrgWorkflowRecord; onPublish: () => void; onRequestCorrection: () => void }) {
  if (r.status === 'Draft') {
    return (
      <Button size="sm" onClick={onPublish}>
        <Send className="size-4" />
        Submit for review
      </Button>
    )
  }
  if (r.status === 'Pending') {
    return (
      <Button size="sm" onClick={onPublish}>
        <CheckCircle2 className="size-4" />
        Publish
      </Button>
    )
  }
  if (r.status === 'Published') {
    return (
      <Button size="sm" variant="outline" onClick={onRequestCorrection}>
        <PencilRuler className="size-4" />
        Request correction
      </Button>
    )
  }
  if (r.status === 'Correction') {
    return (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onRequestCorrection}>
          Review change
        </Button>
        <Button size="sm" onClick={onPublish}>
          <CheckCircle2 className="size-4" />
          Re-publish
        </Button>
      </div>
    )
  }
  return null
}

export default function Records() {
  const { user } = useAuth()
  const [records, setRecords] = useState<OrgWorkflowRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<(typeof statusFilter)[number]>('All')
  const [toast, setToast] = useState<string | null>(null)
  const [action, setAction] = useState<'publish' | 'correction' | null>(null)
  const [target, setTarget] = useState<OrgWorkflowRecord | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [patientId, setPatientId] = useState('')
  const [professionalId, setProfessionalId] = useState('')
  const [recordType, setRecordType] = useState<'Consultation' | 'Investigation' | 'Prescription' | 'Report'>('Consultation')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [recordDate, setRecordDate] = useState(new Date().toISOString().slice(0, 10))
  const refresh = () => user?.organisationProfile.id
    ? getOrganisationRecords(user.organisationProfile.id).then(setRecords).catch((err: unknown) => setError(err instanceof Error ? err.message : 'Unable to load organisation records.'))
    : Promise.resolve()
  useEffect(() => { void refresh() }, [user?.organisationProfile.id])
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const list = records.filter((r) => filter === 'All' || r.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Records"
        description="Organisation record workflow — from draft through publication to patient records."
      ><Button onClick={() => setCreateOpen(true)}><FileText className="size-4" />Create record</Button></PageHeader>

      <div className="flex flex-wrap gap-2">
        {statusFilter.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              filter === s ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
            ].join(' ')}
          >
            {s}
          </button>
        ))}
      </div>

      {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
      <div className="space-y-3">
        {list.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{r.type}</p>
                  <Badge className="text-[10px]">{r.id}</Badge>
                  <Badge tone={orgWorkflowTone[r.status]} dot>
                    {r.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">
                  {r.patient} · <IdChip id={r.patientId} /> · {r.professional}
                </p>
                <p className="mt-1.5 text-sm text-slate-500">{r.note}</p>
                <p className="mt-0.5 text-xs text-slate-400">{formatDate(r.date)}</p>
              </div>
              <RecordActions
                r={r}
                onPublish={() => {
                  setTarget(r)
                  setAction('publish')
                }}
                onRequestCorrection={() => {
                  setTarget(r)
                  setAction('correction')
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create formal record" description="This record will enter the organisation workflow and can then be published to the patient.">
        <div className="space-y-4">
          <Field label="Patient ID" required><Input value={patientId} onChange={(event) => setPatientId(event.target.value)} placeholder="PAT-RAHUL01" /></Field>
          <Field label="Professional ID"><Input value={professionalId} onChange={(event) => setProfessionalId(event.target.value)} placeholder="HCP-MEHTA01" /></Field>
          <Field label="Record type" required><Select value={recordType} onChange={(event) => setRecordType(event.target.value as typeof recordType)}><option>Consultation</option><option>Investigation</option><option>Prescription</option><option>Report</option></Select></Field>
          <Field label="Title" required><Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Blood pressure review" /></Field>
          <Field label="Record date" required><Input type="date" value={recordDate} onChange={(event) => setRecordDate(event.target.value)} /></Field>
          <Field label="Description" required><Textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} placeholder="Clinical information for the formal record" /></Field>
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button><Button onClick={async () => { if (!user?.organisationProfile.id) return; await createOrganisationRecord({ patientId, professionalId: professionalId || undefined, organisationId: user.organisationProfile.id, recordType, title, description, recordDate }); await refresh(); setCreateOpen(false); showToast('Record created and awaiting publication.') }}>Create record</Button></div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(target && action === 'publish')}
        title={target?.status === 'Pending' || target?.status === 'Correction' ? 'Publish this record?' : 'Submit for review?'}
        description={
          target && (target.status === 'Pending' || target.status === 'Correction')
            ? `Publishing ${target.id} will add it to the patient's record and send them a notification.`
            : 'This draft will be routed to the department head for approval before publication.'
        }
        confirmLabel={target?.status === 'Draft' ? 'Submit for review' : 'Publish'}
        onConfirm={async () => {
          if (target && action === 'publish' && target.status !== 'Draft') await publishOrganisationRecord(target.id)
          await refresh()
          setTarget(null)
          setAction(null)
          showToast('Record published to the patient record.')
        }}
        onClose={() => {
          setTarget(null)
          setAction(null)
        }}
      />

      <ConfirmDialog
        open={Boolean(target && action === 'correction')}
        title="Request correction?"
        description={`A correction request will be raised for ${target?.id ?? 'this record'} and the metadata team will review it.`}
        confirmLabel="Request correction"
        onConfirm={() => {
          setTarget(null)
          setAction(null)
          showToast('Correction request raised and routed to the metadata team.')
        }}
        onClose={() => {
          setTarget(null)
          setAction(null)
        }}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast} />
        </div>
      ) : null}
    </div>
  )
}