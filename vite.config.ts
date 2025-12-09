import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      // This is crucial to prevent "Uncaught ReferenceError: process is not defined"
      // It exposes the API_KEY from the build environment to the browser code.
      'process.env': {
        API_KEY: env.API_KEY
      }
    }
  }
})