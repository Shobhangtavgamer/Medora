import { DoctorCard } from '@/components/dashboard/DoctorCard'
import type { Doctor } from '@/data/doctors'

export function ListDoctorPreview({ doctors }: { doctors: Doctor[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}