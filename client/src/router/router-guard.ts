import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import _ from 'lodash';
import { useStore } from '@/stores';
import { routes } from './routes';

let store:ReturnType<typeof useStore>;

const router = createRouter({
	history: createWebHistory(),
	routes
});

const ifToLogin = (to: RouteLocationNormalized, from: RouteLocationNormalized, next:NavigationGuardNext) => {
	// eslint-disable-next-line no-restricted-globals
	if (_.isEmpty(history.state.current)) {
	// eslint-disable-next-line no-restricted-globals
		_.assign(history.state, { current: from.fullPath });
	}

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
	if (to.name === undefined) return;
	const currentRouteConfig = store.breadcrumb.find((item) => item.page === to.name);
	if (currentRouteConfig && !store.visitedRoutes.find((item) => item.page === currentRouteConfig.page)) {
		store.visitedRoutes.push(currentRouteConfig);
	}
};

router.beforeEach((to, from, next) => { ifToLogin(to, from, next); });
router.afterEach((to) => { maintainVisitedRoutes(to); });
export { router };
