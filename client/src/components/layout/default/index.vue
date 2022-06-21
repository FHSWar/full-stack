<script lang="ts" setup>
import Avatar from '@/components/layout/components/avatar.vue';
import LightDark from '@/components/layout/components/light-dark.vue';
import SwitchLayout from '@/components/layout/components/switch-layout.vue';
import LayoutAside from './aside/index.vue';
import Breadcrumb from './header/breadcrumb.vue';
import TabsBar from './header/tabs-bar.vue';

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
        <light-dark />
        <switch-layout />
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
