import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig(({ mode, command }) => {
  // The local demo pair lives in the ignored project .env. Never embed it in a production build.
  const local = command === 'serve' ? loadEnv(mode, resolve(process.cwd(), '..'), '') : {}
  const demoEmail = local.DEMO_EMAIL || local.DEMO_ADMIN_EMAIL || ''
  const demoPassword = local.DEMO_PASSWORD || local.DEMO_ADMIN_PASSWORD || ''
  return {
  plugins: [react()],
  define: {
    'import.meta.env.VITE_DEMO_EMAIL': JSON.stringify(demoEmail && demoPassword ? demoEmail : ''),
    'import.meta.env.VITE_DEMO_PASSWORD': JSON.stringify(demoEmail && demoPassword ? demoPassword : ''),
  },
  server: {
    host: '127.0.0.1',
    port: Number.parseInt(process.env.FRONTEND_PORT || '3023', 10),
    strictPort: true,
    proxy: {
      '/api': process.env.VITE_API_PROXY_TARGET || `http://127.0.0.1:${process.env.BACKEND_PORT || '3031'}`
    }
  }
  }
})
