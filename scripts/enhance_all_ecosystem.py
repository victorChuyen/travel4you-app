# -*- coding: utf-8 -*-
import json, os, re, shutil

ROOT_APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_SRC = os.path.normpath(os.path.join(ROOT_APP, '../credentials/travel4you/blog.travel4u.us/Media-GYG'))
MEDIA_DEST = os.path.join(ROOT_APP, 'public/media')
MULTI_ARTICLES_SRC = os.path.normpath(os.path.join(ROOT_APP, '../credentials/travel4you/blog.travel4u.us/data/multilingual_articles/blog'))
DATA_DEST = os.path.join(ROOT_APP, 'src/data')

os.makedirs(MEDIA_DEST, exist_ok=True)
os.makedirs(DATA_DEST, exist_ok=True)

print('🔄 Copying any missing Media-GYG photos into public/media/...')
if os.path.exists(MEDIA_SRC):
    for root, dirs, files in os.walk(MEDIA_SRC):
        for f in files:
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                src_file = os.path.join(root, f)
                dest_file = os.path.join(MEDIA_DEST, f)
                if not os.path.exists(dest_file):
                    shutil.copy2(src_file, dest_file)
print('✅ Media verified in public/media/')

# 12-LANGUAGE UI DICTIONARY
i18nDictionary = {
    'en': {
        'site_title': 'Travel4You Sovereign Concierge',
        'site_tagline': 'World’s Most Exclusive VIP Tours, Private Charters & Sanctuary Experiences',
        'nav_home': 'Home',
        'nav_experiences': 'VIP Experiences',
        'nav_destinations': 'Destinations',
        'nav_curators': 'Curator Gold List',
        'hero_headline': 'Curated Sovereign Experiences for Discerning Travelers',
        'hero_subtitle': 'Discover private Seine cruises, Colosseum underground vaults, Como mahogany charters, and Kyoto tea sanctuaries. Curated by Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Explore Gold List Experiences',
        'cta_view_tour': 'Check Live Rates on GetYourGuide',
        'official_gyg_partner': 'Official GetYourGuide Verified Partner',
        'free_cancellation_badge': '⚡ 100% Free 24h Cancellation Guarantee',
        'filter_all': 'All Destinations',
        'verified_reviews': 'Verified VIP Reviews',
        'footer_text': 'Travel4You Sovereign Concierge. Accredited Global Travel Connoisseur Network. Curated by Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'disclaimer': 'Curated by Luxury Victor Travel4U & Luxury Lucky Travel4U. Bookings are fulfilled through our verified GetYourGuide partnership with zero additional cost to you. Full 24-hour free cancellation applies to all confirmed experiences. #GetYourGuidePartner #ad'
    },
    'vi': {
        'site_title': 'Travel4You Sovereign Concierge',
        'site_tagline': 'Dịch Vụ Concierge Thượng Lưu: Tour VIP Độc Quyền, Du Thuyền Riêng & Thánh Địa Xa Xỉ',
        'nav_home': 'Trang Chủ',
        'nav_experiences': 'Trải Nghiệm VIP',
        'nav_destinations': 'Điểm Đến Tinh Hoa',
        'nav_curators': 'Danh Sách Vàng',
        'hero_headline': 'Trải Nghiệm Thượng Lưu Độc Bản Dành Cho Du Khách Tinh Hoa',
        'hero_subtitle': 'Du thuyền riêng trên sông Seine, mật đạo đấu trường La Mã Colosseum, ca-nô gỗ hồ Como và trà thất thiền định Kyoto. Giám tuyển bởi Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Khám Phá Danh Sách Vàng',
        'cta_view_tour': 'Xem Giá Trực Tiếp Trên GetYourGuide',
        'official_gyg_partner': 'Đối Tác Xác Thực Chính Thức GetYourGuide',
        'free_cancellation_badge': '⚡ Cam Kết Hủy Miễn Phí 100% Trong 24H',
        'filter_all': 'Tất Cả Điểm Đến',
        'verified_reviews': 'Đánh Giá VIP Xác Thực',
        'footer_text': 'Travel4You Sovereign Concierge. Mạng lưới giám tuyển du lịch thượng lưu độc bản toàn cầu. Đồng sáng lập & thẩm định bởi Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'disclaimer': 'Tuyển chọn bởi Luxury Victor Travel4U & Luxury Lucky Travel4U. Mọi dịch vụ được kết nối qua đối tác chính thức GetYourGuide hoàn toàn không phát sinh thêm chi phí cho quý khách. Hủy miễn phí 100% trước 24 giờ. #GetYourGuidePartner #ad'
    },
    'de': {
        'site_title': 'Travel4You Souveräner Concierge',
        'site_tagline': 'Die exklusivsten VIP-Touren, Privatcharter und Rückzugsorte der Welt',
        'nav_home': 'Startseite',
        'nav_experiences': 'VIP-Erlebnisse',
        'nav_destinations': 'Reiseziele',
        'nav_curators': 'Gold-Liste',
        'hero_headline': 'Kuratierte souveräne Erlebnisse für anspruchsvolle Weltreisende',
        'hero_subtitle': 'Entdecken Sie private Seine-Kreuzfahrten, Kolosseum-Untergrund, Como-Mahagoniboote und Kyoto-Teezeremonien. Kuratiert von Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Gold-Liste Erlebnisse entdecken',
        'cta_view_tour': 'Verfügbarkeit auf GetYourGuide prüfen',
        'official_gyg_partner': 'Offizieller GetYourGuide Verifizierter Partner',
        'free_cancellation_badge': '⚡ 100% Kostenlose Stornierung bis 24h vorher',
        'filter_all': 'Alle Reiseziele',
        'verified_reviews': 'Geprüfte VIP-Bewertungen',
        'footer_text': 'Travel4You Souveräner Concierge. Kuratiert von Luxury Victor Travel4U & Luxury Lucky Travel4U. Alle Rechte vorbehalten.',
        'disclaimer': 'Kuratiert von Luxury Victor Travel4U & Luxury Lucky Travel4U. Buchungen erfolgen über unsere offizielle GetYourGuide-Partnerschaft ohne zusätzliche Kosten für Sie. 24h kostenlose Stornierung. #GetYourGuidePartner #ad'
    },
    'fr': {
        'site_title': 'Travel4You Conciergerie Souveraine',
        'site_tagline': 'Les excursions VIP, affrètements privés et sanctuaires les plus exclusifs au monde',
        'nav_home': 'Accueil',
        'nav_experiences': 'Expériences VIP',
        'nav_destinations': 'Destinations',
        'nav_curators': 'Liste d'Or',
        'hero_headline': 'Expériences souveraines sélectionnées pour les voyageurs d'élite',
        'hero_subtitle': 'Croisières privées sur la Seine, souterrains du Colisée, bateaux en acajou sur le lac de Côme et sanctuaires de thé à Kyoto. Sélectionné par Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Découvrir la Liste d'Or',
        'cta_view_tour': 'Vérifier la disponibilité sur GetYourGuide',
        'official_gyg_partner': 'Partenaire Vérifié Officiel GetYourGuide',
        'free_cancellation_badge': '⚡ Garantie d'annulation gratuite 100% jusqu'à 24h',
        'filter_all': 'Toutes les destinations',
        'verified_reviews': 'Avis VIP Vérifiés',
        'footer_text': 'Travel4You Conciergerie Souveraine. Sélectionné par Luxury Victor Travel4U & Luxury Lucky Travel4U. Tous droits réservés.',
        'disclaimer': 'Sélectionné par Luxury Victor Travel4U & Luxury Lucky Travel4U. Les réservations sont effectuées via notre partenariat vérifié GetYourGuide sans aucun frais supplémentaire pour vous. Annulation 100% gratuite 24h. #GetYourGuidePartner #ad'
    },
    'es': {
        'site_title': 'Travel4You Sovereign Concierge',
        'site_tagline': 'Tours VIP exclusivos, vuelos privados y santuarios de lujo en todo el mundo',
        'nav_home': 'Inicio',
        'nav_experiences': 'Experiencias VIP',
        'nav_destinations': 'Destinos',
        'nav_curators': 'Lista de Oro',
        'hero_headline': 'Experiencias soberanas seleccionadas para viajeros exigentes',
        'hero_subtitle': 'Cruceros privados por el Sena, subterráneos del Coliseo, lanchas de caoba en el Lago de Como y templos de té en Kioto. Curado por Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Explorar la Lista de Oro',
        'cta_view_tour': 'Ver tarifas en GetYourGuide',
        'official_gyg_partner': 'Socio Verificado Oficial de GetYourGuide',
        'free_cancellation_badge': '⚡ Cancelación 100% gratuita hasta 24h antes',
        'filter_all': 'Todos los Destinos',
        'verified_reviews': 'Reseñas VIP Verificadas',
        'footer_text': 'Travel4You Sovereign Concierge. Curado por Luxury Victor Travel4U & Luxury Lucky Travel4U. Todos los derechos reservados.',
        'disclaimer': 'Curado por Luxury Victor Travel4U & Luxury Lucky Travel4U. Las reservas se procesan a través de nuestra asociación verificada con GetYourGuide sin costo adicional para usted. Cancelación gratuita de 24h. #GetYourGuidePartner #ad'
    },
    'it': {
        'site_title': 'Travel4You Sovereign Concierge',
        'site_tagline': 'I più esclusivi tour VIP, charter privati e ritiri di lusso nel mondo',
        'nav_home': 'Home',
        'nav_experiences': 'Esperienze VIP',
        'nav_destinations': 'Destinazioni',
        'nav_curators': 'Lista d'Oro',
        'hero_headline': 'Esperienze sovrane curate per viaggiatori sofisticati',
        'hero_subtitle': 'Crociere private sulla Senna, sotterranei del Colosseo, motoscafi in mogano sul Lago di Como e sale da tè a Kyoto. Curato da Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Esplora la Lista d'Oro',
        'cta_view_tour': 'Controlla disponibilità su GetYourGuide',
        'official_gyg_partner': 'Partner Verificato Ufficiale GetYourGuide',
        'free_cancellation_badge': '⚡ Cancellazione 100% gratuita fino a 24 ore prima',
        'filter_all': 'Tutte le Destinazioni',
        'verified_reviews': 'Recensioni VIP Verificate',
        'footer_text': 'Travel4You Sovereign Concierge. Curato da Luxury Victor Travel4U & Luxury Lucky Travel4U. Tutti i diritti riservati.',
        'disclaimer': 'Curato da Luxury Victor Travel4U & Luxury Lucky Travel4U. Le prenotazioni avvengono tramite la nostra partnership ufficiale con GetYourGuide senza alcun costo aggiuntivo per voi. Cancellazione gratuita 24h. #GetYourGuidePartner #ad'
    },
    'ja': {
        'site_title': 'Travel4You ソブリン・コンシェルジュ',
        'site_tagline': '世界最高峰のVIPツアー、プライベートチャーター、極上の隠れ家',
        'nav_home': 'ホーム',
        'nav_experiences': 'VIP体験',
        'nav_destinations': '目的地',
        'nav_curators': 'ゴールドリスト',
        'hero_headline': '世界の目利きトラベラーのための厳選された最高峰エクスペリエンス',
        'hero_subtitle': 'セーヌ川プライベートクルーズ、コロッセオ地下アリーナ、コモ湖特注ウッドボート、京都祇園茶道体験。Luxury Victor Travel4U & Luxury Lucky Travel4U 監修。',
        'cta_explore': 'ゴールドリストを見る',
        'cta_view_tour': 'GetYourGuideで空き状況を確認する',
        'official_gyg_partner': 'GetYourGuide 公式認証VIPパートナー',
        'free_cancellation_badge': '⚡ 24時間前まで100%無料キャンセル保証',
        'filter_all': 'すべての目的地',
        'verified_reviews': '認証済みVIPレビュー',
        'footer_text': 'Travel4You ソブリン・コンシェルジュ. 監修: Luxury Victor Travel4U & Luxury Lucky Travel4U. 無断転載を禁じます。',
        'disclaimer': 'Luxury Victor Travel4U & Luxury Lucky Travel4U 監修。公式パートナーシップGetYourGuide経由のご予約で追加料金は一切発生いたしません。24時間前まで100%無料キャンセル保証付きです。#GetYourGuidePartner #ad'
    },
    'ko': {
        'site_title': 'Travel4You 소버린 컨시어지',
        'site_tagline': '세계 최고 수준의 VIP 투어, 프라이빗 요트 차터 & 럭셔리 생추어리',
        'nav_home': '홈',
        'nav_experiences': 'VIP 익스피리언스',
        'nav_destinations': '추천 여행지',
        'nav_curators': '골드 리스트',
        'hero_headline': '품격 있는 글로벌 여행자를 위한 엄선된 최고급 럭셔리 여정',
        'hero_subtitle': '센강 프라이빗 디너 크루즈, 콜로세움 지하 비밀통로, 코모 호수 목조 요트, 교토 전통 다도실. Luxury Victor Travel4U & Luxury Lucky Travel4U 큐레이션.',
        'cta_explore': '골드 리스트 둘러보기',
        'cta_view_tour': 'GetYourGuide 실시간 요금 조회',
        'official_gyg_partner': 'GetYourGuide 공식 인증 파트너',
        'free_cancellation_badge': '⚡ 출발 24시간 전까지 100% 무료 취소 보장',
        'filter_all': '전체 여행지',
        'verified_reviews': '검증된 VIP 리뷰',
        'footer_text': 'Travel4You 소버린 컨시어지. 큐레이션: Luxury Victor Travel4U & Luxury Lucky Travel4U. All rights reserved.',
        'disclaimer': 'Luxury Victor Travel4U & Luxury Lucky Travel4U 큐레이션. 공식 GetYourGuide 파트너십을 통해 제공되며 추가 비용이 전혀 발생하지 않습니다. 전 일정 24시간 무료 취소 지원. #GetYourGuidePartner #ad'
    },
    'zh-tw': {
        'site_title': 'Travel4You 頂級尊榮禮賓',
        'site_tagline': '全球最尊榮的VIP私人行程、遊艇包船與頂級奢華秘境',
        'nav_home': '首頁',
        'nav_experiences': 'VIP尊榮體驗',
        'nav_destinations': '精選目的地',
        'nav_curators': '金榜推薦',
        'hero_headline': '為卓越品味旅人精心打造的全球巔峰奢華旅程',
        'hero_subtitle': '塞納河私人晚餐遊船、羅馬競技場地下密道、科莫湖手工木船、京都嵐山私人茶道。由 Luxury Victor Travel4U 與 Luxury Lucky Travel4U 親自特選策劃。',
        'cta_explore': '探索金榜體驗',
        'cta_view_tour': '在 GetYourGuide 查詢即時名額',
        'official_gyg_partner': 'GetYourGuide 官方認證夥伴',
        'free_cancellation_badge': '⚡ 24小時前全額免費取消保證',
        'filter_all': '所有目的地',
        'verified_reviews': '官方認證真實好評',
        'footer_text': 'Travel4You 頂級尊榮禮賓. 由 Luxury Victor Travel4U & Luxury Lucky Travel4U 策劃保證. 版權所有。',
        'disclaimer': '由 Luxury Victor Travel4U 與 Luxury Lucky Travel4U 策劃保證。透過 GetYourGuide 官方夥伴連結預訂，完全不需額外費用。出發前24小時享全額免費退款保證。#GetYourGuidePartner #ad'
    },
    'zh-cn': {
        'site_title': 'Travel4You 尊荣礼宾平台',
        'site_tagline': '全球顶级VIP私人定制行程、豪华包船与奢华隐世秘境',
        'nav_home': '首页',
        'nav_experiences': 'VIP尊享体验',
        'nav_destinations': '甄选目的地',
        'nav_curators': '金榜推荐',
        'hero_headline': '为全球尊尚旅者精心打造的非凡探索之旅',
        'hero_subtitle': '塞纳河私人晚宴游船、古罗马斗兽场地宫、科莫湖手工红木快艇、京都私密禅意茶道。由 Luxury Victor Travel4U 与 Luxury Lucky Travel4U 权威甄选。',
        'cta_explore': '探索金榜体验',
        'cta_view_tour': '前往 GetYourGuide 实时查位',
        'official_gyg_partner': 'GetYourGuide 官方认证合作伙伴',
        'free_cancellation_badge': '⚡ 24小时前全额免费取消保障',
        'filter_all': '全部目的地',
        'verified_reviews': '权威VIP真实评价',
        'footer_text': 'Travel4You 尊荣礼宾平台. 由 Luxury Victor Travel4U 与 Luxury Lucky Travel4U 权威甄选. 版权所有。',
        'disclaimer': '由 Luxury Victor Travel4U 与 Luxury Lucky Travel4U 甄选推荐。通过官方合作伙伴 GetYourGuide 预订无需支付任何额外费用。全线产品支持24小时前100%全额免费退订。#GetYourGuidePartner #ad'
    },
    'pt': {
        'site_title': 'Travel4You Concierge Soberano',
        'site_tagline': 'Os passeios VIP mais exclusivos, fretamentos privados e refúgios de luxo do mundo',
        'nav_home': 'Início',
        'nav_experiences': 'Experiências VIP',
        'nav_destinations': 'Destinos',
        'nav_curators': 'Lista de Ouro',
        'hero_headline': 'Experiências soberanas com curadoria para viajantes exigentes',
        'hero_subtitle': 'Cruzeiros privados no Sena, subterrâneos do Coliseu, lanchas clássicas no Lago Como e cerimônias de chá em Kyoto. Curadoria por Luxury Victor Travel4U & Luxury Lucky Travel4U.',
        'cta_explore': 'Explorar a Lista de Ouro',
        'cta_view_tour': 'Verificar disponibilidade no GetYourGuide',
        'official_gyg_partner': 'Parceiro Verificado Oficial GetYourGuide',
        'free_cancellation_badge': '⚡ Cancelamento 100% gratuito até 24h antes',
        'filter_all': 'Todos os Destinos',
        'verified_reviews': 'Avaliações VIP Verificadas',
        'footer_text': 'Travel4You Concierge Soberano. Curadoria por Luxury Victor Travel4U & Luxury Lucky Travel4U. Todos os direitos reservados.',
        'disclaimer': 'Curadoria por Luxury Victor Travel4U & Luxury Lucky Travel4U. As reservas são processadas através da nossa parceria com o GetYourGuide sem nenhum custo adicional para você. Cancelamento gratuito em 24h. #GetYourGuidePartner #ad'
    },
    'ru': {
        'site_title': 'Travel4You Sovereign Concierge',
        'site_tagline': 'Самые эксклюзивные VIP-туры, частные чартеры и элитные убежища мира',
        'nav_home': 'Главная',
        'nav_experiences': 'VIP-Впечатления',
        'nav_destinations': 'Направления',
        'nav_curators': 'Золотой Список',
        'hero_headline': 'Кураторские путешествия высшего класса для искушенных гостей',
        'hero_subtitle': 'Частные круизы по Сене, подземелья Колизея, катера на озере Комо и чайные дома Киото. Кураторы: Luxury Victor Travel4U и Luxury Lucky Travel4U.',
        'cta_explore': 'Открыть Золотой Список',
        'cta_view_tour': 'Узнать цены на GetYourGuide',
        'official_gyg_partner': 'Официальный верифицированный партнер GetYourGuide',
        'free_cancellation_badge': '⚡ 100% бесплатная отмена бронирования за 24 часа',
        'filter_all': 'Все направления',
        'verified_reviews': 'Проверенные VIP-отзывы',
        'footer_text': 'Travel4You Sovereign Concierge. Кураторы: Luxury Victor Travel4U и Luxury Lucky Travel4U. Все права защищены.',
        'disclaimer': 'Отобрано экспертами Luxury Victor Travel4U и Luxury Lucky Travel4U. Бронирование осуществляется через партнерство с GetYourGuide без каких-либо дополнительных комиссий для вас. Бесплатная отмена за 24 часа. #GetYourGuidePartner #ad'
    }
}

with open(os.path.join(DATA_DEST, 'i18n.json'), 'w', encoding='utf-8') as f:
    json.dump(i18nDictionary, f, indent=2, ensure_ascii=False)
print('✅ Saved 12-language i18n dictionary to src/data/i18n.json')
