<script lang="ts" setup>
import { onMounted } from 'vue';
import { registerMicroApps, start } from 'qiankun';

onMounted(() => {
	// eslint-disable-next-line no-underscore-dangle
	if (!window.__POWERED_BY_QIANKUN__) window.__POWERED_BY_QIANKUN__ = true;

	registerMicroApps([
		{
			name: 'vue2', // app name registered
			entry: '//localhost:7001',
			container: '#sub-app',
			activeRule: '/home/vue2'
		}
	]);

	start();
});
</script>

<template>
  <div id="sub-app">
    sub-app
  </div>
</template>

<style lang="scss" scoped>
</style>
