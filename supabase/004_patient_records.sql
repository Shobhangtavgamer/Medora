create or replace function public.create_patient_record(input_record_type text, input_title text, input_description text, input_record_date date)
returns uuid language plpgsql security definer set search_path = public, extensions as $$
declare new_id uuid;
begin
  insert into public.records(record_id, patient_id, record_type, title, description, record_date, source_type, status, published_at)
  values ('REC-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6)), public.current_patient_id(), input_record_type, input_title, input_description, input_record_date, 'patient', 'published', now())
  returning id into new_id;
  perform public.log_audit('record_created', 'record', new_id, jsonb_build_object('source_type', 'patient'));
  return new_id;
end;
$$;

grant execute on function public.create_patient_record(text, text, text, date) to authenticated;
