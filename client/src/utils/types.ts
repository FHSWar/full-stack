import type { ButtonType } from 'element-plus';

export type ShallowObject = {
  [key:string]: string|number|boolean
}
export type LocalStorageValue = string|number|boolean|ShallowObject

// 组装好的，渲染用
export type MenuTree = {
  children: MenuTree
  desc?: string
  icon?: string // 用不了keyof typeof Icons
  id: string
  meta?: {
    [key:string]: any
  }
  page?: string // 就是路由的name
  pid: string
  title: string
}[];
export type ExtendedMenuTreeItem = MenuTree[0]&{checked?: boolean, indeterminate?: boolean}

// 摊平的，方便后端存
export type MenuList = {
  desc?: string
  icon?: string
  id: string
  meta?: {
    [key:string]: any
  }
  page?: string
  pid: string
  title: string
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
  roles: string[]
}

// fhs-table 用
export type FhsTableColumn = {
  align?: 'left' | 'center' | 'right'
  // 有这个键就变为按钮列
  buttons?: {
    description: string
    type?: ButtonType
    link?: boolean
    doubleCheck?: boolean
	}[]
  children?: FhsTableColumn[]
  editable?: boolean
  // editable为true且editing为true即可编辑
  editing?: boolean
  label: string
  width?: number
  prop?: string
  // sortable?: boolean
}
