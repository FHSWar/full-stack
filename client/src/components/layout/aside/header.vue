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
    <transition name="el-fade-in">
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
                font-size: 24px;
                bottom: 16px;
                left: 16px;
                animation: gearRotateAntiClockWise 6s linear 0.1s infinite;
                transform-origin: 50% 50%;
            }
            &:nth-of-type(2) {
                font-size: var(--el-font-size-large);
                top: 10px;
                left: 30px;
                transform: rotate(15deg);
                animation: gearRotateClockWise 6s linear 0.2s infinite;
                transform-origin: 50% 50%;
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
@keyframes gearRotateClockWise {
    0% {
        transform: rotate(15deg);
    }
    100% {
        transform: rotate(-345deg);
    }
}

@keyframes gearRotateAntiClockWise {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
