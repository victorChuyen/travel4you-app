const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const { readRange, writeRange, ensureTab } = require(path.resolve(
  ROOT_APP,
  '../credentials/travel4you/lib/sheets.js',
));

const SPREADSHEET_ID = process.env.HANDOVER_SPREADSHEET_ID
  || '1j2NkyG9dgJKEvwcADC9PED6xvpEo-jsHd__Y8GJlM6U';
const TAB_NAME = '07_AFFILIATE_CATALOG_1000';
const CATALOG_PATH = path.join(ROOT_APP, 'public/data/destinations_search_index.json');
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

function buildRows() {
  const rows = [[
    'STT', 'Product Code', 'Destination', 'Category', 'Region', 'Title',
    'Rating', 'Starting Price', 'Image', 'Search/Affiliate Link',
    'Partner ID', 'Campaign', 'Catalog Status', 'Editorial Status',
  ]];

  for (const item of catalog) {
    const url = String(item.u || '');
    const partner = new URL(url).searchParams.get('partner_id') || '';
    const campaign = new URL(url).searchParams.get('cmp') || '';
    rows.push([
      item.i || '',
      item.p || '',
      item.l || '',
      item.c || '',
      item.r || '',
      item.t || '',
      item.s || '',
      item.g || '',
      item.m || '',
      url,
      partner,
      campaign,
      'Affiliate catalog',
      item.d ? 'Editorial guide available' : 'Catalog only',
    ]);
  }
  return rows;
}

async function main() {
  const rows = buildRows();
  await ensureTab(TAB_NAME, SPREADSHEET_ID);
  const range = `'${TAB_NAME}'!A1:N${rows.length}`;
  await writeRange(range, rows, SPREADSHEET_ID);
  const values = await readRange(range, SPREADSHEET_ID);
  if (values.length !== rows.length || values[0]?.[9] !== 'Search/Affiliate Link') {
    throw new Error(`Verification failed: expected ${rows.length} rows, received ${values.length}.`);
  }
  console.log(`Updated ${TAB_NAME}: ${rows.length - 1} affiliate catalog points.`);
  console.log(`Verified row count: ${values.length} rows.`);
  console.log(`Workbook: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=1922860638`);
}

main().catch((error) => {
  console.error(`Affiliate catalog sync failed: ${error.message}`);
  process.exit(1);
});
