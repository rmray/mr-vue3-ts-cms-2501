import type { Menu } from '@/types'

/**
 * 根据当前路由的path，匹配当前面包屑
 * @param path 当前路由的path
 * @param menus 菜单列表
 * @returns {Menu} 返回当前路由对应的面包屑
 */
export function mapPathToCrumb(path: string, menus: Menu[]) {
  const crumbs: Menu[] = []
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        crumbs.push(menu)
        crumbs.push(subMenu)
      }
    }
  }
  return crumbs
}
