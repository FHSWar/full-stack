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
	showBool?: boolean
	title: string
}[];
