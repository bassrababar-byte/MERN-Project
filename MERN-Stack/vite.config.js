import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-project-m0c53u2xl-bassrababar-bytes-projects.vercel.app/api',
        secure: false,
      },
    },
  },
  plugins: [tailwindcss(), react()],
})
