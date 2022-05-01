import { ElLoading, ElMessage } from 'element-plus';
import { extendedAxiosRequestConfig } from 'utils';
import axios from './config';

type LoadingInstanceType = ReturnType<typeof ElLoading.service>;

let LoadingInstance:LoadingInstanceType;
let loadingCount = 0;

const startLoading = () => {
	LoadingInstance = ElLoading.service({
		lock: true,
		text: '加载中...',
		background: 'rgba(0,0,0,0.2)'
	});
};
const endLoading = () => LoadingInstance.close();

axios.interceptors.request.use(
	(config: extendedAxiosRequestConfig) => {
		if (!config) return config;
		console.log('config', config);
		const { useLoading } = config;
		if (useLoading) {
			loadingCount++;
			startLoading();
		}
		return config;
	},
	(error) => {
		console.log('request', error);
	}
);

axios.interceptors.response.use(
	(response) => {
		const { config, data } = response;
		const { useLoading, useMessage } = config as extendedAxiosRequestConfig;

		if (useLoading) {
			loadingCount--;
			if (loadingCount === 0) endLoading();
		}
		if (useMessage) {
			const { msg } = data;
			ElMessage.success(msg);
		}
		return data;
	},
	(error) => {
		const { config, data } = error.response;

		if ((config as extendedAxiosRequestConfig).useLoading) {
			loadingCount--;
			if (loadingCount === 0) endLoading();
		}

		// 错误一定弹
		const { msg } = data;
		ElMessage.error(msg);

		return data;
	}
);

export default axios;
