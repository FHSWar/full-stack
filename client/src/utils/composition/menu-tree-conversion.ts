import type { MenuTree } from '@/utils';

export const flattenMenuTree = (arr: MenuTree) => {
	const result = [] as MenuTree;
	const handler = (innerArr: any) => {
		innerArr.forEach((item: any) => {
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
