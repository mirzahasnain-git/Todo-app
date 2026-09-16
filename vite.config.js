import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from /Todo-app/.
export default defineConfig({
  base: '/Todo-app/',
  plugins: [react()],
})
