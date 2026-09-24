import { useEffect, useState } from 'react'
import { type HealthEventType } from '@/data/health'
import { TabBar } from '@/components/ui/TabBar'
import { Timeline } from '@/components/shared/Timeline'
import { RecordDetailModal } from '@/components/shared/Record'
import type { RecordItem } from '@/data/records'
import { getPatientRecords, getPatientTimeline } from '@/lib/medoraServices'
import { useAuth } from '@/context/AuthContext'

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
  const { user } = useAuth()
  const [timeline, setTimeline] = useState<Awaited<ReturnType<typeof getPatientTimeline>>>([])
  const [records, setRecords] = useState<RecordItem[]>([])
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [record, setRecord] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.patientProfile.id) return
    void Promise.all([getPatientTimeline(user.patientProfile.id), getPatientRecords(user.patientProfile.id)])
      .then(([events, loadedRecords]) => { setTimeline(events); setRecords(loadedRecords) })
  }, [user?.patientProfile.id])

  const types = eventTypeFilter[filter]
  const events = types ? timeline.filter((e) => types.includes(e.type)) : timeline

  return (
    <div className="space-y-5">
      <TabBar tabs={filters} active={filter} onChange={setFilter} className="w-fit" />
      <Timeline events={events} onOpenRecord={(id) => setRecord(id)} />
      <RecordDetailModal record={record ? records.find((item) => item.id === record) ?? null : null} onClose={() => setRecord(null)} />
    </div>
  )
}