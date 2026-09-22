import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Assets are referenced relatively, so the built site works from any path.
  base: './',
})
