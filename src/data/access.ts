export interface ActiveAccess {
  id: string
  granteeName: string
  granteeId: string
  organisation: string
  purpose: string
  information: string[]
  grantedAt: string
  expiresAt: string
  status: 'Active' | 'Expiring'
}

export interface AccessRequest {
  id: string
  requesterName: string
  requesterId: string
  organisation: string
  purpose: string
  information: string[]
  requestedDuration: string
  date: string
  status: 'Pending' | 'Granted' | 'Declined'
}

export interface ConsentHistoryEntry {
  id: string
  entity: string
  action: string
  details: string
  date: string
}

export const activeAccess: ActiveAccess[] = [
  {
    id: 'aa1',
    granteeName: 'Dr. Rahul Mehta',
    granteeId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    purpose: 'Cardiology consultation',
    information: ['Relevant history', 'Medications', 'Selected records (2)'],
    grantedAt: '2026-09-01',
    expiresAt: '2026-09-30',
    status: 'Active',
  },
  {
    id: 'aa2',
    granteeName: 'Dr. James Carter',
    granteeId: 'HCP-1N8WQZ',
    organisation: 'Riverside Family Medicine',
    purpose: 'Ongoing primary care',
    information: ['Full health history', 'Medications', 'Allergies'],
    grantedAt: '2026-03-12',
    expiresAt: '2027-03-12',
    status: 'Active',
  },
  {
    id: 'aa3',
    granteeName: 'Priya Anand',
    granteeId: 'HCP-3R9Q2B',
    organisation: 'XYZ Hospital',
    purpose: 'Care coordination',
    information: ['Limited: upcoming appointments'],
    grantedAt: '2026-09-05',
    expiresAt: '2026-09-22',
    status: 'Expiring',
  },
]

export const accessRequests: AccessRequest[] = [
  {
    id: 'ar1',
    requesterName: 'Dr. Rahul Mehta',
    requesterId: 'HCP-92RV04',
    organisation: 'XYZ Hospital',
    purpose: 'Cardiology consultation',
    information: ['Relevant history', 'Medications', 'Selected records'],
    requestedDuration: '30 days',
    date: '2026-09-01',
    status: 'Granted',
  },
  {
    id: 'ar2',
    requesterName: 'Dr. Sofia Ramírez',
    requesterId: 'HCP-8J2VTX',
    organisation: 'ClearSkin Clinic',
    purpose: 'Dermatology consultation',
    information: ['Relevant history', 'Allergies', 'Selected records'],
    requestedDuration: '30 days',
    date: '2026-09-20',
    status: 'Pending',
  },
  {
    id: 'ar3',
    requesterName: 'Dr. Daniel Okafor',
    requesterId: 'HCP-6T4N7C',
    organisation: 'Motion & Joint Center',
    purpose: 'Knee follow-up review',
    information: ['Imaging reports', 'Recent consultations'],
    requestedDuration: '14 days',
    date: '2026-08-20',
    status: 'Declined',
  },
]

export const consentHistory: ConsentHistoryEntry[] = [
  {
    id: 'ch1',
    entity: 'Dr. Rahul Mehta (XYZ Hospital)',
    action: 'Access granted',
    details: 'Cardiology consultation · 30 days · revoked 09 Sep 2025',
    date: '2025-09-01',
  },
  {
    id: 'ch2',
    entity: 'Dr. Daniel Okafor (Motion & Joint Center)',
    action: 'Access declined',
    details: 'Requested imaging reports · declined 20 Aug 2025',
    date: '2025-08-20',
  },
  {
    id: 'ch3',
    entity: 'Dr. James Carter (Riverside Family Medicine)',
    action: 'Record shared',
    details: 'Shared immunization record via portal link',
    date: '2026-07-15',
  },
]