-- Run after 006_safe_communication_setup.sql.
drop policy if exists participants_self_select on public.conversation_participants;
create policy participants_self_select on public.conversation_participants
for select using (
  exists (
    select 1 from public.conversation_participants own
    where own.conversation_id = conversation_id
      and own.profile_id = public.current_profile_id()
  )
);
