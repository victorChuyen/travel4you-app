import { json, requireUser } from './_lib/supabase.js';

export async function onRequestGet({ request, env }) {
  try {
    const { client } = await requireUser(request, env);
    const workspaceId = new URL(request.url).searchParams.get('workspace_id');
    if (!workspaceId) return json({ error: 'workspace_id is required.' }, 400);

    const { data: subscription, error: subscriptionError } = await client
      .from('subscriptions')
      .select('plan_id,status,plans(code,name,billing_period,price_reference)')
      .eq('workspace_id', workspaceId)
      .in('status', ['trialing', 'active', 'past_due'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (subscriptionError) throw subscriptionError;

    const planCode = subscription?.plans?.code || 'free';
    const { data: plan, error: planError } = await client
      .from('plans')
      .select('id,code,name,billing_period,price_reference,plan_entitlements(value_json,entitlements(code,value_type))')
      .eq('code', planCode)
      .eq('active', true)
      .single();
    if (planError) throw planError;

    const entitlements = Object.fromEntries((plan.plan_entitlements || []).map((item) => [
      item.entitlements.code,
      item.value_json,
    ]));
    return json({ plan: { code: plan.code, name: plan.name, billing_period: plan.billing_period, price_reference: plan.price_reference }, entitlements });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('GET /api/entitlements failed', error);
    return json({ error: 'Unable to load entitlements.' }, 500);
  }
}
