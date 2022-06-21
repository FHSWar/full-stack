<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/stores';

const store = useStore();
const showHeaderTitle = computed(() => !store.themeConfig.isAsideMenuCollapse);
const isSingleColumn = computed(() => store.themeConfig.layout === 'single-column');

const borderRight = computed(() => (isSingleColumn.value ? '' : 'var(--el-border)'));
const iconColor = computed(() => (isSingleColumn.value ? '#ffd04b' : 'var(--vscode-icon-color)'));
const textColor = computed(() => (isSingleColumn.value ? '#fff' : 'var(--el-text-color-regular)'));
const paddingLeft = computed(() => (isSingleColumn.value ? 0 : '20px'));
</script>

<template>
  <el-header class="side-bar__header">
    <use-icon icon="Setting" />
    <use-icon icon="Tools" />
    <transition name="el-zoom-in-center">
      <h1 v-show="showHeaderTitle">
        后台系统
      </h1>
    </transition>
  </el-header>
</template>

<style lang="scss" scoped>
.side-bar {
  &__header {
    --vscode-icon-color: #4b9ae9;

    display: flex;
    width: 300px;
    border-right: v-bind("borderRight");

    svg {
      color: v-bind("iconColor");

      &:first-of-type {
        top: 20px;
        font-size: 24px;
        animation: gear-rotate-anti-clock-wise 6s linear 0.1s infinite;
      }

      &:nth-of-type(2) {
        top: 10px;
        left: -10px;
        font-size: var(--el-font-size-large);
        transform: rotate(15deg);
        animation: gear-rotate-clock-wise 6s linear 0.2s infinite;
      }
    }

    h1 {
      left: 56px;
      line-height: var(--el-header-height);
      color: v-bind("textColor");
    }
  }
}

.el-header {
  padding-left: v-bind("paddingLeft");
}

@keyframes gear-rotate-clock-wise {
  0% {
    transform: rotate(15deg);
  }

  100% {
    transform: rotate(-345deg);
  }
}

@keyframes gear-rotate-anti-clock-wise {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
