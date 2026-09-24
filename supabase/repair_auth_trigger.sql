-- Run this once in Supabase SQL Editor after 001_medora_core.sql.
-- It repairs the signup trigger for projects where pgcrypto is installed in extensions.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare profile_id uuid;
begin
  insert into public.profiles(auth_user_id, role, name, email)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::public.app_role, 'patient'),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  )
  returning id into profile_id;

  if coalesce(new.raw_user_meta_data->>'role', 'patient') = 'patient' then
    insert into public.patients(patient_id, profile_id)
    values ('PAT-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), profile_id);
  elsif new.raw_user_meta_data->>'role' = 'professional' then
    insert into public.professionals(professional_id, profile_id)
    values ('HCP-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), profile_id);
  elsif new.raw_user_meta_data->>'role' = 'organisation' then
    insert into public.organisations(organisation_id, profile_id, name, organisation_type)
    values (
      'ORG-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)),
      profile_id,
      coalesce(new.raw_user_meta_data->>'name', 'New organisation'),
      'clinic'
    );
  end if;

  return new;
end;
$$;
