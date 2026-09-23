export interface PatientRequest {
  id: string
  direction: 'incoming' | 'sent'
  person: string
  personId: string
  organisation: string
  purpose: string
  information: string
  date: string
  status: 'Pending' | 'Granted' | 'Declined' | 'Accepted' | 'Withdrawn'
}

export const patientRequests: PatientRequest[] = [
  {
    id: 'pr1',
    direction: 'incoming',
    person: 'Dr. Sofia Ramírez',
    personId: 'HCP-8J2VTX',
    organisation: 'ClearSkin Clinic',
    purpose: 'Access to your health information',
    information: 'Relevant history, allergies, selected records',
    date: '2026-09-20',
    status: 'Pending',
  },
  {
    id: 'pr2',
    direction: 'incoming',
    person: 'Priya Anand',
    personId: 'HCP-3R9Q2B',
    organisation: 'XYZ Hospital',
    purpose: 'Care coordination for upcoming visit',
    information: 'Appointment & contact details',
    date: '2026-09-05',
    status: 'Pending',
  },
  {
    id: 'pr3',
    direction: 'incoming',
    person: 'Dr. Rahul Mehta',
    personId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    purpose: 'Cardiology consultation access',
    information: 'Relevant history, medications, selected records',
    date: '2026-09-01',
    status: 'Granted',
  },
  {
    id: 'pr4',
    direction: 'sent',
    person: 'Dr. Maya Kapoor',
    personId: 'HCP-5L3DKA',
    organisation: 'Heart Institute of Mumbai',
    purpose: 'Connect for a second opinion',
    information: 'Most recent cardiology records',
    date: '2026-09-17',
    status: 'Accepted',
  },
  {
    id: 'pr5',
    direction: 'sent',
    person: 'Dr. Emily Zhang',
    personId: 'HCP-2M8R4T',
    organisation: 'Little Sprouts Pediatrics',
    purpose: 'Share vaccination history with pediatrician',
    information: 'Immunization record',
    date: '2026-08-30',
    status: 'Withdrawn',
  },
  {
    id: 'pr6',
    direction: 'sent',
    person: 'ABC Diagnostics',
    personId: 'ORG-88QL09',
    organisation: 'ABC Diagnostics',
    purpose: 'Request historical lab reports',
    information: 'Prior lipid & CBC reports',
    date: '2026-09-11',
    status: 'Pending',
  },
]