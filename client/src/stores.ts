import { defineStore } from 'pinia';
import init from '@/utils/persistance/init-state-from-local';

export const useStore = defineStore('common', {
	state: () => ({
		breadcrumb: init.breadcrumb,
		menuList: init.menuList,
		menuTree: init.menuTree,
		themeConfig: init.themeConfig,
		token: init.token,
		userInfo: init.userInfo,
		visitedRoutes: init.visitedRoutes
	})
});
