// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    'shadcn-nuxt'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      exclude: ['/', '/about', '/services/*'],
    },
    clientOptions: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'remorrow-auth',
      },
    },
  },
  app: {
    head: {
      title: 'Remorrow',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  components: {
    dirs: [
      "~/components",
      {
        path: "~/components/ui",
        global: true,
      },
    ],
  },
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        verbatimModuleSyntax: true
      }
    }
  },
  alias: {
    '@': '/<rootDir>',
    '~': '/<rootDir>',
    '#app': '/<rootDir>/.nuxt/types',
    '#imports': '/<rootDir>/.nuxt/imports.d.ts'
  },
  imports: {
    dirs: ['composables', 'utils'],
    imports: [
      { from: 'vue', type: true, name: 'HTMLAttributes' }
    ]
  }
});
