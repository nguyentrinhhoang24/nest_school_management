// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  alias: {
    '@': './', // Đảm bảo alias trỏ đúng đến thư mục gốc
  },
  compatibilityDate: "2024-12-19"
})