import Login from '../views/login/index.vue';
import Home from '../views/layout/index.vue';

export const routes = [
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
		component: Home
	}
];
