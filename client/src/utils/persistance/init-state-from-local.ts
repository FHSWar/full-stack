import { constantRoutes } from '@/router/constant';
import type { MenuList, MenuTree } from '@/utils';
import { flattenMenuTree, getLocal, getSession, setLocal, ThemeConfig, UserInfo } from '@/utils';

let temp:any;

let menuList: MenuList;
let menuTree: MenuTree;
temp = getLocal('menuTree') as unknown as MenuTree;
if (temp !== null) {
	menuTree = temp;
	menuList = flattenMenuTree(menuTree);
} else {
	menuTree = [] as MenuTree;
	menuList = [] as MenuList;
}

let themeConfig: ThemeConfig;
themeConfig = getLocal('themeConfig') as ThemeConfig;
if (themeConfig === null) {
	themeConfig = {
		isAsideMenuCollapse: false,
		layout: 'default',
		themeColor: 'light'
	};
	setLocal('themeConfig', themeConfig);
}

let userInfo: UserInfo;
temp = getLocal('userInfo') as unknown as UserInfo;
if (temp !== null) userInfo = temp;
else userInfo = {} as UserInfo;

let token:string;
temp = getLocal('token') as string;
if (temp !== null) token = temp;
else token = '';

let breadcrumb:MenuList;
temp = getSession('breadcrumb') as string;
if (temp !== null) breadcrumb = temp;
else breadcrumb = constantRoutes;

let visitedRoutes:MenuList;
temp = getSession('visitedRoutes') as string;
if (temp !== null) visitedRoutes = temp;
else visitedRoutes = [] as MenuList;

export default { breadcrumb, menuList, menuTree, themeConfig, token, userInfo, visitedRoutes };
