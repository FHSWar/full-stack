import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useStore } from '@/stores';
import { routes } from './routes';

let store:ReturnType<typeof useStore>;

const router = createRouter({
	history: createWebHistory(),
	routes
});

const ifToLogin = (to: RouteLocationNormalized, next:NavigationGuardNext) => {
	if (!store) store = useStore();

	if (to.path === '/login') {
		next();
	} else if (store.token === '') {
		next('/login');
	} else {
		next();
	}
};
const maintainVisitedRoutes = (to:RouteLocationNormalized) => {
	if (!to.name) return;
	const currentRouteConfig = store.breadcrumb.find((item) => item.page === to.name);
	if (currentRouteConfig && !store.visitedRoutes.find((item) => item.page === currentRouteConfig.page)) {
		store.visitedRoutes.push(currentRouteConfig);
	}
};

router.beforeEach((to, _, next) => { ifToLogin(to, next); });
router.afterEach((to) => { maintainVisitedRoutes(to); });

export { router };
