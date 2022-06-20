<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/stores';

const store = useStore();
const showHeaderTitle = computed(() => !store.themeConfig.isAsideMenuCollapse);
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

    position: relative;
    border-right: var(--el-border);

    svg {
      position: absolute;
      color: var(--vscode-icon-color);

      &:first-of-type {
        bottom: 16px;
        left: 16px;
        font-size: 24px;
        transform-origin: 50% 50%;
        animation: gear-rotate-anti-clock-wise 6s linear 0.1s infinite;
      }

      &:nth-of-type(2) {
        top: 10px;
        left: 30px;
        font-size: var(--el-font-size-large);
        transform: rotate(15deg);
        transform-origin: 50% 50%;
        animation: gear-rotate-clock-wise 6s linear 0.2s infinite;
      }
    }

    h1 {
      position: absolute;
      left: 56px;
      line-height: var(--el-header-height);
      color: var(--el-text-color-regular);
    }
  }
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
