import { AxiosRequestConfig } from 'axios';
import axios from './interceptors';

type Options = {
	useLoading?: boolean,
	useMessage?: boolean
};
const defaultOption = { useLoading: false, useMessage: false } as const;

export type extendedAxiosRequestConfig = AxiosRequestConfig<any>&Options

export const get = (
	url = '',
	params = {},
	options: Options = defaultOption
) => {
	const config = {
		method: 'get',
		url,
		params,
		...options
	};
	return new Promise((resolve, reject) => {
		axios(config as extendedAxiosRequestConfig)
			.then((res) => {
				console.log('get res', JSON.stringify(res, null, 4));
				resolve(res);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const post = (
	url = '',
	params = {},
	options: Options = defaultOption
) => {
	const config = {
		method: 'post',
		url,
		data: { ...params },
		...options
	};
	return new Promise((resolve, reject) => {
		axios(config as extendedAxiosRequestConfig)
			.then((res) => {
				console.log('res', res);
				resolve(res);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export default axios;
