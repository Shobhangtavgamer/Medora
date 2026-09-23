export interface NetworkProfessional {
  id: string
  professionalId: string
  purpose: string
  relationship: 'Established' | 'Newly Connected'
  access: 'Active' | 'Pending' | 'Limited'
}

export interface NetworkOrganisation {
  id: string
  organisationId: string
  purpose: string
  relationship: 'Established' | 'Newly Connected'
  access: 'Active' | 'Pending'
}

export const careProfessionals: NetworkProfessional[] = [
  {
    id: 'np1',
    professionalId: 'HCP-92RV04',
    purpose: 'Cardiology',
    relationship: 'Established',
    access: 'Active',
  },
  {
    id: 'np2',
    professionalId: 'HCP-1N8WQZ',
    purpose: 'Primary care',
    relationship: 'Established',
    access: 'Active',
  },
  {
    id: 'np3',
    professionalId: 'HCP-3R9Q2B',
    purpose: 'Care coordination',
    relationship: 'Established',
    access: 'Limited',
  },
  {
    id: 'np4',
    professionalId: 'HCP-8J2VTX',
    purpose: 'Dermatology consultation',
    relationship: 'Newly Connected',
    access: 'Pending',
  },
]

export const careOrganisations: NetworkOrganisation[] = [
  {
    id: 'no1',
    organisationId: 'ORG-74PQ20',
    purpose: 'Cardiology & hospital care',
    relationship: 'Established',
    access: 'Active',
  },
  {
    id: 'no2',
    organisationId: 'ORG-19LH44',
    purpose: 'Primary care',
    relationship: 'Established',
    access: 'Active',
  },
  {
    id: 'no3',
    organisationId: 'ORG-88QL09',
    purpose: 'Diagnostics & lab work',
    relationship: 'Established',
    access: 'Active',
  },
]