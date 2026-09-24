-- Run this if 002_communication.sql was already applied.
drop policy if exists conversations_participant_insert on public.conversations;
drop policy if exists participants_self_insert on public.conversation_participants;

create policy conversations_participant_insert on public.conversations
for insert with check (auth.uid() is not null);

create policy participants_self_insert on public.conversation_participants
for insert with check (
  profile_id = public.current_profile_id()
  or exists (select 1 from public.conversations c where c.id = conversation_id)
);

grant insert on public.conversations, public.conversation_participants to authenticated;
