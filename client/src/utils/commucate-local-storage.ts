/*
	从本地存取内容，封装一下方便实用
*/
import type { LocalStorageValue, ShallowObject } from '@/utils';

// 存的是个JSON化的只一层的对象，才有innerKey
export const setLocal = (key:string, value: LocalStorageValue, innerKey?: string) => {
	if (innerKey) {
		const firstLayerValue = localStorage.getItem(key);

		// 这样操作后，getLocal(key)就不可能为null
		if (firstLayerValue === null) setLocal(key, {});

		// 但ts不这么觉得，于是在代码层面再次判空
		const notNull = localStorage.getItem(key);
		if (notNull !== null) {
			const oldVal = JSON.parse(notNull);
			localStorage.setItem(key, JSON.stringify({ ...oldVal, [innerKey]: value }));
		}
	} else {
		if (typeof value === 'string') {
			localStorage.setItem(key, value);
			return;
		}
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const getLocal = (key:string, innerKey?: string) => {
	const firstLayerValue = localStorage.getItem(key);
	if (firstLayerValue === null) return null;
	let returnValue:LocalStorageValue;
	try {
		returnValue = JSON.parse(firstLayerValue);
		if (innerKey) return (returnValue as ShallowObject)[innerKey];
		return returnValue;
	} catch (e) {
		// 直接存的非json的字符串才进来的
		return firstLayerValue;
	}
};
