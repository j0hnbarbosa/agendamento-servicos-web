import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig({
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // Here
      port: 3000,
    },
    build: {
      outDir: process.env.VITE_BUILD_PATH,
    }
  })
}
