export interface Professional {
  id: string
  name: string
  profession: string
  specialty: string
  organisation: string
  organisationId: string
  verified: boolean
  role: string
  association: 'Active' | 'Pending' | 'Inactive'
}

export const professionals: Professional[] = [
  {
    id: 'HCP-92RV04',
    name: 'Dr. Rahul Mehta',
    profession: 'Doctor',
    specialty: 'Cardiology',
    organisation: 'XYZ Hospital',
    organisationId: 'ORG-74PQ20',
    verified: true,
    role: 'Consultant Cardiologist',
    association: 'Active',
  },
  {
    id: 'HCP-5L3DKA',
    name: 'Dr. Maya Kapoor',
    profession: 'Doctor',
    specialty: 'Interventional Cardiology',
    organisation: 'Heart Institute of Mumbai',
    organisationId: 'ORG-31XY08',
    verified: true,
    role: 'Senior Specialist',
    association: 'Active',
  },
  {
    id: 'HCP-1N8WQZ',
    name: 'Dr. James Carter',
    profession: 'Doctor',
    specialty: 'General Practice',
    organisation: 'Riverside Family Medicine',
    organisationId: 'ORG-19LH44',
    verified: true,
    role: 'Lead Physician',
    association: 'Active',
  },
  {
    id: 'HCP-29MX51',
    name: 'Dr. Ava Thompson',
    profession: 'Doctor',
    specialty: 'General Practice',
    organisation: 'Sharma Medical Clinic',
    organisationId: 'ORG-62SK91',
    verified: true,
    role: 'Independent Practice',
    association: 'Active',
  },
  {
    id: 'HCP-8J2VTX',
    name: 'Dr. Sofia Ramírez',
    profession: 'Doctor',
    specialty: 'Dermatology',
    organisation: 'ClearSkin Clinic',
    organisationId: 'ORG-77MB20',
    verified: true,
    role: 'Consultant',
    association: 'Active',
  },
  {
    id: 'HCP-3R9Q2B',
    name: 'Priya Anand',
    profession: 'Nurse',
    specialty: 'Care Coordination',
    organisation: 'XYZ Hospital',
    organisationId: 'ORG-74PQ20',
    verified: true,
    role: 'Care Coordinator',
    association: 'Active',
  },
  {
    id: 'HCP-4K7M2P',
    name: 'Dr. Nisha Verma',
    profession: 'Doctor',
    specialty: 'Radiology',
    organisation: 'XYZ Hospital',
    organisationId: 'ORG-74PQ20',
    verified: false,
    role: 'Radiologist',
    association: 'Pending',
  },
  {
    id: 'HCP-9P6D1L',
    name: 'Dr. Alan Price',
    profession: 'Doctor',
    specialty: 'Cardiology',
    organisation: 'XYZ Hospital',
    organisationId: 'ORG-74PQ20',
    verified: true,
    role: 'Consultant',
    association: 'Inactive',
  },
]

export const professionalById = (id: string | undefined) =>
  professionals.find((p) => p.id === id)

export const professionalsByOrganisation = (orgId: string) =>
  professionals.filter((p) => p.organisationId === orgId)