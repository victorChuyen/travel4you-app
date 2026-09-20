import { getSupabaseServiceClient, json } from '../_lib/supabase.js';
import { verifyPayPalWebhook } from '../_lib/paypal.js';
import { sendPaymentSuccessNotification } from '../_lib/telegram.js';

function getPaymentReference(event) {
  const resource = event.resource || {};
  return String(
    resource.custom_id
      || resource.purchase_units?.[0]?.custom_id
      || resource.purchase_units?.[0]?.reference_id
      || '',
  );
}

function getPaymentAmount(event) {
  const resource = event.resource || {};
  const amount = resource.amount
    || resource.purchase_units?.[0]?.amount
    || resource.seller_receivable_breakdown?.gross_amount;
  return {
    value: Number(amount?.value),
    currency: String(amount?.currency_code || ''),
  };
}

async function hashPayload(payload) {
  const encoded = new TextEncoder().encode(JSON.stringify(payload));
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env }) {
  const rawBody = await request.text();
  let event;
  try {
    event = await verifyPayPalWebhook(env, request, rawBody);
  } catch (error) {
    console.error('PayPal webhook verification failed', error);
    return json({ error: 'Invalid PayPal webhook.' }, 400);
  }

  const eventId = String(event.id || '');
  if (!eventId) return json({ error: 'PayPal event id is required.' }, 400);
  if (!['CHECKOUT.ORDER.COMPLETED', 'PAYMENT.CAPTURE.COMPLETED'].includes(event.event_type)) {
    return json({ ok: true, ignored: true });
  }

  try {
    const client = getSupabaseServiceClient(env);
    const { data: existingEvent, error: existingError } = await client
      .from('billing_webhook_events')
      .select('id')
      .eq('provider', 'paypal')
      .eq('external_event_id', eventId)
      .maybeSingle();
    if (existingError) throw existingError;

    const reference = getPaymentReference(event);
    if (!reference) return json({ error: 'PayPal event has no payment reference.' }, 400);
    const { value, currency } = getPaymentAmount(event);
    if (!Number.isFinite(value) || !currency) return json({ error: 'PayPal event has no valid amount.' }, 400);

    const { data: payment, error: paymentError } = await client
      .from('payments')
      .select('id,workspace_id,amount,currency,status,order_reference,raw_metadata_json')
      .eq('provider', 'paypal')
      .eq('order_reference', reference)
      .maybeSingle();
    if (paymentError) throw paymentError;
    if (!payment) return json({ error: 'Payment reference not found.' }, 404);
    if (payment.status === 'paid') return json({ ok: true, alreadyPaid: true });
    if (Number(payment.amount) !== value || payment.currency !== currency) {
      return json({ error: 'PayPal payment amount mismatch.' }, 400);
    }

    const { data: currentEvent, error: currentEventError } = await client
      .from('billing_webhook_events')
      .select('id,processed_at')
      .eq('provider', 'paypal')
      .eq('external_event_id', eventId)
      .maybeSingle();
    if (currentEventError) throw currentEventError;
    if (currentEvent?.processed_at) return json({ ok: true, duplicate: true });
    if (!currentEvent) {
      const { error: eventError } = await client.from('billing_webhook_events').insert({
        provider: 'paypal',
        external_event_id: eventId,
        event_type: event.event_type,
        payload_hash: await hashPayload(event),
      });
      if (eventError) {
        if (eventError.code === '23505') return json({ ok: true, duplicate: true });
        throw eventError;
      }
    }

    const paidAt = new Date().toISOString();
    const { error: paymentUpdateError } = await client
      .from('payments')
      .update({ status: 'paid', external_payment_id: String(event.resource?.id || eventId), paid_at: paidAt, raw_metadata_json: { webhook: event } })
      .eq('id', payment.id)
      .eq('status', 'pending');
    if (paymentUpdateError) throw paymentUpdateError;

    const planCode = payment.raw_metadata_json?.plan_code;
    if (planCode) {
      const { data: plan, error: planError } = await client
        .from('plans')
        .select('id')
        .eq('code', planCode)
        .eq('active', true)
        .maybeSingle();
      if (planError) throw planError;
      if (!plan) return json({ error: 'Payment references an inactive plan.' }, 409);

      const periodStart = new Date();
      const periodEnd = new Date(periodStart);
      periodEnd.setUTCMonth(periodEnd.getUTCMonth() + 1);
      const { data: subscription, error: subscriptionError } = await client
        .from('subscriptions')
        .select('id')
        .eq('workspace_id', payment.workspace_id)
        .eq('billing_provider', 'paypal')
        .in('status', ['trialing', 'active', 'past_due'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (subscriptionError) throw subscriptionError;

      const subscriptionValues = {
        workspace_id: payment.workspace_id,
        billing_provider: 'paypal',
        external_subscription_id: reference,
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

    const { error: processedError } = await client
      .from('billing_webhook_events')
      .update({ processed_at: paidAt })
      .eq('provider', 'paypal')
      .eq('external_event_id', eventId);
    if (processedError) throw processedError;

    try {
      await sendPaymentSuccessNotification(env, {
        ...payment,
        external_payment_id: String(event.resource?.id || eventId),
        paid_at: paidAt,
      });
    } catch (notificationError) {
      console.error('PayPal payment recorded but Telegram notification failed', notificationError);
    }

    return json({ ok: true, paymentId: payment.id });
  } catch (error) {
    console.error('POST /api/webhooks/paypal failed', error);
    return json({ error: 'Unable to process PayPal webhook.' }, 500);
  }
}
