<script lang="ts" setup>
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
      </el-header>
      <el-header class="common-layout__header">
        <tabs-bar />
      </el-header>
      <el-main class="common-layout__main">
        <router-view v-slot="{ Component }">
          <keep-alive :include="[]">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.common-layout {
    height: 100%;
    &__aside {
      .el-scrollbar__view {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
    &__header {
      line-height: var(--el-header-height);
      &:first-of-type {
        border-bottom: var(--el-border-width) var(--el-border-style) var(--el-border-color-light);
        background-color: var(--el-fill-color-light);
      }
    }
    &__main {
      background-color: var(--el-fill-color);
    }
}
</style>
