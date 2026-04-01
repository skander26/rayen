import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Limonaia Villa Aurora',
        short_name: 'Villa Aurora',
        description:
          'Luxury villa stay in Florence — curated spaces, timeless Tuscan calm.',
        theme_color: '#141210',
        background_color: '#f6f2eb',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
      },
    }),
  ],
})
