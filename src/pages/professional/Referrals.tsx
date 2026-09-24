import { useEffect, useState } from 'react'
import { ArrowLeftRight, FilePlus2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { createReferral, getProfessionalReferrals, type LiveReferral } from '@/lib/medoraServices'

const statuses = ['All', 'Sent', 'Accepted', 'Declined', 'Completed'] as const

export default function Referrals() {
  const [referrals, setReferrals] = useState<LiveReferral[]>([])
  const [filter, setFilter] = useState<typeof statuses[number]>('All')
  const [open, setOpen] = useState(false)
  const [patientId, setPatientId] = useState('')
  const [receivingId, setReceivingId] = useState('')
  const [specialty, setSpecialty] = useState('Cardiology')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const refresh = () => getProfessionalReferrals().then(setReferrals).catch(() => setReferrals([]))
  useEffect(() => { void refresh() }, [])
  const list = referrals.filter((referral) => filter === 'All' || referral.status === filter)

  return <div className="space-y-6"><PageHeader title="Referrals" description="Live referrals created from your professional profile."><Button onClick={() => setOpen(true)}><FilePlus2 className="size-4.5" />New referral</Button></PageHeader><div className="flex flex-wrap gap-2">{statuses.map((status) => <button key={status} onClick={() => setFilter(status)} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === status ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>{status}</button>)}</div><div className="space-y-3">{list.length === 0 ? <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No referrals recorded.</p> : list.map((referral) => <Card key={referral.id}><CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center"><span className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><ArrowLeftRight className="size-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-slate-900">{referral.patientName}</p><IdChip id={referral.patientId} /><Badge>{referral.status}</Badge></div><p className="mt-1 text-sm text-slate-600">To {referral.receivingProfessional} · {referral.specialty}</p><p className="mt-1 text-sm text-slate-500">{referral.reason}</p><p className="mt-1 text-xs text-slate-400">{referral.date}</p></div></CardContent></Card>)}</div><Modal open={open} onClose={() => setOpen(false)} title="Create referral" description="Create a persisted referral for a patient and receiving professional."><div className="space-y-4"><Field label="Patient ID" required><Input value={patientId} onChange={(event) => setPatientId(event.target.value)} placeholder="PAT-XXXXXX" /></Field><Field label="Receiving professional ID"><Input value={receivingId} onChange={(event) => setReceivingId(event.target.value)} placeholder="HCP-XXXXXX" /></Field><Field label="Specialty" required><Select value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option>Cardiology</option><option>Dermatology</option><option>Orthopedics</option><option>Neurology</option></Select></Field><Field label="Reason" required><Textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} /></Field><Field label="Message"><Textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} /></Field><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={async () => { try { await createReferral({ patientId, receivingProfessionalId: receivingId || undefined, specialty, reason, message }); await refresh(); setOpen(false); setToast('Referral created.') } catch (error) { setToast(error instanceof Error ? error.message : 'Unable to create referral.') } }}>Create referral</Button></div></div></Modal>{toast ? <div className="fixed bottom-6 right-6 z-50"><Toast message={toast} /></div> : null}</div>
}
