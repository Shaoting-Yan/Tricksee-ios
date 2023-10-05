import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    https:{
      key:'./public/private.key',
      cert:'./public/certificate.crt',
    }
  },
  plugins: [react(),VitePWA(
  { registerType: 'autoUpdate',
  devOptions: {enabled: true},
  manifest:{
    "name": "Tricksee",
    "short_name":"Tricksee",
    "display": "standalone",
    icons:[
      {src:"/icons/1024.png",
      sizes:"1024x1024"}],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,woff2}',
    '/*.{js,css,html,ico,png,svg,jpg,woff2}']
  }
   })],
   base: ''
})
