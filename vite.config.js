import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,     // inline files < 4 kB as base64
    chunkSizeWarningLimit: 600,  // kB

    rollupOptions: {
      output: {
        // Split React into its own cached chunk
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
