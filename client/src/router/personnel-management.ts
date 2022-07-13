import type { RouteRecordRaw } from 'vue-router';

export const personnelManagement: RouteRecordRaw[] = [
	{
		path: 'role',
		name: 'role',
		component: () => import('@/views/personnel-management/role.vue')
	},
	{
		path: 'user',
		name: 'user',
		component: () => import('@/views/personnel-management/user.vue')
	},
	{
		path: 'menu',
		name: 'menu',
		component: () => import('@/views/personnel-management/menu/index.vue')
	},
	{
		path: 'api-permission',
		name: 'api-permission',
		component: () => import('@/views/personnel-management/api-permission/index.vue')
	}
];
