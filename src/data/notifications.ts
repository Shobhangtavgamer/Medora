import type { Workspace } from '@/context/AuthContext'

export interface Notification {
  id: string
  workspace: Workspace
  title: string
  body: string
  date: string
  read: boolean
  kind: 'request' | 'record' | 'consent' | 'referral' | 'system' | 'access'
}

export const notifications: Notification[] = [
  {
    id: 'n1',
    workspace: 'patient',
    title: 'Dr. Sofia Ramírez requested access',
    body: 'ClearSkin Clinic is requesting access to relevant history, allergies, and selected records for a dermatology consultation.',
    date: '2026-09-20',
    read: false,
    kind: 'request',
  },
  {
    id: 'n2',
    workspace: 'patient',
    title: 'New lab report published',
    body: 'ABC Diagnostics published Vitamin D & B12 profile to your records (REC-2H8K3M).',
    date: '2026-09-18',
    read: false,
    kind: 'record',
  },
  {
    id: 'n3',
    workspace: 'patient',
    title: 'Consent expiring soon',
    body: 'Care coordination access for Priya Anand expires 22 Sep 2026.',
    date: '2026-09-18',
    read: false,
    kind: 'access',
  },
  {
    id: 'n4',
    workspace: 'patient',
    title: 'Consultation record added',
    body: 'XYZ Hospital added Cardiology consultation (REC-91AB43) to your timeline.',
    date: '2026-09-16',
    read: true,
    kind: 'record',
  },
  {
    id: 'n5',
    workspace: 'professional',
    title: 'Rahul Sharma granted access',
    body: 'Ava-approved access to Rahul Sharma for ongoing primary care. Valid until 2026-10-15.',
    date: '2026-09-19',
    read: false,
    kind: 'consent',
  },
  {
    id: 'n6',
    workspace: 'professional',
    title: 'Referral accepted',
    body: 'Dr. Elena Ruiz accepted your referral for Meera Nair (contact dermatitis).',
    date: '2026-09-17',
    read: false,
    kind: 'referral',
  },
  {
    id: 'n7',
    workspace: 'professional',
    title: 'Organisation record contributed',
    body: 'Sharma Medical Clinic published a consultation record for Tom Becker.',
    date: '2026-09-14',
    read: true,
    kind: 'record',
  },
  {
    id: 'n8',
    workspace: 'organisation',
    title: 'Record pending review',
    body: 'Dr. Rahul Mehta submitted a consultation for Rahul Sharma awaiting publication.',
    date: '2026-09-15',
    read: false,
    kind: 'record',
  },
  {
    id: 'n9',
    workspace: 'organisation',
    title: 'Professional association pending',
    body: 'Dr. Nisha Verma (Radiology) requested association with XYZ Hospital.',
    date: '2026-09-12',
    read: false,
    kind: 'request',
  },
  {
    id: 'n10',
    workspace: 'organisation',
    title: 'Record corrected',
    body: 'Correction request for REC-62MV10 (Tom Becker consultation) was completed by the metadata team.',
    date: '2026-09-08',
    read: true,
    kind: 'record',
  },
]

export const unreadCount = (workspace: Workspace) =>
  notifications.filter((n) => n.workspace === workspace && !n.read).length