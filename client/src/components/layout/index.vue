<script lang="ts" setup>
import layoutAside from './aside/index.vue';
import breadcrumb from './header/breadcrumb.vue';

</script>

<template>
  <el-container class="common-layout">
    <el-aside width="initial" class="common-layout__aside">
      <layout-aside class="transition-box" />
    </el-aside>

    <el-container>
      <el-header class="common-layout__header">
        <breadcrumb class="common-layout__breadcrumb" />
      </el-header>
      <el-main class="common-layout__main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.common-layout {
    height: 100%;
    &__header {
      position: relative;
    }
    &__breadcrumb {
      position: absolute;
      top: 52%;
      transform: translateY(-50%);
    }
    &__main {
      background-color: #f0f2f5;
    }
}
</style>
