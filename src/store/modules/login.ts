import type { Account } from '@/types'

import { defineStore } from 'pinia'
import { getUserInfo, postLogin } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getItem('token') || '',
    userInfo: localCache.getItem('userInfo') || {}
  }),
  actions: {
    /** 用户登录 */
    async loginAction(account: Account) {
      const res = await postLogin(account)

      this.token = res.data.token
      // 本地存储
      localCache.setItem('token', res.data.token)
      // 路由跳转
      router.push('/main')
      // 获取用户详细信息
      this.getUserInfoAction(res.data.id)
    },

    /** 获取用户详细信息 */
    async getUserInfoAction(id: number) {
      const res = await getUserInfo(id)

      this.userInfo = res.data
      localCache.setItem('userInfo', res.data)
    }
  }
})

export default useLoginStore
