create extension if not exists pgcrypto;

create type public.app_role as enum ('patient', 'professional', 'organisation');
create type public.verification_status as enum ('pending', 'verified', 'rejected');
create type public.organisation_type as enum ('hospital', 'clinic', 'diagnostic centre', 'medical centre', 'independent practice');
create type public.consent_status as enum ('pending', 'approved', 'rejected', 'revoked', 'expired');
create type public.record_source_type as enum ('patient', 'organisation', 'external');
create type public.record_status as enum ('draft', 'pending', 'published', 'archived');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  role public.app_role not null,
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  patient_id text not null unique,
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  date_of_birth date,
  created_at timestamptz not null default now()
);

create table public.professionals (
  id uuid primary key default gen_random_uuid(),
  professional_id text not null unique,
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  organisation_id text not null unique,
  profile_id uuid unique references public.profiles(id) on delete set null,
  name text not null,
  organisation_type public.organisation_type not null,
  verification_status public.verification_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.professional_organisations (
  professional_id uuid not null references public.professionals(id) on delete cascade,
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  role_title text not null,
  created_at timestamptz not null default now(),
  primary key (professional_id, organisation_id)
);

create table public.access_consents (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  professional_id uuid not null references public.professionals(id) on delete cascade,
  purpose text not null,
  scope text[] not null default '{}',
  status public.consent_status not null default 'pending',
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  check (expires_at is null or approved_at is not null),
  unique (patient_id, professional_id, status)
);

create table public.records (
  id uuid primary key default gen_random_uuid(),
  record_id text not null unique,
  patient_id uuid not null references public.patients(id) on delete cascade,
  professional_id uuid references public.professionals(id) on delete set null,
  organisation_id uuid references public.organisations(id) on delete set null,
  record_type text not null,
  title text not null,
  description text,
  record_date date not null,
  source_type public.record_source_type not null,
  status public.record_status not null default 'draft',
  created_at timestamptz not null default now(),
  published_at timestamptz,
  check (source_type = 'organisation' or organisation_id is null),
  check (source_type <> 'organisation' or organisation_id is not null)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  message text not null,
  related_id uuid,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index records_patient_date_idx on public.records(patient_id, record_date desc);
create index consent_patient_status_idx on public.access_consents(patient_id, status);
create index consent_professional_status_idx on public.access_consents(professional_id, status);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare profile_id uuid;
begin
  insert into public.profiles(auth_user_id, role, name, email)
  values (new.id, coalesce((new.raw_user_meta_data->>'role')::public.app_role, 'patient'), coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), new.email)
  returning id into profile_id;
  if coalesce(new.raw_user_meta_data->>'role', 'patient') = 'patient' then
    insert into public.patients(patient_id, profile_id) values ('PAT-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), profile_id);
  elsif new.raw_user_meta_data->>'role' = 'professional' then
    insert into public.professionals(professional_id, profile_id) values ('HCP-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), profile_id);
  elsif new.raw_user_meta_data->>'role' = 'organisation' then
    insert into public.organisations(organisation_id, profile_id, name, organisation_type)
    values ('ORG-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), profile_id, coalesce(new.raw_user_meta_data->>'name', 'New organisation'), 'clinic');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.current_profile_id() returns uuid language sql stable security definer set search_path = public as $$
  select id from public.profiles where auth_user_id = auth.uid()
$$;

create or replace function public.current_user_is_professional() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'professional')
$$;

create or replace function public.current_user_is_patient() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where auth_user_id = auth.uid() and role = 'patient')
$$;

create or replace function public.current_patient_id() returns uuid language sql stable security definer set search_path = public as $$
  select id from public.patients where profile_id = public.current_profile_id()
$$;

create or replace function public.current_professional_id() returns uuid language sql stable security definer set search_path = public as $$
  select id from public.professionals where profile_id = public.current_profile_id()
$$;

create or replace function public.current_organisation_id() returns uuid language sql stable security definer set search_path = public as $$
  select id from public.organisations where profile_id = public.current_profile_id()
$$;

create or replace function public.has_patient_access(target_patient_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.access_consents c
    where c.patient_id = target_patient_id
      and c.professional_id = public.current_professional_id()
      and c.status = 'approved'
      and c.expires_at > now()
  )
$$;

create or replace function public.log_audit(input_action text, input_entity_type text, input_entity_id uuid, input_metadata jsonb default '{}') returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.audit_events(actor_profile_id, action, entity_type, entity_id, metadata)
  values (public.current_profile_id(), input_action, input_entity_type, input_entity_id, input_metadata);
end;
$$;

create or replace function public.request_patient_access(target_patient_id uuid, request_purpose text, request_scope text[], requested_duration_days integer default 30)
returns uuid language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  if public.current_professional_id() is null then raise exception 'Only professionals can request access'; end if;
  insert into public.access_consents(patient_id, professional_id, purpose, scope)
  values (target_patient_id, public.current_professional_id(), request_purpose, request_scope)
  returning id into new_id;
  insert into public.notifications(recipient_profile_id, type, title, message, related_id)
  select p.profile_id, 'access_request', 'New access request',
    'A healthcare professional requested access to your records.', new_id
  from public.patients p where p.id = target_patient_id;
  perform public.log_audit('access_requested', 'access_consent', new_id, jsonb_build_object('purpose', request_purpose, 'scope', request_scope));
  return new_id;
end;
$$;

create or replace function public.approve_patient_access(consent_id uuid, approved_scope text[], duration_days integer default 30)
returns void language plpgsql security definer set search_path = public as $$
declare c public.access_consents;
begin
  select * into c from public.access_consents where id = consent_id and patient_id = public.current_patient_id() and status = 'pending' for update;
  if c.id is null then raise exception 'Access request not found'; end if;
  update public.access_consents set status = 'approved', scope = approved_scope, approved_at = now(), expires_at = now() + make_interval(days => duration_days) where id = consent_id;
  insert into public.notifications(recipient_profile_id, type, title, message, related_id)
  select p.profile_id, 'access_approved', 'Access request approved', 'Your request to access patient records was approved.', consent_id
  from public.professionals p where p.id = c.professional_id;
  perform public.log_audit('access_approved', 'access_consent', consent_id, jsonb_build_object('scope', approved_scope, 'duration_days', duration_days));
end;
$$;

create or replace function public.reject_patient_access(consent_id uuid) returns void language plpgsql security definer set search_path = public as $$
declare c public.access_consents;
begin
  select * into c from public.access_consents where id = consent_id and patient_id = public.current_patient_id() and status = 'pending' for update;
  if c.id is null then raise exception 'Access request not found'; end if;
  update public.access_consents set status = 'rejected' where id = consent_id;
  insert into public.notifications(recipient_profile_id, type, title, message, related_id)
  select p.profile_id, 'access_rejected', 'Access request rejected', 'Your request to access patient records was rejected.', consent_id
  from public.professionals p where p.id = c.professional_id;
  perform public.log_audit('access_rejected', 'access_consent', consent_id);
end;
$$;

create or replace function public.revoke_patient_access(consent_id uuid) returns void language plpgsql security definer set search_path = public as $$
declare c public.access_consents;
begin
  select * into c from public.access_consents where id = consent_id and patient_id = public.current_patient_id() and status = 'approved' for update;
  if c.id is null then raise exception 'Active access not found'; end if;
  update public.access_consents set status = 'revoked', revoked_at = now() where id = consent_id;
  insert into public.notifications(recipient_profile_id, type, title, message, related_id)
  select p.profile_id, 'access_revoked', 'Access revoked', 'Your access to patient records was revoked.', consent_id
  from public.professionals p where p.id = c.professional_id;
  perform public.log_audit('access_revoked', 'access_consent', consent_id);
end;
$$;

create or replace function public.create_organisation_record(target_patient_id uuid, source_professional_id uuid, source_organisation_id uuid, input_record_type text, input_title text, input_description text, input_record_date date)
returns uuid language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  if public.current_organisation_id() <> source_organisation_id then raise exception 'Organisation is not authorised'; end if;
  insert into public.records(record_id, patient_id, professional_id, organisation_id, record_type, title, description, record_date, source_type, status)
  values ('REC-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), target_patient_id, source_professional_id, source_organisation_id, input_record_type, input_title, input_description, input_record_date, 'organisation', 'pending')
  returning id into new_id;
  perform public.log_audit('record_created', 'record', new_id);
  return new_id;
end;
$$;

create or replace function public.publish_organisation_record(target_record_id uuid) returns void language plpgsql security definer set search_path = public as $$
declare target_patient uuid;
begin
  select patient_id into target_patient from public.records where id = target_record_id and organisation_id = public.current_organisation_id() for update;
  if target_patient is null then raise exception 'Record is not owned by this organisation'; end if;
  update public.records set status = 'published', published_at = now() where id = target_record_id;
  insert into public.notifications(recipient_profile_id, type, title, message, related_id)
  select p.profile_id, 'record_published', 'New healthcare record published', 'Your organisation has published a new healthcare record.', target_record_id
  from public.patients p where p.id = target_patient;
  perform public.log_audit('record_published', 'record', target_record_id);
end;
$$;

alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.professionals enable row level security;
alter table public.organisations enable row level security;
alter table public.professional_organisations enable row level security;
alter table public.access_consents enable row level security;
alter table public.records enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_events enable row level security;

create policy profiles_self on public.profiles for select using (auth_user_id = auth.uid());
create policy profiles_basic_identity on public.profiles for select using (public.current_user_is_professional() or public.current_user_is_patient());
create policy patients_self on public.patients for select using (profile_id = public.current_profile_id());
create policy patients_basic_search on public.patients for select using (exists (select 1 from public.profiles p where p.auth_user_id = auth.uid() and p.role = 'professional'));
create policy professionals_self on public.professionals for select using (profile_id = public.current_profile_id());
create policy professionals_visible_to_authenticated on public.professionals for select using (auth.uid() is not null);
create policy organisations_self on public.organisations for select using (profile_id = public.current_profile_id() or exists (select 1 from public.professional_organisations po where po.organisation_id = organisations.id and po.professional_id = public.current_professional_id()));
create policy org_members_visible on public.professional_organisations for select using (organisation_id = public.current_organisation_id() or professional_id = public.current_professional_id());
create policy consent_patient_or_professional on public.access_consents for select using (patient_id = public.current_patient_id() or professional_id = public.current_professional_id());
create policy records_patient on public.records for select using (patient_id = public.current_patient_id());
create policy records_professional_with_consent on public.records for select using (public.has_patient_access(patient_id));
create policy records_organisation on public.records for select using (organisation_id = public.current_organisation_id());
create policy records_org_insert on public.records for insert with check (organisation_id = public.current_organisation_id());
create policy notifications_self on public.notifications for select using (recipient_profile_id = public.current_profile_id());
create policy notifications_update_self on public.notifications for update using (recipient_profile_id = public.current_profile_id());
create policy audit_own_events on public.audit_events for select using (actor_profile_id = public.current_profile_id());

grant usage on schema public to authenticated;
grant select on all tables in schema public to authenticated;
grant update (read) on public.notifications to authenticated;
grant execute on function public.request_patient_access(uuid, text, text[], integer) to authenticated;
grant execute on function public.approve_patient_access(uuid, text[], integer) to authenticated;
grant execute on function public.reject_patient_access(uuid) to authenticated;
grant execute on function public.revoke_patient_access(uuid) to authenticated;
grant execute on function public.has_patient_access(uuid) to authenticated;
grant execute on function public.create_organisation_record(uuid, uuid, uuid, text, text, text, date) to authenticated;
grant execute on function public.publish_organisation_record(uuid) to authenticated;
