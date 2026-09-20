import { getSupabaseServiceClient, json, readJson } from './_lib/supabase.js';

const MAX = {
  name: 120,
  email: 254,
  phone: 32,
  destination: 160,
  budget: 80,
  message: 2000,
};
const REQUEST_TYPES = new Set(['private_itinerary', 'vip_experience', 'hotel_villa', 'other']);
const localRateLimit = new Map();

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

    const name = value(body, 'name');
    const email = value(body, 'email').toLowerCase();
    const phone = value(body, 'phone');
    const requestType = value(body, 'request_type');
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
    const { error } = await client.from('leads').insert({
      name,
      email,
      phone: phone || null,
      request_type: requestType,
      destination: destination || null,
      budget: budget || null,
      message: message || null,
      source: 'vip-footer',
      status: 'new',
    });
    if (error) throw error;

    return json({ ok: true, message: 'Your VIP request has been received.' }, 201);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error('POST /api/leads failed', error?.message || error);
    return json({ error: 'Unable to submit your request right now. Please try again.' }, 500);
  }
}
