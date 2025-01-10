import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './modules'
import router from '@/router'

const pinia = createPinia()

// 加载动态路由
function registerStore(app: App<Element>) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalRouteAction()
}

export default registerStore
