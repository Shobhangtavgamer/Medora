import { Link } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-secondary-500 shadow-sm shadow-brand-600/30 transition-transform group-hover:scale-105">
        <HeartPulse className="size-5 text-white" strokeWidth={2.4} />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-amber-400 ring-2 ring-white" />
      </span>
      <span
        className={cn(
          'font-display text-xl font-bold tracking-tight',
          light ? 'text-white' : 'text-slate-900',
        )}
      >
        Med<span className="text-brand-600">ora</span>
      </span>
    </Link>
  )
}