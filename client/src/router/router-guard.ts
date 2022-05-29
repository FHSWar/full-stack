import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useStore } from '@/stores';
import { routes } from './routes';

let store:ReturnType<typeof useStore>;
interface RouterGuard {
    // eslint-disable-next-line no-unused-vars
    (to: RouteLocationNormalized, next: NavigationGuardNext): boolean|void;
}

const router = createRouter({
	history: createWebHistory(),
	routes
});

const noCheckPageNameArr = ['no-found', 'server-error', 'unauthorized', ''];

const maintainVisitedRoutes = (to:RouteLocationNormalized) => {
	if (!to.name) return;
	const currentRouteConfig = store.breadcrumb.find((item) => item.page === to.name);
	if (currentRouteConfig && !store.visitedRoutes.find((item) => item.page === currentRouteConfig.page)) {
		store.visitedRoutes.push(currentRouteConfig);
	}
};

const checkToken:RouterGuard = (to, next) => {
	if (!store) store = useStore();

	if (to.path === '/login') {
		next();
	} else if (store.token === '') {
		next('/login');
	} else {
		return true;
	}
};
const checkPermission:RouterGuard = (to, next) => {
	if (!to.name && to.fullPath !== '/main') return next('/main/no-found');

	if (noCheckPageNameArr.includes(to.name as string || '')) return true;

	// !新增页面必须有name，灵活性都耦合在这个字段上了
	const notInMenuList = !store.menuList.find((item:any) => item.page === to.name);
	if (notInMenuList) return next('/main/unauthorized');

	return true;
};
const guardBefore:RouterGuard = (to, next) => {
	let notProceeded:boolean|void;
	notProceeded = checkToken(to, next);
	if (notProceeded) notProceeded = checkPermission(to, next);
	if (notProceeded) next();
};

router.beforeEach((to, _, next) => { guardBefore(to, next); });
router.afterEach((to) => { maintainVisitedRoutes(to); });

export { router };
