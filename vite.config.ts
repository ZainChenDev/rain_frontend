import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite'

import { createVitePlugins } from './vite/plugins'

/**
 * 参考：https://vite.dev/config/
 * command: 'serve' | 'build'
 * mode: 'development' | 'production'
 */
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // plugins: [vue(), vueDevTools()],
    plugins: createVitePlugins({
      env,
      isBuild: command === 'build',
      mode
    }),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      }
    }
  }
})
