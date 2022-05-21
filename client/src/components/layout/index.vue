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
      display: flex;
      align-items: center; // line-height: var(--el-header-height);
      height: calc(var(--el-header-height) - 12px);

      &:first-of-type {
        border-bottom: var(--el-border-width) var(--el-border-style) var(--el-border-color-light);
        background-color: var(--el-fill-color-light);
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
      background-color: var(--el-fill-color);
    }
}
</style>
