import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {

    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },

    proxy: {
      "/api/users/": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
})