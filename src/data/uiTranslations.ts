export type SupportedLocale = 'en' | 'vi' | 'de' | 'fr' | 'es' | 'it' | 'ja' | 'ko' | 'zh-tw' | 'zh-cn' | 'pt' | 'ru';

type UiTranslation = {
  concierge: string;
  selectLanguage: string;
  toggleMenu: string;
  save: string;
  share: string;
  startingFrom: string;
  curatedAccess: string;
  readGuide: string;
  reserve: string;
  footerCta: string;
  footerCtaBody: string;
  newsletterEmail: string;
  newsletterSubmit: string;
  name: string;
  phone: string;
  destination: string;
  help: string;
  privateItinerary: string;
  vipExperience: string;
  hotelVilla: string;
  otherRequest: string;
  budget: string;
  message: string;
  submit: string;
  vipPartner: string;
};

const translations: Record<SupportedLocale, UiTranslation> = {
  en: {
    concierge: 'Sovereign Concierge', selectLanguage: 'Select language', toggleMenu: 'Toggle mobile navigation',
    save: 'Bookmark this experience', share: 'Share with friends', startingFrom: 'Starting from',
    curatedAccess: 'Curated VIP priority access; cancellation terms vary by provider.', readGuide: 'Read Guide',
    reserve: 'Reserve VIP', footerCta: 'Receive new luxury travel guides.',
    footerCtaBody: 'Join the Travel4You list for new destination guides, private experience ideas, and carefully selected booking links.',
    newsletterEmail: 'Your email address *', newsletterSubmit: 'Get the latest guides',
    name: 'Your name *', phone: 'Phone', destination: 'Preferred destination', help: 'What can we arrange? *',
    privateItinerary: 'Private itinerary', vipExperience: 'VIP experience', hotelVilla: 'Hotel / villa',
    otherRequest: 'Other request', budget: 'Estimated budget', message: 'Tell us briefly what you need',
    submit: 'Request VIP consultation', vipPartner: 'Official GetYourGuide Verified Partner'
  },
  vi: {
    concierge: 'Tư vấn du lịch thượng lưu', selectLanguage: 'Chọn ngôn ngữ', toggleMenu: 'Mở hoặc đóng menu điều hướng',
    save: 'Lưu trải nghiệm này', share: 'Chia sẻ trải nghiệm này', startingFrom: 'Giá từ',
    curatedAccess: 'Ưu tiên vào cửa theo từng trải nghiệm; điều kiện hủy áp dụng theo chính sách nhà cung cấp.', readGuide: 'Xem cẩm nang',
    reserve: 'Xem chỗ trống', footerCta: 'Nhận cẩm nang du lịch mới.',
    footerCtaBody: 'Đăng ký Travel4You để nhận cẩm nang điểm đến, ý tưởng trải nghiệm riêng và các liên kết đặt dịch vụ được tuyển chọn.',
    newsletterEmail: 'Email của bạn *', newsletterSubmit: 'Nhận cẩm nang mới',
    name: 'Họ tên *', phone: 'Số điện thoại', destination: 'Điểm đến mong muốn', help: 'Bạn cần hỗ trợ gì? *',
    privateItinerary: 'Lịch trình riêng', vipExperience: 'Trải nghiệm VIP', hotelVilla: 'Khách sạn / villa',
    otherRequest: 'Yêu cầu khác', budget: 'Ngân sách dự kiến', message: 'Mô tả ngắn yêu cầu của bạn',
    submit: 'Nhận tư vấn VIP', vipPartner: 'Đối tác trải nghiệm chính thức của GetYourGuide'
  },
  de: {
    concierge: 'Souveräner Concierge', selectLanguage: 'Sprache auswählen', toggleMenu: 'Mobiles Navigationsmenü öffnen',
    save: 'Erlebnis speichern', share: 'Erlebnis teilen', startingFrom: 'Ab',
    curatedAccess: 'Kuratierter VIP-Zugang; Stornobedingungen können je nach Anbieter variieren.', readGuide: 'Guide lesen',
    reserve: 'VIP reservieren', footerCta: 'Neue Luxus-Reiseguides erhalten.',
    footerCtaBody: 'Erhalten Sie neue Reiseguides, private Erlebnisideen und ausgewählte Buchungslinks von Travel4You.',
    newsletterEmail: 'Ihre E-Mail-Adresse *', newsletterSubmit: 'Neue Guides erhalten',
    name: 'Ihr Name *', phone: 'Telefon', destination: 'Gewünschtes Reiseziel', help: 'Was dürfen wir arrangieren? *',
    privateItinerary: 'Private Reiseroute', vipExperience: 'VIP-Erlebnis', hotelVilla: 'Hotel / Villa',
    otherRequest: 'Andere Anfrage', budget: 'Geplantes Budget', message: 'Beschreiben Sie kurz Ihren Wunsch',
    submit: 'VIP-Beratung anfragen', vipPartner: 'Offizieller GetYourGuide-Partner'
  },
  fr: {
    concierge: 'Conciergerie souveraine', selectLanguage: 'Choisir la langue', toggleMenu: 'Ouvrir le menu mobile',
    save: 'Enregistrer cette expérience', share: 'Partager cette expérience', startingFrom: 'À partir de',
    curatedAccess: 'Accès VIP prioritaire sélectionné; les conditions d’annulation varient selon le prestataire.', readGuide: 'Lire le guide',
    reserve: 'Réserver en VIP', footerCta: 'Recevez nos nouveaux guides de voyage.',
    footerCtaBody: 'Recevez les nouveaux guides, idées d’expériences privées et liens de réservation sélectionnés par Travel4You.',
    newsletterEmail: 'Votre adresse e-mail *', newsletterSubmit: 'Recevoir les nouveaux guides',
    name: 'Votre nom *', phone: 'Téléphone', destination: 'Destination souhaitée', help: 'Que pouvons-nous organiser ? *',
    privateItinerary: 'Itinéraire privé', vipExperience: 'Expérience VIP', hotelVilla: 'Hôtel / villa',
    otherRequest: 'Autre demande', budget: 'Budget estimé', message: 'Décrivez brièvement votre demande',
    submit: 'Demander une consultation VIP', vipPartner: 'Partenaire officiel GetYourGuide'
  },
  es: {
    concierge: 'Conserjería soberana', selectLanguage: 'Elegir idioma', toggleMenu: 'Abrir menú móvil',
    save: 'Guardar esta experiencia', share: 'Compartir esta experiencia', startingFrom: 'Desde',
    curatedAccess: 'Acceso VIP prioritario seleccionado; las condiciones de cancelación dependen del proveedor.', readGuide: 'Leer guía',
    reserve: 'Reservar VIP', footerCta: 'Reciba nuevos guías de viajes de lujo.',
    footerCtaBody: 'Reciba nuevos destinos, ideas de experiencias privadas y enlaces de reserva seleccionados por Travel4You.',
    newsletterEmail: 'Su correo electrónico *', newsletterSubmit: 'Recibir nuevos guías',
    name: 'Su nombre *', phone: 'Teléfono', destination: 'Destino preferido', help: '¿Qué podemos organizar? *',
    privateItinerary: 'Itinerario privado', vipExperience: 'Experiencia VIP', hotelVilla: 'Hotel / villa',
    otherRequest: 'Otra solicitud', budget: 'Presupuesto estimado', message: 'Describa brevemente lo que necesita',
    submit: 'Solicitar consulta VIP', vipPartner: 'Socio oficial de GetYourGuide'
  },
  it: {
    concierge: 'Concierge sovrano', selectLanguage: 'Scegli lingua', toggleMenu: 'Apri menu mobile',
    save: 'Salva questa esperienza', share: 'Condividi questa esperienza', startingFrom: 'A partire da',
    curatedAccess: 'Accesso VIP prioritario selezionato; le condizioni di cancellazione variano secondo il fornitore.', readGuide: 'Leggi la guida',
    reserve: 'Prenota VIP', footerCta: 'Ricevi le nuove guide di viaggio.',
    footerCtaBody: 'Ricevi nuove destinazioni, idee di esperienze private e link di prenotazione selezionati da Travel4You.',
    newsletterEmail: 'Il tuo indirizzo email *', newsletterSubmit: 'Ricevi le nuove guide',
    name: 'Il tuo nome *', phone: 'Telefono', destination: 'Destinazione preferita', help: 'Cosa possiamo organizzare? *',
    privateItinerary: 'Itinerario privato', vipExperience: 'Esperienza VIP', hotelVilla: 'Hotel / villa',
    otherRequest: 'Altra richiesta', budget: 'Budget stimato', message: 'Descrivi brevemente ciò che ti serve',
    submit: 'Richiedi consulenza VIP', vipPartner: 'Partner ufficiale GetYourGuide'
  },
  ja: {
    concierge: 'ソブリン・コンシェルジュ', selectLanguage: '言語を選択', toggleMenu: 'モバイルメニューを開く',
    save: 'この体験を保存', share: 'この体験を共有', startingFrom: '料金',
    curatedAccess: '厳選されたVIP優先アクセス。キャンセル条件は提供者により異なります。', readGuide: 'ガイドを見る',
    reserve: 'VIP予約', footerCta: '新しいラグジュアリー旅行ガイドを受け取る。',
    footerCtaBody: '新しい旅行ガイド、プライベート体験のアイデア、厳選した予約リンクをお届けします。',
    newsletterEmail: 'メールアドレス *', newsletterSubmit: '最新ガイドを受け取る',
    name: 'お名前 *', phone: '電話番号', destination: 'ご希望の目的地', help: '何を手配しましょうか？ *',
    privateItinerary: 'プライベート旅程', vipExperience: 'VIP体験', hotelVilla: 'ホテル / ヴィラ',
    otherRequest: 'その他', budget: '予算の目安', message: 'ご希望を簡単にお聞かせください',
    submit: 'VIP相談を申し込む', vipPartner: 'GetYourGuide公式パートナー'
  },
  ko: {
    concierge: '소버린 컨시어지', selectLanguage: '언어 선택', toggleMenu: '모바일 메뉴 열기',
    save: '이 경험 저장', share: '이 경험 공유', startingFrom: '최저가',
    curatedAccess: '엄선된 VIP 우선 입장; 취소 조건은 제공업체에 따라 다릅니다.', readGuide: '가이드 보기',
    reserve: 'VIP 예약', footerCta: '새로운 럭셔리 여행 가이드를 받아보세요.',
    footerCtaBody: '새로운 여행지 가이드와 프라이빗 체험 아이디어, 엄선한 예약 링크를 받아보세요.',
    newsletterEmail: '이메일 주소 *', newsletterSubmit: '최신 가이드 받기',
    name: '이름 *', phone: '전화번호', destination: '희망 목적지', help: '무엇을 준비해 드릴까요? *',
    privateItinerary: '프라이빗 일정', vipExperience: 'VIP 체험', hotelVilla: '호텔 / 빌라',
    otherRequest: '기타 요청', budget: '예상 예산', message: '필요한 내용을 간단히 알려주세요',
    submit: 'VIP 상담 신청', vipPartner: 'GetYourGuide 공식 파트너'
  },
  'zh-tw': {
    concierge: '頂級尊榮禮賓', selectLanguage: '選擇語言', toggleMenu: '開啟行動選單',
    save: '收藏此體驗', share: '分享此體驗', startingFrom: '起價',
    curatedAccess: '精選VIP優先入場；取消條款依供應商而異。', readGuide: '查看指南',
    reserve: 'VIP預訂', footerCta: '接收最新奢華旅行指南。',
    footerCtaBody: '接收 Travel4You 的最新目的地指南、私人體驗靈感與精選預訂連結。',
    newsletterEmail: '您的電子郵件 *', newsletterSubmit: '接收最新指南',
    name: '姓名 *', phone: '電話', destination: '心儀目的地', help: '您需要什麼安排？ *',
    privateItinerary: '私人行程', vipExperience: 'VIP體驗', hotelVilla: '飯店 / 別墅',
    otherRequest: '其他需求', budget: '預估預算', message: '請簡述您的需求',
    submit: '申請VIP諮詢', vipPartner: 'GetYourGuide官方合作夥伴'
  },
  'zh-cn': {
    concierge: '顶级尊荣礼宾', selectLanguage: '选择语言', toggleMenu: '打开移动菜单',
    save: '收藏此体验', share: '分享此体验', startingFrom: '起价',
    curatedAccess: '精选VIP优先入场；取消条款因供应商而异。', readGuide: '查看指南',
    reserve: 'VIP预订', footerCta: '接收最新奢华旅行指南。',
    footerCtaBody: '接收 Travel4You 的最新目的地指南、私人体验灵感与精选预订链接。',
    newsletterEmail: '您的电子邮箱 *', newsletterSubmit: '接收最新指南',
    name: '姓名 *', phone: '电话', destination: '心仪目的地', help: '您需要什么安排？ *',
    privateItinerary: '私人行程', vipExperience: 'VIP体验', hotelVilla: '酒店 / 别墅',
    otherRequest: '其他需求', budget: '预计预算', message: '请简述您的需求',
    submit: '申请VIP咨询', vipPartner: 'GetYourGuide官方合作伙伴'
  },
  pt: {
    concierge: 'Concierge soberano', selectLanguage: 'Escolher idioma', toggleMenu: 'Abrir menu móvel',
    save: 'Guardar esta experiência', share: 'Partilhar esta experiência', startingFrom: 'A partir de',
    curatedAccess: 'Acesso VIP prioritário selecionado; as condições de cancelamento variam por fornecedor.', readGuide: 'Ler guia',
    reserve: 'Reservar VIP', footerCta: 'Receba novos guias de viagem de luxo.',
    footerCtaBody: 'Receba novos destinos, ideias de experiências privadas e links de reserva selecionados pela Travel4You.',
    newsletterEmail: 'O seu endereço de e-mail *', newsletterSubmit: 'Receber novos guias',
    name: 'O seu nome *', phone: 'Telefone', destination: 'Destino preferido', help: 'O que podemos organizar? *',
    privateItinerary: 'Itinerário privado', vipExperience: 'Experiência VIP', hotelVilla: 'Hotel / villa',
    otherRequest: 'Outro pedido', budget: 'Orçamento estimado', message: 'Descreva brevemente o que precisa',
    submit: 'Pedir consulta VIP', vipPartner: 'Parceiro oficial GetYourGuide'
  },
  ru: {
    concierge: 'Суверенный консьерж', selectLanguage: 'Выберите язык', toggleMenu: 'Открыть мобильное меню',
    save: 'Сохранить впечатление', share: 'Поделиться впечатлением', startingFrom: 'От',
    curatedAccess: 'Отобранный VIP-доступ; условия отмены зависят от поставщика.', readGuide: 'Открыть гид',
    reserve: 'Забронировать VIP', footerCta: 'Получайте новые гиды по роскошным путешествиям.',
    footerCtaBody: 'Получайте новые гиды, идеи частных впечатлений и отобранные ссылки для бронирования от Travel4You.',
    newsletterEmail: 'Ваш адрес электронной почты *', newsletterSubmit: 'Получать новые гиды',
    name: 'Ваше имя *', phone: 'Телефон', destination: 'Желаемое направление', help: 'Что организовать? *',
    privateItinerary: 'Частный маршрут', vipExperience: 'VIP-впечатление', hotelVilla: 'Отель / вилла',
    otherRequest: 'Другая просьба', budget: 'Примерный бюджет', message: 'Кратко опишите ваш запрос',
    submit: 'Запросить VIP-консультацию', vipPartner: 'Официальный партнёр GetYourGuide'
  }
};

export function getUiTranslation(locale?: string): UiTranslation {
  return translations[(locale || 'en') as SupportedLocale] || translations.en;
}
