export type ShallowObject = {
  [key:string]: string|number|boolean
}
export type LocalStorageValue = string|number|boolean|ShallowObject

// 组装好的，渲染用
export type MenuTree = {
  children: MenuTree
  icon?: string // 用不了keyof typeof Icons
  id: string
  page?: string // 就是路由的name
  pid: string
  title: string
  meta?: {
    [key:string]: any
  }
}[];
// 摊平的，方便后端存
export type MenuList = {
  icon?: string
  id: string
  page?: string
  pid: string
  title: string
  meta?: {
    [key:string]: any
  }
}[];

export type PopoverOption = {
  icon: string,
  desc: string,
  // eslint-disable-next-line no-unused-vars
  method: () => void
}

export type ThemeConfig = {
  isAsideMenuCollapse: boolean
}

export type UserInfo = {
  avatar: string
  username: string
  um: string
  permission: string
}
