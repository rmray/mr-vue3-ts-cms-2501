import type { Account, Menu, UserInfo } from '@/types'

import { defineStore } from 'pinia'
import router from '@/router'

import { getRoleMenu, getUserInfo, postLogin } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import { mapMenuToRoute } from '@/utils/map-to/map-menu-to-route'

interface LoginState {
  token: string
  userInfo: UserInfo
  roleMenus: Menu[]
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: '',
    userInfo: {},
    roleMenus: []
  }),
  actions: {
    /** 用户登录 */
    async loginAction(account: Account) {
      const res = await postLogin(account)
      this.token = res.data.token

      localCache.setItem('token', res.data.token) // 本地存储
      await this.getUserInfoAction(res.data.id) // 获取用户详细信息
      if (this.userInfo?.role?.id) await this.getRoleMenuAction(this.userInfo?.role?.id) // 获取角色菜单
      this.loadLocalRouteAction() // 动态加载本地路由

      router.push('/main') // 路由跳转
    },

    /** 获取用户详细信息 */
    async getUserInfoAction(id: number) {
      const res = await getUserInfo(id)
      this.userInfo = res.data

      localCache.setItem('userInfo', res.data) // 本地存储
    },

    /** 获取角色菜单 */
    async getRoleMenuAction(id: number) {
      const res = await getRoleMenu(id)
      this.roleMenus = res.data

      localCache.setItem('roleMenus', res.data) // 本地存储
      // console.log(res.data)
    },

    /** 动态加载本地路由 */
    loadLocalRouteAction() {
      const token = localCache.getItem('token')
      const userInfo = localCache.getItem('userInfo')
      const roleMenus = localCache.getItem('roleMenus')

      // 如果有token，用户信息，角色菜单，则加载本地路由
      if (token && userInfo && roleMenus) {
        this.token = token
        this.userInfo = userInfo
        this.roleMenus = roleMenus

        const routes = mapMenuToRoute(roleMenus)
        routes?.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
