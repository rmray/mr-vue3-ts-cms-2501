/** 请求返回类型 */
export interface Result<T> {
  code: number
  data: T
}
