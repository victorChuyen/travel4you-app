/**
 * Comprehensive UX/Content cleanup:
 * 1. Update all 12 i18n disclaimers — remove technical IDs, add trust-focused copy
 * 2. Add missing Vietnamese (vi) locale to i18n.json
 * 3. Clean all 120 article HTML — remove technical jargon from disclosure blocks
 */
const fs = require('fs');
const path = require('path');

// ========== STEP 1: Fix i18n.json ==========
const I18N_PATH = path.resolve(__dirname, '..', 'src/data/i18n.json');
const i18n = JSON.parse(fs.readFileSync(I18N_PATH, 'utf8'));

// New trust-focused disclaimers (NO technical IDs, NO hashtags, NO "Cloudflare", NO "8%")
const newDisclaimers = {
  en: "Experiences featured here are personally vetted by our editorial team. Booking through our recommended links supports this independent guide at zero extra cost to you. Full 24-hour free cancellation on every journey.",
  vi: "Mỗi trải nghiệm được đội ngũ biên tập tuyển chọn và thẩm định kỹ lưỡng. Đặt chỗ qua liên kết đề xuất giúp duy trì cẩm nang độc lập này mà quý khách không phát sinh thêm bất kỳ chi phí nào. Cam kết hủy miễn phí 100% trong 24 giờ.",
  de: "Alle Erlebnisse werden von unserem Redaktionsteam persönlich geprüft. Buchungen über unsere empfohlenen Links unterstützen diesen unabhängigen Reiseführer — ohne Mehrkosten für Sie. 24-Stunden-Stornierung kostenlos.",
  fr: "Chaque expérience est personnellement sélectionnée par notre équipe éditoriale. Réserver via nos liens recommandés soutient ce guide indépendant sans frais supplémentaires pour vous. Annulation gratuite sous 24h.",
  es: "Cada experiencia es seleccionada personalmente por nuestro equipo editorial. Reservar a través de nuestros enlaces apoya esta guía independiente sin coste adicional para usted. Cancelación gratuita en 24 horas.",
  it: "Ogni esperienza è selezionata personalmente dal nostro team editoriale. Prenotare tramite i nostri link supporta questa guida indipendente senza costi aggiuntivi. Cancellazione gratuita entro 24 ore.",
  ja: "掲載の体験はすべて編集チームが厳選しています。推奨リンクからのご予約で本ガイドの運営を支援いただけます。追加費用は一切発生しません。24時間前まで無料キャンセル可能。",
  ko: "모든 체험은 편집팀이 직접 검증합니다. 추천 링크를 통한 예약은 이 독립 가이드 운영에 도움이 되며 추가 비용은 전혀 없습니다. 24시간 전 무료 취소 보장.",
  "zh-tw": "每項體驗均經編輯團隊親自甄選。透過推薦連結預訂可支持本獨立指南的營運，您不會產生任何額外費用。出發前24小時免費取消。",
  "zh-cn": "每项体验均经编辑团队亲自甄选。通过推荐链接预订可支持本独立指南的运营，您不会产生任何额外费用。出发前24小时免费取消。",
  pt: "Cada experiência é pessoalmente selecionada pela nossa equipa editorial. Reservar através dos nossos links apoia este guia independente sem custos adicionais para si. Cancelamento gratuito até 24 horas antes.",
  ru: "Каждый опыт лично проверен нашей редакцией. Бронирование по рекомендованным ссылкам поддерживает этот независимый путеводитель без дополнительных затрат для вас. Бесплатная отмена за 24 часа."
};

// Add Vietnamese locale if missing
if (!i18n.vi) {
  i18n.vi = {
    site_title: "Travel4You — Hành Trình Thượng Lưu",
    site_tagline: "Trải nghiệm VIP độc quyền trên toàn cầu",
    nav_home: "Trang Chủ",
    nav_experiences: "Trải Nghiệm VIP",
    nav_destinations: "Điểm Đến",
    nav_curators: "Giám Tuyển",
    hero_headline: "Những Hành Trình Được Giám Tuyển Dành Cho Người Sành Du Lịch",
    hero_subtitle: "Bỏ qua xếp hàng, bước qua cổng ưu tiên, và khám phá những trải nghiệm mà ít người được chạm tới.",
    cta_explore: "Khám Phá 10 Điểm Đến Vàng →",
    cta_view_tour: "Xem Chi Tiết & Đặt Chỗ",
    official_gyg_partner: "Đối Tác Chính Thức GetYourGuide",
    free_cancellation_badge: "✓ Hủy Miễn Phí 100% Trong 24h",
    filter_all: "Tất Cả",
    verified_reviews: "Đánh Giá Đã Xác Minh",
    footer_text: "Mạng lưới biên tập tuyển chọn những hành trình VIP, du thuyền riêng và trải nghiệm văn hóa đỉnh cao trên toàn cầu.",
    disclaimer: newDisclaimers.vi
  };
  console.log('✅ Added Vietnamese (vi) locale to i18n.json');
}

// Update disclaimers for all locales
Object.keys(newDisclaimers).forEach(locale => {
  if (i18n[locale]) {
    i18n[locale].disclaimer = newDisclaimers[locale];
    console.log(`✅ Updated disclaimer for [${locale}]`);
  }
});

fs.writeFileSync(I18N_PATH, JSON.stringify(i18n, null, 2), 'utf8');
console.log('\n📝 Saved i18n.json with 12 clean disclaimers\n');


// ========== STEP 2: Clean article HTML — remove technical jargon ==========
const ARTICLES_PATH = path.resolve(__dirname, '..', 'src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));

let cleanCount = 0;

articles.forEach(art => {
  let h = art.html;
  let changed = false;
  
  // Remove any remaining hashtag lines like "#GetYourGuidePartner #ad #Travel4ULuxury"
  const hashtagPattern = /#GetYourGuidePartner\s*#ad\s*#Travel4ULuxury/g;
  if (hashtagPattern.test(h)) {
    h = h.replace(hashtagPattern, '');
    changed = true;
  }
  
  // Remove "Official GetYourGuide Partner ID: 4G5BPIE" type text
  const partnerIdPattern = /Official GetYourGuide Partner\s*(ID:?\s*)?4G5BPIE\.?/gi;
  if (partnerIdPattern.test(h)) {
    h = h.replace(partnerIdPattern, '');
    changed = true;
  }
  
  // Remove "Deployed on Cloudflare Pages Edge" or similar technical text
  const cfPattern = /Deployed on Cloudflare Pages(?: Edge)?\.?/gi;
  if (cfPattern.test(h)) {
    h = h.replace(cfPattern, '');
    changed = true;
  }
  
  // Remove "8% GYG Direct" or "8% commission" text
  const commissionPattern = /8%\s*(GYG\s*Direct|commission)[^.]*\.?/gi;
  if (commissionPattern.test(h)) {
    h = h.replace(commissionPattern, '');
    changed = true;
  }
  
  // Remove "#4G5BPIE" from visible text (keep in URLs)
  // Only match #4G5BPIE NOT inside href attributes
  const rawIdPattern = /(?<!partner_id=)#4G5BPIE/g;
  if (rawIdPattern.test(h)) {
    h = h.replace(rawIdPattern, '');
    changed = true;
  }
  
  // Remove "Marker:? 770720" from visible text
  const markerPattern = /Marker:?\s*770720/gi;
  if (markerPattern.test(h)) {
    h = h.replace(markerPattern, '');
    changed = true;
  }
  
  if (changed) {
    art.html = h;
    cleanCount++;
  }
});

fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles), 'utf8');
console.log(`🧹 Cleaned technical jargon from ${cleanCount} articles`);
console.log(`📦 Total articles: ${articles.length}`);

// ========== STEP 3: Verify no technical leakage remains ==========
const reloaded = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));
const leaks = [];

reloaded.forEach(art => {
  const checks = [
    /#GetYourGuidePartner/,
    /Deployed on Cloudflare/i,
    /8%\s*commission/i,
    /#4G5BPIE(?!.*partner_id)/,
    /Marker:?\s*770720/i,
  ];
  
  checks.forEach(regex => {
    if (regex.test(art.html)) {
      leaks.push(`${art.post_code} ${art.locale}: ${regex.source}`);
    }
  });
});

if (leaks.length === 0) {
  console.log('\n✅ ZERO technical leakage detected across all 120 articles!');
} else {
  console.log(`\n⚠️ ${leaks.length} leaks found:`);
  leaks.forEach(l => console.log('  -', l));
}
