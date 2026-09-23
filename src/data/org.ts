import type { RecordType } from '@/data/records'

export interface OrgWorkflowRecord {
  id: string
  patient: string
  patientId: string
  professional: string
  type: RecordType
  date: string
  status: 'Draft' | 'Pending' | 'Published' | 'Correction'
  note: string
}

export interface OrgCareEntry {
  id: string
  patient: string
  patientId: string
  professional: string
  careStatus: 'Active' | 'Inactive'
  latestActivity: string
}

export interface OrgRequest {
  id: string
  type: 'Record review' | 'Professional association' | 'Data correction'
  summary: string
  from: string
  fromId: string
  date: string
  status: 'Pending' | 'Resolved'
}

export const orgWorkflowRecords: OrgWorkflowRecord[] = [
  {
    id: 'REC-91AB43',
    patient: 'Rahul Sharma',
    patientId: 'PAT-8F42K7',
    professional: 'Dr. Rahul Mehta',
    type: 'Consultation',
    date: '2026-09-15',
    status: 'Published',
    note: 'Published to patient record — notification sent.',
  },
  {
    id: 'REC-5X2P7L',
    patient: 'Rahul Sharma',
    patientId: 'PAT-8F42K7',
    professional: 'Dr. Rahul Mehta',
    type: 'Investigation',
    date: '2026-09-18',
    status: 'Pending',
    note: 'Awaiting department head review before publication.',
  },
  {
    id: 'REC-62MV10',
    patient: 'Tom Becker',
    patientId: 'PAT-7RD2M5',
    professional: 'Dr. Ava Thompson',
    type: 'Consultation',
    date: '2026-09-14',
    status: 'Correction',
    note: 'Metadata correction requested — medication dosage to be verified.',
  },
  {
    id: 'REC-38N9Q1',
    patient: 'Meera Nair',
    patientId: 'PAT-5KX9T1',
    professional: 'Priya Anand',
    type: 'Hospital Record',
    date: '2026-09-11',
    status: 'Draft',
    note: 'Draft in progress — diagnostic notes pending.',
  },
  {
    id: 'REC-27P3Q6',
    patient: 'Rahul Sharma',
    patientId: 'PAT-8F42K7',
    professional: 'Dr. Rahul Mehta',
    type: 'Report',
    date: '2026-08-30',
    status: 'Published',
    note: 'Published to patient record.',
  },
]

export const orgWorkflowTone: Record<OrgWorkflowRecord['status'], 'slate' | 'amber' | 'green' | 'red'> = {
  Draft: 'slate',
  Pending: 'amber',
  Published: 'green',
  Correction: 'red',
}

export const orgCare: OrgCareEntry[] = [
  {
    id: 'oc1',
    patient: 'Rahul Sharma',
    patientId: 'PAT-8F42K7',
    professional: 'Dr. Rahul Mehta',
    careStatus: 'Active',
    latestActivity: 'Consultation · 15 Sep 2026',
  },
  {
    id: 'oc2',
    patient: 'Meera Nair',
    patientId: 'PAT-5KX9T1',
    professional: 'Dr. Rahul Mehta',
    careStatus: 'Active',
    latestActivity: 'Renal panel · 12 Sep 2026',
  },
  {
    id: 'oc3',
    patient: 'Tom Becker',
    patientId: 'PAT-7RD2M5',
    professional: 'Priya Anand',
    careStatus: 'Active',
    latestActivity: 'Care coordination · 8 Sep 2026',
  },
  {
    id: 'oc4',
    patient: 'Sunita Rao',
    patientId: 'PAT-3M2R9D',
    professional: 'Dr. Rahul Mehta',
    careStatus: 'Inactive',
    latestActivity: 'Consultation · 12 Jun 2026',
  },
]

export const orgRequests: OrgRequest[] = [
  {
    id: 'or1',
    type: 'Record review',
    summary: 'Consultation record awaiting publication — Rahul Sharma.',
    from: 'Dr. Rahul Mehta',
    fromId: 'HCP-92RV04',
    date: '2026-09-18',
    status: 'Pending',
  },
  {
    id: 'or2',
    type: 'Professional association',
    summary: 'Dr. Nisha Verma (Radiology) requested association with XYZ Hospital.',
    from: 'Dr. Nisha Verma',
    fromId: 'HCP-4K7M2P',
    date: '2026-09-12',
    status: 'Pending',
  },
  {
    id: 'or3',
    type: 'Data correction',
    summary: 'Correction for REC-62MV10 — medication dosage verification.',
    from: 'Dr. Ava Thompson',
    fromId: 'HCP-29MX51',
    date: '2026-09-14',
    status: 'Pending',
  },
]

export const orgStats = {
  professionals: 18,
  activeCareRelationships: 14,
  pendingRequests: 3,
  recordsThisMonth: 27,
}