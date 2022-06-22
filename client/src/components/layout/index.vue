<script lang="ts" setup>
import { shallowRef, watchEffect } from 'vue';
import { useStore } from '@/stores';
import { getLocal } from '@/utils';
import type { ThemeConfig } from '@/utils';

const layoutType = shallowRef(null) as any;
const store = useStore();
const switchLayout = (type: string) => {
	switch (type) {
		case 'default':
			import('./default/index.vue').then((val) => { layoutType.value = val.default; });
			break;
			// @ts-ignore
		case 'single-column':
			import('./single-column/index.vue').then((val) => { layoutType.value = val.default; });
			break;
		default:
	}
};

watchEffect(() => {
	switchLayout(store.themeConfig.layout);
});

// 解决反复刷新导致布局错乱的bug
const { layout } = getLocal('themeConfig') as ThemeConfig;
switchLayout(layout || 'default');
</script>

<template>
  <component :is="layoutType" />
</template>
