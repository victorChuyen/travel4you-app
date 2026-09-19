# 🏛️ TRAVEL4YOU.APP & TRAVEL4U.US — DUAL-ENGINE TECHNICAL ARCHITECTURE BLUEPRINT
> **Version:** 3.0-Dual-Engine-Luxury-OS (GetYourGuide VIP Experiences + Expedia Luxury Stays)  
> **Executive Leadership:** Chairman Victor Chuyen (`Coach.Chuyen@gmail.com`) & AI CEO Lucky  
> **Repositories:** [https://github.com/victorChuyen/travel4you-app](https://github.com/victorChuyen/travel4you-app) & `travel4u-portal`  
> **Production Edge:** [https://travel4you.app](https://travel4you.app) (GYG Experiences) • [https://travel4u.us](https://travel4u.us) (Expedia Luxury Hotels) • [https://blog.travel4u.us](https://blog.travel4u.us) (WordPress Editorial Magazine)  
> **Master Google Sheet:** [Sheet 15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU](https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit#gid=0)  
> **Cập nhật lần cuối:** 2026-09-19

---

## 🧭 1. TỔNG QUAN DỰ ÁN & MỤC TIÊU CỐT LÕI (MISSION & VISION)

### 1.1. Sứ mệnh
**Travel4You.app** là nền tảng cẩm nang du lịch thượng lưu (Sovereign Luxury Travel Concierge) hướng tới đối tượng du khách có khả năng chi trả cao (High-Net-Worth & Discerning Travelers) trên toàn cầu. 

Khác với các trang du lịch đại trà tập trung vào "săn mã giảm giá" hay "tour giá rẻ", Travel4You định vị:
* **Không cạnh tranh về giá:** Tuyệt đối không dùng từ ngữ hạ thấp giá trị như "cheap", "budget", "deal".
* **Tập trung vào giá trị đặc quyền:** Ưu tiên vé VIP qua cổng riêng (Skip-the-line), du thuyền gỗ tư nhân, chuyên gia thuyết minh di sản có chứng chỉ bảo tàng, trực thăng ngắm cảnh, và bàn ăn view đẹp nhất.
* **Giải quyết nỗi sợ lớn nhất của khách VIP:**
  1. *Sợ lãng phí thời gian xếp hàng hàng giờ dưới trời nắng.*
  2. *Sợ dính bẫy du lịch (tourist traps) và hướng dẫn viên kém chất lượng.*
  3. *Sợ thanh toán rủi ro và không được hoàn tiền khi lịch trình thay đổi.*
  ➔ Giải pháp: 100% dịch vụ kiểm định thật, liên kết đối tác chính thức GetYourGuide với chính sách **hoàn tiền 100% trong 24 giờ**, vé QR vào cổng tức thì trên smartphone.

### 1.2. Mục tiêu kỹ thuật & kinh doanh
* **Tốc độ siêu tốc toàn cầu:** Xây dựng dưới dạng tĩnh (Static Site Generation - SSG) triển khai trên mạng lưới Edge của Cloudflare Pages, TTFB < 50ms tại mọi quốc gia.
* **Đa ngôn ngữ bản địa hóa thực thụ:** Phục vụ **12 thị trường trọng điểm** (`en`, `vi`, `de`, `fr`, `es`, `it`, `ja`, `ko`, `zh-tw`, `zh-cn`, `pt`, `ru`) với cụm thẻ hreflang chéo chuẩn SEO quốc tế.
* **Khả năng mở rộng (Scalability):** Dễ dàng nâng quy mô từ 10 Flagship Destinations hiện tại lên **1.000+ địa điểm thượng lưu** mà không làm thay đổi cấu trúc cốt lõi.
* **Minh bạch & Tôn trọng khách hàng:** Ẩn hoàn toàn các mã kỹ thuật (Partner ID, % hoa hồng, marker), chỉ truyền tải thông điệp niềm tin và bảo chứng thương hiệu cá nhân `Luxury Victor` & `Luxury Lucky`.

---

## 🏗️ 2. KIẾN TRÚC HỆ THỐNG & TECH STACK

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRAFFIC & USER VIEWPORTS                        │
│             (Mobile iOS/Android • Tablet iPad • Desktop PC)            │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE EDGE GLOBAL NETWORK                      │
│  - DNS & SSL (Strict Full)                                             │
│  - Cloudflare Pages CDN (132+ Static HTML Pages, TTFB < 50ms)           │
│  - Edge Function: /functions/go/[slug].js (Smart Link Cloaker)        │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                ┌────────────────────┴────────────────────┐
                ▼                                         ▼
┌───────────────────────────────┐     ┌───────────────────────────────────┐
│     CLIENT BROWSING (SSG)     │     │      AFFILIATE OUTBOUND TRACK     │
│ - Astro 5.x Static Core       │     │ - Param: partner_id=4G5BPIE       │
│ - TailwindCSS Dark Luxury     │     │ - SubID: cmp=blog_{locale}_{code} │
│ - Instant Client Search & Tag │     │ - Cookie Attribution: 30 Days     │
│ - LocalStorage Bookmark & Like│     │ - Direct GYG VIP Experience Page  │
│ - 4K Media & YouTube Social   │     └───────────────────────────────────┘
└───────────────▲───────────────┘
                │ Git Push (main)
┌───────────────┴────────────────────────────────────────────────────────┐
│                     DEVELOPMENT & DEVOPS GITOPS                        │
│ - Repository: https://github.com/victorChuyen/travel4you-app           │
│ - Astro Build Engine: npm run build (3 - 5 giây / 132 trang)           │
│ - Bi-directional Sync: Google Sheets API v4 (17 Columns Data Center)   │
└────────────────────────────────────────────────────────────────────────┘
```

### Công nghệ sử dụng:
| Lớp (Layer) | Công nghệ | Lý do lựa chọn |
|---|---|---|
| **Framework** | **Astro 5.x** | Zero-JS mặc định, xuất file HTML tĩnh siêu nhẹ, hỗ trợ Dynamic Routing `[locale]` và `[slug]` linh hoạt. |
| **Styling** | **TailwindCSS 3.x** | Thiết kế chuẩn hệ màu Dark Luxury (`#07111e`, `#c9a54e`, `#ff7043`), responsive di động mượt mà. |
| **Hosting & CDN** | **Cloudflare Pages** | Miễn phí, băng thông không giới hạn, triển khai tự động qua webhook GitHub mỗi khi push code lên `main`. |
| **Edge Functions** | **Cloudflare Pages Functions** | Rút gọn link tiếp thị liên kết `/go/[slug]`, che giấu tham số và hỗ trợ đếm click thời gian thực. |
| **Content Format** | **Strict JSON Engine** | Lưu trữ toàn bộ bài viết, địa điểm, từ điển i18n vào file JSON có cấu trúc, độc lập với Database truyền thống. |
| **Command Center** | **Google Sheets API v4** | Đồng bộ 17 cột dữ liệu 2 chiều cho phép Chairman quản lý và sửa nội dung không cần chạm vào code. |

---

## 📂 3. CÂY THƯ MỤC CHUẨN CỦA PROJECT (DIRECTORY STRUCTURE)

```
d:/n8n-selfhost/travel4you.app/
├── functions/                              ← Cloudflare Edge Functions
│   └── go/
│       └── [slug].js                       ← Link cloaker chuyển hướng thông minh & đếm click
├── public/
│   ├── favicon.svg                         ← Icon thương hiệu 4U
│   ├── robots.txt                          ← Chỉ mục tìm kiếm chuẩn SEO
│   └── media/                              ← Kho 73+ ảnh 4K sắc nét của 10 Flagship Destinations
├── src/
│   ├── components/                         ← Các UI Component tái sử dụng
│   │   ├── Header.astro                    ← Header Menu, Logo 4U, Dropdown 12 Ngôn ngữ, Drawer di động
│   │   ├── Footer.astro                    ← Footer 4 Cột chuẩn E-E-A-T, Trust Guarantees, Disclaimers
│   │   ├── DestinationCard.astro           ← Thẻ hiển thị trải nghiệm kèm nút Bookmark, Like, Share
│   │   └── SearchBar.astro                 ← Thanh tìm kiếm nổi kiểu GetYourGuide + Lọc Danh mục
│   ├── data/                               ← DATABASE CỐT LÕI DẠNG JSON
│   │   ├── articles.json                   ← 120 bài viết đầy đủ (10 hubs × 12 locales) chuẩn Grade A
│   │   ├── destinations.json               ← 10 Flagship Hubs kèm slug 12 thứ tiếng
│   │   └── i18n.json                       ← Từ điển dịch 12 ngôn ngữ (tiêu đề, nút bấm, lời ngỏ)
│   ├── layouts/
│   │   └── Layout.astro                    ← Khung HTML gốc, Schema.org JSON-LD, Font serif, Thẻ hreflang
│   └── pages/                              ← HỆ THỐNG ĐIỀU HƯỚNG TRANG (ROUTING)
│       ├── index.astro                     ← Trang chủ tiếng Anh mặc định (https://travel4you.app/)
│       ├── [locale]/
│       │   └── index.astro                 ← Trang chủ 11 ngôn ngữ phụ (/vi/, /de/, /fr/, /ja/...)
│       ├── experience/
│       │   └── [slug].astro                ← Chi tiết bài viết tiếng Anh (/experience/paris-cruise...)
│       └── [locale]/
│           └── experience/
│               └── [slug].astro            ← Chi tiết bài viết 11 ngôn ngữ (/vi/experience/du-thuyen...)
├── scripts/                                ← HỆ THỐNG SCRIPTS TỰ ĐỘNG HÓA
│   ├── generate_sitemap.cjs                ← Tự động sinh sitemap.xml đa ngôn ngữ chuẩn hreflang
│   ├── qa_test_local.cjs                   ← Bộ kiểm thử tự động 8/8 bài test trước khi release
│   ├── sync_travel4you_app_to_sheet.cjs    ← Đồng bộ toàn bộ dữ liệu web lên Google Sheet
│   └── clean_ux_technical_jargon.cjs       ← Dọn dẹp từ ngữ kỹ thuật, bảo vệ hình ảnh thương hiệu
├── astro.config.mjs                        ← Cấu hình Astro & tích hợp TailwindCSS
├── package.json                            ← Khai báo thư viện & lệnh build
└── TECHNICAL_ARCHITECTURE.md               ← [FILE NÀY] Tài liệu kỹ thuật chi tiết
```

---

## 📊 4. CẤU TRÚC DỮ LIỆU CỐT LÕI (CORE JSON SCHEMA)

Mọi dữ liệu của hệ sinh thái được quy chuẩn hóa trong 3 file JSON tại `src/data/`:

### 4.1. `destinations.json` (Danh mục Điểm Đến Vàng)
Quản lý các Hub điểm đến lớn. Mỗi destination hỗ trợ slug riêng biệt cho cả 12 ngôn ngữ để tối ưu hóa SEO URL bản địa:
```json
{
  "id": "gyg_001",
  "post_code": "GYG_PARIS_001",
  "location": "Paris, France",
  "country": "France",
  "region": "Europe",
  "category": "Private Yacht & Gourmet",
  "english_title": "Paris Seine River Gourmet Dinner Cruise",
  "rating": "4.8 / 5 (12,500+ Reviews)",
  "price_display": "From $42",
  "hero_image": "/media/GYG_EU_PARIS_paris-seine-river-dinner-cruise-bateaux-mouches_paris-eiffel-tower-sunset-cruise-4k.jpg",
  "gyg_direct_link": "https://www.getyourguide.com/paris-l16/paris-seine-river-dinner-cruise-with-live-music-t402685/?partner_id=4G5BPIE&cmp=blog_en_gyg_paris_001",
  "slugs": {
    "en": "paris-seine-river-gourmet-dinner-cruise-eiffel-vip",
    "vi": "du-thuyen-an-toi-song-seine-paris-thap-eiffel-vip",
    "de": "paris-seine-river-gourmet-dinner-cruise-eiffel-vip-de"
  }
}
```

### 4.2. `articles.json` (Nội Dung Bài Viết Chuyên Sâu)
Chứa đầy đủ nội dung bài viết định dạng HTML chuẩn Forbes/Condé Nast gồm 8 khối:
* **Khối 1:** Quick Answer & Tóm tắt hành trình VIP.
* **Khối 2:** Bảng Kính Tối So Sánh Gói Trải Nghiệm (Dark Glass Matrix) có container vuốt chạm di động.
* **Khối 3:** Chi tiết hành trình từng giờ & Thực đơn ẩm thực cao cấp.
* **Khối 4:** Hướng dẫn vị trí, trang phục & kinh nghiệm vào cổng ưu tiên.
* **Khối 5:** 🎬 Section nhúng Video YouTube 4K Review trải nghiệm thực tế.
* **Khối 6:** FAQ Schema (Câu hỏi thường gặp giải quyết đúng nỗi lo của du khách).
* **Khối 7:** Lời ngỏ tinh tế từ bộ đôi giám tuyển `Luxury Victor` & `Luxury Lucky`.
* **Khối 8:** Nút kêu gọi hành động đặt chỗ trực tiếp qua GetYourGuide với cam kết hủy 24h.

---

## 🚀 5. CHIẾN LƯỢC MỞ RỘNG TỪ 10 LÊN 1.000+ ĐỊA ĐIỂM (THE 1,000+ ROADMAP)

Hệ thống tuân theo quy trình tự động 4 bước:
1. **Taxonomy Grid:** Phủ 10 nhóm trải nghiệm thượng lưu × 50 quốc gia du lịch.
2. **Deep Link Generator:** Ghép mã đối tác `partner_id=4G5BPIE` và SubID theo từng điểm đến.
3. **AI Grade A Localization:** Bản địa hóa 12 ngôn ngữ tập trung vào giải quyết 1 nỗi lo lớn nhất của khách VIP.
4. **Automated Sync & Deploy:** Ghi nhận 17 cột trên Google Sheets và triển khai tự động lên Cloudflare Pages.

---

## 🎨 6. TRIẾT LÝ GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (LUXURY UX/CRO)

### 6.1. Tham khảo tinh hoa từ GetYourGuide Homepage
Lấy cảm hứng từ thiết kế hiện đại của GetYourGuide nhưng khoác lên bộ cánh **Dark Luxury**:
* **Thanh Tìm Kiếm Nổi (Floating Search Pill Bar):**
  Đặt trang trọng tại vị trí trung tâm Hero Section với 3 phân vùng:
  `[ 🔍 Tìm kiếm trải nghiệm, thành phố... ] | [ 📅 Thời gian: Bất kỳ ] | [ 👥 1-2 Khách ] [ Khám Phá → ]`
  Tích hợp khả năng tìm kiếm tức thì (Instant Client-Side Filtering) không cần tải lại trang.
* **Bộ Lọc Danh Mục Dạng Viên Thuốc (Category Filter Pills):**
  Cho phép du khách bấm chọn nhanh theo khu vực địa lý:
  `[ Tất Cả (10) ] [ 🇫🇷 Châu Âu ] [ 🇯🇵 Châu Á ] [ 🇲🇻 Đảo Ngọc ] [ 🦒 Safari Châu Phi ] [ 🇦🇪 Trung Đông ]`
* **Thẻ Trải Nghiệm Tinh Tế (Connoisseur Cards):**
  - Ảnh 4K tỉ lệ vàng `16:10` với hiệu ứng phóng nhẹ khi rê chuột (`hover:scale-105`).
  - Nút **❤️ Yêu Thích (Bookmark)** lưu trực tiếp vào trình duyệt qua `localStorage` (không bắt đăng nhập).
  - Nút **📤 Chia Sẻ (Social Share)** hỗ trợ Copy Link nhanh, gửi qua WhatsApp, Facebook.
  - Hiển thị đánh giá sao thật và giá khởi điểm minh bạch.

### 6.2. Loại bỏ 100% Thuật Ngữ Kỹ Thuật (Zero Technical Jargon)
* Tuyệt đối không để khách nhìn thấy: `4G5BPIE`, `Marker 770720`, `8% Commission`, `Cloudflare Pages Edge`.
* Thay thế bằng:
  - *"Được 12.500+ du khách quốc tế đánh giá 4.8/5 sao"*
  - *"Bảo chứng chất lượng bởi Luxury Victor & Luxury Lucky"*
  - *"Cam kết hoàn tiền 100% trong 24 giờ — Không phát sinh thêm bất kỳ phụ phí nào"*

---

## 🛠️ 7. HƯỚNG DẪN VẬN HÀNH & PHÁT TRIỂN (DEVELOPER GUIDE)

```bash
# 1. Cài đặt môi trường
cd d:/n8n-selfhost/travel4you.app
npm install

# 2. Chạy Dev Server
npm run dev

# 3. Kiểm thử QA tự động
node scripts/qa_test_local.cjs

# 4. Đóng gói bản phát hành
npm run build

# 5. Đồng bộ Google Sheets
node scripts/sync_travel4you_app_to_sheet.cjs

# 6. Push GitHub & Tự động Deploy Cloudflare Pages
git add .
git commit -m "feat: update technical architecture blueprint"
git push origin main
```

---

## 👥 8. CƠ CHẾ ĐIỀU HÀNH 3 TEAM DEV SONG SONG (3-TEAM PARALLEL DEV CHARTER)

Để dự án SaaS vận hành trơn tru với tốc độ cao mà không gây xung đột mã nguồn (git merge conflicts) hay giẫm chân lên nhau, hệ thống phân định rõ ranh giới trách nhiệm cho 3 Team Dev:

```
                               ┌─────────────────────────────────────────┐
                               │       CHAIRMAN VICTOR & AI CEO LUCKY    │
                               │      (Strategic Vision & Governance)    │
                               └────────────────────┬────────────────────┘
                                                    │
                   ┌────────────────────────────────┼────────────────────────────────┐
                   ▼                                ▼                                ▼
┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐
│    TEAM 1: SAAS CORE & BACKEND      │ │    TEAM 2: EDGE & ATTRIBUTION       │ │    TEAM 3: CONTENT & PRODUCTS       │
│ - Scope: /app, functions/api/,      │ │ - Scope: travel4u.us & travel4you   │ │ - Scope: D:\blog-travel (3 Tiers),  │
│   src/lib/, supabase/               │ │   functions/go/, functions/m/,      │ │   src/data/articles, i18n, media,   │
│ - Stack: Supabase RLS, Postgres,    │ │   public/scripts/team_attribution   │ │   Google Sheets Command Center      │
│   SePay / PayPal SDK, 9Router AI    │ │ - Stack: Astro 5 SSG, Cloudflare    │ │ - Stack: Gemini 2.5 Pro, 9Router    │
│ - Mission: Auth, Billing, Workspaces│ │   Edge Functions, Multi-Tenant Attrib│ │ - Mission: Top 1000 Hotels & Tours, │
│   Projects, Entitlements, AI Jobs   │ │ - Mission: Dual-Engine Portals,     │ │   3 Digital Product Tiers, 12-Lang  │
│                                     │ │   Link Cloaker, Self-Serve Tools    │ │   Transcreation, Sheet Sync & Tele  │
└─────────────────────────────────────┘ └─────────────────────────────────────┘ └─────────────────────────────────────┘
```

### 8.1. Ranh giới tệp & Mã nguồn (File Boundary Isolation):
* **Team 1 sở hữu độc quyền:** `src/pages/app/**`, `functions/api/**`, `src/lib/**`, `supabase/**`.
* **Team 2 sở hữu độc quyền:** `functions/go/**`, `functions/m/**`, `public/scripts/**`, `src/components/**`, `src/layouts/**`, `src/data/team_members.json`.
* **Team 3 sở hữu độc quyền:** `D:\blog-travel\**`, `src/data/articles.json`, `src/data/destinations.json`, `src/data/i18n.json`, `public/media/**`, `scripts/sync_*.cjs`.

### 8.2. Quy tắc commit & kiểm thử bắt buộc:
1. Mọi commit phải vượt qua: `npm run build` (0 lỗi), `npx tsc --noEmit` (0 lỗi type), `npm run validate:env`.
2. Không bao giờ commit bí mật API (Supabase Service Key, PayPal Secret, SePay Token) lên git.

---

## 💎 9. KIẾN TRÚC DUAL-ENGINE SAAS: GETYOURGUIDE & EXPEDIA GROUP

Nâng cấp định vị hệ sinh thái từ một trang tour đơn lẻ thành **Hệ Điều Hành Kinh Doanh Du Lịch Đa Nền Tảng (Dual-Engine AI Travel Business OS)**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        DUAL-ENGINE MONETIZATION ARCHITECTURE                           │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│     ENGINE 1: GETYOURGUIDE (EXPERIENCES)  │       ENGINE 2: EXPEDIA GROUP (STAYS)      │
├───────────────────────────────────────────┼────────────────────────────────────────────┤
│ • Domain Cốt Lõi: travel4you.app          │ • Domain Cốt Lõi: travel4u.us (Apex Edge)  │
│ • Đối Tác: Direct Partner 4G5BPIE (8%)    │ • Đối Tác: Expedia via Travelpayouts 770720│
│ • Sản Phẩm: VIP Tours, Skip-the-line,     │ • Sản Phẩm: Khách sạn 5 sao, Luxury Resort,│
│   Du thuyền riêng, Trực thăng, Bảo tàng   │   Vé máy bay First/Business, Thuê xe tự lái│
│ • Giá Trị Đơn (AOV): $100 – $400 / booking│ • Giá Trị Đơn (AOV): $2,000 – $10,000 / đơn│
│ • Hoa Hồng Trung Bình: $8 – $32 / đơn     │ • Hoa Hồng Trung Bình: $100 – $450 / đơn   │
│ • Giá Trị Với Khách: Không xếp hàng,      │ • Giá Trị Với Khách: Phòng Suite VIP,      │
│   Hướng dẫn viên chuẩn, Hủy miễn phí 24h  │   Bữa sáng miễn phí, Hoàn điểm thưởng OTA  │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

### 9.1. Lợi thế kinh tế tuyệt đối của việc tích hợp Expedia:
* **Gia tăng AOV gấp 10 lần:** Một booking khách sạn 5 sao tại Paris, Como hay Kyoto trên Expedia dễ dàng đạt \$3,000 – \$8,000, mang lại hoa hồng \$150 – \$400/đơn (thay vì chỉ \$15 – \$25 từ tour đơn lẻ).
* **Bao trọn 100% chi tiêu du khách (Total Wallet Share):** Du khách luôn cần **Nơi ở (Expedia) + Trải nghiệm (GYG) + Di chuyển (Discover Cars / Welcome Pickups)**. Hệ thống giải quyết trọn vẹn cả 3 trong một hành trình duy nhất.
* **Đòn bẩy bán gói SaaS cho Travel Advisors & Creators:** Bán gói SaaS Creator (\$29/tháng) hoặc Pro (\$99/tháng) cho Travel Advisors cực kỳ dễ dàng vì họ có thể tạo lịch trình gắn đồng thời link Expedia và GetYourGuide của chính họ, hoàn vốn SaaS chỉ sau 1 booking khách sạn!

---

## 🔄 10. BẢN ĐỒ TÊN MIỀN & CHIẾN LƯỢC ĐIỀU PHỐI TRAFFIC (DOMAIN ARCHITECTURE)

```
travel4u.us (Apex Domain)
├── Nền tảng: Cloudflare Pages Edge (Astro 5 SSG)
├── Định vị: Siêu Cổng Du Lịch Thượng Lưu & Tuyển Tập Khách Sạn Xa Xỉ Expedia (Top 1.000 Stays)
└── Tốc độ: TTFB < 50ms, Google PageSpeed 100/100, 0 USD chi phí máy chủ

travel4you.app (Global Web App)
├── Nền tảng: Cloudflare Pages Edge (Astro 5 SSG)
├── Định vị: Concierge Trải Nghiệm Độc Quyền GetYourGuide (1.000 VIP Activities)
└── Điểm chạm: Vé VIP Skip-the-line, Du thuyền, Tour riêng 12 ngôn ngữ

blog.travel4u.us (Editorial Hub)
├── Nền tảng: WordPress VIP (Hostinger/VPS hiện tại, Theme Soledad + Rank Math)
├── Định vị: Tạp Chí Du Lịch & Kể Chuyện Thượng Lưu (78+ bài viết chuẩn Grade A)
└── Vai trò: Kéo Organic Search Traffic khổng lồ, đặt banner & deep link phễu dẫn về travel4u.us & travel4you.app

app.travel4you.app (hoặc /app)
├── Nền tảng: Cloudflare Pages Functions + Supabase PostgreSQL + 9Router AI
├── Định vị: SaaS Hub cho Creators / Travel Advisors / Paid Members
└── Tính năng: Tạo Travel Project AI, tự động gắn link Expedia + GYG của thành viên
```

---

## 🎯 11. HỆ THỐNG GẮN MÃ ĐA THÀNH VIÊN TRẢ PHÍ (MULTI-TENANT ATTRIBUTION ENGINE)

Mọi thành viên trả phí (Team Members / Paid Subscribers) đều được cấp một trang web và đường link tiếp thị riêng biệt:

1. **Edge Entry Route:** `/m/:member` (Ví dụ: `https://travel4you.app/m/rubi` hoặc `https://travel4u.us/m/rubi`).
   - Edge Function tự động ghi nhận Cookie `t4u_member_ref=rubi` có thời hạn **30 ngày**.
   - Chuyển hướng người dùng về trang chủ kèm cờ nhận diện `?ref=rubi`.
2. **Dynamic Client DOM Rewriter (`team_attribution.js`):**
   - Đọc Cookie hoặc tham số `?ref=...`.
   - Tra cứu profile trong `src/data/team_members.json`.
   - Tự động thay thế toàn bộ liên kết GetYourGuide và Expedia trên 1.000 thẻ trải nghiệm bằng:
     - `partner_id` của thành viên (hoặc Travelpayouts Marker).
     - SubID chuẩn: `cmp=team_{subId}_{country}_{slug}`.
   - Hiển thị Banner Uy Tín: *"Được tuyển chọn bởi [Tên Thành Viên] • Chuyên Gia Du Lịch Đối Tác"*.
3. **Smart Link Cloaker (`/go/[slug]`):**
   - Chuyển hướng server-side sạch sẽ, che giấu hoàn toàn các tham số kỹ thuật nhạy cảm.
   - Tự động fallback về Master Partner ID `4G5BPIE` nếu không có ref của thành viên.

