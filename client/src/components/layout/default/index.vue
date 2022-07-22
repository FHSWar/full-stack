<script lang="ts" setup>
import { useAsideWidth } from './use-aside-width';
import Avatar from '@/components/layout/components/avatar.vue';
import LightDark from '@/components/layout/components/light-dark.vue';
import Breadcrumb from './header/breadcrumb.vue';
import TabsBar from './header/tabs-bar.vue';
import LayoutAside from './layout-aside.vue';

const asideWidth = useAsideWidth();
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
@use "@/assets/style/fade-transition.scss";

.common-layout {
  height: 100%;

  .el-aside {
    width: v-bind("asideWidth");
    transition: width 0.25s;
  }

  &__aside {
    border-right: 1px solid var(--el-border-color);
    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-scrollbar__view) {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-x: hidden;
    }
  }

  &__header {
    height: 52px;
    border-bottom: var(--el-border-width) var(--el-border-style) var(--el-border-color-light);

    &:first-of-type {
      display: flex;
      align-items: center;
    }
  }

  &__breadcrumb {
    flex: 1;
  }

  &__main {
    background-color: var(--el-bg-color-page);
  }
}

</style>
