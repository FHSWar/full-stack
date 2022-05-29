import type { MenuTree, ExtendedMenuTreeItem } from '@/utils';

export const flattenMenuTree = (arr: MenuTree) => {
	const result = [] as MenuTree;
	const handler = (innerArr: MenuTree) => {
		innerArr.forEach((item: MenuTree[0]) => {
			if (item.children.length !== 0) {
				handler(item.children);
			}
			result.push(item);
		});
	};
	handler(arr);

	result.forEach((item: any) => {
		item.children = [];
		return item;
	});
	return result;
};

// 其他角色的操作会给“所有菜单”加上check和indeterminate标记位，不好
export const trimMenuTree = (arr: ExtendedMenuTreeItem[]):MenuTree => {
	const handler = (innerArr: ExtendedMenuTreeItem[]) => {
		innerArr.forEach((item: ExtendedMenuTreeItem) => {
			if (item.children.length !== 0) {
				handler(item.children);
			}
			delete item.checked;
			delete item.indeterminate;
		});
	};
	handler(arr);
	return arr;
};
