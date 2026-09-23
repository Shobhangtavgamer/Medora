import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  online?: boolean
}

const sizeClasses = {
  xs: 'size-8 text-xs',
  sm: 'size-10 text-sm',
  md: 'size-12 text-base',
  lg: 'size-16 text-lg',
  xl: 'size-24 text-2xl',
}

const gradients = [
  'from-brand-400 to-brand-600',
  'from-navy-400 to-navy-600',
  'from-violet-400 to-violet-600',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-sky-600',
]

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, size = 'md', online, className, ...props }, ref) => {
    const initials = name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

    const gradient = gradients[name.charCodeAt(0) % gradients.length]

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className={cn('rounded-full object-cover ring-1 ring-slate-200', sizeClasses[size])}
          />
        ) : (
          <div
            className={cn(
              'flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-inner',
              gradient,
              sizeClasses[size],
            )}
            aria-hidden
          >
            {initials}
          </div>
        )}
        {online ? (
          <span
            className="absolute bottom-0 right-0 block size-3 rounded-full bg-green-500 ring-2 ring-white"
            aria-label="Online"
          />
        ) : null}
      </div>
    )
  },
)
Avatar.displayName = 'Avatar'