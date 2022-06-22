<script lang="ts" setup>
import { initMenuTree } from '@/utils';
import menuTree from '@/components/layout/components/menu-tree.vue';

const { activePageId, sideMenu } = initMenuTree();
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    mode="horizontal"
    text-color="#fff"
    :default-active="activePageId"
    :default-openeds="[]"
  >
    <menu-tree :aside-menu-tree="sideMenu" />
  </el-menu>
</template>
