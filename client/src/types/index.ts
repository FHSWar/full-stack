type MenuTree = {
  children: MenuTree
  icon?: string // 用不了 keyof typeof Icons
  id: string
  page?: string
  pid: string
  title: string
}[];
type MenuList = Omit<MenuTree, 'children'>

export type { MenuList, MenuTree };
