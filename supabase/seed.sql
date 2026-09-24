-- Create these three users first in Supabase Dashboard -> Authentication -> Users,
-- using email/password. The trigger in the migration creates their application profiles.
-- Suggested demo credentials:
-- rahul@example.com / choose a demo password
-- mehta@example.com / choose a demo password
-- xyz@example.com / choose a demo password
-- Then replace the emails below if you used different addresses and run this file.

update public.profiles set name = 'Rahul Sharma', role = 'patient' where email = 'rahul@example.com';
update public.profiles set name = 'Dr. Mehta', role = 'professional' where email = 'mehta@example.com';
update public.profiles set name = 'XYZ Hospital', role = 'organisation' where email = 'xyz@example.com';

delete from public.patients where profile_id in (select id from public.profiles where email in ('mehta@example.com', 'xyz@example.com'));

update public.patients set patient_id = 'PAT-RAHUL01', date_of_birth = '1989-02-11'
where profile_id = (select id from public.profiles where email = 'rahul@example.com');
insert into public.professionals(professional_id, profile_id, verification_status)
select 'HCP-MEHTA01', id, 'verified'
from public.profiles where email = 'mehta@example.com'
on conflict (profile_id) do update set professional_id = excluded.professional_id, verification_status = 'verified';
insert into public.organisations(organisation_id, profile_id, name, organisation_type, verification_status)
select 'ORG-XYZ01', id, 'XYZ Hospital', 'hospital', 'verified'
from public.profiles where email = 'xyz@example.com'
on conflict (profile_id) do update set organisation_id = excluded.organisation_id, name = excluded.name, organisation_type = excluded.organisation_type, verification_status = 'verified';

insert into public.professional_organisations(professional_id, organisation_id, role_title)
select p.id, o.id, 'Consultant Physician'
from public.professionals p, public.organisations o
where p.professional_id = 'HCP-MEHTA01' and o.organisation_id = 'ORG-XYZ01'
on conflict do nothing;

insert into public.records(record_id, patient_id, professional_id, organisation_id, record_type, title, description, record_date, source_type, status, published_at)
select x.record_id, pt.id, pro.id, org.id, x.record_type, x.title, x.description, x.record_date, x.source_type::public.record_source_type, 'published', now()
from (values
  ('REC-RAHUL01', 'Investigation', 'Blood Test', 'CBC and metabolic panel within expected range.', '2026-09-10'::date, 'organisation'),
  ('REC-RAHUL02', 'Consultation', 'General consultation', 'Follow-up consultation with blood pressure review.', '2026-09-12'::date, 'organisation'),
  ('REC-RAHUL03', 'Prescription', 'Amlodipine prescription', 'Amlodipine 5mg once daily.', '2026-09-12'::date, 'organisation'),
  ('REC-RAHUL04', 'Report', 'Previous medical report', 'Historical external medical report uploaded by the patient.', '2025-05-20'::date, 'external')
) as x(record_id, record_type, title, description, record_date, source_type)
join public.patients pt on pt.patient_id = 'PAT-RAHUL01'
left join public.professionals pro on pro.professional_id = 'HCP-MEHTA01'
left join public.organisations org on org.organisation_id = 'ORG-XYZ01'
on conflict (record_id) do nothing;

insert into public.access_consents(patient_id, professional_id, purpose, scope, status)
select pt.id, pro.id, 'Follow-up consultation', array['Relevant history', 'Medications', 'Selected records'], 'pending'
from public.patients pt, public.professionals pro
where pt.patient_id = 'PAT-RAHUL01' and pro.professional_id = 'HCP-MEHTA01'
on conflict do nothing;

delete from public.conversations where subject = 'Rahul care coordination demo';
with new_conversation as (
  insert into public.conversations(subject) values ('Rahul care coordination demo') returning id
), participant_rows as (
  insert into public.conversation_participants(conversation_id, profile_id)
  select new_conversation.id, p.id
  from new_conversation cross join public.profiles p
  where p.email in ('rahul@example.com', 'mehta@example.com')
  returning conversation_id
)
insert into public.messages(conversation_id, sender_profile_id, body)
select new_conversation.id, sender.id, 'Hello Dr. Mehta, I have added my recent blood pressure report to Medora.'
from new_conversation
join public.profiles sender on sender.email = 'rahul@example.com';

insert into public.messages(conversation_id, sender_profile_id, body)
select c.id, sender.id, 'Thanks Rahul. I can review it after you approve the access request.'
from public.conversations c
join public.profiles sender on sender.email = 'mehta@example.com'
where c.subject = 'Rahul care coordination demo';
