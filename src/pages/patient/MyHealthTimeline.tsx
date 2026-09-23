import { useState } from 'react'
import { timeline, type HealthEventType } from '@/data/health'
import { TabBar } from '@/components/ui/TabBar'
import { Timeline } from '@/components/shared/Timeline'
import { RecordDetailModal } from '@/components/shared/Record'
import { recordById } from '@/data/records'

const filters = ['All', 'Consultations', 'Prescriptions', 'Investigations', 'Hospital Records', 'Referrals'] as const

const eventTypeFilter: Record<(typeof filters)[number], HealthEventType[] | null> = {
  All: null,
  Consultations: ['Consultation'],
  Prescriptions: ['Prescription'],
  Investigations: ['Investigation'],
  'Hospital Records': ['Hospital Visit', 'New Record'],
  Referrals: ['Referral'],
}

export default function MyHealthTimeline() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [record, setRecord] = useState<string | null>(null)

  const types = eventTypeFilter[filter]
  const events = types ? timeline.filter((e) => types.includes(e.type)) : timeline

  return (
    <div className="space-y-5">
      <TabBar tabs={filters} active={filter} onChange={setFilter} className="w-fit" />
      <Timeline events={events} onOpenRecord={(id) => setRecord(id)} />
      <RecordDetailModal record={record ? recordById(record) ?? null : null} onClose={() => setRecord(null)} />
    </div>
  )
}