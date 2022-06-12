import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/home-page.vue';

export const mainPanelRoutes:RouteRecordRaw[] = [
	{
		path: '',
		// main-panel的默认页面
		component: HomePage
	},
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
		component: () => import('@/views/personnel-management/menu-configuration/index.vue')
	},
	{
		path: 'result',
		name: 'result',
		component: () => import('@/components/result')
	}
];
