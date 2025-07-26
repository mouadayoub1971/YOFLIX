import { NuxtConfig } from '@nuxt/types';
import { build } from './config/build.config';
import head from './config/head.config';
import { modules } from './config/modules.config';
import { i18n } from './config/i18n.config';
import colors from './src/styles/colors.module';

const isBuildProd = process.env.NODE_ENV === 'production';
const isProduction = process.env.NUXT_ENV_STAGE === 'production';

const isSsr = process.env.NUXT_ENV_MODE === 'universal';

const config: NuxtConfig = {
  ssr: isSsr,
  target: 'static',
  modern: isProduction,
  srcDir: './src',
  ...head,
  build,
  components: false,
  modules,
  i18n,
  typedRouter: {
    filePath: 'src/models/__routes.ts',
  },
  loading: {
    color: colors.red,
    failedColor: colors.white,
    height: '4px',
  },
  tailwindcss: {
    cssPath: '~/styles/tailwind.css',
    configPath: '~~/tailwind.config.cjs',
    viewer: false,
  },
  server: {
    port: process.env.NUXT_ENV_PORT,
    host: '0.0.0.0',
  },
  plugins: [
    { src: '~/plugins/global.plugin.ts' },
    { src: '~/plugins/mounted.plugin.ts', ssr: false },
    { src: '~/plugins/constants.plugin.ts' },
    { src: '~/plugins/toasts.plugin.ts' },
    { src: '~/plugins/i18n.plugin.ts' },
    { src: '~/plugins/nuxt-typed-router.plugin.ts' },
    { src: '~/plugins/serviceworker.plugin.ts', ssr: false },
  ],
  router: {
    middleware: ['router.middleware'],
  },
  css: ['~/styles/root.css'],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: 'UA-57021034-1',
  },
  render: {
    static: {
      setHeaders(res) {
        res.setHeader('Cache-Control', 'must-revalidate, public, max-age=3153600');
      },
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      },
    },
  },
};

export default config;
