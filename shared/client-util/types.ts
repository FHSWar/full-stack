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
