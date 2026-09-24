import { requireSupabase } from '@/lib/supabase'
import type { RecordItem } from '@/data/records'
import type { OrgWorkflowRecord } from '@/data/org'
import type { HealthEvent } from '@/data/health'

export type AppRole = 'patient' | 'professional' | 'organisation'

export interface AppProfile {
  id: string
  auth_user_id: string
  role: AppRole
  name: string
  email: string
  patient?: { id: string; patient_id: string; date_of_birth: string | null }
  professional?: { id: string; professional_id: string; verification_status: string }
  organisation?: { id: string; organisation_id: string; name: string; organisation_type: string; verification_status: string }
}

export interface AccessRequestRow {
  id: string
  patient_id: string
  professional_id: string
  purpose: string
  scope: string[]
  status: 'pending' | 'approved' | 'rejected' | 'revoked' | 'expired'
  requested_at: string
  approved_at: string | null
  expires_at: string | null
  revoked_at: string | null
  professional?: { professional_id: string; profile: { name: string }; memberships?: { organisation: { name: string } }[] }
}

type RecordRow = {
  id: string
  record_id: string
  patient_id: string
  professional_id: string | null
  organisation_id: string | null
  record_type: RecordItem['type']
  title: string
  description: string | null
  record_date: string
  source_type: 'patient' | 'organisation' | 'external'
  status: 'draft' | 'pending' | 'published' | 'archived'
  published_at: string | null
  professional?: { professional_id: string; profile: { name: string } }
  organisation?: { organisation_id: string; name: string }
}

const mapRecord = (row: RecordRow): RecordItem => ({
  id: row.record_id,
  title: row.title,
  type: row.record_type,
  date: row.record_date,
  professional: row.professional?.profile.name,
  professionalId: row.professional?.professional_id,
  organisation: row.organisation?.name ?? (row.source_type === 'patient' ? 'Self-entered' : 'External source'),
  source: row.source_type === 'patient' || row.source_type === 'external' ? 'Patient' : 'Organisation',
  summary: row.description ?? '',
  status: row.status === 'published' ? 'Final' : row.status === 'pending' ? 'Pending' : row.status === 'draft' ? 'Draft' : 'Archived',
})

async function resolvePatientUuid(patientId: string) {
  const { data, error } = await requireSupabase().from('patients').select('id').eq('patient_id', patientId).single()
  if (error) throw error
  return data.id as string
}

export async function getPatientIdentity(patientId: string) {
  const { data, error } = await requireSupabase()
    .from('patients')
    .select('patient_id, date_of_birth, profile:profiles(name)')
    .eq('patient_id', patientId)
    .single()
  if (error) throw error
  const profile = Array.isArray(data.profile) ? data.profile[0] : data.profile
  return { id: data.patient_id as string, name: String(profile?.name ?? 'Patient'), dob: data.date_of_birth as string | null }
}

export async function signIn(email: string, password: string) {
  const client = requireSupabase()
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

export async function signUp(email: string, password: string, name: string, role: AppRole) {
  const client = requireSupabase()
  const { data, error } = await client.auth.signUp({ email, password, options: { data: { name, role } } })
  if (error) throw error
  return data.user
}

export async function signOut() {
  await requireSupabase().auth.signOut()
}

export async function getCurrentProfiles(): Promise<AppProfile[]> {
  const client = requireSupabase()
  const { data: auth } = await client.auth.getUser()
  if (!auth.user) return []
  const { data, error } = await client
    .from('profiles')
    .select('id, auth_user_id, role, name, email, patient:patients(id, patient_id, date_of_birth), professional:professionals(id, professional_id, verification_status), organisation:organisations(id, organisation_id, name, organisation_type, verification_status)')
    .eq('auth_user_id', auth.user.id)
    .order('created_at')
  if (error) throw error
  return (data ?? []).map((row) => ({
    ...row,
    patient: Array.isArray(row.patient) ? row.patient[0] : row.patient,
    professional: Array.isArray(row.professional) ? row.professional[0] : row.professional,
    organisation: Array.isArray(row.organisation) ? row.organisation[0] : row.organisation,
  })) as unknown as AppProfile[]
}

export async function getCurrentProfile(): Promise<AppProfile | null> {
  const profiles = await getCurrentProfiles()
  return profiles[0] ?? null
}

export async function getPatientRecords(patientId: string) {
  const client = requireSupabase()
  const patientUuid = await resolvePatientUuid(patientId)
  const query = client
    .from('records')
    .select('*, professional:professionals(professional_id, profile:profiles(name)), organisation:organisations(organisation_id, name)')
    .eq('patient_id', patientUuid)
    .eq('status', 'published')
    .order('record_date', { ascending: false })
  const { data, error } = await query
  if (error) throw error
  return (data as RecordRow[]).map(mapRecord)
}

export async function getPatientClinicalSummary(patientId: string) {
  const records = await getPatientRecords(patientId)
  const bloodPressureRecord = records.find((record) => /blood pressure|hypertension/i.test(`${record.title} ${record.summary}`))
  const allergyRecord = records.find((record) => /allerg/i.test(`${record.title} ${record.summary}`))
  return {
    conditions: bloodPressureRecord ? [{ id: `condition-${bloodPressureRecord.id}`, name: 'Blood pressure monitoring', status: 'Managed' as const, diagnosedBy: bloodPressureRecord.professional ?? 'Recorded healthcare source', date: bloodPressureRecord.date, source: bloodPressureRecord.organisation }] : [],
    medications: records.filter((record) => record.type === 'Prescription').map((record) => ({
      id: record.id,
      name: record.title,
      dosage: record.summary,
      frequency: 'See record',
      status: 'Active' as const,
      source: record.organisation,
    })),
    allergies: allergyRecord ? [{ id: `allergy-${allergyRecord.id}`, allergen: 'Allergy history recorded', reaction: allergyRecord.summary, severity: 'Mild' as const, source: allergyRecord.organisation }] : [],
  }
}

export async function getPatientTimeline(patientId: string) {
  const records = await getPatientRecords(patientId)
  return records.map((record): HealthEvent => ({
    id: record.id,
    type: record.type === 'Hospital Record' ? 'Hospital Visit' : record.type === 'Referral' ? 'Referral' : record.type === 'Report' || record.type === 'Other' ? 'New Record' : record.type,
    title: record.title,
    date: record.date,
    professional: record.professional,
    professionalId: record.professionalId,
    organisation: record.organisation,
    recordId: record.id,
    summary: record.summary,
  }))
}

export async function searchPatients(query: string) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('patients')
    .select('id, patient_id, date_of_birth, profile:profiles!inner(name, email)')
    .limit(100)
  if (error) throw error
  const normalizedQuery = query.trim().toLowerCase()
  return (data ?? []).map((row) => ({
    patient_id: row.patient_id as string,
    date_of_birth: row.date_of_birth as string | null,
    profile: { name: String(row.profile[0]?.name ?? '') },
  })).filter((row) => !normalizedQuery || row.patient_id.toLowerCase().includes(normalizedQuery) || row.profile.name.toLowerCase().includes(normalizedQuery)).slice(0, 20)
}

export async function createAccessRequest(patientId: string, purpose: string, scope: string[], durationDays = 30) {
  const patientUuid = await resolvePatientUuid(patientId)
  const { data, error } = await requireSupabase().rpc('request_patient_access', {
    target_patient_id: patientUuid,
    request_purpose: purpose,
    request_scope: scope,
    requested_duration_days: durationDays,
  })
  if (error) throw error
  return data
}

export async function getPatientAccessRequests(patientId: string) {
  const patientUuid = await resolvePatientUuid(patientId)
  const { data, error } = await requireSupabase()
    .from('access_consents')
    .select('*, professional:professionals(professional_id, profile:profiles(name), memberships:professional_organisations(organisation:organisations(name)))')
    .eq('patient_id', patientUuid)
    .order('requested_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as AccessRequestRow[]
}

export async function getProfessionalAccessRequests() {
  const client = requireSupabase()
  const { data: professional, error: professionalError } = await client.from('professionals').select('id').eq('profile_id', (await client.from('profiles').select('id').eq('auth_user_id', (await client.auth.getUser()).data.user?.id ?? '').single()).data?.id ?? '').single()
  if (professionalError) throw professionalError
  const { data, error } = await client.from('access_consents').select('id, patient_id, purpose, scope, status, requested_at, patient:patients(patient_id, profile:profiles(name))').eq('professional_id', professional.id).order('requested_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map((row) => {
    const patient = Array.isArray(row.patient) ? row.patient[0] : row.patient
    const profile = patient && Array.isArray(patient.profile) ? patient.profile[0] : patient?.profile
    return { ...row, patient: patient ? { ...patient, profile } : undefined }
  })
}

export async function approveAccessRequest(consentId: string, scope: string[], durationDays: number) {
  const { data, error } = await requireSupabase().rpc('approve_patient_access', {
    consent_id: consentId,
    approved_scope: scope,
    duration_days: durationDays,
  })
  if (error) throw error
  return data
}

export async function rejectAccessRequest(consentId: string) {
  const { data, error } = await requireSupabase().rpc('reject_patient_access', { consent_id: consentId })
  if (error) throw error
  return data
}

export async function revokeAccess(consentId: string) {
  const { data, error } = await requireSupabase().rpc('revoke_patient_access', { consent_id: consentId })
  if (error) throw error
  return data
}

export async function getProfessionalAccess(patientId: string) {
  const patientUuid = await resolvePatientUuid(patientId)
  const { data, error } = await requireSupabase().rpc('has_patient_access', { target_patient_id: patientUuid })
  if (error) throw error
  return Boolean(data)
}

export async function createOrganisationRecord(input: {
  patientId: string
  professionalId?: string
  organisationId: string
  recordType: RecordItem['type']
  title: string
  description: string
  recordDate: string
}) {
  const patientUuid = await resolvePatientUuid(input.patientId)
  const client = requireSupabase()
  const { data: organisation, error: organisationError } = await client.from('organisations').select('id').eq('organisation_id', input.organisationId).single()
  if (organisationError) throw organisationError
  let professionalUuid: string | null = null
  if (input.professionalId) {
    const { data: professional, error: professionalError } = await client.from('professionals').select('id').eq('professional_id', input.professionalId).single()
    if (professionalError) throw professionalError
    professionalUuid = professional.id
  }
  const { data, error } = await requireSupabase().rpc('create_organisation_record', {
    target_patient_id: patientUuid,
    source_professional_id: professionalUuid,
    source_organisation_id: organisation.id,
    input_record_type: input.recordType,
    input_title: input.title,
    input_description: input.description,
    input_record_date: input.recordDate,
  })
  if (error) throw error
  return data
}

export async function createPatientRecord(input: { recordType: RecordItem['type']; title: string; description: string; recordDate: string }) {
  const { data, error } = await requireSupabase().rpc('create_patient_record', {
    input_record_type: input.recordType,
    input_title: input.title,
    input_description: input.description,
    input_record_date: input.recordDate,
  })
  if (error) throw error
  return data
}

export async function getOrganisationRecords(organisationId: string): Promise<OrgWorkflowRecord[]> {
  const { data: org, error: orgError } = await requireSupabase().from('organisations').select('id').eq('organisation_id', organisationId).single()
  if (orgError) throw orgError
  const { data, error } = await requireSupabase()
    .from('records')
    .select('record_id, record_type, title, description, record_date, status, patient:patients(patient_id, profile:profiles(name)), professional:professionals(professional_id, profile:profiles(name))')
    .eq('organisation_id', org.id)
    .order('record_date', { ascending: false })
  if (error) throw error
  return ((data ?? []) as unknown as Array<{ record_id: string; record_type: RecordItem['type']; title: string; description: string | null; record_date: string; status: string; patient: { patient_id: string; profile: Array<{ name: string }> }; professional: { professional_id: string; profile: Array<{ name: string }> } | null }>).map((row) => ({
    id: row.record_id,
    patient: row.patient.profile[0]?.name ?? 'Patient',
    patientId: row.patient.patient_id,
    professional: row.professional?.profile[0]?.name ?? 'Organisation record',
    type: row.record_type,
    date: row.record_date,
    status: row.status === 'published' ? 'Published' : row.status === 'draft' ? 'Draft' : 'Pending',
    note: row.description ?? '',
  }))
}

export async function getOrganisationProfessionals(organisationId: string) {
  const { data: organisation, error: organisationError } = await requireSupabase().from('organisations').select('id').eq('organisation_id', organisationId).single()
  if (organisationError) throw organisationError
  const { data, error } = await requireSupabase().from('professional_organisations').select('role_title, professional:professionals(professional_id, verification_status, profile:profiles(name))').eq('organisation_id', organisation.id)
  if (error) throw error
  return (data ?? []).map((row) => {
    const professional = Array.isArray(row.professional) ? row.professional[0] : row.professional
    const profile = (professional && Array.isArray(professional.profile) ? professional.profile[0] : professional?.profile) as { name?: string } | undefined
    return { id: professional?.professional_id ?? '', name: profile?.name ?? 'Professional', role: row.role_title, verified: professional?.verification_status === 'verified' }
  })
}

export type LiveReferral = {
  id: string
  patientId: string
  patientName: string
  receivingProfessional: string
  receivingProfessionalId: string
  specialty: string
  reason: string
  message: string | null
  status: 'Sent' | 'Accepted' | 'Declined' | 'Completed'
  date: string
}

export async function getProfessionalReferrals(): Promise<LiveReferral[]> {
  const { data, error } = await requireSupabase().from('referrals').select('referral_id, specialty, reason, message, status, created_at, patient:patients(patient_id, profile:profiles(name)), receiving:professionals(professional_id, profile:profiles(name))').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map((row) => {
    const patient = Array.isArray(row.patient) ? row.patient[0] : row.patient
    const patientProfile = (patient && Array.isArray(patient.profile) ? patient.profile[0] : patient?.profile) as { name?: string } | undefined
    const receiving = Array.isArray(row.receiving) ? row.receiving[0] : row.receiving
    const receivingProfile = (receiving && Array.isArray(receiving.profile) ? receiving.profile[0] : receiving?.profile) as { name?: string } | undefined
    return { id: row.referral_id, patientId: patient?.patient_id ?? '', patientName: patientProfile?.name ?? 'Patient', receivingProfessional: receivingProfile?.name ?? 'Unassigned specialist', receivingProfessionalId: receiving?.professional_id ?? '', specialty: row.specialty, reason: row.reason, message: row.message, status: row.status, date: row.created_at }
  })
}

export async function createReferral(input: { patientId: string; receivingProfessionalId?: string; specialty: string; reason: string; message?: string }) {
  const client = requireSupabase()
  const patientUuid = await resolvePatientUuid(input.patientId)
  const user = (await client.auth.getUser()).data.user
  if (!user) throw new Error('You must be signed in.')
  const { data: profile, error: profileError } = await client.from('profiles').select('id').eq('auth_user_id', user.id).single()
  if (profileError) throw profileError
  const { data: professional, error: professionalError } = await client.from('professionals').select('id').eq('profile_id', profile.id).single()
  if (professionalError) throw professionalError
  let receivingUuid: string | null = null
  if (input.receivingProfessionalId) {
    const { data: receiving, error } = await client.from('professionals').select('id').eq('professional_id', input.receivingProfessionalId).single()
    if (error) throw error
    receivingUuid = receiving.id
  }
  const { data, error } = await client.from('referrals').insert({ referral_id: `REF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, patient_id: patientUuid, referring_professional_id: professional.id, receiving_professional_id: receivingUuid, specialty: input.specialty, reason: input.reason, message: input.message ?? null }).select('id').single()
  if (error) throw error
  return data.id as string
}

export async function publishOrganisationRecord(recordId: string) {
  const { data: record, error: recordError } = await requireSupabase().from('records').select('id').eq('record_id', recordId).single()
  if (recordError) throw recordError
  const { data, error } = await requireSupabase().rpc('publish_organisation_record', { target_record_id: record.id })
  if (error) throw error
  return data
}

export async function getNotifications() {
  const { data, error } = await requireSupabase().from('notifications').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getUnreadNotificationCount() {
  const { count, error } = await requireSupabase().from('notifications').select('id', { count: 'exact', head: true }).eq('read', false)
  if (error) throw error
  return count ?? 0
}

export async function markNotificationsRead() {
  const { error } = await requireSupabase().from('notifications').update({ read: true }).eq('read', false)
  if (error) throw error
}

export interface LiveConversation {
  id: string
  participant: string
  participantRole: string
  preview: string
  time: string
  avatarColor: string
  online: boolean
  unread: number
  messages: { id: string; from: 'me' | 'them'; text: string; time: string; resource?: { kind: string; label: string } }[]
}

export async function getConversations(): Promise<LiveConversation[]> {
  const client = requireSupabase()
  const { data: profile, error: profileError } = await client.from('profiles').select('id').eq('auth_user_id', (await client.auth.getUser()).data.user?.id ?? '').single()
  if (profileError) throw profileError
  const { data, error } = await client
    .from('conversation_participants')
    .select('conversation_id, conversation:conversations(id), profile:profiles!inner(id, name, role)')
    .eq('profile_id', profile.id)
  if (error) throw error
  const results: LiveConversation[] = []
  for (const row of data ?? []) {
    const { data: participants } = await client.from('conversation_participants').select('profile:profiles(name, role)').eq('conversation_id', row.conversation_id).neq('profile_id', profile.id)
    const { data: messages } = await client.from('messages').select('id, body, sender_profile_id, created_at').eq('conversation_id', row.conversation_id).order('created_at')
    const other = (participants?.[0]?.profile as { name: string; role: string }[] | undefined)?.[0]
    const liveMessages = (messages ?? []).map((message) => ({ id: message.id as string, from: message.sender_profile_id === profile.id ? 'me' as const : 'them' as const, text: message.body as string, time: new Date(message.created_at as string).toLocaleString() }))
    results.push({ id: row.conversation_id as string, participant: other?.name ?? 'Conversation', participantRole: other?.role ?? '', preview: liveMessages.at(-1)?.text ?? '', time: liveMessages.at(-1)?.time ?? '', avatarColor: 'from-brand-400 to-brand-600', online: false, unread: 0, messages: liveMessages })
  }
  return results
}

export async function sendConversationMessage(conversationId: string, body: string) {
  const client = requireSupabase()
  const user = (await client.auth.getUser()).data.user
  if (!user) throw new Error('You must be signed in.')
  const { data: profile, error: profileError } = await client.from('profiles').select('id').eq('auth_user_id', user.id).single()
  if (profileError) throw profileError
  const { error } = await client.from('messages').insert({ conversation_id: conversationId, sender_profile_id: profile.id, body })
  if (error) throw error
}

export async function createConversation(recipientEmail: string) {
  const client = requireSupabase()
  const user = (await client.auth.getUser()).data.user
  if (!user) throw new Error('You must be signed in.')
  const { data: current, error: currentError } = await client.from('profiles').select('id').eq('auth_user_id', user.id).single()
  if (currentError) throw currentError
  const { data: recipient, error: recipientError } = await client.from('profiles').select('id').eq('email', recipientEmail.trim().toLowerCase()).single()
  if (recipientError) throw new Error('No Medora profile was found for that email.')
  if (recipient.id === current.id) throw new Error('Choose another Medora user.')
  const { data: conversation, error: conversationError } = await client.from('conversations').insert({ subject: 'New Medora conversation' }).select('id').single()
  if (conversationError) throw conversationError
  const { error: participantError } = await client.from('conversation_participants').insert([{ conversation_id: conversation.id, profile_id: current.id }, { conversation_id: conversation.id, profile_id: recipient.id }])
  if (participantError) throw participantError
  return conversation.id as string
}
