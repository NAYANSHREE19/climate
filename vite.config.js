import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'climate' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/climate/',  // Change 'climate' to your repo name
})
