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
		component: () => import('@/views/personnel-management/menu/index.vue')
	},
	{
		path: 'api-permission',
		name: 'api-permission',
		component: () => import('@/views/personnel-management/api.vue')
	},
	{
		path: 'result',
		name: 'result',
		component: () => import('@/components/result')
	},
	{
		path: 'test-new-stuff',
		name: 'test-new-stuff',
		component: () => import('@/views/test-new-stuff.vue')
	}
];
