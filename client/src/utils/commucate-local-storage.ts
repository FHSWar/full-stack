/*
	从本地存取内容，封装一下方便实用
*/
import type { LocalStorageValue, ShallowObject } from '@/types';

// 存的是个JSON化的只一层的对象，才有innerKey
export const setLocal = (key:string, value: LocalStorageValue, innerKey?: string) => {
	if (innerKey) {
		const firstLayerValue = localStorage.getItem(key);
		if (firstLayerValue === null) return null;
		const oldVal = JSON.parse(firstLayerValue);
		localStorage.setItem(key, JSON.stringify({ ...oldVal, [innerKey]: value }));
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
