<script lang="ts" setup>
import { computed } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import LayoutAside from './aside/index.vue';
import Breadcrumb from './header/breadcrumb.vue';
import TabsBar from './header/tabs-bar.vue';
import Avatar from './header/avatar.vue';

const isDark = useDark();
const toggleDarkClass = useToggle(isDark);
const icon = computed(() => (isDark.value ? 'Moon' : 'Sunny'));
const iconColor = computed(() => (isDark.value ? 'silver' : '#ff9954'));
const toggleDark = () => { toggleDarkClass(); };

</script>

<template>
  <el-container class="common-layout">
    <el-aside width="auto" class="common-layout__aside">
      <layout-aside />
    </el-aside>

    <el-container>
      <el-header class="common-layout__header">
        <breadcrumb class="common-layout__breadcrumb" />
        <avatar />
        <use-icon class="common-layout__toggle-icon" :icon="icon" @click="toggleDark" />
      </el-header>
      <el-header class="common-layout__header">
        <tabs-bar />
      </el-header>
      <el-main class="common-layout__main">
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="['MenuConfiguration']">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100%;

  &__aside {
    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-scrollbar__view) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    height: calc(var(--el-header-height) - 12px);

    &:first-of-type {
      background-color: var(--el-bg-color-page);
      border-bottom: var(--el-border-width) var(--el-border-style) var(--el-border-color-light);
    }
  }

  &__breadcrumb {
    flex: 1;
  }

  &__toggle-icon {
    margin-left: 12px;
    font-size: var(--el-font-size-extra-large);
    color: v-bind("iconColor");
  }

  &__main {
    background-color: var(--el-bg-color-page);

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease 0s;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    .fade-leave-from,
    .fade-enter-to {
      opacity: 1;
    }
  }
}

</style>
