alter table public.leads
  drop constraint if exists leads_request_type_check;

alter table public.leads
  add constraint leads_request_type_check
  check (request_type in ('private_itinerary', 'vip_experience', 'hotel_villa', 'newsletter', 'other'));
