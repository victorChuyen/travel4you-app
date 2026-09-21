import { getSupabaseServiceClient, json, readJson } from './_lib/supabase.js';

const MAX = {
  name: 120,
  email: 254,
  phone: 32,
  destination: 160,
  budget: 80,
  message: 2000,
};
const REQUEST_TYPES = new Set(['private_itinerary', 'vip_experience', 'hotel_villa', 'newsletter', 'other']);
const localRateLimit = new Map();
const OWNER_EMAIL = 'getyourguidemedia@gmail.com';
const FROM_EMAIL = 'support@travel4you.app';
const RESEND_API_URL = 'https://api.resend.com/emails';

function value(body, key) {
  return typeof body[key] === 'string' ? body[key].trim() : '';
}

function validEmail(email) {
  return email.length >= 3
    && email.length <= MAX.email
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validPhone(phone) {
  return !phone || (phone.length >= 7 && phone.length <= MAX.phone && /^\+?[0-9 ()-]+$/.test(phone));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

function leadEmailContent({ name, email, phone, requestType, destination, budget, message }) {
  const fields = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || 'Not provided'],
    ['Request type', requestType],
    ['Destination', destination || 'Not provided'],
    ['Budget', budget || 'Not provided'],
    ['Message', message || 'Not provided'],
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = fields
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join('');
  return { text, html };
}

async function sendLeadEmails(env, lead) {
  const content = leadEmailContent(lead);
  const isNewsletter = lead.request_type === 'newsletter';
  if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

  async function send(message) {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Travel4You Journal <${FROM_EMAIL}>`,
        ...message,
      }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      const reason = payload?.message || payload?.name || `HTTP ${response.status}`;
      throw new Error(`RESEND_HTTP_${response.status}: ${reason}`);
    }
    return payload;
  }

  const ownerResponse = await send({
    to: [OWNER_EMAIL],
    reply_to: lead.email,
    subject: isNewsletter ? `New Travel4You Journal subscriber: ${lead.email}` : `New VIP request from ${lead.name}`,
    text: isNewsletter
      ? `A new reader subscribed to Travel4You guide updates.\n\n${content.text}`
      : `A new Travel4You VIP request was submitted.\n\n${content.text}`,
    html: isNewsletter ? `<h2>New Travel4You Journal subscriber</h2>${content.html}` : `<h2>New Travel4You VIP request</h2>${content.html}`,
  });

  const customerResponse = await send({
    to: [lead.email],
    reply_to: OWNER_EMAIL,
    subject: isNewsletter ? 'You are subscribed to Travel4You guide updates' : 'We received your Travel4You VIP request',
    text: isNewsletter
      ? `Hello ${lead.name},\n\nYou are subscribed to new Travel4You guides and selected experience updates. We do not provide bespoke itinerary design through this form.\n\nYour subscription:\n${content.text}`
      : `Hello ${lead.name},\n\nThank you for contacting Travel4You. We received your request and our concierge team will reply shortly.\n\nYour request:\n${content.text}`,
    html: isNewsletter
      ? `<p>Hello ${escapeHtml(lead.name)},</p><p>You are subscribed to new Travel4You guides and selected experience updates. This publication shares affiliate links and does not provide bespoke itinerary design through this form.</p><h3>Your subscription</h3>${content.html}`
      : `<p>Hello ${escapeHtml(lead.name)},</p><p>Thank you for contacting Travel4You. We received your request and our concierge team will reply shortly.</p><h3>Your request</h3>${content.html}`,
  });

  return {
    ownerMessageId: ownerResponse?.id || null,
    customerMessageId: customerResponse?.id || null,
  };
}

async function isRateLimited(request, env) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  if (env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === 'function') {
    const result = await env.RATE_LIMITER.limit({ key: `vip-lead:${ip}` });
    return result.success === false;
  }

  // Best-effort fallback when no Cloudflare rate-limit binding is configured.
  const now = Date.now();
  const previous = localRateLimit.get(ip) || 0;
  localRateLimit.set(ip, now);
  if (localRateLimit.size > 1000) {
    for (const [key, timestamp] of localRateLimit) {
      if (now - timestamp > 60_000) localRateLimit.delete(key);
    }
  }
  return now - previous < 60_000;
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}

export async function onRequestPost({ request, env }) {
  try {
    if (await isRateLimited(request, env)) return json({ error: 'Please wait a moment before sending another request.' }, 429);
    if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
      return json({ error: 'Request body must be JSON.' }, 415);
    }

    const body = await readJson(request);
    if (value(body, 'website')) return json({ error: 'Unable to submit this request.' }, 400);

    const requestType = value(body, 'request_type');
    const name = value(body, 'name') || (requestType === 'newsletter' ? 'Travel4You Reader' : '');
    const email = value(body, 'email').toLowerCase();
    const phone = value(body, 'phone');
    const destination = value(body, 'destination');
    const budget = value(body, 'budget');
    const message = value(body, 'message');

    if (!name || name.length > MAX.name) return json({ error: 'Please enter your name (maximum 120 characters).' }, 400);
    if (!validEmail(email)) return json({ error: 'Please enter a valid email address.' }, 400);
    if (!validPhone(phone)) return json({ error: 'Please enter a valid phone number.' }, 400);
    if (!REQUEST_TYPES.has(requestType)) return json({ error: 'Please choose a valid request type.' }, 400);
    if (destination.length > MAX.destination) return json({ error: 'Destination is too long.' }, 400);
    if (budget.length > MAX.budget) return json({ error: 'Budget is too long.' }, 400);
    if (message.length > MAX.message) return json({ error: 'Message is too long.' }, 400);

    const client = getSupabaseServiceClient(env);
    const recentCutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: recentLead, error: recentLeadError } = await client
      .from('leads')
      .select('id')
      .eq('email', email)
      .gte('created_at', recentCutoff)
      .limit(1)
      .maybeSingle();
    if (recentLeadError) throw recentLeadError;
    if (recentLead) return json({ error: 'A recent request from this email is already being reviewed.' }, 409);

    const lead = {
      name,
      email,
      phone: phone || null,
      request_type: requestType,
      destination: destination || null,
      budget: budget || null,
      message: message || null,
      source: requestType === 'newsletter' ? 'newsletter-footer' : 'vip-footer',
      status: 'new',
    };
    const { error } = await client.from('leads').insert(lead);
    if (error) throw error;

    let emailSent = false;
    let emailStatus = 'not-attempted';
    try {
      await sendLeadEmails(env, lead);
      emailSent = true;
      emailStatus = 'sent';
    } catch (emailError) {
      const resendStatus = emailError?.message?.match(/^RESEND_HTTP_(\d+)/)?.[1];
      emailStatus = emailError?.message === 'RESEND_API_KEY is not configured'
        ? 'missing-secret'
        : resendStatus
          ? `provider-http-${resendStatus}`
          : 'provider-rejected';
      console.error('VIP lead email delivery failed', emailError?.message || emailError);
    }

    return json({
      ok: true,
      message: requestType === 'newsletter'
        ? 'You are subscribed to Travel4You guide updates.'
        : 'Your VIP request has been received.',
      emailSent,
      emailStatus,
    }, 201);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/leads failed', error?.message || error);
    return json({ error: 'Unable to submit your request right now. Please try again.' }, 500);
  }
}
