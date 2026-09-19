import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://travel4you.app',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    // sitemap(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'es', 'it', 'ja', 'ko', 'zh-tw', 'zh-cn', 'pt', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
