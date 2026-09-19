const fs = require('fs');
const path = require('path');

const ROOT_APP = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_APP, 'dist');
const ARTICLES_PATH = path.join(ROOT_APP, 'src/data/articles.json');
const DESTINATIONS_PATH = path.join(ROOT_APP, 'src/data/destinations.json');

const articles = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));
const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_PATH, 'utf8'));

const SITE_URL = 'https://travel4you.app';
const LOCALES = ['en', 'vi', 'de', 'fr', 'es', 'it', 'ja', 'ko', 'zh-tw', 'zh-cn', 'pt', 'ru'];

let urlsXml = '';

// 1. Homepage URLs
LOCALES.forEach(loc => {
  const url = loc === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${loc}/`;
  urlsXml += `  <url>\n    <loc>${url}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n`;
  LOCALES.forEach(altLoc => {
    const altUrl = altLoc === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${altLoc}/`;
    urlsXml += `    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${altUrl}"/>\n`;
  });
  urlsXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>\n  </url>\n`;
});

// 2. Hub Articles with cross-hreflang
destinations.forEach(dest => {
  LOCALES.forEach(loc => {
    const slug = dest.slugs[loc] || dest.slugs.en;
    const url = loc === 'en' ? `${SITE_URL}/experience/${slug}/` : `${SITE_URL}/${loc}/experience/${slug}/`;
    urlsXml += `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n`;
    LOCALES.forEach(altLoc => {
      const altSlug = dest.slugs[altLoc] || dest.slugs.en;
      const altUrl = altLoc === 'en' ? `${SITE_URL}/experience/${altSlug}/` : `${SITE_URL}/${altLoc}/experience/${altSlug}/`;
      urlsXml += `    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${altUrl}"/>\n`;
    });
    urlsXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/experience/${dest.slugs.en}/"/>\n  </url>\n`;
  });
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}</urlset>`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.join(DIST_DIR, 'sitemap-index.xml'), sitemapXml);
console.log('✅ Generated sitemap.xml & sitemap-index.xml with full 11-locale hreflang clusters!');
