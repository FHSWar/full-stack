<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '@/stores';
import { usePiniaPersistance } from '@/utils';

const store = useStore();
const layout = computed(() => store.themeConfig.layout);
const switchinglayout = ref(false);

watch(layout, (oldVal, newVal) => {
	if (oldVal !== newVal) switchinglayout.value = true;
	else switchinglayout.value = false;
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
