function getBaseUrl(env) {
  return env.PAYPAL_ENVIRONMENT === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

async function getAccessToken(env) {
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials are not configured.');
  }
  const credentials = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);
  const response = await fetch(`${getBaseUrl(env)}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) throw new Error(`PayPal OAuth failed with HTTP ${response.status}.`);
  const body = await response.json();
  if (!body.access_token) throw new Error('PayPal OAuth response did not include an access token.');
  return body.access_token;
}

export async function paypalRequest(env, path, options = {}) {
  const token = await getAccessToken(env);
  const response = await fetch(`${getBaseUrl(env)}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`PayPal API failed with HTTP ${response.status}: ${body.name || 'unknown_error'}.`);
  }
  return body;
}

export async function createPayPalOrder(env, input) {
  return paypalRequest(env, '/v2/checkout/orders', {
    method: 'POST',
    headers: { 'PayPal-Request-Id': input.reference },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: input.reference,
        custom_id: input.reference,
        amount: {
          currency_code: input.currency,
          value: input.amount.toFixed(2),
        },
        description: input.planCode ? `Travel4You ${input.planCode} plan` : 'Travel4You SaaS',
      }],
      application_context: {
        user_action: 'PAY_NOW',
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    }),
  });
}

export async function verifyPayPalWebhook(env, request, rawBody) {
  if (!env.PAYPAL_WEBHOOK_ID) throw new Error('PAYPAL_WEBHOOK_ID is not configured.');
  const requiredHeaders = {
    'transmission_id': request.headers.get('paypal-transmission-id'),
    'transmission_time': request.headers.get('paypal-transmission-time'),
    'cert_url': request.headers.get('paypal-cert-url'),
    'auth_algo': request.headers.get('paypal-auth-algo'),
    'transmission_sig': request.headers.get('paypal-transmission-sig'),
    'webhook_id': env.PAYPAL_WEBHOOK_ID,
    webhook_event: JSON.parse(rawBody),
  };
  if (Object.values(requiredHeaders).some((value) => !value)) {
    throw new Error('PayPal webhook signature headers are incomplete.');
  }
  const result = await paypalRequest(env, '/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    body: JSON.stringify(requiredHeaders),
  });
  if (result.verification_status !== 'SUCCESS') {
    throw new Error('PayPal webhook signature verification failed.');
  }
  return requiredHeaders.webhook_event;
}
