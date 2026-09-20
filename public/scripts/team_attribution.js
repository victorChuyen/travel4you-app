/**
 * 👑 TRAVEL4U MULTI-TENANT TEAM ATTRIBUTION CLIENT ENGINE
 * Handles:
 *  - URL param ?ref= or ?m= detection
 *  - 30-day Cookie persistence (t4u_member_ref)
 *  - Dynamic rewriting of 1,000 GetYourGuide affiliate links for paid team members
 *  - High-trust curator badge injection
 */

(function () {
  const COOKIE_NAME = 't4u_member_ref';
  const COOKIE_DAYS = 30;

  function getCookie(name) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + '=' + value + ';path=/;max-age=' + (days * 86400) + ';SameSite=Lax';
  }

  // 1. Detect member from query params
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref') || urlParams.get('m');
  
  if (refParam) {
    setCookie(COOKIE_NAME, refParam.toLowerCase().trim(), COOKIE_DAYS);
  }

  const activeMemberId = (refParam || getCookie(COOKIE_NAME) || '').toLowerCase().trim();

  // Registry cache
  let membersRegistry = null;

  async function getRegistry() {
    if (membersRegistry) return membersRegistry;
    try {
      const res = await fetch('/data/team_members.json');
      if (res.ok) {
        membersRegistry = await res.json();
        return membersRegistry;
      }
    } catch (e) {
      console.warn('Could not load team members registry:', e);
    }
    return {};
  }

  // Rewrite GYG links on the page
  window.getAttributedGygUrl = function (originalUrl) {
    if (!originalUrl) return originalUrl;
    if (!activeMemberId || activeMemberId === 'master') return originalUrl;
    
    // If we have loaded registry, use exact partner ID
    const member = membersRegistry ? membersRegistry[activeMemberId] : null;
    const partnerId = (member && member.active) ? member.gyg_partner_id : 'D5OEC57';
    const subId = (member && member.active) ? member.sub_id_prefix : activeMemberId;

    try {
      const parsed = new URL(originalUrl);
      if (parsed.hostname.includes('getyourguide.com')) {
        parsed.searchParams.set('partner_id', partnerId);
        const currentCmp = parsed.searchParams.get('cmp') || 'app_1000';
        const memberPrefix = `team_${subId}_`;
        const normalizedCmp = currentCmp.startsWith(memberPrefix)
          ? currentCmp
          : `${memberPrefix}${currentCmp.replace(/^(app_1000_|t4u_app_)/, '')}`;
        parsed.searchParams.set('cmp', normalizedCmp);
        return parsed.toString();
      }
    } catch (e) {
      return originalUrl;
    }
    return originalUrl;
  };

  async function applyAttribution() {
    if (!activeMemberId || activeMemberId === 'master') return;

    const registry = await getRegistry();
    const member = registry[activeMemberId];
    if (!member || !member.active) return;

    // 1. Rewrite existing anchor tags on page
    document.querySelectorAll('a[href*="getyourguide.com"]').forEach(a => {
      a.href = window.getAttributedGygUrl(a.href);
    });

    // 2. Inject high-trust curator banner if not already present
    let banner = document.getElementById('team-curator-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'team-curator-banner';
      const compactName = member.name.replace(/^Luxury\s+/i, '');
      banner.setAttribute('role', 'status');
      banner.setAttribute('aria-label', `${compactName} attribution active`);
      banner.className = 'w-full bg-[#071424] border-b border-[#c9a54e]/40 py-1.5 sm:py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs leading-tight text-slate-300 flex items-center justify-center z-40 transition-all';
      banner.innerHTML = `
        <span class="inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
        <span class="sm:hidden max-w-[calc(100vw-2.5rem)] truncate"><strong>${compactName}</strong><span class="text-slate-500"> · </span><span class="text-[#c9a54e] font-semibold">${member.badge || 'Verified Partner'}</span></span>
        <span class="hidden sm:inline-flex items-center gap-2"><span>Traveling with <strong>${member.name}</strong></span><span class="text-slate-500">•</span><span class="text-[#c9a54e] font-semibold">${member.badge || 'Verified Partner'}</span><span class="text-slate-500">•</span><span class="text-slate-400">Explore curated experiences</span></span>
      `;
      document.body.prepend(banner);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAttribution);
  } else {
    applyAttribution();
  }
})();
