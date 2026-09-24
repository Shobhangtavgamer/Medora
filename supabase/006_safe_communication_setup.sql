-- Safe to run whether communication setup was already applied or not.
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  subject text,
  created_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (conversation_id, profile_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_profile_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

drop policy if exists conversations_participant_select on public.conversations;
drop policy if exists conversations_participant_insert on public.conversations;
drop policy if exists participants_self_select on public.conversation_participants;
drop policy if exists participants_self_insert on public.conversation_participants;
drop policy if exists messages_participant_select on public.messages;
drop policy if exists messages_participant_insert on public.messages;
drop policy if exists messages_participant_update on public.messages;

create policy conversations_participant_select on public.conversations for select using (
  exists (select 1 from public.conversation_participants cp where cp.conversation_id = conversations.id and cp.profile_id = public.current_profile_id())
);
create policy conversations_participant_insert on public.conversations for insert with check (auth.uid() is not null);
create policy participants_self_select on public.conversation_participants for select using (profile_id = public.current_profile_id());
create policy participants_self_insert on public.conversation_participants for insert with check (
  profile_id = public.current_profile_id()
  or exists (select 1 from public.conversations c where c.id = conversation_id)
);
create policy messages_participant_select on public.messages for select using (
  exists (select 1 from public.conversation_participants cp where cp.conversation_id = messages.conversation_id and cp.profile_id = public.current_profile_id())
);
create policy messages_participant_insert on public.messages for insert with check (
  sender_profile_id = public.current_profile_id()
  and exists (select 1 from public.conversation_participants cp where cp.conversation_id = messages.conversation_id and cp.profile_id = public.current_profile_id())
);
create policy messages_participant_update on public.messages for update using (
  exists (select 1 from public.conversation_participants cp where cp.conversation_id = messages.conversation_id and cp.profile_id = public.current_profile_id())
);

grant usage on schema public to authenticated;
grant select on public.conversations, public.conversation_participants, public.messages to authenticated;
grant insert on public.conversations, public.conversation_participants to authenticated;
grant insert, update on public.messages to authenticated;
