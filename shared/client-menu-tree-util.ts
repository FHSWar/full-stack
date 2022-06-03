import { cloneDeep } from 'lodash';
import type { MenuTree, ExtendedMenuTreeItem } from 'shared';

// 组装菜单树
export const assembleTree = (data: MenuTree) => {
	const map: any = {};
	data.forEach((item) => {
		map[item.id] = item;
		(item as any).children = [];
	});

	const roots: MenuTree = [];
	data.forEach((item) => {
		const parent = map[item!.pid];
		if (parent) {
			parent.children.push(item);
		} else {
			roots.push(item as MenuTree[number]);
		}
	});
	return roots;
};

// 摊平菜单树
export const flattenMenuTree = (arr: MenuTree) => {
	const arrCopy = cloneDeep(arr);
	const result = [] as MenuTree;
	const handler = (innerArr: MenuTree) => {
		innerArr.forEach((item: MenuTree[0]) => {
			if (item.children.length !== 0) {
				handler(item.children);
			}
			result.push(item);
		});
	};
	handler(arrCopy);

	result.forEach((item: any) => {
		item.children = [];
		return item;
	});
	return result;
};

// 其他角色的操作会给“所有菜单”加上check和indeterminate标记位，不好，修掉，顺拜维护正确的pid
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