import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project page on GitHub Pages → served from /Portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
})
