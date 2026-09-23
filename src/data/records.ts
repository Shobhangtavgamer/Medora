export type RecordType =
  | 'Consultation'
  | 'Prescription'
  | 'Investigation'
  | 'Report'
  | 'Hospital Record'
  | 'Referral'
  | 'Other'

export type RecordSource = 'Organisation' | 'Patient'

export interface RecordItem {
  id: string
  title: string
  type: RecordType
  date: string
  professional?: string
  professionalId?: string
  organisation: string
  source: RecordSource
  summary: string
  attachments?: { name: string; kind: string }[]
  status: 'Final' | 'Pending' | 'Draft' | 'Archived'
}

export const recordTypeTone: Record<RecordType, 'brand' | 'navy' | 'amber' | 'red' | 'green' | 'violet' | 'slate'> = {
  Consultation: 'red',
  Prescription: 'amber',
  Investigation: 'brand',
  Report: 'violet',
  'Hospital Record': 'navy',
  Referral: 'green',
  Other: 'slate',
}

export const patientRecords: RecordItem[] = [
  {
    id: 'REC-91AB43',
    title: 'Cardiology consultation — annual review',
    type: 'Consultation',
    date: '2026-09-15',
    professional: 'Dr. Rahul Mehta',
    professionalId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    source: 'Organisation',
    summary:
      'Annual cardiac review. Blood pressure 118/76, resting HR 68. ECG normal. Continued metoprolol 25mg twice daily. Follow-up in 12 months.',
    attachments: [{ name: 'Consultation notes.pdf', kind: 'Document' }],
    status: 'Final',
  },
  {
    id: 'REC-7D2KX9',
    title: 'Lipid profile & CBC',
    type: 'Investigation',
    date: '2026-09-12',
    organisation: 'ABC Diagnostics',
    source: 'Organisation',
    summary:
      'Total cholesterol 189 mg/dL, LDL 112 mg/dL, HDL 58 mg/dL. Hemoglobin 14.1 g/dL, WBC 6.2K/uL — all within normal range.',
    attachments: [
      { name: 'Lipid_panel.pdf', kind: 'Report' },
      { name: 'CBC.pdf', kind: 'Report' },
    ],
    status: 'Final',
  },
  {
    id: 'REC-3M1QX8',
    title: 'Metoprolol 25mg prescription',
    type: 'Prescription',
    date: '2026-09-15',
    professional: 'Dr. Rahul Mehta',
    professionalId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    source: 'Organisation',
    summary: '1 tablet twice daily. 90-day supply, 2 refills. Renewed after annual review.',
    status: 'Final',
  },
  {
    id: 'REC-8F6V2A',
    title: 'Left knee X-ray',
    type: 'Investigation',
    date: '2026-08-24',
    professional: 'Dr. Daniel Okafor',
    professionalId: 'HCP-6T4N7C',
    organisation: 'Motion & Joint Center',
    source: 'Organisation',
    summary: 'No fracture or joint space narrowing. Mild soft tissue swelling reported.',
    attachments: [{ name: 'knee_xray_left.dicom', kind: 'Image' }],
    status: 'Final',
  },
  {
    id: 'REC-4P9L7C',
    title: 'Tdap booster',
    type: 'Hospital Record',
    date: '2026-07-15',
    professional: 'Dr. James Carter',
    professionalId: 'HCP-1N8WQZ',
    organisation: 'Riverside Family Medicine',
    source: 'Organisation',
    summary: 'Tetanus, diphtheria, pertussis booster administered without adverse reaction.',
    status: 'Final',
  },
  {
    id: 'REC-2H8K3M',
    title: 'Vitamin D & B12 profile',
    type: 'Report',
    date: '2026-07-02',
    organisation: 'ABC Diagnostics',
    source: 'Organisation',
    summary: 'Vitamin D 32 ng/mL (borderline), B12 480 pg/mL (normal). Supplementation advised.',
    status: 'Pending',
  },
  {
    id: 'REC-6T3Y5Z',
    title: 'Allergy history record',
    type: 'Other',
    date: '2026-05-18',
    organisation: 'Self-entered',
    source: 'Patient',
    summary:
      'Patient-provided allergy history: penicillin (rash), shellfish (hives). Recorded from previous pharmacy records.',
    status: 'Final',
  },
  {
    id: 'REC-9N1Q4E',
    title: 'Referral to cardiology',
    type: 'Referral',
    date: '2026-05-06',
    professional: 'Dr. James Carter',
    professionalId: 'HCP-1N8WQZ',
    organisation: 'Riverside Family Medicine',
    source: 'Organisation',
    summary:
      'Referred to cardiology for review of elevated blood pressure readings over 3 visits. Accepted by Dr. Rahul Mehta.',
    status: 'Final',
  },
]

export const recordById = (id: string | undefined) => patientRecords.find((r) => r.id === id)