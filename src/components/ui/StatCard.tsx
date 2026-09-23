import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Stat {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down'
  icon: LucideIcon
  tone?: 'brand' | 'navy' | 'amber' | 'violet' | 'green'
}

const tones = {
  brand: 'bg-brand-50 text-brand-600 ring-brand-100',
  navy: 'bg-navy-50 text-navy-600 ring-navy-100',
  amber: 'bg-amber-50 text-amber-600 ring-amber-100',
  violet: 'bg-violet-50 text-violet-600 ring-violet-100',
  green: 'bg-green-50 text-green-600 ring-green-100',
}

export function StatCard({ stat, className }: { stat: Stat; className?: string }) {
  const Icon = stat.icon
  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-200 transition hover:shadow-card',
        className,
      )}
    >
      <div className={cn('flex size-11 shrink-0 items-center justify-center rounded-xl ring-1', tones[stat.tone ?? 'brand'])}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-500">{stat.label}</p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900">
          {stat.value}
        </p>
        {stat.change ? (
          <p
            className={cn(
              'mt-1 text-xs font-semibold',
              stat.trend === 'down' ? 'text-red-600' : 'text-green-600',
            )}
          >
            {stat.trend === 'down' ? '▼' : '▲'} {stat.change}
          </p>
        ) : null}
      </div>
    </div>
  )
}