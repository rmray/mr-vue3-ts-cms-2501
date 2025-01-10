import type { Menu } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

/** 加载本地路由 */
function loadLocalRoute() {
  const localRoutes: RouteRecordRaw[] = []
  const files = import.meta.glob<{ default: RouteRecordRaw }>('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    localRoutes.push(files[key].default)
  }
  return localRoutes
}

/** 第一个菜单项 */
export let firstMenu: any = null

/**
 * 根据菜单匹配路由
 * @param menus 菜单列表
 * @returns {RouteRecordRaw[]} routes 匹配到的路由列表
 */
export function mapMenuToRoute(menus: Menu[]) {
  const routes: RouteRecordRaw[] = []

  // 加载本地路由
  const localRoutes = loadLocalRoute()

  // 遍历菜单匹配路由
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((route) => route.path === subMenu.url)
      if (route) {
        // 添加父菜单到动态路由中
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 添加子菜单到动态路由中
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}
