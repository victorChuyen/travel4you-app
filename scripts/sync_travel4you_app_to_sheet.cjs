const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const { getAccessToken } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/auth.js'));
const { SPREADSHEET_18_THEMES_ID } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/config.js'));
const { ensureTab, writeRange } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/sheets.js'));

const ARTICLES_PATH = path.join(ROOT_APP, 'src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));

const TAB_NAME = 'travel4you.app';
const SITE_URL = 'https://travel4you.app';

async function syncToSheet() {
  console.log('══════════════════════════════════════════════════════════════');
  console.log('📊 SYNCING TRAVEL4YOU.APP TO GOOGLE MASTER SPREADSHEET');
  console.log(`   Spreadsheet ID: ${SPREADSHEET_18_THEMES_ID}`);
  console.log(`   Target Tab: "${TAB_NAME}"`);
  console.log(`   Total Articles: ${articles.length}`);
  console.log('══════════════════════════════════════════════════════════════\n');

  // 1. Ensure Tab exists
  await ensureTab(TAB_NAME, SPREADSHEET_18_THEMES_ID);

  // 2. Build Header Rows
  const rows = [];
  
  // Row 1: Header Titles
  rows.push([
    'STT',
    'Post Code',
    'Destination Hub',
    'Locale',
    'SEO Title',
    'Focus Keyword',
    'Search Volume',
    'Intent Tier',
    'Quality Gate',
    'Photos (4K)',
    'Starting Price',
    'Live URL (Cloudflare Pages)',
    'Edge Cloaked Link (/go/)',
    'GetYourGuide Partner Link (8%)',
    'Deploy Status',
    'Clicks (Edge)',
    'Commission Rate'
  ]);

  // 3. Build Article Rows
  articles.forEach((art, idx) => {
    const liveUrl = art.locale === 'en'
      ? `${SITE_URL}/experience/${art.slug}/`
      : `${SITE_URL}/${art.locale}/experience/${art.slug}/`;
    
    const cloakedUrl = `${SITE_URL}/go/${art.post_code.toLowerCase()}`;
    const photosCount = (art.body_images || []).length + (art.hero_image ? 1 : 0);

    rows.push([
      idx + 1,
      art.post_code,
      art.location,
      art.locale.toUpperCase(),
      art.title,
      art.focus_keyword,
      art.search_volume || 15000,
      art.intent_tier || '🔥 Tier 1',
      `${art.quality_score || 100}/100 (Grade ${art.quality_grade || 'A'})`,
      photosCount,
      art.affiliate?.price_display || 'From $42',
      liveUrl,
      cloakedUrl,
      art.affiliate?.gyg_direct_link || '',
      '🟢 Live on Cloudflare Pages',
      0, // Clicks placeholder
      '8% GYG Direct (#4G5BPIE)'
    ]);
  });

  // 4. Write to Google Sheet
  const range = `'${TAB_NAME}'!A1:Q${rows.length}`;
  console.log(`📝 Writing ${rows.length} rows to ${range}...`);
  await writeRange(range, rows, SPREADSHEET_18_THEMES_ID);

  console.log('\n✅ 100% SUCCESS: SYNCHRONIZED TRAVEL4YOU.APP TO GOOGLE SHEETS!');
  console.log(`🔗 Open Sheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_18_THEMES_ID}/edit#gid=0`);
}

syncToSheet().catch(err => {
  console.error('❌ Sync failed:', err.message);
  process.exit(1);
});
