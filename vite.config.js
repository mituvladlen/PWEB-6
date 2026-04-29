import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/PWEB-6/',
  plugins: [react()],
  server: {
    port: 5173
  }
})
