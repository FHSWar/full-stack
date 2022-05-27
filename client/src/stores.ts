import { defineStore } from 'pinia';
import type { MenuList } from '@/utils';
import init from '@/utils/persistance/init-state-from-local';

export const useStore = defineStore('common', {
	state: () => ({
		breadcrumb: init.breadcrumb,
		menuList: [] as MenuList,
		themeConfig: init.themeConfig,
		token: init.token,
		userInfo: init.userInfo,
		visitedRoutes: init.visitedRoutes as MenuList
	})
});
