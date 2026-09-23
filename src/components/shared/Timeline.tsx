import {
  ArrowLeftRight,
  Building2,
  ChevronRight,
  FilePlus2,
  FlaskConical,
  Pill,
  Stethoscope,
} from 'lucide-react'
import { eventTone, type HealthEvent, type HealthEventType } from '@/data/health'
import { Badge } from '@/components/ui/Badge'
import { cn, formatDate } from '@/lib/utils'

const iconByType: Record<HealthEventType, typeof Stethoscope> = {
  Consultation: Stethoscope,
  Investigation: FlaskConical,
  Prescription: Pill,
  'Hospital Visit': Building2,
  Referral: ArrowLeftRight,
  'New Record': FilePlus2,
}

const toneBg: Record<HealthEventType, string> = {
  Consultation: 'bg-red-50 text-red-600 ring-red-100',
  Investigation: 'bg-brand-50 text-brand-600 ring-brand-100',
  Prescription: 'bg-amber-50 text-amber-600 ring-amber-100',
  'Hospital Visit': 'bg-navy-50 text-navy-600 ring-navy-100',
  Referral: 'bg-green-50 text-green-600 ring-green-100',
  'New Record': 'bg-violet-50 text-violet-600 ring-violet-100',
}

export function Timeline({
  events,
  empty,
  onOpenRecord,
}: {
  events: HealthEvent[]
  empty?: string
  onOpenRecord?: (recordId: string) => void
}) {
  if (events.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-10 text-center text-sm text-slate-500">
        {empty ?? 'No events yet.'}
      </p>
    )
  }

  return (
    <div className="relative">
      <div aria-hidden className="absolute bottom-4 left-[19px] top-4 w-px bg-slate-200" />
      <div className="space-y-4">
        {events.map((event) => {
          const Icon = iconByType[event.type]
          return (
            <div key={event.id} className="relative flex gap-4">
              <div
                className={cn(
                  'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-1',
                  toneBg[event.type],
                )}
              >
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={eventTone[event.type]} className="text-[10px]">
                    {event.type}
                  </Badge>
                  <span className="text-xs font-medium text-slate-400">{formatDate(event.date)}</span>
                </div>
                <p className="mt-1.5 font-display font-semibold text-slate-900">{event.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {event.professional ? `${event.professional} · ` : ''}
                  {event.organisation}
                </p>
                <p className="mt-1.5 text-sm text-slate-500">{event.summary}</p>
                {onOpenRecord && event.recordId ? (
                  <button
                    onClick={() => onOpenRecord(event.recordId!)}
                    className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
                  >
                    View Record
                    <ChevronRight className="size-4" />
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}