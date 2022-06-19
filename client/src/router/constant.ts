import type { MenuTree } from '@/utils';

// 这个放到'export-from-shared'再从'@/utils'导出会报错，原因不明
export { fallbackRoutes } from 'shared/client-util'; // 完全没角色的时候应该读这个

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

export const fallbackRoutesIdArr = ['99', '100', '101', '102', '103'];
