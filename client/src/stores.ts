import { defineStore } from 'pinia';
import { constantRoutes } from '@/router/constant';
import type { MenuList } from '@/utils';
import init from '@/utils/persistance/init-state-from-local';

export const useStore = defineStore('common', {
	state: () => ({
		themeConfig: init.themeConfig,
		token: init.token,
		userInfo: init.userInfo,
		breadcrumb: constantRoutes as MenuList,
		menuList: [] as MenuList,
		visitedRoutes: [] as MenuList
	})
});
