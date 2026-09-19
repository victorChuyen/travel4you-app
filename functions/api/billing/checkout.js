import { json, readJson, requireUser } from '../_lib/supabase.js';
import { createPayPalOrder } from '../_lib/paypal.js';

function makeReference(workspaceId) {
  return `T4U-${workspaceId.slice(0, 8).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function onRequestPost({ request, env }) {
  try {
    const { client, user } = await requireUser(request, env);
    const body = await readJson(request);
    const workspaceId = String(body.workspace_id || '');
    const planCode = String(body.plan_code || '');
    const provider = body.provider === 'sepay' || body.provider === 'paypal' ? body.provider : null;
    const amount = Number(body.amount);
    const currency = String(body.currency || (provider === 'sepay' ? 'VND' : 'USD'));
    if (!workspaceId || !provider || !Number.isFinite(amount) || amount <= 0) {
      return json({ error: 'workspace_id, provider and a positive amount are required.' }, 400);
    }

    const { data: membership, error: membershipError } = await client
      .from('workspace_members')
      .select('workspace_id')
      .eq('workspace_id', workspaceId)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();
    if (membershipError) throw membershipError;
    if (!membership) return json({ error: 'Workspace access denied.' }, 403);

    if (provider === 'sepay' && !env.SEPAY_ACCOUNT_NUMBER) {
      return json({ error: 'SePay is not configured.' }, 503);
    }
    if (provider === 'paypal' && (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET)) {
      return json({ error: 'PayPal is not configured.' }, 503);
    }

    const orderReference = makeReference(workspaceId);
    const { data: payment, error: paymentError } = await client
      .from('payments')
      .insert({
        workspace_id: workspaceId,
        provider,
        order_reference: orderReference,
        amount,
        currency,
        status: 'pending',
        raw_metadata_json: { plan_code: planCode || null },
      })
      .select('id,provider,order_reference,amount,currency,status')
      .single();
    if (paymentError) throw paymentError;

    if (provider === 'sepay') {
      const account = env.SEPAY_ACCOUNT_NUMBER;
      const bank = env.SEPAY_BANK_CODE || 'BIDV';
      const params = new URLSearchParams({ acc: account, bank, amount: String(Math.round(amount)), des: orderReference });
      return json({ payment, checkout: { provider: 'sepay', qrUrl: `https://vietqr.app/img?${params.toString()}` } }, 201);
    }

    const origin = new URL(request.url).origin;
    try {
      const order = await createPayPalOrder(env, {
        reference: orderReference,
        planCode,
        amount,
        currency,
        returnUrl: String(body.return_url || `${origin}/app/?paypal=success`),
        cancelUrl: String(body.cancel_url || `${origin}/app/?paypal=cancelled`),
      });
      const approvalUrl = order.links?.find((link) => link.rel === 'approve')?.href;
      if (!approvalUrl) throw new Error('PayPal order did not return an approval URL.');
      return json({
        payment,
        checkout: {
          provider: 'paypal',
          orderId: order.id,
          checkoutUrl: approvalUrl,
          externalReference: orderReference,
        },
      }, 201);
    } catch (paypalError) {
      await client.from('payments').update({
        status: 'failed',
        raw_metadata_json: { plan_code: planCode || null, error: String(paypalError.message || paypalError) },
      }).eq('id', payment.id).eq('status', 'pending');
      throw paypalError;
    }
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/billing/checkout failed', error);
    return json({ error: 'Unable to create checkout.' }, 500);
  }
}
