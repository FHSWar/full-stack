import { defineStore } from 'pinia';
import { getLocal, setLocal } from '@/utils';
import { constantRoutes } from '@/router/constant';
import type { MenuList, ThemeConfig } from '@/types';

let themeConfig:ThemeConfig;
themeConfig = getLocal('themeConfig') as ThemeConfig;
if (themeConfig === null) {
	themeConfig = { isAsideMenuCollapse: false };
	setLocal('themeConfig', themeConfig);
}

export const useStore = defineStore('common', {
	state: () => ({
		themeConfig,
		breadcrumb: constantRoutes as MenuList,
		menuList: [] as MenuList,
		token: localStorage.getItem('token') as string || '',
		visitedRoutes: [] as MenuList
	})
});
