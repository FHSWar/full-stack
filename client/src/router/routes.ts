import Login from '../views/login/tab-card.vue';
import Home from '../views/main-entry.vue';

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
