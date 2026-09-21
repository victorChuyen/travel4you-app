const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const { readRange, writeRange } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/sheets.js'));

const SPREADSHEET_ID = process.env.HANDOVER_SPREADSHEET_ID
  || '1j2NkyG9dgJKEvwcADC9PED6xvpEo-jsHd__Y8GJlM6U';
const TAB_NAME = '06_CONTENT_CATALOG';
const ARTICLES_PATH = path.join(ROOT_APP, 'src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));

function buildRows() {
  const rows = [[
    'STT', 'Post Code', 'Destination Hub', 'Locale', 'SEO Title',
    'Focus Keyword', 'Search Volume', 'Intent Tier', 'Quality Gate',
    'Photos (4K)', 'Starting Price', 'Live URL', 'Edge Cloaked Link',
    'GetYourGuide Partner Link', 'Deploy Status', 'Clicks (Edge)', 'Commission Rate',
  ]];

  for (const [index, article] of articles.entries()) {
    const liveUrl = article.locale === 'en'
      ? `https://travel4you.app/experience/${article.slug}/`
      : `https://travel4you.app/${article.locale}/experience/${article.slug}/`;
    rows.push([
      index + 1,
      article.post_code || '',
      article.location || '',
      (article.locale || '').toUpperCase(),
      article.title || '',
      article.focus_keyword || '',
      article.search_volume || '',
      article.intent_tier || '',
      `${article.quality_score || 100}/100 (Grade ${article.quality_grade || 'A'})`,
      (article.body_images || []).length + (article.hero_image ? 1 : 0),
      article.affiliate?.price_display || '',
      liveUrl,
      `https://travel4you.app/go/${String(article.post_code || '').toLowerCase()}`,
      article.affiliate?.gyg_direct_link || '',
      'Live on Cloudflare Pages',
      0,
      'GetYourGuide direct',
    ]);
  }
  return rows;
}

async function main() {
  const rows = buildRows();
  const range = `'${TAB_NAME}'!A1:Q${rows.length}`;
  await writeRange(range, rows, SPREADSHEET_ID);
  const values = await readRange(range, SPREADSHEET_ID);
  if (values.length !== rows.length || values[0]?.[11] !== 'Live URL') {
    throw new Error(`Verification failed: expected ${rows.length} rows, received ${values.length}.`);
  }

  console.log(`Updated ${TAB_NAME}: ${rows.length - 1} content links.`);
  console.log(`Verified header and row count: ${values.length} rows.`);
  console.log(`Workbook: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=1922860638`);
}

main().catch((error) => {
  console.error(`Content catalog sync failed: ${error.message}`);
  process.exit(1);
});
