import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftRight, FilePlus2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea } from '@/components/ui/Field'
import { Modal } from '@/components/ui/Modal'
import { Toast } from '@/components/ui/Feedback'
import { PageHeader } from '@/components/shared/PageHeader'
import { IdChip } from '@/components/shared/IdentityBadges'
import { referrals, referralTone, type ReferralStatus } from '@/data/referrals'
import { patientProfiles } from '@/data/patientProfiles'
import { formatDate } from '@/lib/utils'

const statusFilter: (ReferralStatus | 'All')[] = ['All', 'Sent', 'Accepted', 'Declined', 'Completed']

export default function Referrals() {
  const [filter, setFilter] = useState<(typeof statusFilter)[number]>('All')
  const [createOpen, setCreateOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const list = referrals.filter((r) => filter === 'All' || r.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader title="Referrals" description="Sent to specialists and their current status.">
        <Button onClick={() => setCreateOpen(true)}>
          <FilePlus2 className="size-4.5" />
          New referral
        </Button>
      </PageHeader>

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

      <div className="space-y-3">
        {list.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                <ArrowLeftRight className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{r.patientName}</p>
                  <IdChip id={r.patientId} />
                  <Badge tone={referralTone[r.status]} dot>
                    {r.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">
                  To {r.receivingProfessional} · {r.specialty} · {r.receivingOrganisation}
                </p>
                <p className="mt-1.5 text-sm text-slate-500">{r.reason}</p>
                <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  {r.records.map((rec) => (
                    <span key={rec} className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-500">
                      {rec}
                    </span>
                  ))}
                  <span>· {formatDate(r.date)}</span>
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-1.5 lg:items-end">
                <Link
                  to={`/professional/patients/${r.patientId}`}
                  className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Open patient view
                </Link>
                <div className="flex gap-2">
                  {r.status === 'Sent' ? (
                    <Button size="sm" variant="outline" onClick={() => showToast('Reminder sent to receiving specialist.')}>
                      Send reminder
                    </Button>
                  ) : null}
                  {r.status === 'Accepted' ? (
                    <Button size="sm" variant="outline" onClick={() => showToast('Referral marked as completed.')}>
                      Mark completed
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create referral"
        description="Refer a patient to a specialist with context from their records."
        size="lg"
      >
        <div className="space-y-4">
          <Field label="Patient">
            <Select>
              {patientProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Specialty">
              <Select>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
              </Select>
            </Field>
            <Field label="Receiving professional">
              <Select>
                <option>Dr. Elena Ruiz</option>
                <option>Dr. Maya Kapoor</option>
                <option>Dr. Marcus Lee</option>
                <option>Dr. Sofia Ramírez</option>
              </Select>
            </Field>
          </div>
          <Field label="Reason for referral">
            <Textarea placeholder="Clinical reason the patient should be seen…" />
          </Field>
          <Field label="Message" hint="Optional note to the receiving professional.">
            <Textarea placeholder="Context, handover or special instructions…" />
          </Field>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setCreateOpen(false)
                showToast('Referral sent to the receiving professional.')
              }}
            >
              <ArrowLeftRight className="size-4.5" />
              Send referral
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