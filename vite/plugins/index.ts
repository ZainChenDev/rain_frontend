import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import createVueDevTools from './vue-devtools'
import createAutoImport from './auto-import'
import createVueComponents from './vue-components'

export interface PluginOptions {
  env: Record<string, string>
  isBuild: boolean
  mode: string
}

export function createVitePlugins(options: PluginOptions): PluginOption[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { env, isBuild, mode } = options

  const vitePlugins: PluginOption[] = [vue(), tailwindcss()]

  // 仅 开发环境 启用
  if (!isBuild) {
    vitePlugins.push(createVueDevTools(mode))
  }

  // 开发&生产 都启用
  vitePlugins.push(createAutoImport(), createVueComponents())

  return vitePlugins
}
