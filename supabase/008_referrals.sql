create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referral_id text not null unique,
  patient_id uuid not null references public.patients(id) on delete cascade,
  referring_professional_id uuid not null references public.professionals(id),
  receiving_professional_id uuid references public.professionals(id),
  specialty text not null,
  reason text not null,
  message text,
  status text not null default 'Sent' check (status in ('Sent', 'Accepted', 'Declined', 'Completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.referrals enable row level security;
drop policy if exists referrals_visible on public.referrals;
drop policy if exists referrals_insert on public.referrals;
drop policy if exists referrals_update on public.referrals;
create policy referrals_visible on public.referrals for select using (
  patient_id = public.current_patient_id()
  or referring_professional_id = public.current_professional_id()
  or receiving_professional_id = public.current_professional_id()
);
create policy referrals_insert on public.referrals for insert with check (referring_professional_id = public.current_professional_id());
create policy referrals_update on public.referrals for update using (
  referring_professional_id = public.current_professional_id() or receiving_professional_id = public.current_professional_id()
);
grant select, insert, update on public.referrals to authenticated;
