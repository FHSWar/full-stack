import { cloneDeep } from 'lodash';
import { computed, ref } from 'vue';
import { useStore } from '@/stores';
import type { MenuList, MenuTree, ExtendedMenuTreeItem } from '@/utils';

import { getRoutesByRole } from '@/api/personnel';
import { fallbackRoutes } from '@/router';
import { flattenMenuTree, getLocal } from '@/utils';

// 找到菜单项的祖先节点
export const findMenuListChain = (leafId: string):MenuList => {
	const store = useStore();

	const result:MenuList = [];
	const handler = (id: string) => {
		const menuItem = store.menuList.find((item) => item.id === id) as MenuList[number];
		result.unshift(menuItem);
		if (menuItem.pid !== '') handler(menuItem.pid);
	};
	handler(leafId);
	return result;
};

// 其他角色的操作会给“@/utils/config/specialRole”加上check和indeterminate标记位，不好，修掉，顺便维护正确的pid
export const trimMenuTree = (arr: ExtendedMenuTreeItem[]):MenuTree => {
	const arrCopy = cloneDeep(arr);
	const handler = (innerArr: ExtendedMenuTreeItem[], pid?: string) => {
		innerArr.forEach((item: ExtendedMenuTreeItem) => {
			// 第一层的菜单项pid为空字符串
			pid ? item.pid = pid : item.pid = '';
			if (item.children.length !== 0) {
				handler(item.children, item.id);
			}
			delete item.checked;
			delete item.indeterminate;
		});
	};
	handler(arrCopy);
	return arrCopy;
};

export const initMenuTree = () => {
	const store = useStore();
	// 用全局状态的值来做初始化
	// 全局的面包屑用constantRoutes做兜底，必有id可用
	const activePageId = computed(() => store.breadcrumb.at(-1)!.id);
	const sideMenu = ref([] as MenuTree);

	const handler = async () => {
		// getLocal('menuTree')为truthy说明还有登陆态，复用即可，不需要请求
		if (getLocal('menuTree')) {
			sideMenu.value = store.menuTree;
			return;
		}

		try {
			const { routes } = await getRoutesByRole() as any;
			sideMenu.value = JSON.parse(routes);
			store.menuTree = sideMenu.value;
			store.menuList = flattenMenuTree(sideMenu.value);
		} catch (e) {
			console.warn('初始状态。');
			sideMenu.value = fallbackRoutes;
			store.menuTree = sideMenu.value;
			store.menuList = flattenMenuTree(sideMenu.value);
		}
	};
	handler();

	return { activePageId, sideMenu };
};
