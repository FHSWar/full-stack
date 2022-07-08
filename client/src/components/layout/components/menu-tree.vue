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
  <template
    v-for="{children, desc, icon, id, page, showBool, title} in asideMenuTree"
    :key="id"
  >
    <el-menu-item
      v-if="children.length === 0 && showBool !== false"
      :index="id"
      @click="clickMenu({id, page})"
    >
      <use-icon v-if="icon" :icon="icon" />
      <template #title>
        <span v-if="!desc">
          {{ title }}
        </span>
        <el-tooltip
          v-else
          placement="top"
          :content="desc"
          :hide-after="0"
          :show-after="1000"
        >
          <span @click="clickMenu({id, page})">
            {{ title }}
          </span>
        </el-tooltip>
      </template>
    </el-menu-item>
    <el-sub-menu v-else-if="showBool !== false" :index="id">
      <template #title>
        <use-icon v-if="icon" :icon="icon" />
        <span @click="clickMenu({id, page})">
          {{ title }}
        </span>
      </template>
      <menu-tree :aside-menu-tree="children" />
    </el-sub-menu>
  </template>
</template>
