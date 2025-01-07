/// <reference types="vite/client" />

/** 定义vue模块类型 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
