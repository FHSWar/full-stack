import { camelCase, isArray, isObject, transform } from 'lodash';

export const camelize = (obj: any) => transform(obj, (acc: any, value, key: any, target) => {
	const camelKey = isArray(target) ? key : camelCase(key);

	acc[camelKey] = isObject(value) ? camelize(value) : value;
});