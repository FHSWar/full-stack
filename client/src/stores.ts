import { defineStore } from 'pinia';
import type { MenuList, ThemeConfig } from '@/types';
import { getLocal, setLocal } from '@/utils';

let themeConfig:ThemeConfig;
themeConfig = getLocal('themeConfig') as ThemeConfig;
if (themeConfig === null) {
	themeConfig = { isAsideMenuCollapse: false };
	setLocal('themeConfig', themeConfig);
}

export const useStore = defineStore('common', {
	state: () => ({
		themeConfig,
		breadcrumb: [] as MenuList,
		menuList: [] as MenuList,
		token: localStorage.getItem('token') as string || '',
		visitedRoutes: [] as MenuList
	})
});
