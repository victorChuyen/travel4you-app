const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const MEDIA_SRC = path.resolve(ROOT_APP, '../credentials/travel4you/blog.travel4u.us/Media-GYG');
const MEDIA_DEST = path.resolve(ROOT_APP, 'public/media');
const MULTI_ARTICLES_SRC = path.resolve(ROOT_APP, '../credentials/travel4you/blog.travel4u.us/data/multilingual_articles/blog');
const DATA_DEST = path.resolve(ROOT_APP, 'src/data');

fs.mkdirSync(MEDIA_DEST, { recursive: true });
fs.mkdirSync(DATA_DEST, { recursive: true });

console.log('🔄 Syncing Media-GYG photos into public/media/...');
let copiedImages = 0;

function copyImagesRecursively(srcDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(srcDir, entry.name);
    if (entry.isDirectory()) {
      copyImagesRecursively(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const destPath = path.join(MEDIA_DEST, entry.name);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(fullPath, destPath);
        copiedImages++;
      }
    }
  }
}

if (fs.existsSync(MEDIA_SRC)) {
  copyImagesRecursively(MEDIA_SRC);
  console.log(`✅ Copied/Verified ${copiedImages} UHD 4K images to public/media/`);
} else {
  console.warn('⚠️ MEDIA_SRC not found:', MEDIA_SRC);
}

// Sync 110 Multilingual Articles
console.log('🔄 Aggregating 110 Multilingual Articles into src/data/articles.json...');
const allArticles = [];
const hubsMap = new Map();

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'ja', 'ko', 'zh-tw', 'zh-cn', 'pt', 'ru'];

if (fs.existsSync(MULTI_ARTICLES_SRC)) {
  const hubFolders = fs.readdirSync(MULTI_ARTICLES_SRC, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith('gyg_'))
    .map(d => d.name);

  for (const folder of hubFolders) {
    const folderPath = path.join(MULTI_ARTICLES_SRC, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json') && !f.startsWith('bundle_'));

    for (const file of files) {
      const locale = file.replace('.json', '');
      const filePath = path.join(folderPath, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Clean image paths to use /media/[filename]
        if (data.hero_image && data.hero_image.filename) {
          data.hero_image.url = `/media/${data.hero_image.filename}`;
        }
        if (Array.isArray(data.body_images)) {
          data.body_images = data.body_images.map(img => ({
            ...img,
            url: `/media/${img.filename}`
          }));
        }

        // Adjust HTML body image paths
        if (data.content && data.content.html) {
          data.content.html = data.content.html.replace(/\/Media-GYG\/[^\/]+\/([^\/"]+\.jpg)/g, '/media/$1');
          data.content.html = data.content.html.replace(/\/Media-GYG\/Media-GYG\/([^\/"]+\.jpg)/g, '/media/$1');
        }

        allArticles.push({
          hub_folder: folder,
          locale,
          post_code: data.meta?.post_code,
          title: data.meta?.title,
          slug: data.meta?.slug,
          focus_keyword: data.meta?.focus_keyword,
          location: data.meta?.location,
          quality_score: data.meta?.quality_score,
          quality_grade: data.meta?.quality_grade,
          search_volume: data.meta?.search_volume,
          intent_tier: data.meta?.intent_tier,
          affiliate: data.affiliate,
          hero_image: data.hero_image,
          body_images: data.body_images,
          excerpt: data.content?.excerpt || data.seo?.meta_description,
          html: data.content?.html,
          seo: data.seo
        });

        // Track hub metadata
        if (!hubsMap.has(folder)) {
          hubsMap.set(folder, {
            hub_folder: folder,
            post_code: data.meta?.post_code,
            location: data.meta?.location,
            english_title: data.meta?.title,
            hero_image: data.hero_image?.url,
            rating: data.affiliate?.rating,
            price_display: data.affiliate?.price_display,
            gyg_direct_link: data.affiliate?.gyg_direct_link,
            slugs: {}
          });
        }
        hubsMap.get(folder).slugs[locale] = data.meta?.slug;

      } catch (err) {
        console.error(`Error reading ${filePath}:`, err.message);
      }
    }
  }
}

fs.writeFileSync(path.join(DATA_DEST, 'articles.json'), JSON.stringify(allArticles, null, 2));
console.log(`✅ Saved ${allArticles.length} articles to src/data/articles.json`);

const hubsList = Array.from(hubsMap.values());
fs.writeFileSync(path.join(DATA_DEST, 'destinations.json'), JSON.stringify(hubsList, null, 2));
console.log(`✅ Saved ${hubsList.length} flagship destinations to src/data/destinations.json`);

// Generate UI Dictionary
const i18nDictionary = {
  en: {
    site_title: 'Travel4You Sovereign Concierge',
    site_tagline: 'World’s Most Exclusive VIP Tours, Private Charters & Sanctuary Experiences',
    nav_home: 'Home',
    nav_experiences: 'VIP Experiences',
    nav_destinations: 'Destinations',
    nav_curators: 'Curator Gold List',
    hero_headline: 'Curated Sovereign Experiences for the Discerning Global Traveler',
    hero_subtitle: 'Discover private Seine cruises, Colosseum underground vaults, Como mahogany charters, and Kyoto tea sanctuaries. Verified GetYourGuide VIP Partner with 24h free cancellation.',
    cta_explore: 'Explore Gold List Experiences',
    cta_view_tour: 'Check Availability on GetYourGuide',
    official_gyg_partner: 'Official GetYourGuide VIP Partner 8% Direct',
    free_cancellation_badge: '⚡ 100% Free 24h Cancellation Guarantee',
    filter_all: 'All Destinations',
    verified_reviews: 'Verified VIP Reviews',
    footer_text: 'Travel4You Sovereign Concierge. Accredited Global Travel Connoisseur Network. All rights reserved.',
    disclaimer: 'Official GetYourGuide Partner ID: 4G5BPIE. Free cancellation up to 24 hours prior. #GetYourGuidePartner #ad'
  },
  de: {
    site_title: 'Travel4You Souveräner Concierge',
    site_tagline: 'Die exklusivsten VIP-Touren, Privatcharter und Rückzugsorte der Welt',
    nav_home: 'Startseite',
    nav_experiences: 'VIP-Erlebnisse',
    nav_destinations: 'Reiseziele',
    nav_curators: 'Gold-Liste',
    hero_headline: 'Kuratierte souveräne Erlebnisse für anspruchsvolle Weltreisende',
    hero_subtitle: 'Entdecken Sie private Seine-Kreuzfahrten, Kolosseum-Untergrund, Como-Mahagoniboote und Kyoto-Teezeremonien. 24h kostenlose Stornierung.',
    cta_explore: 'Gold-Liste Erlebnisse entdecken',
    cta_view_tour: 'Verfügbarkeit auf GetYourGuide prüfen',
    official_gyg_partner: 'Offizieller GetYourGuide VIP-Partner',
    free_cancellation_badge: '⚡ 100% Kostenlose Stornierung bis 24h vorher',
    filter_all: 'Alle Reiseziele',
    verified_reviews: 'Geprüfte VIP-Bewertungen',
    footer_text: 'Travel4You Souveräner Concierge. Alle Rechte vorbehalten.',
    disclaimer: 'Offizielle GetYourGuide Partner-ID: 4G5BPIE. Kostenlose Stornierung bis zu 24 Stunden vorher. #GetYourGuidePartner #ad'
  },
  fr: {
    site_title: 'Travel4You Conciergerie Souveraine',
    site_tagline: 'Les excursions VIP, affrètements privés et sanctuaires les plus exclusifs au monde',
    nav_home: 'Accueil',
    nav_experiences: 'Expériences VIP',
    nav_destinations: 'Destinations',
    nav_curators: 'Liste d\'Or',
    hero_headline: 'Expériences souveraines sélectionnées pour les voyageurs d\'élite',
    hero_subtitle: 'Croisières privées sur la Seine, souterrains du Colisée, bateaux en acajou sur le lac de Côme et sanctuaires de thé à Kyoto. Annulation gratuite 24h.',
    cta_explore: 'Découvrir la Liste d\'Or',
    cta_view_tour: 'Vérifier la disponibilité sur GetYourGuide',
    official_gyg_partner: 'Partenaire VIP Officiel GetYourGuide',
    free_cancellation_badge: '⚡ Garantie d\'annulation gratuite 100% jusqu\'à 24h',
    filter_all: 'Toutes les destinations',
    verified_reviews: 'Avis VIP Vérifiés',
    footer_text: 'Travel4You Conciergerie Souveraine. Tous droits réservés.',
    disclaimer: 'Partenaire officiel GetYourGuide ID : 4G5BPIE. Annulation gratuite jusqu\'à 24 heures avant le départ. #GetYourGuidePartner #ad'
  },
  ja: {
    site_title: 'Travel4You ソブリン・コンシェルジュ',
    site_tagline: '世界最高峰のVIPツアー、プライベートチャーター、極上の隠れ家',
    nav_home: 'ホーム',
    nav_experiences: 'VIP体験',
    nav_destinations: '目的地',
    nav_curators: 'ゴールドリスト',
    hero_headline: '世界の目利きトラベラーのための厳選された最高峰エクスペリエンス',
    hero_subtitle: 'セーヌ川プライベートクルーズ、コロッセオ地下アリーナ、コモ湖特注ウッドボート、京都祇園茶道体験。GetYourGuide公式VIPパートナー（24時間前まで無料キャンセル）。',
    cta_explore: 'ゴールドリストを見る',
    cta_view_tour: 'GetYourGuideで空き状況を確認する',
    official_gyg_partner: 'GetYourGuide 公式VIP認定パートナー',
    free_cancellation_badge: '⚡ 24時間前まで100%無料キャンセル保証',
    filter_all: 'すべての目的地',
    verified_reviews: '認証済みVIPレビュー',
    footer_text: 'Travel4You ソブリン・コンシェルジュ. 無断転載を禁じます。',
    disclaimer: 'GetYourGuide公式認定パートナーID: 4G5BPIE。ご出発の24時間前まで100%無料キャンセル。#GetYourGuidePartner #ad'
  },
  'zh-tw': {
    site_title: 'Travel4You 頂級尊榮禮賓',
    site_tagline: '全球最尊榮的VIP私人行程、遊艇包船與頂級奢華秘境',
    nav_home: '首頁',
    nav_experiences: 'VIP尊榮體驗',
    nav_destinations: '精選目的地',
    nav_curators: '金榜推薦',
    hero_headline: '為卓越品味旅人精心打造的全球巔峰奢華旅程',
    hero_subtitle: '塞納河私人晚餐遊船、羅馬競技場地下密道、科莫湖手工木船、京都嵐山私人茶道。GetYourGuide官方認證VIP夥伴，享出發前24小時全額免費取消。',
    cta_explore: '探索金榜體驗',
    cta_view_tour: '在 GetYourGuide 查詢即時名額',
    official_gyg_partner: 'GetYourGuide 官方認證 VIP 夥伴',
    free_cancellation_badge: '⚡ 24小時前全額免費取消保證',
    filter_all: '所有目的地',
    verified_reviews: '官方認證真實好評',
    footer_text: 'Travel4You 頂級尊榮禮賓. 版權所有。',
    disclaimer: 'GetYourGuide官方合作夥伴ID: 4G5BPIE。出發前24小時享全額免費退款保證。#GetYourGuidePartner #ad'
  }
};

// Fallbacks for remaining locales
['es', 'it', 'ko', 'zh-cn', 'pt', 'ru'].forEach(loc => {
  if (!i18nDictionary[loc]) {
    i18nDictionary[loc] = { ...i18nDictionary.en };
  }
});

fs.writeFileSync(path.join(DATA_DEST, 'i18n.json'), JSON.stringify(i18nDictionary, null, 2));
console.log('✅ Saved i18n dictionary to src/data/i18n.json');
