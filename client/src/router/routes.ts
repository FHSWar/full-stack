/*
	name一定要唯一！
*/
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/login/index.vue';
import Home from '@/components/layout/index.vue';
import { mainPanelRoutes } from './main-panel';

export const routes:RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/home',
		name: 'home',
		redirect: '/',
		component: Home,
		children: mainPanelRoutes
	}
];
