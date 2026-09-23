import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export function IdChip({ id, mono = true, className }: { id: string; mono?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600 ring-1 ring-inset ring-slate-200',
        mono && 'font-mono text-[11px] tracking-wide',
        className,
      )}
    >
      {id}
    </span>
  )
}

export function VerifiedBadge({ verified }: { verified: boolean }) {
  return (
    <Badge tone={verified ? 'green' : 'amber'} dot>
      {verified ? 'Verified' : 'Pending verification'}
    </Badge>
  )
}

export function SourceBadge({ source }: { source: 'Organisation' | 'Patient' }) {
  return source === 'Organisation' ? (
    <Badge tone="navy" dot>
      Organisation generated
    </Badge>
  ) : (
    <Badge tone="brand" dot>
      Patient provided
    </Badge>
  )
}

export function AccessBadge({
  status,
}: {
  status: 'Active' | 'Pending' | 'Limited' | 'Previous' | 'Expiring'
}) {
  const tone = status === 'Active' ? 'green' : status === 'Pending' ? 'amber' : status === 'Expiring' ? 'amber' : 'slate'
  return (
    <Badge tone={tone} dot>
      {status}
    </Badge>
  )
}