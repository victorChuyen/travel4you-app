# 👑 TRAVEL4YOU.APP — SOVEREIGN LUXURY CONCIERGE WEB APP
> **Global Luxury Travel & VIP Experience Engine**  
> **Target Domain:** [travel4you.app](https://travel4you.app)  
> **Cloudflare Pages Edge Architecture | 100/100 Core Web Vitals | Zero Server Cost**  
> **Official GetYourGuide Direct Partner:** ID `4G5BPIE` (8% Commission) | Travelpayouts Marker `770720`

---

## ⚡ ARCHITECTURE OVERVIEW

Built with the modern **JAMstack / Edge Static Site Generation (SSG)** paradigm favored by top 1% affiliate and travel media platforms:
* **Framework:** [Astro 4/5](https://astro.build) (Zero JS runtime by default, Islands Architecture).
* **Styling:** Tailwind CSS Luxury Palette (`#07111e` Deep Midnight Navy, `#c9a54e` Sovereign Gold, `#ff7043` High-CRO Coral).
* **Edge Hosting:** Cloudflare Pages (330+ Edge Data Centers globally, sub-50ms TTFB).
* **Edge Functions:** `functions/go/[slug].js` (Smart Affiliate Cloaking & Geo-IP country targeting).
* **Locales (11):** `en`, `de`, `fr`, `es`, `it`, `ja`, `ko`, `zh-tw`, `zh-cn`, `pt`, `ru`.
* **CRO standard:** 4-Point Lana Benchmark (Hero VIP Callout, Comparison Matrix, Contextual Hour-by-Hour Itinerary, 24h Free Cancellation Guarantee Box).
* **Media:** 73 Verified UHD 4K authentic photographs with 0% MD5 duplicate rate.

---

## 🛠️ LOCAL DEVELOPMENT

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
# -> Local server live at http://localhost:4321

# 3. Build static production bundle & sitemap
npm run build
# -> Compiles 121 pages into dist/ in ~5 seconds!

# 4. Preview production build
npm run preview
```

---

## 🚀 DEPLOYMENT TO CLOUDFLARE PAGES (3-STEP GUIDE)

### Step 1: Push Source Code to GitHub
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/travel4you-app.git
git branch -M main
git push -u origin main
```

### Step 2: Connect GitHub to Cloudflare Pages
1. Go to **Cloudflare Dashboard** (`dash.cloudflare.com`).
2. Navigate to **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**.
3. Select your repository `travel4you-app`.
4. Configure build settings:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare Pages will build and deploy the entire site in ~45 seconds!

### Step 3: Connect Custom Domain `travel4you.app`
1. In your Cloudflare Pages project, go to **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Type: `travel4you.app` (and optionally `www.travel4you.app`).
4. Click **Continue** ➔ **Activate domain**.
5. Done! Because `travel4you.app` is registered on Cloudflare Registrar, DNS and SSL activate instantly with 0 seconds delay!

---

## 📊 REVENUE & AFFILIATE COMPLIANCE
* **Partner ID:** `4G5BPIE` (8% Direct Net Booking Value on GetYourGuide)
* **FTC & ASA Disclosure:** Integrated into every layout `#GetYourGuidePartner #ad` (Clause 3.2.2 compliance)
* **Price Integrity:** Highlights 100% Free 24h Cancellation and Best Price Guarantee.
