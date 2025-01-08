import type { Account, User, UserInfo, Result } from '@/types'

import mrRequest from '@/utils/request'

/** 用户登录 */
export function postLogin(account: Account) {
  return mrRequest.post<Result<User>>({ url: '/login', data: account })
}

/** 获取用户详细信息 */
export function getUserInfo(id: number) {
  return mrRequest.get<Result<UserInfo>>({ url: `/users/${id}` })
}
