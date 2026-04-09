import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('react-router-dom')) {
            return 'vendor'
          }

          if (id.includes('node_modules/lucide-react')) {
            return 'ui'
          }
        },
      },
    },
    minify: 'esbuild',
    esbuild: {
      drop: ['console'],
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
})
