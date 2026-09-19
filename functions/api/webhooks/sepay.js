import { getSupabaseServiceClient, json } from '../_lib/supabase.js';

async function hasValidWebhookSignature(request, env, rawBody) {
  const signature = request.headers.get('x-sepay-signature');
  const timestamp = request.headers.get('x-sepay-timestamp');
  if (!env.SEPAY_WEBHOOK_SECRET || !signature || !timestamp) return false;
  const timestampMs = Number(timestamp) * 1000;
  if (!Number.isFinite(timestampMs) || Math.abs(Date.now() - timestampMs) > 5 * 60 * 1000) {
    return false;
  }
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.SEPAY_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  return signature.replace(/^sha256=/i, '').toLowerCase() === expected;
}

function pickString(payload, keys) {
  for (const key of keys) {
    const value = payload?.[key];
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return '';
}

function pickAmount(payload) {
  const amount = Number(payload?.transferAmount ?? payload?.amount ?? payload?.transfer_amount);
  return Number.isFinite(amount) ? amount : null;
}

async function hashPayload(payload) {
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env }) {
  const rawBody = await request.text();
  if (!await hasValidWebhookSignature(request, env, rawBody)) {
    return json({ error: 'Invalid webhook signature.' }, 401);
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (error) {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }

  const eventId = pickString(payload, ['id', 'transaction_id', 'referenceCode', 'reference_code']);
  const eventType = pickString(payload, ['type', 'transactionType', 'transaction_type']) || 'payment.received';
  const orderReference = pickString(payload, ['content', 'description', 'des', 'order_reference']);
  const transferType = pickString(payload, ['transferType', 'transfer_type']).toLowerCase();
  const amount = pickAmount(payload);

  if (!eventId || !orderReference || amount === null) {
    return json({ error: 'Webhook must include event id, transfer amount, and payment reference.' }, 400);
  }
  if (transferType && !['in', 'credit'].includes(transferType)) {
    return json({ success: true, ignored: true });
  }

  try {
    const client = getSupabaseServiceClient(env);
    const payloadHash = await hashPayload(payload);
    const { data: existingEvent, error: existingError } = await client
      .from('billing_webhook_events')
      .select('id,processed_at')
      .eq('provider', 'sepay')
      .eq('external_event_id', eventId)
      .maybeSingle();
    if (existingError) throw existingError;
    if (existingEvent) return json({ success: true, duplicate: true });

    const { data: payment, error: paymentError } = await client
      .from('payments')
      .select('id,workspace_id,amount,currency,status,raw_metadata_json')
      .eq('provider', 'sepay')
      .eq('order_reference', orderReference)
      .maybeSingle();
    if (paymentError) throw paymentError;
    if (!payment) return json({ error: 'Payment reference not found.' }, 404);
    if (payment.status === 'paid') return json({ success: true, alreadyPaid: true });
    if (Number(payment.amount) !== amount) return json({ error: 'Payment amount mismatch.' }, 400);
    if (payment.currency !== 'VND') return json({ error: 'Unsupported SePay payment currency.' }, 400);

    const planCode = payment.raw_metadata_json?.plan_code;
    let plan = null;
    if (planCode) {
      const { data, error: planError } = await client
        .from('plans')
        .select('id')
        .eq('code', planCode)
        .eq('active', true)
        .maybeSingle();
      if (planError) throw planError;
      if (!data) return json({ error: 'Payment references an inactive plan.' }, 409);
      plan = data;
    }

    const { error: eventError } = await client.from('billing_webhook_events').insert({
      provider: 'sepay',
      external_event_id: eventId,
      event_type: eventType,
      payload_hash: payloadHash,
    });
    if (eventError) {
      if (eventError.code === '23505') return json({ ok: true, duplicate: true });
      throw eventError;
    }

    const paidAt = new Date().toISOString();
    const { error: updateError } = await client
      .from('payments')
      .update({
        status: 'paid',
        external_payment_id: eventId,
        paid_at: paidAt,
        raw_metadata_json: { ...(payment.raw_metadata_json || {}), webhook: payload },
      })
      .eq('id', payment.id)
      .eq('status', 'pending');
    if (updateError) throw updateError;

    if (plan) {
      const periodStart = new Date();
      const periodEnd = new Date(periodStart);
      periodEnd.setUTCMonth(periodEnd.getUTCMonth() + 1);
      const { data: subscription, error: subscriptionError } = await client
        .from('subscriptions')
        .select('id')
        .eq('workspace_id', payment.workspace_id)
        .eq('billing_provider', 'sepay')
        .in('status', ['trialing', 'active', 'past_due'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (subscriptionError) throw subscriptionError;

      const subscriptionValues = {
        workspace_id: payment.workspace_id,
        billing_provider: 'sepay',
        external_subscription_id: orderReference,
        plan_id: plan.id,
        status: 'active',
        current_period_start: periodStart.toISOString(),
        current_period_end: periodEnd.toISOString(),
        cancel_at_period_end: false,
      };
      const subscriptionQuery = subscription
        ? client.from('subscriptions').update(subscriptionValues).eq('id', subscription.id)
        : client.from('subscriptions').insert(subscriptionValues);
      const { error: subscriptionWriteError } = await subscriptionQuery;
      if (subscriptionWriteError) throw subscriptionWriteError;
    }

    const { error: auditError } = await client.from('audit_logs').insert({
      workspace_id: payment.workspace_id,
      actor_type: 'system',
      action: 'billing.payment_paid',
      entity_type: 'payment',
      entity_id: payment.id,
      metadata_json: { provider: 'sepay', event_id: eventId, order_reference: orderReference },
    });
    if (auditError) throw auditError;

    const { error: processedError } = await client
      .from('billing_webhook_events')
      .update({ processed_at: paidAt })
      .eq('provider', 'sepay')
      .eq('external_event_id', eventId);
    if (processedError) throw processedError;

    return json({ success: true, paymentId: payment.id });
  } catch (error) {
    console.error('POST /api/webhooks/sepay failed', error);
    return json({ error: 'Unable to process SePay webhook.' }, 500);
  }
}
