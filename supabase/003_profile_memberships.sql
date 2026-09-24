-- Allow one Supabase auth user to own multiple Medora role profiles.
alter table public.profiles drop constraint if exists profiles_auth_user_id_key;

create or replace function public.current_profile_id() returns uuid
language sql stable security definer set search_path = public as $$
  select id from public.profiles where auth_user_id = auth.uid() order by created_at limit 1
$$;

create or replace function public.current_patient_id() returns uuid
language sql stable security definer set search_path = public as $$
  select pt.id from public.patients pt join public.profiles p on p.id = pt.profile_id
  where p.auth_user_id = auth.uid() and p.role = 'patient' limit 1
$$;

create or replace function public.current_professional_id() returns uuid
language sql stable security definer set search_path = public as $$
  select pro.id from public.professionals pro join public.profiles p on p.id = pro.profile_id
  where p.auth_user_id = auth.uid() and p.role = 'professional' limit 1
$$;

create or replace function public.current_organisation_id() returns uuid
language sql stable security definer set search_path = public as $$
  select org.id from public.organisations org join public.profiles p on p.id = org.profile_id
  where p.auth_user_id = auth.uid() and p.role = 'organisation' limit 1
$$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare profile_id uuid;
begin
  insert into public.profiles(auth_user_id, role, name, email)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::public.app_role, 'patient'),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  ) returning id into profile_id;
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
