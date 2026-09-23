export type ProfessionalRequestKind = 'Access approval' | 'Referral update' | 'Record contribution'

export interface ProfessionalRequest {
  id: string
  kind: ProfessionalRequestKind
  patient: string
  patientId: string
  title: string
  detail: string
  date: string
  status: 'Waiting on patient' | 'Pending' | 'Accepted' | 'Completed' | 'Declined'
}

export const professionalRequests: ProfessionalRequest[] = [
  {
    id: 'prf1',
    kind: 'Access approval',
    patient: 'Rahul Sharma',
    patientId: 'PAT-8F42K7',
    title: 'Access request awaiting approval',
    detail: 'Requested access to relevant history, medications, and recent records for follow-up consultation.',
    date: '2026-09-18',
    status: 'Waiting on patient',
  },
  {
    id: 'prf2',
    kind: 'Access approval',
    patient: 'Tom Becker',
    patientId: 'PAT-7RD2M5',
    title: 'Extended access approved',
    detail: 'Patient approved extended access for ongoing physiotherapy review.',
    date: '2026-09-15',
    status: 'Accepted',
  },
  {
    id: 'prf3',
    kind: 'Referral update',
    patient: 'Meera Nair',
    patientId: 'PAT-5KX9T1',
    title: 'Referral accepted by dermatology',
    detail: 'Dr. Elena Ruiz accepted the referral. Awaiting appointment booking.',
    date: '2026-09-17',
    status: 'Accepted',
  },
  {
    id: 'prf4',
    kind: 'Record contribution',
    patient: 'Tom Becker',
    patientId: 'PAT-7RD2M5',
    title: 'Consultation record pending publication',
    detail: 'Submitted to Sharma Medical Clinic for organisation review.',
    date: '2026-09-14',
    status: 'Pending',
  },
  {
    id: 'prf5',
    kind: 'Access approval',
    patient: 'Meera Nair',
    patientId: 'PAT-5KX9T1',
    title: 'Access request declined by patient',
    detail: 'Patient declined extended access after completing the vaccination cycle.',
    date: '2026-08-30',
    status: 'Declined',
  },
]