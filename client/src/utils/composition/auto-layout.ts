import { computed, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useStore } from '@/stores';

export const useAutoLayout = () => {
	const isNarrow = useMediaQuery('(max-width: 800px)');

	const store = useStore();
	const layout = computed(() => store.themeConfig.layout);

	const switchinglayout = ref(false);

	// 从窄切到宽，把侧边栏展开，反之则反
	watch(isNarrow, (oldVal, newVal) => {
		switch (true) {
			case !oldVal && newVal:
				store.themeConfig.isAsideMenuCollapse = false;
				break;
			case oldVal && !newVal:
				store.themeConfig.isAsideMenuCollapse = true;
				break;
			default:
				// do nothing
		}
	});

	// 控制切布局动画
	watch(layout, (oldVal, newVal) => {
		if (oldVal !== newVal) switchinglayout.value = true;
		else switchinglayout.value = false;
	});

	return switchinglayout;
};
