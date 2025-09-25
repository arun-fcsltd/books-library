// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
  ],
  supabase: {
    redirect: false,
    //cookie name for supabase auth
  },
  colorMode: {
    preference: 'dark', // default theme
    fallback: 'dark',   // fallback theme if system is unknown
    classSuffix: ''     // no suffix, just "dark" or "light"
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
          darkModeSelector: '.dark', // CSS class for dark mode
      }
     
    }
  },
  css:[
      'primeicons/primeicons.css',
  ],

  
})