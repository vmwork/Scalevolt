// frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // Because this file lives in "frontend",
  // root: __dirname => the "frontend/" folder
  root: __dirname,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    // Output goes to "../dist" (i.e. scalevolt-store-main/dist)
    outDir: path.join(__dirname, '../dist'),
  },
})
