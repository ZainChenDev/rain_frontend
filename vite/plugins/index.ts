import type { PluginOption } from 'vite'
import createAutoImport from './auto-import'

import vue from '@vitejs/plugin-vue'
import { createVueDevTools } from './vue-devtools'

export interface PluginOptions {
  env: Record<string, string>
  isBuild: boolean
  mode: string
}

export function createVitePlugins(options: PluginOptions): PluginOption[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { env, isBuild, mode } = options

  const vitePlugins: PluginOption[] = [vue()]

  // Vue DevTools - 仅在开发环境启用
  if (!isBuild) {
    vitePlugins.push(createVueDevTools(mode))
  }

  // 开发&生产 都需要的插件
  vitePlugins.push(createAutoImport())

  return vitePlugins
}
