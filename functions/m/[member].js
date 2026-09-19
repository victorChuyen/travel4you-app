/**
 * Cloudflare Pages Edge Function: Team Member Personalized Router
 * Route: /m/[member]
 * Example: blog.travel4u.us/m/rubi -> Sets 30-day member attribution cookie and redirects to app
 */

import teamMembers from '../../src/data/team_members.json';

export async function onRequest(context) {
  const { params, request } = context;
  const memberId = (params.member || '').toLowerCase().trim();
  const url = new URL(request.url);

  // Check if member exists in registry
  const member = teamMembers[memberId] || (memberId === 'master' ? teamMembers.master : null);
  const targetMemberId = member ? member.id : 'master';

  // Target destination: home or deep-link if query parameter ?to=... is passed
  const redirectTo = url.searchParams.get('to') || '/';
  const targetUrl = new URL(redirectTo, url.origin);
  targetUrl.searchParams.set('ref', targetMemberId);

  // Set 30-day tracking cookie
  const headers = new Headers({
    'Location': targetUrl.toString(),
    'Set-Cookie': `t4u_member_ref=${targetMemberId}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
  });

  return new Response(null, {
    status: 302,
    headers
  });
}
