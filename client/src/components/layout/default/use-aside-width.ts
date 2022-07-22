import { computed, ref, watchEffect } from 'vue';
import { useStore } from '@/stores';

export const useAsideWidth = () => {
	const store = useStore();
	const asideWidth = ref('0');
	const isCollapse = computed(() => store.themeConfig.isAsideMenuCollapse);

	watchEffect(() => {
		isCollapse.value
			? asideWidth.value = '64px'
			: asideWidth.value = '300px';
	});

	return asideWidth;
};
