/**
 * Cloudflare Pages Edge Function: Smart Affiliate Link Cloaker & Geo-Tracker
 * Route: /go/[slug]
 * Partner: GetYourGuide ID 4G5BPIE (8% Commission)
 */

const TOURS_DIRECTORY = {
  // Paris
  'paris-seine': 'paris-l16/paris-seine-river-dinner-cruise-t402834',
  'gyg_paris_001': 'paris-l16/paris-seine-river-dinner-cruise-t402834',
  
  // Rome
  'rome-colosseum': 'rome-l33/rome-colosseum-underground-arena-tour-t412950',
  'gyg_rome_002': 'rome-l33/rome-colosseum-underground-arena-tour-t412950',
  
  // Como
  'como-boat': 'lake-como-l1887/lake-como-private-wooden-boat-tour-bellagio-t439201',
  'gyg_como_003': 'lake-como-l1887/lake-como-private-wooden-boat-tour-bellagio-t439201',
  
  // Kyoto
  'kyoto-tea': 'kyoto-l968/kyoto-arashiyama-bamboo-grove-tea-ceremony-vip-t428190',
  'gyg_kyoto_004': 'kyoto-l968/kyoto-arashiyama-bamboo-grove-tea-ceremony-vip-t428190',
  
  // Maldives
  'maldives-catamaran': 'maldives-l261/maldives-private-luxury-catamaran-manta-snorkeling-t478291',
  'gyg_maldives_005': 'maldives-l261/maldives-private-luxury-catamaran-manta-snorkeling-t478291',
  
  // Utah
  'antelope-canyon': 'page-arizona-l32388/antelope-canyon-horseshoe-bend-scenic-flight-t459201',
  'gyg_utah_006': 'page-arizona-l32388/antelope-canyon-horseshoe-bend-scenic-flight-t459201',
  
  // Serengeti
  'serengeti-balloon': 'serengeti-national-park-l3792/serengeti-sunrise-hot-air-balloon-safari-t492810',
  'gyg_safari_007': 'serengeti-national-park-l3792/serengeti-sunrise-hot-air-balloon-safari-t492810',
  
  // Venice
  'venice-gondola': 'venice-l35/venice-grand-canal-private-gondola-ride-t394812',
  'gyg_venice_008': 'venice-l35/venice-grand-canal-private-gondola-ride-t394812',
  
  // Swiss
  'jungfraujoch-alps': 'interlaken-l783/jungfraujoch-top-of-europe-swiss-alps-vip-t463920',
  'gyg_swiss_009': 'interlaken-l783/jungfraujoch-top-of-europe-swiss-alps-vip-t463920',
  
  // Dubai
  'burj-khalifa': 'dubai-l173/burj-khalifa-level-148-sky-lounge-vip-fast-track-t441920',
  'gyg_dubai_010': 'dubai-l173/burj-khalifa-level-148-sky-lounge-vip-fast-track-t441920'
};

export async function onRequest(context) {
  const { params, request } = context;
  const slug = (params.slug || '').toLowerCase();
  const country = request.cf?.country || 'US';
  const partnerId = '4G5BPIE';
  
  const targetPath = TOURS_DIRECTORY[slug] || '';
  
  let targetUrl = 'https://www.getyourguide.com/?partner_id=' + partnerId + '&cmp=t4u_' + country;
  
  if (targetPath) {
    targetUrl = `https://www.getyourguide.com/${targetPath}/?partner_id=${partnerId}&cmp=t4u_app_${country.toLowerCase()}_${slug}`;
  }

  return Response.redirect(targetUrl, 302);
}
