export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    devOptions: {
      enabled: true
    },

    registerType: 'autoUpdate',

    manifest: {
      name: 'MyH2O',
      short_name: 'MyH2O',
      description: 'Smart Hydration Tracker',

      theme_color: '#0ea5e9',
      background_color: '#ffffff',

      display: 'standalone',
      orientation: 'portrait',

      start_url: '/',

      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})