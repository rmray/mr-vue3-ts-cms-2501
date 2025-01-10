import type { Menu } from '@/types'

/**
 * 根据当前路由的path，从菜单列表中获取对应的菜单项
 * @param path 当前路由的path
 * @param menus 菜单列表
 * @returns {Menu} 返回当前路由对应的菜单项
 */
export function mapPathToMenu(path: string, menus: Menu[]) {
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}
