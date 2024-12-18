import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web-project-internet-shop/',
  resolve: {
    alias: {
      '@app': resolve(__dirname, './src/app/index.ts'),
      '@pages': resolve(__dirname, './src/pages/index.ts'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@features': resolve(__dirname, './src/features'),
      '@entities': resolve(__dirname, './src/entities'),
      '@shared': resolve(__dirname, './src/shared')
    }
  }
})
