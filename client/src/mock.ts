import type { MenuList } from '@/utils';

export const dynamicSideMenuList:MenuList = [
	{
		title: '流程',
		id: '1',
		pid: '',
		icon: 'Message',
		page: 'one'
	},
	{
		title: '流程2',
		id: '4',
		icon: 'Setting',
		page: 'two',
		pid: '3'
	},
	{
		title: '流程3',
		icon: 'ColdDrink',
		id: '3',
		pid: '2'
	},
	{
		title: '流程1',
		id: '2',
		pid: '',
		icon: 'Coffee'
	},
	{
		title: '配置',
		id: '5',
		pid: '',
		icon: 'Setting'
	},
	{
		title: '菜单',
		id: '6',
		page: 'menu',
		pid: '5',
		icon: 'Rank'
	},
	{
		title: '角色',
		id: '7',
		page: 'role',
		pid: '5',
		icon: 'UserFilled'
	},
	{
		title: '用户',
		id: '8',
		page: 'user',
		pid: '5',
		icon: 'User'
	}
];
