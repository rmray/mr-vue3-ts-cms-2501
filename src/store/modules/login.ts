import { defineStore } from 'pinia'
import { postLogin } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getItem('token') || ''
  }),
  actions: {
    // 用户登录
    async loginAction(account: Account) {
      const res = await postLogin(account)
      this.token = res.data.token
      // 本地存储
      localCache.setItem('token', res.data.token)
      // 路由跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
