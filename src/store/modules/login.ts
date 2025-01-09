import type { Account, Menu, UserInfo } from '@/types'

import { defineStore } from 'pinia'
import router from '@/router'

import { getRoleMenu, getUserInfo, postLogin } from '@/services/login/login'
import { localCache } from '@/utils/cache'

interface LoginState {
  token: string
  userInfo: UserInfo
  roleMenu: Menu[]
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: localCache.getItem('token') || '',
    userInfo: localCache.getItem('userInfo') || {},
    roleMenu: []
  }),
  actions: {
    /** 用户登录 */
    async loginAction(account: Account) {
      const res = await postLogin(account)
      this.token = res.data.token

      localCache.setItem('token', res.data.token) // 本地存储
      this.getUserInfoAction(res.data.id) // 获取用户详细信息
      this.getRoleMenuAction(this.userInfo.role.id) // 获取角色菜单
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
      this.roleMenu = res.data
    }
  }
})

export default useLoginStore
