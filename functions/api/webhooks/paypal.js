import { getSupabaseServiceClient, json } from '../_lib/supabase.js';
import { verifyPayPalWebhook } from '../_lib/paypal.js';

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
  const amount = resource.amount || resource.seller_receivable_breakdown?.gross_amount;
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
    if (existingEvent) return json({ ok: true, duplicate: true });

    const reference = getPaymentReference(event);
    if (!reference) return json({ error: 'PayPal event has no payment reference.' }, 400);
    const { value, currency } = getPaymentAmount(event);
    if (!Number.isFinite(value) || !currency) return json({ error: 'PayPal event has no valid amount.' }, 400);

    const { data: payment, error: paymentError } = await client
      .from('payments')
      .select('id,amount,currency,status')
      .eq('provider', 'paypal')
      .eq('order_reference', reference)
      .maybeSingle();
    if (paymentError) throw paymentError;
    if (!payment) return json({ error: 'Payment reference not found.' }, 404);
    if (payment.status === 'paid') return json({ ok: true, alreadyPaid: true });
    if (Number(payment.amount) !== value || payment.currency !== currency) {
      return json({ error: 'PayPal payment amount mismatch.' }, 400);
    }

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

    const paidAt = new Date().toISOString();
    const { error: paymentUpdateError } = await client
      .from('payments')
      .update({ status: 'paid', external_payment_id: String(event.resource?.id || eventId), paid_at: paidAt, raw_metadata_json: { webhook: event } })
      .eq('id', payment.id)
      .eq('status', 'pending');
    if (paymentUpdateError) throw paymentUpdateError;

    const { error: processedError } = await client
      .from('billing_webhook_events')
      .update({ processed_at: paidAt })
      .eq('provider', 'paypal')
      .eq('external_event_id', eventId);
    if (processedError) throw processedError;
    return json({ ok: true, paymentId: payment.id });
  } catch (error) {
    console.error('POST /api/webhooks/paypal failed', error);
    return json({ error: 'Unable to process PayPal webhook.' }, 500);
  }
}
