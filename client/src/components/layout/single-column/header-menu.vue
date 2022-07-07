<script lang="ts" setup>
import { initMenuTree } from '@/utils';
import menuTree from '@/components/layout/components/menu-tree.vue';

const { activePageId, sideMenu } = initMenuTree();
</script>

<template>
  <el-menu
    mode="horizontal"
    :default-active="activePageId"
    :default-openeds="[]"
  >
    <menu-tree :aside-menu-tree="sideMenu" />
  </el-menu>
</template>
