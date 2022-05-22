import { MenuList } from '@/utils';
import { useStore } from '@/stores';

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
