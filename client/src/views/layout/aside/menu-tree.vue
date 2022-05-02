<script lang="ts" setup>
import { computed } from 'vue';

type MenuTree = {
  id: string,
  title: string,
  children: MenuTree,
  icon?: string // 用不了 keyof typeof Icons
}[]

const props = defineProps<{
  sideMenuTree: MenuTree
}>();

const noChildren = computed(() => props.sideMenuTree.filter((item): boolean => item.children.length === 0));
const hasChildren = computed(() => props.sideMenuTree.filter((item) => item.children.length > 0));

const clickMenu = (menu:any) => {
	console.log('menumenu', menu);
};
</script>

<template>
  <el-menu-item v-for="{icon, id, title} in noChildren" :index="id" :key="id">
    <useIcon :icon="icon" />
    <template #title>
      <span @click="clickMenu({icon, id, title})">{{ title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-for="{children, id, title} in hasChildren" :key="id" :index="id">
    <template #title>
      <span @click="clickMenu({id, title})">{{ title }}</span>
    </template>
    <menu-tree :side-menu-tree="children" />
  </el-sub-menu>
</template>
<style lang="scss" scoped>
</style>
