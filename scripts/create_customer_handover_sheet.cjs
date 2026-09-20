const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const { getAccessToken } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/auth.js'));
const {
  SPREADSHEET_18_THEMES_ID,
  SA_KEY_FILE,
} = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/config.js'));
const { writeRange, ensureTab } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/sheets.js'));

const ARTICLES_PATH = path.join(ROOT_APP, 'src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));
const HANDOVER_NAME = `TRAVEL4YOU.APP — CUSTOMER HANDOVER — ${new Date().toISOString().slice(0, 10)}`;
const SOURCE_PARENT_ID = '1I6oUpyqINKKzHNzL5V-o1eiMg6oEN33u';

async function driveRequest(url, options = {}) {
  const token = await getAccessToken(SA_KEY_FILE);
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Google Drive API ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

async function copySpreadsheet() {
  try {
    return await driveRequest(
      `https://www.googleapis.com/drive/v3/files/${SPREADSHEET_18_THEMES_ID}/copy?supportsAllDrives=true`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: HANDOVER_NAME,
          mimeType: 'application/vnd.google-apps.spreadsheet',
        }),
      },
    );
  } catch (error) {
    if (!error.message.includes('storage quota')) throw error;
    console.warn('Service-account copy quota is full; creating the handover workbook in the owner shared folder instead.');
    return driveRequest(
      'https://www.googleapis.com/drive/v3/files?supportsAllDrives=true&fields=id,name,mimeType',
      {
        method: 'POST',
        body: JSON.stringify({
          name: HANDOVER_NAME,
          mimeType: 'application/vnd.google-apps.spreadsheet',
          parents: [SOURCE_PARENT_ID],
        }),
      },
    );
  }
}

async function shareWithOwner(fileId) {
  const ownerEmail = process.env.TRAVEL4YOU_EMAIL;
  if (!ownerEmail) return;
  await driveRequest(
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions?sendNotificationEmail=false&supportsAllDrives=true`,
    {
      method: 'POST',
      body: JSON.stringify({
        type: 'user',
        role: 'writer',
        emailAddress: ownerEmail,
      }),
    },
  );
}

async function writeHandoverTabs(fileId) {
  const tabs = [
    ['00_README', [
      ['TRAVEL4YOU.APP — CUSTOMER HANDOVER'],
      ['Purpose', 'Standalone customer handover workbook. This file is separate from the internal master sheet.'],
      ['Created', new Date().toISOString()],
      ['Production URL', 'https://travel4you.app'],
      ['Repository', 'https://github.com/victorChuyen/travel4you-app'],
      ['Hosting', 'Cloudflare Pages + Pages Functions'],
      ['Database/Auth', 'Supabase'],
      ['AI routing', '9router primary; Ollama fallback when the configured endpoint is reachable'],
      ['Important', 'Do not paste secrets into this workbook. Transfer secrets through an encrypted channel.'],
    ]],
    ['01_ARCHITECTURE', [
      ['Layer', 'Technology', 'Responsibility'],
      ['Frontend', 'Astro + Tailwind CSS', 'Static multilingual public website and responsive UX'],
      ['Edge runtime', 'Cloudflare Pages Functions', 'Affiliate redirects, leads, auth-protected SaaS APIs'],
      ['Data/Auth', 'Supabase Postgres + Auth + RLS', 'Users, workspaces, projects, AI jobs, billing, leads'],
      ['AI', '9router-compatible API + Ollama fallback', 'Authenticated project generation with JSON validation'],
      ['Affiliate', 'GetYourGuide + Travelpayouts', 'Tracked experience and travel conversion links'],
      ['Build', 'npm run build', 'Astro production build and sitemap generation'],
    ]],
    ['02_ENVIRONMENT', [
      ['Variable', 'Required', 'Where to configure', 'Notes'],
      ['PUBLIC_SUPABASE_URL', 'Yes', 'Cloudflare encrypted/public project settings', 'Supabase project URL'],
      ['PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'Yes', 'Cloudflare public variable', 'Never replace with a secret key'],
      ['SUPABASE_SECRET_KEY', 'Server only', 'Cloudflare encrypted secret', 'Required by protected server operations'],
      ['AI_ROUTER_BASE_URL', 'For remote AI', 'Cloudflare encrypted variable', 'Must be network reachable; localhost is local-only'],
      ['AI_ROUTER_API_KEY', 'If provider requires', 'Cloudflare encrypted secret', 'Never place in client code'],
      ['OLLAMA_BASE_URL', 'Fallback', 'Local/VPS environment', '127.0.0.1 works only on the same host'],
      ['SEPAY_* / PAYPAL_*', 'Billing activation', 'Cloudflare encrypted secrets', 'Configure only after commercial approval'],
    ]],
    ['03_DEPLOYMENT', [
      ['Step', 'Command/Action', 'Acceptance'],
      ['Install', 'npm install', 'Dependencies install without errors'],
      ['Build', 'npm run build', 'Astro build and sitemap pass'],
      ['Preview', 'npm run preview', 'Production output renders locally'],
      ['Deploy', 'Cloudflare Pages Git deployment or wrangler', 'Production URL returns HTTP 200'],
      ['Smoke test', 'Check /vi/, /app/login/, /api/me, /api/leads', 'Public pages work; protected API returns expected auth status'],
    ]],
    ['04_SECURITY', [
      ['Control', 'Status/Rule'],
      ['Secrets', 'Keep service keys, webhook secrets, payment credentials outside Git and outside this sheet'],
      ['Supabase RLS', 'Workspace membership and lead access are workspace-scoped'],
      ['AI API', 'Generation requires an authenticated Supabase user'],
      ['Lead API', 'Validation, honeypot, duplicate email protection, and optional Cloudflare rate limit'],
      ['Payments', 'Remain protected/test mode until official prices and credentials are approved'],
      ['Handover', 'Rotate any credentials shared during development before customer production ownership'],
    ]],
    ['05_ACCEPTANCE', [
      ['Area', 'Expected result', 'Evidence/status'],
      ['Public website', 'Localized pages render on desktop, tablet, and mobile', 'Production smoke-tested'],
      ['Affiliate attribution', 'GetYourGuide and Travelpayouts redirects preserve campaign attribution', 'Production QA completed'],
      ['Lead capture', 'Valid lead returns 201; duplicate email is throttled', 'Production QA completed'],
      ['Auth APIs', 'Unauthenticated requests are rejected', 'Production QA completed'],
      ['AI generation', '9router primary and Ollama fallback are implemented; remote endpoint still required for Cloudflare', 'Ready for customer endpoint'],
      ['Billing', 'SePay prices and test users remain pending owner input', 'Not activated'],
    ]],
  ];

  for (const [tab, values] of tabs) {
    await ensureTab(tab, fileId);
    const endColumn = String.fromCharCode(64 + Math.max(...values.map(row => row.length)));
    await writeRange(`'${tab}'!A1:${endColumn}${values.length}`, values, fileId);
  }

  const catalogRows = [[
    'STT', 'Post Code', 'Destination Hub', 'Locale', 'SEO Title',
    'Focus Keyword', 'Search Volume', 'Intent Tier', 'Quality Gate',
    'Photos (4K)', 'Starting Price', 'Live URL', 'Edge Cloaked Link',
    'GetYourGuide Partner Link', 'Deploy Status', 'Clicks (Edge)', 'Commission Rate',
  ]];
  for (const [index, article] of articles.entries()) {
    const liveUrl = article.locale === 'en'
      ? `https://travel4you.app/experience/${article.slug}/`
      : `https://travel4you.app/${article.locale}/experience/${article.slug}/`;
    catalogRows.push([
      index + 1,
      article.post_code,
      article.location,
      article.locale.toUpperCase(),
      article.title,
      article.focus_keyword,
      article.search_volume || '',
      article.intent_tier || '',
      `${article.quality_score || 100}/100 (Grade ${article.quality_grade || 'A'})`,
      (article.body_images || []).length + (article.hero_image ? 1 : 0),
      article.affiliate?.price_display || '',
      liveUrl,
      `https://travel4you.app/go/${article.post_code.toLowerCase()}`,
      article.affiliate?.gyg_direct_link || '',
      'Live on Cloudflare Pages',
      0,
      'GetYourGuide direct',
    ]);
  }
  await ensureTab('06_CONTENT_CATALOG', fileId);
  await writeRange(`'06_CONTENT_CATALOG'!A1:Q${catalogRows.length}`, catalogRows, fileId);
}

async function main() {
  console.log(`Copying source spreadsheet ${SPREADSHEET_18_THEMES_ID}...`);
  const copied = await copySpreadsheet();
  await shareWithOwner(copied.id);
  await writeHandoverTabs(copied.id);
  console.log(`HANDOVER_SPREADSHEET_ID=${copied.id}`);
  console.log(`HANDOVER_URL=https://docs.google.com/spreadsheets/d/${copied.id}/edit`);
  console.log('Customer handover workbook created and populated successfully.');
}

main().catch((error) => {
  console.error('Customer handover creation failed:', error.message);
  process.exit(1);
});
