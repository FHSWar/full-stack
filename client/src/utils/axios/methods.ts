import { AxiosRequestConfig } from 'axios';
import axios from './interceptors';

type Options = {
	useLoading?: boolean,
	useMessage?: boolean,
	handleError?: boolean
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
				resolve(res);
			})
			.catch((error) => {
				if (options.handleError) return reject(error);
				console.warn('silent get error', error.toString());
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
				resolve(res);
			})
			.catch((error) => {
				if (options.handleError) return reject(error);
				console.warn('silent post error', error.toString());
			});
	});
};

export default axios;
