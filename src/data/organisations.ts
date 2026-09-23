export interface Organisation {
  id: string
  name: string
  type: string
  verified: boolean
  address: string
  phone: string
  email: string
  services: string[]
  since: string
}

export const organisations: Organisation[] = [
  {
    id: 'ORG-74PQ20',
    name: 'XYZ Hospital',
    type: 'Hospital',
    verified: true,
    address: '12/E1, Next Galla Lane, Andheri East, Mumbai 400069',
    phone: '+91 22 4610 3100',
    email: 'records@xyzhospital.org',
    services: ['Cardiology', 'Radiology', 'Emergency', 'Surgery'],
    since: '2009',
  },
  {
    id: 'ORG-31XY08',
    name: 'Heart Institute of Mumbai',
    type: 'Medical Centre',
    verified: true,
    address: '88 Linking Road, Bandra West, Mumbai 400050',
    phone: '+91 22 4961 4117',
    email: 'care@hib.org',
    services: ['Cardiology', 'Preventive Care'],
    since: '2012',
  },
  {
    id: 'ORG-62SK91',
    name: 'Sharma Medical Clinic',
    type: 'Independent Practice',
    verified: true,
    address: '14 Hill Road, Bandra West, Mumbai 400050',
    phone: '+91 22 4223 2206',
    email: 'clinic@sharmamedical.com',
    services: ['General Practice', 'Preventive Care'],
    since: '2015',
  },
  {
    id: 'ORG-77MB20',
    name: 'ClearSkin Clinic',
    type: 'Clinic',
    verified: true,
    address: 'Juhu Tara Road, Juhu, Mumbai 400049',
    phone: '+91 22 4007 8890',
    email: 'hello@clearskin.com',
    services: ['Dermatology', 'Aesthetics'],
    since: '2018',
  },
  {
    id: 'ORG-19LH44',
    name: 'Riverside Family Medicine',
    type: 'Clinic',
    verified: true,
    address: '7 Lokmanya Tilak Road, Andheri East, Mumbai 400069',
    phone: '+91 22 4960 4050',
    email: 'frontdesk@riversidefm.com',
    services: ['Primary Care', 'Immunizations'],
    since: '2011',
  },
  {
    id: 'ORG-88QL09',
    name: 'ABC Diagnostics',
    type: 'Diagnostics Lab',
    verified: true,
    address: '45 Veera Desai Road, Andheri West, Mumbai 400053',
    phone: '+91 22 4310 7712',
    email: 'lab@abcdiagnostics.com',
    services: ['Pathology', 'Imaging', 'Blood Tests'],
    since: '2013',
  },
]

export const organisationById = (id: string | undefined) =>
  organisations.find((o) => o.id === id)