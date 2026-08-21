// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      vendureShopApiUrl: process.env.NUXT_PUBLIC_VENDURE_SHOP_API_URL || 'http://localhost:3000/shop-api',
      vendureChannelToken: process.env.NUXT_PUBLIC_VENDURE_CHANNEL_TOKEN || '',
    },
  },

  image: {
    domains: ['localhost'],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  app: {
    head: {
      title: 'PetsUpRight',
      meta: [
        { name: 'description', content: 'Premium pet supplies for dogs and cats' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})