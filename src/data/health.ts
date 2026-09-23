export type HealthEventType =
  | 'Consultation'
  | 'Investigation'
  | 'Prescription'
  | 'Hospital Visit'
  | 'Referral'
  | 'New Record'

export interface HealthEvent {
  id: string
  type: HealthEventType
  title: string
  date: string
  professional?: string
  professionalId?: string
  organisation: string
  recordId?: string
  summary: string
}

export interface Condition {
  id: string
  name: string
  status: 'Active' | 'Managed' | 'Resolved'
  diagnosedBy: string
  date: string
  source: string
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  status: 'Active' | 'Expired' | 'Complete'
  source: string
}

export interface Allergy {
  id: string
  allergen: string
  reaction: string
  severity: 'Mild' | 'Moderate' | 'Severe'
  source: string
}

export const conditions: Condition[] = [
  {
    id: 'c1',
    name: 'Hypertension (Stage 1)',
    status: 'Managed',
    diagnosedBy: 'Dr. Rahul Mehta',
    date: '2026-09-15',
    source: 'XYZ Hospital',
  },
  {
    id: 'c2',
    name: 'Seasonal allergic rhinitis',
    status: 'Active',
    diagnosedBy: 'Dr. James Carter',
    date: '2026-09-02',
    source: 'Riverside Family Medicine',
  },
  {
    id: 'c3',
    name: 'Mild knee osteoarthritis',
    status: 'Managed',
    diagnosedBy: 'Dr. Daniel Okafor',
    date: '2026-08-24',
    source: 'Motion & Joint Center',
  },
  {
    id: 'c4',
    name: 'Vitamin D insufficiency',
    status: 'Active',
    diagnosedBy: 'Dr. James Carter',
    date: '2026-07-02',
    source: 'ABC Diagnostics',
  },
]

export const medications: Medication[] = [
  {
    id: 'm1',
    name: 'Metoprolol 25mg',
    dosage: '1 tablet',
    frequency: 'Twice daily',
    status: 'Active',
    source: 'Dr. Rahul Mehta · XYZ Hospital',
  },
  {
    id: 'm2',
    name: 'Cetirizine 10mg',
    dosage: '1 tablet',
    frequency: 'Once daily as needed',
    status: 'Active',
    source: 'Dr. James Carter · Riverside Family Medicine',
  },
  {
    id: 'm3',
    name: 'Vitamin D 1000 IU',
    dosage: '1 capsule',
    frequency: 'Once daily',
    status: 'Active',
    source: 'Dr. James Carter · Riverside Family Medicine',
  },
  {
    id: 'm4',
    name: 'Ibuprofen 400mg',
    dosage: '1 tablet',
    frequency: 'Every 6 hours PRN pain',
    status: 'Expired',
    source: 'Dr. Daniel Okafor · Motion & Joint Center',
  },
]

export const allergies: Allergy[] = [
  {
    id: 'al1',
    allergen: 'Penicillin',
    reaction: 'Skin rash, mild swelling',
    severity: 'Moderate',
    source: 'Patient-entered · pharmacy history',
  },
  {
    id: 'al2',
    allergen: 'Shellfish',
    reaction: 'Hives, itchy throat',
    severity: 'Moderate',
    source: 'Patient-entered',
  },
  {
    id: 'al3',
    allergen: 'Latex',
    reaction: 'Contact dermatitis',
    severity: 'Mild',
    source: 'XYZ Hospital · 2024',
  },
]

export const timeline: HealthEvent[] = [
  {
    id: 'e1',
    type: 'Consultation',
    title: 'Cardiology consultation',
    date: '2026-09-15',
    professional: 'Dr. Rahul Mehta',
    professionalId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    recordId: 'REC-91AB43',
    summary: 'Annual cardiac review — BP 118/76, ECG normal, continue metoprolol.',
  },
  {
    id: 'e2',
    type: 'Investigation',
    title: 'Lipid profile & CBC',
    date: '2026-09-12',
    organisation: 'ABC Diagnostics',
    recordId: 'REC-7D2KX9',
    summary: 'Cholesterol within range; hemoglobin 14.1 g/dL.',
  },
  {
    id: 'e3',
    type: 'Prescription',
    title: 'Metoprolol renewed',
    date: '2026-09-15',
    professional: 'Dr. Rahul Mehta',
    professionalId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    recordId: 'REC-3M1QX8',
    summary: '90-day supply, 2 refills.',
  },
  {
    id: 'e4',
    type: 'Consultation',
    title: 'Allergy follow-up',
    date: '2026-09-02',
    professional: 'Dr. James Carter',
    professionalId: 'HCP-1N8WQZ',
    organisation: 'Riverside Family Medicine',
    summary: 'Seasonal rhinitis management; cetirizine as needed.',
  },
  {
    id: 'e5',
    type: 'Investigation',
    title: 'Left knee X-ray',
    date: '2026-08-24',
    professional: 'Dr. Daniel Okafor',
    professionalId: 'HCP-6T4N7C',
    organisation: 'Motion & Joint Center',
    recordId: 'REC-8F6V2A',
    summary: 'No fracture. Mild soft tissue swelling.',
  },
  {
    id: 'e6',
    type: 'Hospital Visit',
    title: 'Tdap booster administered',
    date: '2026-07-15',
    professional: 'Dr. James Carter',
    professionalId: 'HCP-1N8WQZ',
    organisation: 'Riverside Family Medicine',
    recordId: 'REC-4P9L7C',
    summary: 'No adverse reaction.',
  },
  {
    id: 'e7',
    type: 'Investigation',
    title: 'Vitamin D & B12 profile',
    date: '2026-07-02',
    organisation: 'ABC Diagnostics',
    recordId: 'REC-2H8K3M',
    summary: 'Vitamin D borderline; B12 normal.',
  },
  {
    id: 'e8',
    type: 'Referral',
    title: 'Referral to cardiology',
    date: '2026-05-06',
    professional: 'Dr. James Carter',
    professionalId: 'HCP-1N8WQZ',
    organisation: 'Riverside Family Medicine',
    recordId: 'REC-9N1Q4E',
    summary: 'Elevated BP readings — accepted by cardiology.',
  },
  {
    id: 'e9',
    type: 'New Record',
    title: 'Allergy history added',
    date: '2026-05-18',
    organisation: 'Self-entered',
    recordId: 'REC-6T3Y5Z',
    summary: 'Patient-provided allergy history imported from pharmacy records.',
  },
]

export const eventTone: Record<HealthEventType, 'brand' | 'navy' | 'amber' | 'red' | 'green' | 'violet'> = {
  Consultation: 'red',
  Investigation: 'brand',
  Prescription: 'amber',
  'Hospital Visit': 'navy',
  Referral: 'green',
  'New Record': 'violet',
}