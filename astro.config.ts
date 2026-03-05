import { defineConfig } from 'astro/config';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  env: {
    schema: {},
  },
  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  site: 'http://rikunaganoma.com',
  server: {
    host: true,
    open: true,
  },
  integrations: [
    //
    sitemap(),
    icon(),
    mdx(),
  ],
  build: {
    assets: 'assets',
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('baseline widely available')),
        cssModules: true,
        drafts: {
          customMedia: true,
        },
      },
    },
  },
});
