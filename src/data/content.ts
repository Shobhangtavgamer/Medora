export const services = [
  {
    icon: 'records',
    title: 'Patient-owned health record',
    description:
      'A single, encrypted health record that follows you — every condition, medication, allergy, and record in one connected place.',
  },
  {
    icon: 'shield',
    title: 'Access & consent control',
    description:
      'You decide who sees what, why, and for how long. Grant or revoke access to professionals and organisations at any time.',
  },
  {
    icon: 'network',
    title: 'Care network',
    description:
      'Your doctors, clinics, and labs stay connected around your record — no fragmented hospital silos.',
  },
  {
    icon: 'stethoscope',
    title: 'Professional workspace',
    description:
      'Authorised clinicians get source-based AI context, patient timelines, and a clear record workflow.',
  },
  {
    icon: 'building',
    title: 'Organisation records',
    description:
      'Hospitals and labs manage formal records with a review workflow — draft, review, publish.',
  },
  {
    icon: 'sparkles',
    title: 'AI-assisted summarisation',
    description:
      'AI that summarises with provenance — every fact links back to the record it came from.',
  },
]

export const roleSections = [
  {
    key: 'patients',
    icon: 'heart',
    eyebrow: 'For patients',
    title: 'One record, yours to control',
    description:
      'Build a lifelong personal health record and decide exactly who can access it — and why.',
    points: [
      'Your conditions, medications, and allergies in one place',
      'A chronological timeline of every healthcare event',
      'Grant or decline access to any professional or organisation',
      'Add old records from anywhere — AI extracts and you review',
    ],
  },
  {
    key: 'professionals',
    icon: 'stethoscope',
    eyebrow: 'For healthcare professionals',
    title: 'Care with full context',
    description:
      'See exactly what your patient authorised — with source-based AI summaries and a clear view of access.',
    points: [
      'Patient overview, timeline, and records under one authorised view',
      'AI Context that cites every fact it uses',
      'Submit clinical information into the organisation record workflow',
      'Find patients by Patient ID without exposing full history',
    ],
  },
  {
    key: 'organisations',
    icon: 'building',
    eyebrow: 'For healthcare organisations',
    title: 'A governed record workflow',
    description:
      'Review, publish, and correct formal records with full provenance and a clean operational view.',
    points: [
      'Manage professional associations and verification',
      'See your own care relationships — not the full external history',
      'Publish records that appear instantly on the patient timeline',
      'Diagnostic labs publish investigations and reports the same way',
    ],
  },
]

export const aiInBrief = {
  eyebrow: 'AI-assisted healthcare information',
  title: 'Every AI insight, backed by a source',
  description:
    'Medora surfaces concise, source-based summaries to authorised professionals. Relevant history, current information, open questions, and conflicting facts — each one citing the record it came from.',
  points: [
    'Relevant History',
    'Current Information',
    'Recent Relevant Records',
    'Open Information',
    'Conflicting Information',
  ],
}

export const privacyInBrief = {
  eyebrow: 'Privacy & access control',
  title: 'Access you can see, understand, and revoke',
  description:
    'The frontend always shows who has access, what they can see, why, and until when. Provenance is visible on every record — organisation-generated or patient-provided.',
  points: [
    'Who can access your information',
    'What exactly they are allowed to see',
    'The purpose of every access grant',
    'When access expires — revoke anytime',
  ],
}

export const features = [
  {
    title: 'Timeline and records, separate',
    description:
      'Your timeline shows healthcare events chronologically; records are the underlying information behind them.',
  },
  {
    title: 'Verification is visible',
    description:
      'Professionals and organisations carry a clear, visible verification status across every screen.',
  },
  {
    title: 'Provenance on every record',
    description:
      'Every record shows its source — the professional, the organisation, and the original date.',
  },
  {
    title: 'Patient stays central',
    description:
      'Your health history is never fragmented across separate hospital, doctor, or lab silos.',
  },
]

export const testimonials = [
  {
    quote:
      'I can see exactly which doctor can see what, and for how long. That control is the reason I moved my whole family here.',
    name: 'Maria Santos',
    role: 'Patient · Andheri East, Mumbai',
    initials: 'MS',
    color: 'from-brand-400 to-brand-600',
  },
  {
    quote:
      'The AI Context shows me the source behind every summary. It makes my consultations faster and safer.',
    name: 'Dr. Rahul Mehta',
    role: 'Cardiologist · XYZ Hospital',
    initials: 'RM',
    color: 'from-navy-400 to-navy-600',
  },
  {
    quote:
      'Publishing a record from our draft queue puts it straight on the patient timeline. Provenance stays intact.',
    name: 'Sarah Kim',
    role: 'Records Lead · ABC Diagnostics',
    initials: 'SK',
    color: 'from-violet-400 to-violet-600',
  },
  {
    quote:
      'Being able to add my old lab records — and have AI extract them for review — changed how I manage my care.',
    name: 'David Osei',
    role: 'Patient · Vile Parle, Mumbai',
    initials: 'DO',
    color: 'from-amber-400 to-orange-500',
  },
]

export const stats = [
  { value: '120k+', label: 'Connected patients' },
  { value: '800+', label: 'Verified professionals' },
  { value: '40+', label: 'Healthcare organisations' },
  { value: '1.2M', label: 'Records with provenance' },
]

export const partners = [
  'Aetna Health',
  'BlueCross Shield',
  'Cigna',
  'UnitedHealth',
  'Kaiser Permanente',
  'MedStar',
  'Humana',
  'Anthem',
]