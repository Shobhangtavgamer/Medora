import { BadgeCheck, MapPin, Star, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Doctor } from '@/data/doctors'
import { cn } from '@/lib/utils'

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-start gap-4">
        <span
          className={cn(
            'flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-lg font-bold text-white shadow-sm',
            doctor.avatarColor,
          )}
        >
          {doctor.name
            .replace('Dr. ', '')
            .split(' ')
            .map((p) => p[0])
            .join('')}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 font-display text-base font-bold text-slate-900">
            {doctor.name}
            <BadgeCheck className="size-4 shrink-0 text-brand-500" />
          </h3>
          <p className="text-sm font-medium text-brand-700">{doctor.specialty}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="size-3.5" />
            {doctor.location}
          </p>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1 text-sm font-bold text-slate-900">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {doctor.rating.toFixed(1)}
          </p>
          <p className="text-xs text-slate-500">({doctor.reviews} reviews)</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="green">{doctor.availability}</Badge>
        <Badge tone="navy">{doctor.experience} yrs experience</Badge>
        {doctor.languages.slice(0, 2).map((lang) => (
          <Badge key={lang} tone="slate">
            {lang}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
        <div>
          <p className="text-xs text-slate-500">Next available</p>
          <p className="text-sm font-semibold text-slate-900">{doctor.nextSlot}</p>
        </div>
        <p className="font-display text-lg font-bold text-slate-900">
          ₹{doctor.fee}
          <span className="text-xs font-medium text-slate-500"> / visit</span>
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link to="/patient">
          <Button fullWidth>Manage care</Button>
        </Link>
        <Link to="/patient/messages">
          <Button variant="outline" fullWidth>
            <Video className="size-4" />
            Message
          </Button>
        </Link>
      </div>
    </div>
  )
}