<script lang="ts" setup>
import Avatar from '@/components/layout/components/avatar.vue';
import LightDark from '@/components/layout/components/light-dark.vue';
import headerTitle from '@/components/layout/components/header-title.vue';
import SwitchLayout from '@/components/layout/components/switch-layout.vue';
import MenuTree from './header-menu.vue';

</script>

<template>
  <el-container class="layout__wrapper">
    <el-header class="layout__header">
      <header-title class="layout__title" />
      <menu-tree class="layout__menu" />
      <avatar />
      <light-dark />
      <switch-layout />
    </el-header>
    <el-main class="layout__main">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="['MenuConfiguration']">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
@use "@/assets/style/fade-transition.scss";

.layout {
  &__wrapper {
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    height: 108px;
    background-color: #545c64;
  }

  &__title {
    flex: 0 0 auto;
  }

  &__menu {
    left: -20px;
    flex: 1;
    height: 108px;
  }

  &__main {
    height: 100%;
    background-color: var(--el-bg-color-page);
  }
}
</style>
