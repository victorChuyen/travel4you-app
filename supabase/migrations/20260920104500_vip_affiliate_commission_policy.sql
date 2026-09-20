insert into public.entitlements (code, description, value_type)
values (
  'affiliate_commission_rate',
  'Commission percentage earned by an eligible VIP seller on qualifying plan sales',
  'integer'
)
on conflict (code) do update
set description = excluded.description,
    value_type = excluded.value_type;

insert into public.plan_entitlements (plan_id, entitlement_id, value_json)
select p.id, e.id, values.value_json::jsonb
from (values
  ('free', '0'),
  ('creator', '10'),
  ('pro', '20'),
  ('agency', '30')
) as values(plan_code, value_json)
join public.plans p on p.code = values.plan_code
join public.entitlements e on e.code = 'affiliate_commission_rate'
on conflict (plan_id, entitlement_id) do update
set value_json = excluded.value_json;
