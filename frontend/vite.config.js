import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
  ],
  resolve: {
    alias: {
      // '@': '/src/',
      '@components': '/src/components',
      '@assets': '/src/assets', 
      '@pages': '/src/pages',  
      '@store': '/src/store',  
      '@lib': '/src/lib',  
      '@utils': '/src/utils',   
      '@constants': '/src/constants',   
    },
  },
})
