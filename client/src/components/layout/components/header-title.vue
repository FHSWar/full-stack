<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useStore } from '@/stores';

const store = useStore();
const isCollapse = computed(() => store.themeConfig.isAsideMenuCollapse);
const isSingleColumn = computed(() => store.themeConfig.layout === 'single-column');

const headerRef = ref<HTMLHeadElement>();
const { width } = useElementSize(headerRef);

const height = computed(() => (isSingleColumn.value ? '116px' : '56px'));
const titleWidth = computed(() => (isSingleColumn.value ? '300px' : ''));
const paddingLeft = computed(() => (isSingleColumn.value ? 0 : '20px'));

const isDefaultNarrow = computed(() => !isSingleColumn.value && isCollapse.value);
const isSingleNarrow = computed(() => width.value < 150);

const showHeaderTitle = computed(() => {
	if (isSingleColumn.value) return !isSingleNarrow.value;
	return !isDefaultNarrow.value;
});
</script>

<template>
  <header ref="headerRef" class="side-bar__header">
    <use-icon icon="Setting" />
    <use-icon icon="Tools" />
    <transition name="el-zoom-in-center">
      <h1 v-show="showHeaderTitle">
        后台系统
      </h1>
    </transition>
  </header>
</template>

<style lang="scss" scoped>
@use "@/assets/style/rotate-animation.scss";

.side-bar {
  &__header {
    --vscode-icon-color: #4b9ae9;

    display: flex;
    align-items: center;
    width: v-bind("titleWidth");
    height: v-bind("height");
    padding-left: v-bind("paddingLeft");

    svg {
      flex-shrink: 0;
      color: var(--vscode-icon-color);

      &:first-of-type {
        top: 4px;
        font-size: 24px;
        animation: gear-rotate-anti-clock-wise 6s linear 0.1s infinite;
      }

      &:nth-of-type(2) {
        top: -8px;
        left: -10px;
        font-size: var(--el-font-size-large);
        transform: rotate(15deg);
        animation: gear-rotate-clock-wise 6s linear 0.2s infinite;
      }
    }

    h1 {
      flex-shrink: 0;
      font-size: var(--el-font-size-extra-large);
      line-height: var(--el-header-height);
      color: var(--el-text-color-regular);
    }
  }
}

.el-header {
  padding-left: v-bind("paddingLeft");
}
</style>
