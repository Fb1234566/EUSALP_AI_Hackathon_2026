/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

// Plugin to handle SPA routing fallback
function spaFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server: any) {
      return () => {
        server.middlewares.use((req: any, res: any, next: any) => {
          // Check if it's a route request (not a file with extension)
          if (
            req.url !== '/' &&
            !req.url.includes('.') &&
            !req.url.includes('/node_modules') &&
            !req.url.includes('/__') &&
            req.method === 'GET'
          ) {
            req.url = '/index.html'
          }
          next()
        })
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    spaFallback()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
