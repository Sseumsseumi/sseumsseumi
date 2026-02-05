import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// 주석
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'frontend',
      'sseumsseumi.site',
      'localhost'
    ],
  }
})