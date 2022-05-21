import { computed, watchEffect } from 'vue';
import { setLocal } from '@/utils';
import { useStore } from '@/stores';

export const usePiniaPersistance = () => {
	const store = useStore();

	const token = computed(() => store.token);
	const isAsideMenuCollapse = computed(() => store.themeConfig.isAsideMenuCollapse);
	const userInfo = computed(() => store.userInfo);

	watchEffect(() => { setLocal('token', token.value); });
	watchEffect(() => { setLocal('themeConfig', isAsideMenuCollapse.value, 'isAsideMenuCollapse'); });
	watchEffect(() => { setLocal('userInfo', userInfo.value); });
};
