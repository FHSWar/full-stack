<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/stores';
import { findMenuListChain } from '@/utils';
import type { MenuList, MenuTree } from '@/utils';

defineProps<{asideMenuTree: MenuTree}>();

const router = useRouter();

const clickMenu = ({ page, id }: Omit<MenuList[number], 'icon'|'pid'|'title'|'children'>) => {
	if (page) router.push({ name: page });
	useStore().breadcrumb = findMenuListChain(id);
};
</script>

<template>
  <template v-for="{children, desc, icon, id, page, title} in asideMenuTree" :key="id">
    <el-menu-item v-if="children.length === 0" :index="id">
      <use-icon v-if="icon" :icon="icon" />
      <template #title>
        <span v-if="!desc" class="menu-tree__item" @click="clickMenu({id, page})">
          {{ title }}
        </span>
        <el-tooltip
          v-else
          class="box-item"
          placement="right"
          :content="desc"
          :show-after="500"
        >
          <span class="menu-tree__item" @click="clickMenu({id, page})">
            {{ title }}
          </span>
        </el-tooltip>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="id">
      <template #title>
        <use-icon v-if="icon" :icon="icon" />
        <span class="menu-tree__item" @click="clickMenu({id, page})">
          {{ title }}
        </span>
      </template>
      <menu-tree :aside-menu-tree="children" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
.menu-tree {
  &__item {
    width: 100%;
  }
}
</style>
