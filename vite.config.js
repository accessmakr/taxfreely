import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isMobile = env.VITE_PLATFORM === 'mobile'

  return {
    plugins: [
      react(),

      // PWA plugin is web-only — the mobile build via Capacitor
      // has its own native offline handling and does not need a service worker
      !isMobile && VitePWA({
        registerType: 'autoUpdate',

        // injectManifest lets us write a fully custom service worker
        // that handles push notification clicks alongside Workbox precaching
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',

        injectManifest: {
          globPatterns: [
            '**/*.{js,css,html,ico,png,svg,webp,woff2}',
            'i18n/**/*.json'
          ],
          injectionPoint: 'self.__WB_MANIFEST'
        },

        devOptions: {
          enabled: false
        },

        // manifest.json is served from public/ — we manage it manually
        // so we disable the auto-generated one here
        manifest: false
      })
    ].filter(Boolean),

    resolve: {
      alias: {
        '@':            path.resolve(__dirname, './src'),
        '@components':  path.resolve(__dirname, './src/components'),
        '@tool':        path.resolve(__dirname, './src/components/tool'),
        '@web':         path.resolve(__dirname, './src/components/web-only'),
        '@app':         path.resolve(__dirname, './src/components/app-only'),
        '@utils':       path.resolve(__dirname, './src/utils'),
        '@data':        path.resolve(__dirname, './src/data'),
        '@lib':         path.resolve(__dirname, './src/lib'),
        '@hooks':       path.resolve(__dirname, './src/hooks'),
        '@contexts':    path.resolve(__dirname, './src/contexts'),
        '@i18n':        path.resolve(__dirname, './src/i18n'),
        '@seo':         path.resolve(__dirname, './src/seo'),
        '@config':      path.resolve(__dirname, './src/config')
      }
    },

    build: {
      outDir: isMobile ? 'dist-mobile' : 'dist',
      sourcemap: false,
      minify: 'terser',
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor':     ['react', 'react-dom'],
            'i18n-vendor':      ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
            'pdf-vendor':       ['jspdf'],
            'supabase-vendor':  ['@supabase/supabase-js'],
            'ai-vendor':        ['groq-sdk', '@google/generative-ai'],
            'lucide-vendor':    ['lucide-react'],
            // Tesseract is ~4-10MB depending on language pack.
            // Isolating it here means it is NEVER part of the initial bundle —
            // ReceiptScanner.jsx loads it via dynamic import() only when
            // the user actually opens the receipt scanner.
            'tesseract-vendor': ['tesseract.js']
          }
        }
      }
    },

    server: {
      port: 5173,
      host: true
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'i18next',
        'react-i18next',
        'i18next-browser-languagedetector'
      ],
      // Tesseract must NOT be pre-bundled by Vite's dev optimizer —
      // it needs to stay a separate dynamic chunk in production too
      exclude: ['tesseract.js']
    }
  }
})
