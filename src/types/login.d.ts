// 请求类型

/** 登录账号表单 */
export interface Account {
  name: string
  password: string
}

// 返回类型

/** 用户信息 */
export interface User {
  id: number
  name: string
  token: string
}

/** 用户详细信息 */
interface Role {
  id: number
  name: string
  createAt: string
  updateAt: string
  intro: string
}
interface Department {
  id: number
  name: string
  createAt: string
  updateAt: string
  parentId: null | number
  leader: string
}
export interface UserInfo {
  id: number
  name: string
  createAt: string
  updateAt: string
  realname: string
  cellphone: number
  enable: number
  role: Role
  department: Department
}
