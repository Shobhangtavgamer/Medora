import { Building2, CalendarDays, Download, FileText, ShieldCheck, User } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { IdChip, SourceBadge } from '@/components/shared/IdentityBadges'
import { recordTypeTone, type RecordItem } from '@/data/records'
import { formatDate } from '@/lib/utils'

export function RecordCard({ record, onOpen }: { record: RecordItem; onOpen?: () => void }) {
  return (
    <Card className="group flex flex-col transition hover:-translate-y-0.5 hover:shadow-card">
      <CardHeader
        title={record.title}
        description={
          <span className="flex flex-wrap items-center gap-1.5">
            <span>{formatDate(record.date)}</span>
            <IdChip id={record.id} />
          </span>
        }
        icon={<FileText className="size-5" />}
        action={
          <Badge tone={recordTypeTone[record.type]} className="text-[10px]">
            {record.type}
          </Badge>
        }
      />
      <CardContent className="flex flex-1 flex-col">
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-slate-600">
            <User className="size-4 text-slate-400" />
            {record.professional ?? '—'}{' '}
            {record.professional ? (
              <IdChip id={record.professionalId ?? ''} />
            ) : null}
          </p>
          <p className="flex items-center gap-2 text-slate-600">
            <Building2 className="size-4 text-slate-400" />
            {record.organisation}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <SourceBadge source={record.source} />
          {onOpen ? (
            <Button size="sm" variant="outline" onClick={onOpen}>
              View Record
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export function RecordDetailModal({
  record,
  onClose,
}: {
  record: RecordItem | null
  onClose: () => void
}) {
  return (
    <Modal
      open={Boolean(record)}
      onClose={onClose}
      title={record?.title}
      description={record ? `${record.type} · ${formatDate(record.date)}` : undefined}
      size="lg"
    >
      {record ? (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <User className="size-3.5" /> Professional
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">
                {record.professional ?? 'Not specified'}
              </p>
              {record.professionalId ? <IdChip id={record.professionalId} /> : null}
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Building2 className="size-3.5" /> Organisation
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">{record.organisation}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <CalendarDays className="size-3.5" /> Date
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">{formatDate(record.date)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <ShieldCheck className="size-3.5" /> Record ID
              </p>
              <p className="mt-1.5">
                <IdChip id={record.id} />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SourceBadge source={record.source} />
            <Badge
              tone={
                record.status === 'Final'
                  ? 'green'
                  : record.status === 'Pending'
                    ? 'amber'
                    : record.status === 'Draft'
                      ? 'slate'
                      : 'slate'
              }
            >
              {record.status}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Summary</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{record.summary}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Provenance</p>
            <p className="mt-1 rounded-xl bg-brand-50/70 p-3 text-sm text-brand-800 ring-1 ring-brand-100">
              {record.source === 'Organisation'
                ? `Created by ${record.organisation} through the organisation record workflow.`
                : 'Patient-provided record entered by you; AI-extracted and verified at upload.'}
            </p>
          </div>

          {record.attachments && record.attachments.length > 0 ? (
            <div>
              <p className="text-sm font-semibold text-slate-900">Attached documents</p>
              <div className="mt-2 space-y-2">
                {record.attachments.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{a.name}</p>
                      <p className="text-xs text-slate-400">{a.kind}</p>
                    </div>
                    <button
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-brand-600"
                      onClick={() => {}}
                      aria-label={`Download ${a.name}`}
                    >
                      <Download className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">Access &amp; activity</p>
            <p className="mt-1 text-sm text-slate-500">
              Shared with your authorised care team. No access events in the last 7 days.
            </p>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}