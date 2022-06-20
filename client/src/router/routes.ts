/*
	name一定要唯一！
*/
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/login/index.vue';
import Home from '@/components/layout/default/index.vue';
import { mainPanelRoutes } from './main-panel';

export const routes:RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		redirect: '/main'
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/main',
		component: Home,
		children: mainPanelRoutes
	}
];
