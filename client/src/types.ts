export type ShallowObject = {
  [key:string]: string|number|boolean
}
export type LocalStorageValue = string|number|boolean|ShallowObject

export type MenuTree = {
  children: MenuTree
  icon?: string // 用不了keyof typeof Icons
  id: string
  page?: string // 就是路由的name
  pid: string
  title: string
}[];
export type MenuList = Omit<MenuTree, 'children'>

export type ThemeConfig = {
  isAsideMenuCollapse: boolean
}
