<script lang="ts" setup>
import { ref } from 'vue';
import headerTitle from '@/components/layout/header-title.vue';
import SwitchLayout from '@/components/layout/switch-layout.vue';

const activeIndex2 = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};

</script>

<template>
  <el-container>
    <el-header class="layout__header">
      <div class="layout__title">
        <header-title />
      </div>
      <el-menu
        :default-active="activeIndex2"
        :background-color="'#545c64'"
        class="layout__menu"
        mode="horizontal"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          Processing Center
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            Workspace
          </template>
          <el-menu-item index="2-1">
            item one
          </el-menu-item>
          <el-menu-item index="2-2">
            item two
          </el-menu-item>
          <el-menu-item index="2-3">
            item three
          </el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>
              item four
            </template>
            <el-menu-item index="2-4-1">
              item one
            </el-menu-item>
            <el-menu-item index="2-4-2">
              item two
            </el-menu-item>
            <el-menu-item index="2-4-3">
              item three
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" disabled>
          Info
        </el-menu-item>
        <el-menu-item index="4">
          Orders
        </el-menu-item>
      </el-menu>
      <switch-layout />
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
</template>

<style lang="scss" scoped>
.layout {
  &__header {
    display: flex;
    align-items: center;
    background-color: #545c64;
  }

  &__title {
    flex: 0 0 auto;
  }

  &__menu {
    flex: 1;
  }
}
</style>
