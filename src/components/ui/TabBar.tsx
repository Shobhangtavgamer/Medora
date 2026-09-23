import { cn } from '@/lib/utils'

export function TabBar<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: readonly T[]
  active: T
  onChange: (tab: T) => void
  className?: string
}) {
  return (
    <div
      className={cn('flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 ring-1 ring-slate-200', className)}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-semibold transition-all',
            active === tab
              ? 'bg-white text-brand-700 shadow-soft ring-1 ring-slate-200'
              : 'text-slate-500 hover:text-slate-800',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}