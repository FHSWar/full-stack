import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/login/tab-card.vue';
import Home from './views/main-entry.vue';

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		name: 'Home',
		component: Home
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
