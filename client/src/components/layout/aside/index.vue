<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import menuTree from './menu-tree.vue';
import { sideMenuList } from '@/mock';
import type { MenuList, MenuTree } from '@/types';
import { useStore } from '@/stores';
import { setLocal } from '@/utils';

const isCollapse = ref(false);
const deg = computed(() => (isCollapse.value ? '180deg' : '0'));
const store = useStore();
watchEffect(() => {
	store.themeConfig.isAsideMenuCollapse = isCollapse.value;
	setLocal('themeConfig', isCollapse.value, 'isAsideMenuCollapse');
});

const toggleAside = () => { isCollapse.value = !isCollapse.value; };

const assembleTree = (data: MenuList) => {
	const map: any = {};
	data.forEach((item) => {
		map[item.id] = item;
		item!.children = [];
	});

	const roots: MenuTree = [];
	data.forEach((item) => {
		const parent = map[item!.pid];
		if (parent) {
			parent.children.push(item);
		} else {
			roots.push(item as MenuTree[number]);
		}
	});
	return roots;
};
const sideMenu = assembleTree(sideMenuList as MenuList);
</script>

<template>
  <el-scrollbar class="aside-menu__wrapper">
    <!-- 一个侧边菜单只应有一个el-menu作为根，不应该被递归到 -->
    <el-menu class="aside-menu__magic-trick" :default-openeds="[]" :collapse="isCollapse">
      <menu-tree :aside-menu-tree="sideMenu" :aside-menu-list="(sideMenuList as MenuList)" />
      <el-menu-item class="aside-menu__footer" index="footer-menu-item">
        <use-icon class="aside-menu__toggle-icon" icon="Expand" @click="toggleAside" />
      </el-menu-item>
    </el-menu>
    <footer />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.demo {

}
.aside-menu {
	// https://juejin.cn/post/6844903815527956494#comment
	&__magic-trick {
		height: 100vh;
		&:not(.el-menu--collapse) {
			width: 300px;
		}
	}
	&__footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		// var(--el-menu-item-height) 组件外用不了
		height: 56px;
	}

	&__toggle-icon {
		position: absolute;
		top: 28px;
		transform: translate3d(0, -50%, 0) rotateY(v-bind("deg"));
		font-size: 24px;
	}
}
</style>
