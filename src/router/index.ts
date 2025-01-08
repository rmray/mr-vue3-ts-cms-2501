import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  { path: '/main', component: () => import('@/views/main/main.vue') },
  { path: '/login', component: () => import('@/views/login/login.vue') }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 路由导航守卫
router.beforeEach((to) => {
  const token = localCache.getItem('token')
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
