import { ElLoading, ElMessage } from 'element-plus';
import { extendedAxiosRequestConfig, useLogout } from '@/utils';
import { useStore } from '@/stores';
import axios from './config';

type LoadingInstanceType = ReturnType<typeof ElLoading.service>;

let loadingCount = 0;
let LoadingInstance:LoadingInstanceType;
let store:ReturnType<typeof useStore>;

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
		if (!store) store = useStore();

		const { useLoading } = config;
		config.headers = {
			...config.headers,
			Authorization: store.token
		};

		if (useLoading) {
			loadingCount++;
			startLoading();
		}

		return config;
	},
	(error) => { ElMessage.error(error.toString()); }
);

axios.interceptors.response.use(
	(response) => {
		const { config, data } = response;

		if ((config as extendedAxiosRequestConfig)?.useLoading) {
			loadingCount--;
			if (loadingCount === 0) endLoading();
		}
		if ((config as extendedAxiosRequestConfig)?.useMessage) {
			const { message } = data;
			if (message !== '默认返回') ElMessage.success(message);
		}

		return data;
	},
	(error) => {
		if (!error.response) return error;
		const { config, data } = error.response;

		if ((config as extendedAxiosRequestConfig)?.useLoading) {
			loadingCount--;
			if (loadingCount === 0) endLoading();
		}

		// 错误一定弹
		const { message } = data;
		if (message === 'jwt expired') useLogout();

		ElMessage.error(message || error.toString());

		return Promise.reject(error.toString());
	}
);

export default axios;
