import type { MenuList } from '@/types';

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
	}
];
