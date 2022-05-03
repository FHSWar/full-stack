import { ElLoading, ElMessage } from 'element-plus';
import { extendedAxiosRequestConfig } from '@/utils';
import { router } from '@/router';
import { useStore } from '@/stores';
import { setLocal } from '@/utils/commucate-local-storage';
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

		if ((config as extendedAxiosRequestConfig).useLoading) {
			loadingCount--;
			if (loadingCount === 0) endLoading();
		}
		if ((config as extendedAxiosRequestConfig).useMessage) {
			const { msg } = data;
			ElMessage.success(msg);
		}

		return data;
	},
	(error) => {
		if (!error.response) return error;
		const { config, data } = error.response;

		if ((config as extendedAxiosRequestConfig).useLoading) {
			loadingCount--;
			if (loadingCount === 0) endLoading();
		}

		// 错误一定弹
		const { msg } = data;
		if (msg === 'jwt expired') {
			// 这样就不用手动清除了，jwt过期就会回到login页面
			setLocal('token', '');
			// 这里没法用 useRouter 返回的实例
			router.push({ name: 'login' });
		}
		ElMessage.error(msg);

		return data;
	}
);

export default axios;
