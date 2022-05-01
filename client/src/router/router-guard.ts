import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '@/stores';
import { routes } from './routes';

let store:ReturnType<typeof useStore>;

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (!store) store = useStore();

	if (to.path === '/login') {
		next();
	} else if (store.token === '') {
		next('/login');
	} else {
		next();
	}
});
export { router };
