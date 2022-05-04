import { MenuList } from '@/types';
import { useStore } from '@/stores';

export const findMenuListChain = (leafId: string):MenuList => {
	const result:MenuList = [];
	const handler = (id: string) => {
		const menuItem = useStore().menuList.find((item) => item.id === id) as MenuList[number];
		result.unshift(menuItem);
		if (menuItem.pid !== '') handler(menuItem.pid);
	};
	handler(leafId);
	return result;
};
