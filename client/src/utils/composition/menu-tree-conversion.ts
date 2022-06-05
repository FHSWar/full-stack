import { cloneDeep } from 'lodash';
import { useStore } from '@/stores';
import type { MenuList, MenuTree, ExtendedMenuTreeItem } from '@/utils';

// 摊平菜单树方法挪到shared里了，顺便通过文件夹的正确层级解决从shared引入方法报错的问题
export { flattenMenuTree } from 'shared/client-util';

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
