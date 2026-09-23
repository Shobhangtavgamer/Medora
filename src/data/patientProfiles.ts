import type { HealthEvent } from '@/data/health'
import type { RecordItem } from '@/data/records'

export interface PatientAccess {
  status: 'Active' | 'Previous' | 'Pending'
  purpose: string
  grantedAt?: string
  expiresAt: string
  information: string[]
}

export interface AIFact {
  text: string
  sourceLabel: string
  sourceRecordId?: string
}

export interface AIContext {
  relevantHistory: AIFact[]
  currentInformation: AIFact[]
  recentRelevantRecords: AIFact[]
  openInformation: AIFact[]
  conflictingInformation: AIFact[]
}

export interface PatientProfile {
  id: string
  name: string
  dob: string
  gender: string
  phone: string
  avatarColor: string
  recentActivity: string
  access: PatientAccess
  conditions: { name: string; status: string; source: string }[]
  medications: { name: string; dosage: string; status: string }[]
  allergies: { allergen: string; reaction: string }[]
  timeline: HealthEvent[]
  records: RecordItem[]
  aiContext: AIContext
}

export const patientProfiles: PatientProfile[] = [
  {
    id: 'PAT-8F42K7',
    name: 'Rahul Sharma',
    dob: '1989-02-11',
    gender: 'Male',
    phone: '+91 98123 45678',
    avatarColor: 'from-brand-400 to-brand-600',
    recentActivity: 'Consultation · 15 Sep 2026',
    access: {
      status: 'Active',
      purpose: 'General practice follow-up',
      grantedAt: '2026-08-01',
      expiresAt: '2026-10-15',
      information: ['Relevant history', 'Medications', 'Selected records', 'Recent consultations'],
    },
    conditions: [
      { name: 'Hypertension (Stage 1)', status: 'Managed', source: 'XYZ Hospital' },
      { name: 'Allergic rhinitis', status: 'Active', source: 'Riverside Family Medicine' },
      { name: 'Osteoporosis screening pending', status: 'Resolved', source: 'Heart Institute of Mumbai' },
    ],
    medications: [
      { name: 'Amlodipine 5mg', dosage: '1 tablet daily', status: 'Active' },
      { name: 'Cetirizine 10mg', dosage: '1 tablet as needed', status: 'Active' },
    ],
    allergies: [
      { allergen: 'Co-codamol', reaction: 'Nausea, dizziness' },
      { allergen: 'Dust mites', reaction: 'Sneezing, congestion' },
    ],
    timeline: [
      {
        id: 'pe1',
        type: 'Consultation',
        title: 'Cardiology review',
        date: '2026-09-15',
        professional: 'Dr. Maya Kapoor',
        professionalId: 'HCP-5L3DKA',
        organisation: 'Heart Institute of Mumbai',
        recordId: 'REC-51Q7X2',
        summary: "BP 122/78. Amlodipine well tolerated. Titration reviewed.",
      },
      {
        id: 'pe2',
        type: 'Investigation',
        title: 'Renal function panel',
        date: '2026-09-12',
        organisation: 'ABC Diagnostics',
        recordId: 'REC-73H5Y8',
        summary: 'Creatinine 0.9 mg/dL, eGFR 92. Normal for age.',
      },
      {
        id: 'pe3',
        type: 'Consultation',
        title: 'Follow-up visit',
        date: '2026-09-10',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        recordId: 'REC-62MV10',
        summary: 'General practice follow-up. Medication adherence good.',
      },
      {
        id: 'pe4',
        type: 'Prescription',
        title: 'Amlodipine renewed',
        date: '2026-09-10',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        recordId: 'REC-88K2D1',
        summary: '30-day supply, 3 refills.',
      },
      {
        id: 'pe5',
        type: 'Referral',
        title: 'Referral to dermatology',
        date: '2026-09-04',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        recordId: 'RF-196K',
        summary: 'Possible medication-related skin reaction.',
      },
    ],
    records: [
      {
        id: 'REC-62MV10',
        title: 'General practice consultation',
        type: 'Consultation',
        date: '2026-09-10',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        source: 'Organisation',
        summary:
          'Routine follow-up. BP 124/80, HR 74. Medication adherence confirmed. Noted mild skin rash on forearms — referred to dermatology.',
        status: 'Final',
      },
      {
        id: 'REC-88K2D1',
        title: 'Amlodipine 5mg prescription',
        type: 'Prescription',
        date: '2026-09-10',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        source: 'Organisation',
        summary: '1 tablet daily. 30-day supply with 3 refills.',
        status: 'Final',
      },
      {
        id: 'REC-51Q7X2',
        title: 'Cardiology review note',
        type: 'Report',
        date: '2026-09-15',
        professional: 'Dr. Maya Kapoor',
        professionalId: 'HCP-5L3DKA',
        organisation: 'Heart Institute of Mumbai',
        source: 'Organisation',
        summary: 'BP 122/78. Amlodipine 5mg well tolerated. Continue current plan.',
        attachments: [{ name: 'cardiology_note.pdf', kind: 'Document' }],
        status: 'Final',
      },
      {
        id: 'REC-73H5Y8',
        title: 'Renal function panel',
        type: 'Investigation',
        date: '2026-09-12',
        organisation: 'ABC Diagnostics',
        source: 'Organisation',
        summary: 'Creatinine 0.9 mg/dL, eGFR 92 mL/min. Normal.',
        attachments: [{ name: 'renal_panel.pdf', kind: 'Report' }],
        status: 'Final',
      },
      {
        id: 'REC-44M6R1',
        title: 'Vaccination history',
        type: 'Other',
        date: '2026-06-20',
        organisation: 'Riverside Family Medicine',
        source: 'Organisation',
        summary: 'Hepatitis B series complete. Influenza 2025-26 administered.',
        status: 'Final',
      },
    ],
    aiContext: {
      relevantHistory: [
        {
          text: 'Managed Stage 1 hypertension for approximately 2 years with amlodipine 5mg.',
          sourceLabel: 'Source: Prescription – Heart Institute of Mumbai – 15 Sep 2026',
          sourceRecordId: 'REC-51Q7X2',
        },
        {
          text: 'History of allergic rhinitis treated intermittently with cetirizine.',
          sourceLabel: 'Source: Consultation – Riverside Family Medicine – 20 Jan 2026',
        },
      ],
      currentInformation: [
        {
          text: 'BP 122/78, HR 74 at last visit; medication adherence reported as good.',
          sourceLabel: 'Source: Consultation – Sharma Medical Clinic – 10 Sep 2026',
          sourceRecordId: 'REC-62MV10',
        },
        {
          text: 'Renal function within normal range (eGFR 92).',
          sourceLabel: 'Source: Investigation – ABC Diagnostics – 12 Sep 2026',
          sourceRecordId: 'REC-73H5Y8',
        },
      ],
      recentRelevantRecords: [
        {
          text: 'Cardiology review completed 15 Sep 2026 with stable findings.',
          sourceLabel: 'Source: Report – Heart Institute of Mumbai – 15 Sep 2026',
          sourceRecordId: 'REC-51Q7X2',
        },
        {
          text: 'Skin rash on forearms noted at last consultation.',
          sourceLabel: 'Source: Consultation – Sharma Medical Clinic – 10 Sep 2026',
          sourceRecordId: 'REC-62MV10',
        },
      ],
      openInformation: [
        {
          text: 'Dermatology referral (RF-196K) is sent but not yet accepted — rash aetiology unresolved.',
          sourceLabel: 'Source: Referral – Sharma Medical Clinic – 4 Sep 2026',
          sourceRecordId: 'RF-196K',
        },
        {
          text: 'No recent lipid panel on file; overdue annual review recommended.',
          sourceLabel: 'Source: Investigation history – 12 Mar 2026',
        },
      ],
      conflictingInformation: [
        {
          text: 'Allergy record lists co-codamol intolerance; 2024 hospital record lists “no known drug allergies”.',
          sourceLabel: 'Source: Allergy history vs Hospital Record – XYZ Hospital – 12 May 2024',
        },
        {
          text: 'BP readings vary between home (128/84) and clinic (122/78) measurements.',
          sourceLabel: 'Source: Home monitoring vs Consultation – 10 Sep 2026',
          sourceRecordId: 'REC-62MV10',
        },
      ],
    },
  },
  {
    id: 'PAT-5KX9T1',
    name: 'Meera Nair',
    dob: '1997-10-03',
    gender: 'Female',
    phone: '+91 98234 56789',
    avatarColor: 'from-violet-400 to-violet-600',
    recentActivity: 'Dermatology referral accepted · 17 Sep 2026',
    access: {
      status: 'Active',
      purpose: 'General practice care',
      grantedAt: '2026-03-01',
      expiresAt: '2027-03-01',
      information: ['Relevant history', 'Medications', 'Allergies'],
    },
    conditions: [
      { name: 'Contact dermatitis', status: 'Active', source: 'Sharma Medical Clinic' },
    ],
    medications: [{ name: 'Hydrocortisone 1% cream', dosage: 'Apply twice daily', status: 'Active' }],
    allergies: [{ allergen: 'Nickel', reaction: 'Localised rash' }],
    timeline: [
      {
        id: 'me1',
        type: 'Consultation',
        title: 'Dermatology referral created',
        date: '2026-09-16',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        recordId: 'RF-201L',
        summary: 'Referred to Dr. Elena Ruiz for contact dermatitis review.',
      },
      {
        id: 'me2',
        type: 'Consultation',
        title: 'Contact dermatitis review',
        date: '2026-09-02',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        recordId: 'REC-44M6R1',
        summary: 'Forearm rash unresponsive to first-line topical therapy.',
      },
    ],
    records: [
      {
        id: 'REC-44M6R1',
        title: 'Contact dermatitis consultation',
        type: 'Consultation',
        date: '2026-09-02',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        source: 'Organisation',
        summary: 'Persistent forearm dermatitis; switched to hydrocortisone 1% and booked dermatology review.',
        status: 'Final',
      },
    ],
    aiContext: {
      relevantHistory: [
        {
          text: 'Repeated episodes of forearm dermatitis since 2025, treated topically.',
          sourceLabel: 'Source: Consultation – Sharma Medical Clinic – 2 Sep 2026',
          sourceRecordId: 'REC-44M6R1',
        },
      ],
      currentInformation: [
        {
          text: 'Using hydrocortisone 1% cream twice daily.',
          sourceLabel: 'Source: Prescription – Sharma Medical Clinic – 2 Sep 2026',
        },
      ],
      recentRelevantRecords: [
        {
          text: 'Dermatology referral accepted by Dr. Elena Ruiz.',
          sourceLabel: 'Source: Referral – ClearSkin Clinic – 17 Sep 2026',
          sourceRecordId: 'RF-201L',
        },
      ],
      openInformation: [],
      conflictingInformation: [],
    },
  },
  {
    id: 'PAT-7RD2M5',
    name: 'Tom Becker',
    dob: '1982-05-24',
    gender: 'Male',
    phone: '+91 98345 67890',
    avatarColor: 'from-sky-400 to-sky-600',
    recentActivity: 'Consultation record published · 14 Sep 2026',
    access: {
      status: 'Previous',
      purpose: 'Shoulder injury follow-up',
      grantedAt: '2026-07-01',
      expiresAt: '2026-09-30',
      information: ['Relevant history', 'Imaging reports'],
    },
    conditions: [{ name: 'Shoulder impingement (recovering)', status: 'Managed', source: 'Sharma Medical Clinic' }],
    medications: [{ name: 'Ibuprofen 400mg', dosage: 'As needed for pain', status: 'Expired' }],
    allergies: [{ allergen: 'None known', reaction: '—' }],
    timeline: [
      {
        id: 'te1',
        type: 'Consultation',
        title: 'Shoulder review',
        date: '2026-09-08',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        recordId: 'REC-12N8Z1',
        summary: 'Pain improving; physiotherapy continuing. Referral to orthopedics sent.',
      },
    ],
    records: [
      {
        id: 'REC-12N8Z1',
        title: 'Shoulder injury consultation',
        type: 'Consultation',
        date: '2026-09-08',
        professional: 'Dr. Ava Thompson',
        professionalId: 'HCP-29MX51',
        organisation: 'Sharma Medical Clinic',
        source: 'Organisation',
        summary: 'Right shoulder pain persisting after fall. X-ray unremarkable. Referred to orthopedics.',
        attachments: [{ name: 'shoulder_xray_right.dicom', kind: 'Image' }],
        status: 'Final',
      },
    ],
    aiContext: {
      relevantHistory: [
        {
          text: 'Right shoulder trauma from a fall in July 2026.',
          sourceLabel: 'Source: Consultation – Sharma Medical Clinic – 8 Sep 2026',
          sourceRecordId: 'REC-12N8Z1',
        },
      ],
      currentInformation: [
        {
          text: 'Recovering; physiotherapy ongoing, ibuprofen PRN.',
          sourceLabel: 'Source: Prescription – Sharma Medical Clinic – 8 Sep 2026',
        },
      ],
      recentRelevantRecords: [
        {
          text: 'Orthopedics referral sent; awaiting acceptance.',
          sourceLabel: 'Source: Referral – Motion & Joint Center – 10 Sep 2026',
          sourceRecordId: 'RF-199B',
        },
      ],
      openInformation: [
        {
          text: 'No specialist orthopedics assessment yet.',
          sourceLabel: 'Source: Referral status – 10 Sep 2026',
          sourceRecordId: 'RF-199B',
        },
      ],
      conflictingInformation: [],
    },
  },
]

export const patientById = (id: string) => patientProfiles.find((p) => p.id === id)