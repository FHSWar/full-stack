<script lang="ts" setup>
import { useStore } from '@/stores';

const store = useStore();

const switchLayout = () => {
	store.themeConfig.layout === 'default'
		? store.themeConfig.layout = 'single-column'
		: store.themeConfig.layout = 'default';
};
</script>

<template>
  <div
    class="switch-layout__icon-wrapper"
    @click="switchLayout"
  >
    <use-icon icon="Grid" :size="18" />
  </div>
</template>

<style lang="scss" scoped>
.switch-layout {
  &__icon-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
