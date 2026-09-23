import { useState } from 'react'
import { FileUp, PencilLine, Sparkles } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Badge } from '@/components/ui/Badge'

type Method = 'upload' | 'enter'
type Step = 'method' | 'form' | 'review'

export function AddRecordModal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean
  onClose: () => void
  onSaved: (note: string) => void
}) {
  const [step, setStep] = useState<Step>('method')
  const [method, setMethod] = useState<Method>('upload')

  const extracted = {
    title: 'Blood pressure readings — home monitoring log',
    type: 'Other',
    date: '2026-09-19',
    organisation: 'Self-entered',
    summary:
      'Home BP log: morning average 124/82, evening average 127/84 over the past two weeks.',
  }

  const reset = () => {
    setStep('method')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={reset}
      title="Add a record"
      description="Import an old or external healthcare record into your own health record."
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={reset}>
            Cancel
          </Button>
          {step === 'form' ? (
            <Button onClick={() => setStep('review')}>
              <Sparkles className="size-4" />
              Extract &amp; review
            </Button>
          ) : null}
          {step === 'review' ? (
            <Button onClick={() => onSaved('Record added to your health record.')}>Save record</Button>
          ) : null}
        </div>
      }
    >
      {step === 'method' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              {
                key: 'upload',
                icon: FileUp,
                title: 'Upload Document',
                desc: 'PDF, image, or scanned record. AI extracts the information for your review.',
              },
              {
                key: 'enter',
                icon: PencilLine,
                title: 'Enter Information',
                desc: 'Type the details yourself — date, organisation, and summary.',
              },
            ] as { key: Method; icon: typeof FileUp; title: string; desc: string }[]
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setMethod(opt.key)
                setStep('form')
              }}
              className="group rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition hover:border-brand-400 hover:bg-brand-50/40"
            >
              <opt.icon className="size-6 text-brand-600" />
              <p className="mt-3 font-display font-semibold text-slate-900">{opt.title}</p>
              <p className="mt-1 text-sm text-slate-500">{opt.desc}</p>
            </button>
          ))}
        </div>
      ) : step === 'form' ? (
        method === 'upload' ? (
          <div className="space-y-5">
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-6 py-12 text-center">
              <FileUp className="size-8 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Drop a file here, or browse</p>
                <p className="mt-1 text-xs text-slate-400">PDF, JPG, or PNG up to 10 MB</p>
              </div>
              <Button size="sm" variant="outline">
                Choose file
              </Button>
            </div>
            <Field label="Record type" required>
              <Select id="type" defaultValue="Other">
                <option>Consultation</option>
                <option>Investigation</option>
                <option>Prescription</option>
                <option>Report</option>
                <option>Hospital Record</option>
                <option>Other</option>
              </Select>
            </Field>
          </div>
        ) : (
          <div className="space-y-5">
            <Field label="Title" required>
              <Input id="title" placeholder="e.g. Home blood pressure log" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date" required>
                <Input id="date" type="date" />
              </Field>
              <Field label="Organisation" hint="Clinic, lab, or self-entered">
                <Input id="org" placeholder="e.g. Self-entered" defaultValue="Self-entered" />
              </Field>
            </div>
            <Field label="Summary" required>
              <Textarea id="summary" rows={4} placeholder="What does this record show?" />
            </Field>
          </div>
        )
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-2xl bg-brand-50/80 p-4 ring-1 ring-brand-100">
            <Sparkles className="size-5 shrink-0 text-brand-600" />
            <p className="text-sm text-brand-800">
              AI extracted the following. Review each field and correct anything before saving.
            </p>
          </div>
          <Field label="Title">
            <Input id="title" defaultValue={extracted.title} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date">
              <Input id="date" type="date" defaultValue={extracted.date} />
            </Field>
            <Field label="Organisation">
              <Input id="org" defaultValue={extracted.organisation} />
            </Field>
          </div>
          <Field label="Summary">
            <Textarea id="summary" rows={4} defaultValue={extracted.summary} />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">AI extraction</Badge>
            <Badge tone="slate">You keep the original file</Badge>
          </div>
        </div>
      )}
    </Modal>
  )
}