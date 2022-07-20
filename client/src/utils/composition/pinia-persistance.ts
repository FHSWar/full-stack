import { computed, watch, watchEffect } from 'vue';
import { setLocal, setSession } from '@/utils';
import { useStore } from '@/stores';

export const usePiniaPersistance = () => {
	const store = useStore();

	const breadcrumb = computed(() => store.breadcrumb);
	const menuTree = computed(() => store.menuTree);
	const token = computed(() => store.token);
	const isAsideMenuCollapse = computed(() => store.themeConfig.isAsideMenuCollapse);
	const layout = computed(() => store.themeConfig.layout);
	const userInfo = computed(() => store.userInfo);
	const visitedRoutes = computed(() => store.visitedRoutes);

	watchEffect(() => { setLocal('token', token.value); });
	watchEffect(() => { setLocal('themeConfig', isAsideMenuCollapse.value, 'isAsideMenuCollapse'); });
	watchEffect(() => { setLocal('themeConfig', layout.value, 'layout'); });
	watchEffect(() => { setLocal('userInfo', (userInfo as any).value); });
	watch(menuTree, () => { setLocal('menuTree', (menuTree as any).value); }, { deep: true });
	watch(breadcrumb, () => { setSession('breadcrumb', (breadcrumb as any).value); }, { deep: true });
	watch(visitedRoutes, () => { setSession('visitedRoutes', (visitedRoutes as any).value); }, { deep: true });
};
