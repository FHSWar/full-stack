import type { MenuTree } from '@/utils';

// 常驻路由
export const constantRoutes:MenuTree = [
	{
		icon: 'HomeFilled',
		id: '99',
		page: 'home',
		pid: '',
		title: '首页',
		children: []
	}
];

// 完全没角色的时候应该读这个
export const fallbackRoutes:MenuTree = [
	{
		icon: 'HomeFilled',
		id: '99',
		page: 'home',
		pid: '',
		title: '首页',
		children: []
	},
	{
		id: '100',
		pid: '',
		title: '权限配置',
		icon: 'SetUp',
		children: [
			{ id: '101', page: 'role', pid: '100', title: '角色', icon: 'User', children: [] },
			{ id: '102', page: 'user', pid: '100', title: '用户', icon: 'UserFilled', children: [] },
			{ id: '103', page: 'menu', pid: '100', title: '菜单', icon: 'Rank', children: [] }
		]
	}
];

export const fallbackRoutesIdArr = ['99', '100', '101', '102', '103'];
