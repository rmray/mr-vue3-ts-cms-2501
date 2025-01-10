import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-to/map-menu-to-route'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  { path: '/main', name: 'main', component: () => import('@/views/main/main.vue') },
  { path: '/login', component: () => import('@/views/login/login.vue') }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 路由导航守卫
router.beforeEach((to) => {
  const token = localCache.getItem('token')

  // 访问 /main 页面，且没有登录
  if (to.path === '/main' && !token) {
    return '/login'
  }

  // 访问 /main 或 /main/ 页面，且有登录状态
  if (/^\/main\/?$/.test(to.path) && token) {
    return firstMenu.url
  }
})

export default router
