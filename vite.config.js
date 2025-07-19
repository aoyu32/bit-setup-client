import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/common/_variables.scss" as *;
          @use "@/assets/styles/common/_mixins.scss" as *;
          @use "@/assets/styles/theme/_theme.scss" as *; 
        `
      }
    }
  },
})
