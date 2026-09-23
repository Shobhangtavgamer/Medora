import type { LucideIcon } from 'lucide-react'
import {
  ArrowLeftRight,
  Bell,
  Building2,
  FileText,
  HeartPulse,
  Inbox,
  MessageSquare,
  Network,
  ShieldCheck,
  Stethoscope,
  User,
  Users,
} from 'lucide-react'
import type { Workspace } from '@/context/AuthContext'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export const patientNav: NavItem[] = [
  { to: '/patient', label: 'Home', icon: HeartPulse, end: true },
  { to: '/patient/my-health', label: 'My Health', icon: Stethoscope },
  { to: '/patient/records', label: 'Records', icon: FileText },
  { to: '/patient/care-network', label: 'Care Network', icon: Network },
  { to: '/patient/access', label: 'Access & Consent', icon: ShieldCheck },
  { to: '/patient/requests', label: 'Requests', icon: Inbox },
  { to: '/patient/messages', label: 'Messages', icon: MessageSquare },
  { to: '/patient/notifications', label: 'Notifications', icon: Bell },
  { to: '/patient/profile', label: 'Profile', icon: User },
]

export const professionalNav: NavItem[] = [
  { to: '/professional', label: 'Home', icon: Building2, end: true },
  { to: '/professional/patients', label: 'Patients', icon: Users },
  { to: '/professional/requests', label: 'Requests', icon: Inbox },
  { to: '/professional/referrals', label: 'Referrals', icon: ArrowLeftRight },
  { to: '/professional/communication', label: 'Communication', icon: MessageSquare },
  { to: '/professional/organisations', label: 'Organisations', icon: Building2 },
  { to: '/professional/notifications', label: 'Notifications', icon: Bell },
  { to: '/professional/profile', label: 'Profile', icon: User },
]

export const organisationNav: NavItem[] = [
  { to: '/organisation', label: 'Home', icon: Building2, end: true },
  { to: '/organisation/professionals', label: 'Professionals', icon: Users },
  { to: '/organisation/care', label: 'Patients / Care', icon: HeartPulse },
  { to: '/organisation/records', label: 'Records', icon: FileText },
  { to: '/organisation/requests', label: 'Requests', icon: Inbox },
  { to: '/organisation/notifications', label: 'Notifications', icon: Bell },
  { to: '/organisation/profile', label: 'Profile', icon: User },
]

export const navByRole: Record<Workspace, NavItem[]> = {
  patient: patientNav,
  professional: professionalNav,
  organisation: organisationNav,
}

export const workspaceMeta: Record<
  Workspace,
  { label: string; caption: (user: { name: string; id: string }) => string; placeholder: string }
> = {
  patient: {
    label: 'Patient',
    caption: ({ id }) => `Patient ID ${id}`,
    placeholder: 'Search conditions, records, organisations…',
  },
  professional: {
    label: 'Professional',
    caption: ({ id }) => `Professional ID ${id}`,
    placeholder: 'Search patients by name or ID…',
  },
  organisation: {
    label: 'Organisation',
    caption: ({ id }) => `Organisation ID ${id}`,
    placeholder: 'Search professionals, records, care…',
  },
}