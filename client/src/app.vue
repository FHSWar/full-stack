<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useStore } from '@/stores';
import { usePiniaPersistance } from '@/utils';

const isNarrow = useMediaQuery('(max-width: 800px)');

const store = useStore();
const layout = computed(() => store.themeConfig.layout);
const isCollapse = computed(() => store.themeConfig.isAsideMenuCollapse);
const switchinglayout = ref(false);

watch(layout, (oldVal, newVal) => {
	if (oldVal !== newVal) switchinglayout.value = true;
	else switchinglayout.value = false;
});
watchEffect(() => {
	switch (true) {
		case isNarrow.value && !isCollapse.value:
			store.themeConfig.isAsideMenuCollapse = true;
			break;
		case !isNarrow.value && isCollapse.value:
			store.themeConfig.isAsideMenuCollapse = false;
			break;
		default:
      // do nothing
	}
});

usePiniaPersistance();
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="switchinglayout ? 'el-zoom-in-top' : ''">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
