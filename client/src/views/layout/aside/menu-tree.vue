<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/stores';
import type { MenuList, MenuTree } from '@/types';

const props = defineProps<{
  asideMenuList: MenuList // 摊平的，方便找
  asideMenuTree: MenuTree // 组装好的，渲染用
}>();

const router = useRouter();
const findParentChain = (leafId: string):MenuList => {
	const result:MenuList = [];
	const handler = (id: string) => {
		const menuItem = props.asideMenuList.find((item) => item.id === id) as MenuList[number];
		result.unshift(menuItem);
		if (menuItem.pid !== '') handler(menuItem.pid);
	};
	handler(leafId);
	return result;
};
const clickMenu = ({ page, id }: Omit<MenuList[number], 'icon'|'pid'|'title'|'children'>) => {
	if (page) router.push({ name: page });
	useStore().breadcrumb = findParentChain(id);
};
</script>

<template>
  <template v-for="{children, icon, id, page, title} in asideMenuTree" :key="id">
    <el-menu-item v-if="children.length === 0" :index="id">
      <template #title>
        <span class="menu-tree__item" @click="clickMenu({id, page})">
          <use-icon v-if="icon" :icon="icon" />
          {{ title }}
        </span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="id">
      <template #title>
        <span class="menu-tree__item" @click="clickMenu({id, page})">
          <use-icon v-if="icon" :icon="icon" />
          {{ title }}
        </span>
      </template>
      <menu-tree :aside-menu-tree="children" :aside-menu-list="asideMenuList" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
.menu-tree {
  &__item {
    // width: 100%;
  }
}
</style>
