import { AxiosRequestConfig } from 'axios';
import axios from './interceptors';

type Options = {
	useLoading?: boolean,
	useMessage?: boolean,
	handleError?: boolean,
	useFormData?: boolean
};
const defaultOption = { useLoading: true, useMessage: true, handleError: false } as const;

export type extendedAxiosRequestConfig = AxiosRequestConfig<any>&Options

export const get = (
	url = '',
	params = {},
	options: extendedAxiosRequestConfig = {}
) => {
	const config = {
		method: 'get',
		url,
		params,
		...defaultOption,
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
	options: extendedAxiosRequestConfig = {}
) => {
	let config:any;
	if (options.useFormData) {
		config = {
			method: 'post',
			url,
			data: params,
			headers: { 'Content-Type': 'multipart/form-data; boundary=boundary' },
			...defaultOption,
			...options
		};
	} else {
		config = {
			method: 'post',
			url,
			data: { ...params },
			...defaultOption,
			...options
		};
	}

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
