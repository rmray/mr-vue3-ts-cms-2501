import mrRequest from '@/utils/request'

/** 用户登录 */
export function postLogin(account: Account) {
  return mrRequest.post<Result<User>>({ url: '/login', data: account })
}
