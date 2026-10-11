import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Creates classic browser files that also run when index.html is opened directly.
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'src/standalone.tsx',
      formats: ['iife'],
      name: 'FemAura',
      fileName: 'femaura',
      cssFileName: 'femaura',
    },
    outDir: 'standalone-assets',
  },
})
