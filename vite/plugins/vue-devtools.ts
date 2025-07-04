import VueDevTools from 'vite-plugin-vue-devtools'

// https://devtools.vuejs.org/
export default function createVueDevTools(mode: string) {
  return VueDevTools({
    // 配置选项
    launchEditor: 'code',

    // 仅在开发环境启用
    appendTo: mode === 'development' ? 'src/main.ts' : undefined,

    // 自定义DevTools的行为
    componentInspector: {
      // 启用组件检查器
      enabled: false,
      // 快捷键配置
      toggleComboKey: 'alt-d'
    },

    // 开发模式下的额外选项
    ...(mode === 'development' && {
      // 开发环境特定配置
      logLevel: 'info'
    })
  })
}
