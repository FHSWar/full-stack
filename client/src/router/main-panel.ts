import type { RouteRecordRaw } from 'vue-router';
import { personnelManagement } from '@/router/personnel-management';
import HomePage from '@/views/home-page.vue';

export const mainPanelRoutes: RouteRecordRaw[] = [
	{
		path: '',
		// main-panel的默认页面
		component: HomePage
	},
	...personnelManagement,
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
