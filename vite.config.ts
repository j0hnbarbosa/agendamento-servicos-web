import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: '',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // Here
      port: 5000,
    },
    build: {
      outDir: process.env.VITE_BUILD_PATH,
    }
  })
}
