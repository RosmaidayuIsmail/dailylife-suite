export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false, // Disables server-side rendering for mobile compatibility
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  pageTransition: { name: 'swipe-up', mode: 'out-in' }
})
