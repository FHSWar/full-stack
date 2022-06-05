import { cloneDeep } from 'lodash';
import type { MenuTree } from 'shared/client-util';

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