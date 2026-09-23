import type { Workspace } from '@/context/AuthContext'

export interface MessageResource {
  kind: 'Record' | 'Referral' | 'Request'
  label: string
  id?: string
}

export interface ConversationMessage {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  resource?: MessageResource
}

export interface Conversation {
  id: string
  workspace: Workspace
  participant: string
  participantRole: string
  avatarColor: string
  online?: boolean
  preview: string
  time: string
  unread: number
  messages: ConversationMessage[]
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    workspace: 'patient',
    participant: 'Dr. Rahul Mehta',
    participantRole: 'Cardiology · XYZ Hospital',
    avatarColor: 'from-brand-400 to-brand-600',
    online: true,
    preview: 'Your record is ready to review.',
    time: '10:12 AM',
    unread: 2,
    messages: [
      {
        id: 'm1',
        from: 'them',
        text: 'Good morning Ava, your consultation record was published by the hospital.',
        time: '9:40 AM',
        resource: { kind: 'Record', label: 'REC-91AB43 · Cardiology consultation', id: 'REC-91AB43' },
      },
      { id: 'm2', from: 'me', text: 'Thank you, I can see it in my records now.', time: '9:55 AM' },
      { id: 'm3', from: 'them', text: 'Please continue metoprolol and we will review in 12 months.', time: '10:10 AM' },
      { id: 'm4', from: 'them', text: 'Your record is ready to review.', time: '10:12 AM' },
    ],
  },
  {
    id: 'c2',
    workspace: 'patient',
    participant: 'Priya Anand',
    participantRole: 'Care Coordinator · XYZ Hospital',
    avatarColor: 'from-navy-400 to-navy-600',
    online: true,
    preview: 'Could you confirm your preferred time slot?',
    time: 'Yesterday',
    unread: 1,
    messages: [
      {
        id: 'm5',
        from: 'them',
        text: 'Hi Ava, I have an access request for upcoming visit coordination.',
        time: 'Yesterday',
        resource: { kind: 'Request', label: 'Care coordination access', id: 'PR-002' },
      },
      { id: 'm6', from: 'me', text: 'I will review the consent request shortly.', time: 'Yesterday' },
      { id: 'm7', from: 'them', text: 'Could you confirm your preferred time slot for the blood draw?', time: 'Yesterday' },
    ],
  },
  {
    id: 'c3',
    workspace: 'professional',
    participant: 'Rahul Sharma',
    participantRole: 'Patient · PAT-8F42K7',
    avatarColor: 'from-brand-400 to-brand-600',
    online: true,
    preview: 'Ointment is helping, thanks.',
    time: '9:15 AM',
    unread: 2,
    messages: [
      { id: 'm8', from: 'me', text: 'Hi Rahul, I have your cardiology review note ready.', time: '8:40 AM' },
      {
        id: 'm9',
        from: 'me',
        text: 'I have also created a dermatology referral for the rash.',
        time: '8:42 AM',
        resource: { kind: 'Referral', label: 'RF-196K · Dermatology', id: 'RF-196K' },
      },
      { id: 'm10', from: 'them', text: 'Ointment is helping, thanks.', time: '9:15 AM' },
    ],
  },
  {
    id: 'c4',
    workspace: 'professional',
    participant: 'Meera Nair',
    participantRole: 'Patient · PAT-5KX9T1',
    avatarColor: 'from-violet-400 to-violet-600',
    preview: 'Can you share the referral summary with me?',
    time: 'Mon',
    unread: 0,
    messages: [
      { id: 'm11', from: 'them', text: 'Can you share the referral summary with me?', time: 'Mon' },
      {
        id: 'm12',
        from: 'me',
        text: 'Sure — attaching it here.',
        time: 'Mon',
        resource: { kind: 'Record', label: 'REC-44M6R1 · Consultation notes', id: 'REC-44M6R1' },
      },
    ],
  },
  {
    id: 'c5',
    workspace: 'professional',
    participant: 'Tom Becker',
    participantRole: 'Patient · PAT-7RD2M5',
    avatarColor: 'from-sky-400 to-sky-600',
    preview: 'Physiotherapy is going well.',
    time: '2 Sep',
    unread: 0,
    messages: [
      {
        id: 'm13',
        from: 'them',
        text: 'Physiotherapy is going well, the shoulder feels a lot better.',
        time: '2 Sep',
      },
      {
        id: 'm14',
        from: 'me',
        text: 'Great — I have sent your X-ray for the orthopedics team.',
        time: '2 Sep',
        resource: { kind: 'Record', label: 'REC-12N8Z1 · Shoulder X-ray', id: 'REC-12N8Z1' },
      },
    ],
  },
]

export const conversationsFor = (workspace: Workspace) =>
  conversations.filter((c) => c.workspace === workspace)