export type ReferralStatus = 'Sent' | 'Accepted' | 'Declined' | 'Completed'

export interface Referral {
  id: string
  patientId: string
  patientName: string
  receivingProfessional: string
  receivingOrganisation: string
  specialty: string
  reason: string
  records: string[]
  message: string
  date: string
  status: ReferralStatus
}

export const referralTone: Record<ReferralStatus, 'navy' | 'green' | 'red' | 'brand'> = {
  Sent: 'navy',
  Accepted: 'green',
  Declined: 'red',
  Completed: 'brand',
}

export const referrals: Referral[] = [
  {
    id: 'RF-201L',
    patientId: 'PAT-5KX9T1',
    patientName: 'Meera Nair',
    receivingProfessional: 'Dr. Elena Ruiz',
    receivingOrganisation: 'ClearSkin Clinic',
    specialty: 'Dermatology',
    reason: 'Persistent contact dermatitis on forearms with no response to topical treatment.',
    records: ['REC-44M6R1 Consultation notes'],
    message:
      'Meera has a 3-month history of contact dermatitis unresponsive to first-line topical therapy. Requesting specialist review.',
    date: '2026-09-16',
    status: 'Accepted',
  },
  {
    id: 'RF-199B',
    patientId: 'PAT-7RD2M5',
    patientName: 'Tom Becker',
    receivingProfessional: 'Dr. Marcus Lee',
    receivingOrganisation: 'Motion & Joint Center',
    specialty: 'Orthopedics',
    reason: 'Recurrent right shoulder pain and limited range of motion after a fall.',
    records: ['REC-12N8Z1 Consultation notes', 'REC-27P3Q6 Shoulder X-ray'],
    message:
      'Tom injured his right shoulder two months ago. X-ray was unremarkable, but pain persists with functional limitation.',
    date: '2026-09-10',
    status: 'Sent',
  },
  {
    id: 'RF-196K',
    patientId: 'PAT-8F42K7',
    patientName: 'Rahul Sharma',
    receivingProfessional: 'Dr. Sofia Ramírez',
    receivingOrganisation: 'ClearSkin Clinic',
    specialty: 'Dermatology',
    reason: 'Rash and sensitivity possibly related to medication.',
    records: ['REC-62MV10 Consultation notes'],
    message:
      'Evaluating whether the new antihypertensive may be causing a skin reaction. Requesting dermatology assessment.',
    date: '2026-09-04',
    status: 'Sent',
  },
  {
    id: 'RF-194T',
    patientId: 'PAT-5KX9T1',
    patientName: 'Meera Nair',
    receivingProfessional: 'Dr. Maya Kapoor',
    receivingOrganisation: 'Heart Institute of Mumbai',
    specialty: 'Cardiology',
    reason: 'Palpitations during exercise — completed earlier this cycle.',
    records: ['REC-44M6R1 Consultation notes'],
    message: 'Meera reported exercise-related palpitations; cardiology review completed successfully.',
    date: '2026-08-12',
    status: 'Completed',
  },
  {
    id: 'RF-188P',
    patientId: 'PAT-7RD2M5',
    patientName: 'Tom Becker',
    receivingProfessional: 'Dr. Elena Ruiz',
    receivingOrganisation: 'ClearSkin Clinic',
    specialty: 'Dermatology',
    reason: 'Chronic eczema flare — patient declined further review.',
    records: ['REC-12N8Z1 Consultation notes'],
    message: 'Referral declined by receiving specialist after patient declined appointment.',
    date: '2026-07-29',
    status: 'Declined',
  },
]