<script lang="ts" setup>
import { shallowRef, watchEffect } from 'vue';
import { useStore } from '@/stores';

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
switchLayout('default');
watchEffect(() => {
	switchLayout(store.themeConfig.layout);
});

</script>

<template>
  <component :is="layoutType" />
</template>
