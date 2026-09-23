export interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: number
  languages: string[]
  hospital: string
  location: string
  availability: string
  fee: number
  nextSlot: string
  avatarColor: string
  departments: string[]
  about: string
}

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Maya Kapoor',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 132,
    experience: 14,
    languages: ['English', 'Hindi'],
    hospital: 'Heart Institute of Mumbai',
    location: 'Andheri East, Mumbai',
    availability: 'Available today',
    fee: 1500,
    nextSlot: 'Today · 4:30 PM',
    avatarColor: 'from-brand-400 to-brand-600',
    departments: ['Heart', 'Preventive'],
    about:
      'Interventional cardiologist focused on preventive heart care and minimally invasive procedures.',
  },
  {
    id: 'd2',
    name: 'Dr. James Carter',
    specialty: 'General Practice',
    rating: 4.8,
    reviews: 210,
    experience: 18,
    languages: ['English'],
    hospital: 'CityCare Family Clinic',
    location: 'Bandra West, Mumbai',
    availability: 'Available today',
    fee: 900,
    nextSlot: 'Tomorrow · 9:00 AM',
    avatarColor: 'from-navy-400 to-navy-600',
    departments: ['Primary Care', 'Wellness'],
    about:
      'Board-certified family physician providing comprehensive primary care for all ages.',
  },
  {
    id: 'd3',
    name: 'Dr. Sofia Ramírez',
    specialty: 'Dermatology',
    rating: 4.9,
    reviews: 96,
    experience: 11,
    languages: ['English', 'Spanish'],
    hospital: 'ClearSkin Clinic',
    location: 'Juhu, Mumbai',
    availability: 'Available tomorrow',
    fee: 1200,
    nextSlot: 'Wed · 11:30 AM',
    avatarColor: 'from-violet-400 to-violet-600',
    departments: ['Skin', 'Aesthetics'],
    about:
      'Dermatologist specializing in medical and cosmetic skin health with a patient-first approach.',
  },
  {
    id: 'd4',
    name: 'Dr. Daniel Okafor',
    specialty: 'Orthopedics',
    rating: 4.7,
    reviews: 154,
    experience: 16,
    languages: ['English', 'Igbo'],
    hospital: 'Motion & Joint Center',
    location: 'Worli, Mumbai',
    availability: 'Available today',
    fee: 1800,
    nextSlot: 'Today · 2:00 PM',
    avatarColor: 'from-amber-400 to-orange-500',
    departments: ['Bones', 'Sports Medicine'],
    about:
      'Orthopedic surgeon focused on sports injuries, joint preservation, and rapid recovery.',
  },
  {
    id: 'd5',
    name: 'Dr. Emily Zhang',
    specialty: 'Pediatrics',
    rating: 4.9,
    reviews: 178,
    experience: 12,
    languages: ['English', 'Mandarin'],
    hospital: 'Little Sprouts Pediatrics',
    location: 'Powai, Mumbai',
    availability: 'Available tomorrow',
    fee: 1000,
    nextSlot: 'Thu · 10:00 AM',
    avatarColor: 'from-sky-400 to-sky-600',
    departments: ['Children', 'Newborn Care'],
    about:
      'Pediatrician dedicated to newborn care, childhood development, and adolescent health.',
  },
  {
    id: 'd6',
    name: 'Dr. Rachel Stein',
    specialty: 'Mental Health',
    rating: 4.8,
    reviews: 89,
    experience: 10,
    languages: ['English', 'Hebrew'],
    hospital: 'MindWell Clinic',
    location: 'Vile Parle, Mumbai (Virtual)',
    availability: 'Available today',
    fee: 1300,
    nextSlot: 'Today · 5:15 PM',
    avatarColor: 'from-green-400 to-green-600',
    departments: ['Therapy', 'Wellbeing'],
    about:
      'Licensed psychiatrist offering evidence-based therapy and medication management, virtual-first.',
  },
]

export const specialties = [
  'Cardiology',
  'General Practice',
  'Dermatology',
  'Orthopedics',
  'Pediatrics',
  'Mental Health',
  'Neurology',
  'Gynecology',
  'ENT',
  'Ophthalmology',
  'Dentistry',
  'Nutrition',
]