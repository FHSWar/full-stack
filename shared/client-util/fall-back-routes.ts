import { MenuTree } from './types';

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
			{ id: '102', page: 'menu', pid: '100', title: '菜单', icon: 'Rank', children: [] },
			{ id: '103', page: 'api-restriction', pid: '100', title: '接口', icon: 'Link', children: [] },
			{ id: '104', page: 'user', pid: '100', title: '用户', icon: 'UserFilled', children: [] }
		]
	}
];