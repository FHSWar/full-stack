import { RouteRecordRaw } from 'vue-router';
import Login from '../views/login/index.vue';
import Home from '../views/layout/index.vue';
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
		component: Home,
		children: mainPanelRoutes
	}
];
