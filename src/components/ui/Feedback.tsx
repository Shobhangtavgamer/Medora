import { CheckCircle2, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block size-5 animate-spin rounded-full border-2 border-current border-t-transparent',
        className,
      )}
      aria-label="Loading"
      role="status"
    />
  )
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-14 text-center',
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-soft ring-1 ring-slate-200">
        <Inbox className="size-6" />
      </div>
      <div>
        <p className="font-display font-semibold text-slate-900">{title}</p>
        {description ? <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function Toast({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lift animate-scale-in">
      <CheckCircle2 className="size-4.5 text-green-400" />
      {message}
    </div>
  )
}